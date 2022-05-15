<?php

namespace App\Http\Controllers;

use App\Services\ServiceInterface;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class APIController extends Controller
{
    /**
     * @var ServiceInterface
     */
    protected ServiceInterface $service;

    /**
     * APIController Constructor
     *
     * @param ServiceInterface $service
     *
     */
    public function __construct(ServiceInterface $service)
    {
        $this->service = $service;
    }

    /**
     * Get a list of all models.
     *
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        $result = ['status' => 200];

        try {
            $result['data'] = $this->service->all();
        } catch (Exception $e) {
            $result = [
                'status' => 500,
                'error' => $e->getMessage()
            ];
        }

        return response()->json($result, $result['status']);
    }

    /**
     * Retrieve a model's data information.
     *
     * @param Int $id   Model id
     *
     * @return JsonResponse
     */
    public function get(Int $id): JsonResponse
    {
        $result = ['status' => 200];

        try {
            $result['data'] = $this->service->get($id);
        } catch (Exception $e) {
            $result = [
                'status' => 500,
                'error' => $e->getMessage()
            ];
        }
        return response()->json($result, $result['status']);
    }

    /**
     * Store a model's data.
     *
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->all();

        $result = ['status' => 200];

        try {
            $result['data'] = $this->service->store($data);
        } catch (Exception $e) {
            $result = [
                'status' => 500,
                'error' => $e->getMessage()
            ];
        }

        return response()->json($result, $result['status']);
    }

    /**
     * Update a model's data.
     *
     * @param  Request  $request
     * @param Int $id   Model id
     *
     * @return JsonResponse
     */
    public function update(Request $request, Int $id): JsonResponse
    {
        $data = $request->all();
        if (isset($data['id'])) unset($data['id']);

        $result = ['status' => 200];

        try {
            $result['data'] = $this->service->update($data, $id);
        } catch (Exception $e) {
            $result = [
                'status' => 500,
                'error' => $e->getMessage()
            ];
        }

        return response()->json($result, $result['status']);
    }

    /**
     * Delete a model from storage.
     *
     * @param Int $id   Model id
     *
     * @return JsonResponse
     */
    public function delete(Int $id): JsonResponse
    {
        $result = ['status' => 200];

        try {
            $result['data'] = $this->service->delete($id);
        } catch (Exception $e) {
            $result = [
                'status' => 500,
                'error' => $e->getMessage()
            ];
        }
        return response()->json($result, $result['status']);
    }
}
