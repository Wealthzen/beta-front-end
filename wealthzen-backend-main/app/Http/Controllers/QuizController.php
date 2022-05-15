<?php

namespace App\Http\Controllers;

use App\Services\QuizService;

class QuizController extends APIController
{
    /**
     * QuizController Constructor
     *
     * @param QuizService $service
     *
     */
    public function __construct(QuizService $service)
    {
        $this->service = $service;
        return parent::__construct($service);
    }
}
