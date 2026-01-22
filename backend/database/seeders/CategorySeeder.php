<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create(['name' => 'BIT', 'slug' => 'bit']);
        Category::create(['name' => 'CSIT', 'slug' => 'csit']);
        Category::create(['name' => 'BBA', 'slug' => 'bba']);
        Category::create(['name' => 'BHM', 'slug' => 'bhm']);
    }
}
