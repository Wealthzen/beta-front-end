<?php

namespace App\Http\Controllers;


use App\Services\UserServiceImpl;

class UserController extends APIController
{
    /**
     * UserController Constructor
     *
     * @param UserServiceImpl $userService
     *
     */
    public function __construct(UserServiceImpl $userService){
        return parent::__construct($userService);
    }
}
