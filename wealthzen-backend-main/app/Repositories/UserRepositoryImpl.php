<?php


namespace App\Repositories;


use App\Models\User;

class UserRepositoryImpl extends Repository implements UserRepository
{
    public function __construct(User $user){
        return parent::__construct($user);
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
        return $this->model->where('email', $email)->first();
    }
}
