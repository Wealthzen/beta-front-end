<?php


namespace App\Services;


use App\Repositories\PortfolioRepositoryImpl;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class PortfolioServiceImpl extends Service implements PortfolioService
{
    /**
     * Rules to validate data when store or update
     * @var array
     */
    protected array $rules = [
        'name' => 'required',
        'description' => 'required',
        'portfolioDetails' => 'required',
    ];

    /**
     * PortfolioServiceImpl constructor.
     *
     * @param PortfolioRepositoryImpl $portfolioRepository
     */
    public function __construct(PortfolioRepositoryImpl $portfolioRepository)
    {
        return parent::__construct($portfolioRepository);
    }

    /**
     * Validate portfolio data.
     * Store to DB if there are no errors.
     *
     * @param array $data
     * @return mixed
     */
    public function store(array $data): mixed
    {
        $validator = Validator::make($data, $this->rules);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        if (!isset($data['portfolioDetails']) || $data['portfolioDetails'] == '') $data['portfolioDetails'] = null;
        if (!isset($data['investmentAttributes']) || $data['investmentAttributes'] == '') $data['investmentAttributes'] = null;
        if (!isset($data['portfolioAttributes']) || $data['portfolioAttributes'] == '') $data['portfolioAttributes'] = null;

        if (is_array($data['portfolioDetails'])) $data['portfolioDetails'] = json_encode($data['portfolioDetails']);
        if (is_array($data['investmentAttributes'])) $data['investmentAttributes'] = json_encode($data['investmentAttributes']);
        if (is_array($data['portfolioAttributes'])) $data['portfolioAttributes'] = json_encode($data['portfolioAttributes']);

        // Validate json field
        $validator = Validator::make($data, [
            'portfolioDetails' => 'nullable|json',
            'investmentAttributes' => 'nullable|json',
            'portfolioAttributes' => 'nullable|json',
        ]);
        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        return parent::store($data);
    }

    /**
     * Update portfolio data
     * Store to DB if there are no errors.
     *
     * @param array $data
     * @param $id
     *
     * @return mixed
     */
    public function update(array $data, $id): mixed
    {
        $validator = Validator::make($data, $this->rules);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        if (!isset($data['portfolioDetails']) || $data['portfolioDetails'] == '') $data['portfolioDetails'] = null;
        if (!isset($data['investmentAttributes']) || $data['investmentAttributes'] == '') $data['investmentAttributes'] = null;
        if (!isset($data['portfolioAttributes']) || $data['portfolioAttributes'] == '') $data['portfolioAttributes'] = null;

        if (is_array($data['portfolioDetails'])) $data['portfolioDetails'] = json_encode($data['portfolioDetails']);
        if (is_array($data['investmentAttributes'])) $data['investmentAttributes'] = json_encode($data['investmentAttributes']);
        if (is_array($data['portfolioAttributes'])) $data['portfolioAttributes'] = json_encode($data['portfolioAttributes']);

        // Validate json field
        $validator = Validator::make($data, [
            'portfolioDetails' => 'nullable|json',
            'investmentAttributes' => 'nullable|json',
            'portfolioAttributes' => 'nullable|json',
        ]);
        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->errors()->first());
        }

        return parent::update($data, $id);
    }
}
