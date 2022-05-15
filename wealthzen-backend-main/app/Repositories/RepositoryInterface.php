<?php


namespace App\Repositories;


interface RepositoryInterface
{
    public function all();

    public function get($id);

    public function store(array $data);

    public function update(array $data, $id);

    public function delete($id);
}
