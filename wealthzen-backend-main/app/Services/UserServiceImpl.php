<?php


namespace App\Services;


use App\Repositories\UserRepositoryImpl;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use InvalidArgumentException;
use Illuminate\Support\Facades\Hash;

class UserServiceImpl extends Service implements UserService
{
    /**
     * Rules to validate data
     *
     * @var array
     */
    protected array $rules = [
        'name' => 'required|unique:users,name|min:4|max:32',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|min:6|max:32',
    ];

    /**
     * UserServiceImpl constructor.
     *
     * @param UserRepositoryImpl $userRepository
     */
    public function __construct(UserRepositoryImpl $userRepository)
    {
        return parent::__construct($userRepository);
    }

    /**
     * Validate user data.
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

        $data['password'] = Hash::make($data['password']);

        return parent::store($data);
    }

    /**
     * Update post data
     * Store to DB if there are no errors.
     *
     * @param array $data
     * @param $id
     *
     * @return mixed
     */
    public function update(array $data, $id): mixed
    {
        $validator = Validator::make($data, [
            'name' => ['required', 'min:4', 'max:32'],
            'email' => ['required', 'email', Rule::unique('users')->ignore($id)],
        ]);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        if (isset($data['password'])) $data['password'] = Hash::make($data['password']);

        // TODO: Authentication

        return parent::update($data, $id);
    }

    /**
     * Get user by email
     *
     * @param string $email
     *
     * @return mixed
     */
    public function getByEmail(string $email): mixed
    {
        $data = $this->modelRepository->getByEmail($email);
        if (!empty($data)) $data = $data->toArray();
        return $this->convertUnderscoreToCamelCase($data);
    }
}
