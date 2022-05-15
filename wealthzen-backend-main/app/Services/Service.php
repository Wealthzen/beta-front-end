<?php


namespace App\Services;


use App\Repositories\RepositoryInterface;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class Service implements ServiceInterface
{
    /**
     * @var RepositoryInterface
     */
    protected RepositoryInterface $modelRepository;

    /**
     * Service constructor.
     *
     * @param RepositoryInterface $repository
     */
    public function __construct(RepositoryInterface $repository)
    {
        $this->modelRepository = $repository;
    }

    /**
     * Get all model.
     *
     * @return mixed
     */
    public function all(): mixed
    {
        $data = $this->modelRepository->all();
        $data = $data->toArray();
        return array_map([$this, 'convertUnderscoreToCamelCase'] ,$data);
    }

    /**
     * Get model by id.
     *
     * @param $id
     *
     * @return mixed
     */
    public function get($id): mixed
    {
        $data = $this->modelRepository->get($id);
        return $this->convertUnderscoreToCamelCase($data->toArray());
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
        $data = $this->convertCamelCaseToUnderscore($data);
        return $this->modelRepository->store($data);
    }

    /**
     * Update model data
     * Store to DB if there are no errors.
     *
     * @param array $data
     * @param $id
     *
     * @return mixed
     */
    public function update(array $data, $id): mixed
    {
        DB::beginTransaction();

        try {
            $data = $this->convertCamelCaseToUnderscore($data);
            $model = $this->modelRepository->update($data, $id);
        } catch (Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());

            throw new InvalidArgumentException('Unable to update model data');
        }

        DB::commit();

        return $model;
    }

    /**
     * Delete model by id.
     *
     * @param $id
     *
     * @return mixed
     */
    public function delete($id): mixed
    {
        DB::beginTransaction();

        try {
            $model = $this->modelRepository->delete($id);
        } catch (Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());

            throw new InvalidArgumentException('Unable to delete model');
        }

        DB::commit();

        return $model;
    }

    /**
     * Convert the format of data in the database
     * from underscore to camelCase
     *
     * @param $data
     *
     * @return object|array
     */
    protected function convertUnderscoreToCamelCase($data): object|array
    {
        if (empty($data)) return [];

        if (is_object($data)) $result = (array)$data;
        else $result = $data;

        foreach ($result as $key => $item) {

            $new_key = $key;

            $explode_char = explode('_', $key);
            if (count($explode_char) != 1) {
                $new_key = lcfirst(implode('', array_map('ucfirst', $explode_char)));
            }

            // Check and convert Json string to array
            $validator = Validator::make(['item' => $item], ['item' => 'required|json'],);
            if (!$validator->fails()) {
                $item = json_decode($item, true);
            }

            $result[$new_key] = $item;
            if ($new_key !== $key) unset($result[$key]);
        }

        if (is_object($data)) return (object)$result;
        else return $result;
    }

    /**
     * Convert the format of request
     * from camelCase to underscore
     *
     * @param array $data
     *
     * @return array
     */
    protected function convertCamelCaseToUnderscore(array $data): array
    {
        if (empty($data)) return [];

        foreach ($data as $key => $item) {
            $new_key = lcfirst($key);
            $new_key = preg_replace("/[A-Z]/", '_' . "$0", $new_key);
            if ($new_key === $key) continue;
            $new_key = strtolower($new_key);
            $data[$new_key] = $item;
            unset($data[$key]);
        }

        return $data;
    }
}
