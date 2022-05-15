<?php


namespace App\Services;


use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class QuizService implements ServiceInterface
{
    /**
     * @var UserServiceImpl
     */
    protected UserServiceImpl $userService;

    /**
     * @var AnswerServiceImpl
     */
    protected AnswerServiceImpl $answerService;

    /**
     * QuizService constructor.
     *
     */
    public function __construct(UserServiceImpl $userService, AnswerServiceImpl $answerService)
    {
        $this->userService = $userService;
        $this->answerService = $answerService;
    }

    /**
     * Create model data.
     *
     * @param array $data
     *
     * @return mixed
     */
    public function store(array $data): mixed
    {
        if (isset($data['answers']) && is_array($data['answers'])) {
            $answers_list = $data['answers'];
            $data['answers'] = json_encode($data['answers']);
        }

        $validator = Validator::make($data, [
            'user' => 'required',
            'user.name' => 'required',
            'user.email' => 'required|email',
            'user.password' => 'required',
            'answers' => 'required|json'
        ]);
        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        // Check if user is exist and store user data if don't exist
        $user = $this->userService->getByEmail($data['user']['email']);
        if (empty($user)) {
            $user = $this->userService->store($data['user']);
        } else {
            $this->userService->update($data['user'], $user['id']);
        }

        // Store answers data
        foreach ($answers_list as $answer) {
            $answer['userId'] = $user['id'];
            $answers[] = $this->answerService->store($answer);
        }

        $data['user'] = $user;
        $data['answers'] = $answers ?? [];

        return $data;
    }

    public function all()
    {
        // TODO: Implement all() method.
    }

    public function get($id)
    {
        // TODO: Implement get() method.
    }

    public function update(array $data, $id)
    {
        // TODO: Implement update() method.
    }

    public function delete($id)
    {
        // TODO: Implement delete() method.
    }
}
