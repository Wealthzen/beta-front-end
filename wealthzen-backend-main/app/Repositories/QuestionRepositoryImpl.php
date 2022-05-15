<?php


namespace App\Repositories;


use App\Models\Question;

class QuestionRepositoryImpl extends Repository implements QuestionRepository
{
    /**
     * QuestionRepositoryImpl constructor.
     *
     * @param Question $question
     */
    public function __construct(Question $question){
        return parent::__construct($question);
    }

    /**
     * Get all questions
     */
    public function all()
    {
        return $this->model->orderBy('phase', 'asc')->orderBy('order', 'asc')->get();
    }
}
