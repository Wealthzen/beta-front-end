<?php


namespace App\Repositories;


use App\Models\Portfolio;

class PortfolioRepositoryImpl extends Repository implements PortfolioRepository
{
    /**
     * PortfolioRepositoryImpl constructor.
     *
     * @param Portfolio $portfolio
     */
    public function __construct(Portfolio $portfolio){
        return parent::__construct($portfolio);
    }
}
