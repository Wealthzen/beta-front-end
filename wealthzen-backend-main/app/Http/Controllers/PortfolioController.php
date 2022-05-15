<?php

namespace App\Http\Controllers;


use App\Services\PortfolioServiceImpl;

class PortfolioController extends APIController
{
    /**
     * PortfolioController Constructor
     *
     * @param PortfolioServiceImpl $portfolioService
     *
     */
    public function __construct(PortfolioServiceImpl $portfolioService){
        return parent::__construct($portfolioService);
    }
}
