<?php


namespace App\Services;


use App\Models\Question;
use App\Repositories\QuestionRepositoryImpl;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class QuestionServiceImpl extends Service implements QuestionService
{
    /**
     * Rules to validate data when store or update
     * @var array
     */
    protected array $rules = [
        'type' => 'required',
        'phase' => 'required|numeric',
        'order' => 'required|numeric',
    ];

    /**
     * QuestionServiceImpl constructor.
     *
     * @param QuestionRepositoryImpl $questionRepository
     */
    public function __construct(QuestionRepositoryImpl $questionRepository)
    {
        return parent::__construct($questionRepository);
    }

    /**
     * Validate question data.
     * Store to DB if there are no errors.
     *
     * @param array $data
     * @return mixed
     */
    public function store(array $data): mixed
    {
        $validator = Validator::make($data, $this->rules);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        if (!isset($data['choices']) || $data['choices'] == '') $data['choices'] = null;
        if (!isset($data['skipLogic']) || $data['skipLogic'] == '') $data['skipLogic'] = null;

        if (is_array($data['choices'])) $data['choices'] = json_encode($data['choices']);
        if (is_array($data['skipLogic'])) $data['skipLogic'] = json_encode($data['skipLogic']);

        // Validate json field
        $validator = Validator::make($data, [
            'choices' => 'nullable|json',
            'skipLogic' => 'nullable|json'
        ]);
        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        return parent::store($data);
    }

    /**
     * Update question data
     * Store to DB if there are no errors.
     *
     * @param array $data
     * @param $id
     *
     * @return mixed
     */
    public function update(array $data, $id): mixed
    {
        $validator = Validator::make($data, $this->rules);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        if (!isset($data['choices']) || $data['choices'] == '') $data['choices'] = null;
        if (!isset($data['skipLogic']) || $data['skipLogic'] == '') $data['skipLogic'] = null;

        if (is_array($data['choices'])) $data['choices'] = json_encode($data['choices']);
        if (is_array($data['skipLogic'])) $data['skipLogic'] = json_encode($data['skipLogic']);

        // Validate json field
        $validator = Validator::make($data, [
            'choices' => 'nullable|json',
            'skipLogic' => 'nullable|json'
        ]);
        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        return parent::update($data, $id);
    }

    /**
     * Check question can skip or not by id
     *
     * @param $data
     *
     * @return mixed
     */
    public function import($data): mixed
    {
        $validator = Validator::make(['file' => $data], [
            'file' => 'required|file|mimetypes:application/json|mimes:json',
        ]);
        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        $path = $data->path();

        $file_data = file_get_contents($path);

        $validator = Validator::make(['content' => $file_data], [
            'content' => 'required|json',
        ], [
            'content.required' => 'The contents of this file are empty!',
            'content.json' => 'The file content is not a valid JSON string!',
        ]);
        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        $questions = json_decode($file_data, true);

        $countImported = $countUpdated = 0;
        foreach ($questions as $question){
            $validator = Validator::make($question, [
                'order' => 'required|numeric',
                'phase' => 'required|numeric',
            ]);
            if ($validator->fails()) {
                throw new InvalidArgumentException($validator->errors()->first());
            }

            $old_question = Question::where([
                ['order', '=', $question['order']],
                ['phase', '=', $question['phase']],
            ])->first();

            if (empty($old_question)){
                $this->store($question);
                $countImported++;
            } else {
                $this->update($question, $old_question->id);
                $countUpdated++;
            }
        }

        if ($countImported == 0 && $countUpdated == 0)
            return "Nothing to update or store";

        return "Successfully imported $countImported and updated $countUpdated questions";
    }
}
