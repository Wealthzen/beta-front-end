<?php


namespace App\Repositories;


use App\Models\Answer;

class AnswerRepositoryImpl extends Repository implements AnswerRepository
{
    public function __construct(Answer $answer){
        return parent::__construct($answer);
    }
}
