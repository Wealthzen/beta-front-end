<?php


namespace App\Repositories;


use Illuminate\Database\Eloquent\Model;

class Repository implements RepositoryInterface
{
    /**
     * @var Model $model
     */
    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Get all model.
     *
     * @return Model
     */
    public function all()
    {
        return $this->model->get();
    }

    /**
     * Get model by id
     *
     * @param $id
     * @return Model
     */
    public function get($id): Model
    {
        return $this->model->find($id);
    }

    /**
     * Store model data
     *
     * @param array $data
     *
     * @return Model
     */
    public function store(array $data): Model
    {
        $model = new $this->model;
        $model->fill($data);
        $model->save();
        return $model;
    }

    /**
     * Update model
     *
     * @param array $data
     * @param $id
     *
     * @return Model
     */
    public function update(array $data, $id): Model
    {
        $model = $this->model->find($id);
        $model->fill($data);
        $model->save();
        return $model->fresh();
    }

    /**
     * Delete model
     *
     * @param $id
     *
     * @return Model
     */
    public function delete($id): Model
    {
        $model = $this->model->find($id);
        $model->delete();
        return $model;
    }
}
