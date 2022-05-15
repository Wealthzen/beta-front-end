<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(
            \App\Repositories\UserRepository::class,
            \App\Repositories\UserRepositoryImpl::class,
        );
        $this->app->singleton(
            \App\Services\UserService::class,
            \App\Services\UserServiceImpl::class,
        );

        $this->app->singleton(
            \App\Repositories\QuestionRepository::class,
            \App\Repositories\QuestionRepositoryImpl::class,
        );
        $this->app->singleton(
            \App\Services\QuestionService::class,
            \App\Services\QuestionServiceImpl::class,
        );

        $this->app->singleton(
            \App\Repositories\AnswerRepository::class,
            \App\Repositories\AnswerRepositoryImpl::class,
        );
        $this->app->singleton(
            \App\Services\AnswerService::class,
            \App\Services\AnswerServiceImpl::class,
        );

        $this->app->singleton(
            \App\Repositories\PortfolioRepository::class,
            \App\Repositories\PortfolioRepositoryImpl::class,
        );
        $this->app->singleton(
            \App\Services\PortfolioService::class,
            \App\Services\PortfolioServiceImpl::class,
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        // $this->loadMigrationsFrom(__DIR__ .'/database/migrations');
    }
}
