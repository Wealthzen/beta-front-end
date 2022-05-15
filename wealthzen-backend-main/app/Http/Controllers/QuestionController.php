<?php

namespace App\Http\Controllers;

use App\Services\QuestionServiceImpl;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class QuestionController extends APIController
{
    /**
     * QuestionController Constructor
     *
     * @param QuestionServiceImpl $questionService
     *
     */
    public function __construct(QuestionServiceImpl $questionService){
        return parent::__construct($questionService);
    }


    /**
     * Import data from .csv file contain questions
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function import(Request $request): JsonResponse
    {
        $data = $request->file('file');

        $result = ['status' => 200];

        try {
            $result['data'] = $this->service->import($data);
        } catch (Exception $e) {
            $result = [
                'status' => 500,
                'error' => $e->getMessage()
            ];
        }

        return response()->json($result, $result['status']);
    }
}
