<?php

namespace App\Http\Controllers;


use App\Services\AnswerServiceImpl;

class AnswerController extends APIController
{
    /**
     * AnswerController Constructor
     *
     * @param AnswerServiceImpl $answerService
     *
     */
    public function __construct(AnswerServiceImpl $answerService){
        return parent::__construct($answerService);
    }
}
