<?php


namespace App\Services;


use App\Repositories\AnswerRepositoryImpl;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class AnswerServiceImpl extends Service implements AnswerService
{
    /**
     * Rules to validate data when store or update
     * @var array
     */
    protected array $rules = [
        'userId' => 'required',
        'questionId' => 'required',
    ];

    /**
     * AnswerServiceImpl constructor.
     *
     * @param AnswerRepositoryImpl $answerRepository
     */
    public function __construct(AnswerRepositoryImpl $answerRepository)
    {
        return parent::__construct($answerRepository);
    }

    /**
     * Validate answer data.
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

        if (!isset($data['portfolioAttributes']) || $data['portfolioAttributes'] == '') $data['portfolioAttributes'] = null;

        if (is_array($data['portfolioAttributes'])) $data['portfolioAttributes'] = json_encode($data['portfolioAttributes']);

        // Validate json field
        $validator = Validator::make($data, [
            'portfolioAttributes' => 'nullable|json',
        ]);
        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        return parent::store($data);
    }

    /**
     * Update answer data
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

        if (!isset($data['portfolioAttributes']) || $data['portfolioAttributes'] == '') $data['portfolioAttributes'] = null;

        if (is_array($data['portfolioAttributes'])) $data['portfolioAttributes'] = json_encode($data['portfolioAttributes']);

        // Validate json field
        $validator = Validator::make($data, [
            'portfolioAttributes' => 'nullable|json',
        ]);
        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        return parent::update($data, $id);
    }
}
