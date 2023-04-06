<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        $user = new User;
        $user->email = "employer@test.com";
        $user->name = "Employer 1";
        $user->password = 'welcome';
        $user->user_type = 'employer';
        $user->save();
    }
}
