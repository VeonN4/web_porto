<?php

namespace App\Http\Controllers;

use App\Models\AboutSettings;
use App\Models\Experience;
use App\Models\HeroSettings;
use App\Models\Project;
use App\Models\TechStack;
use Inertia\Inertia;

class PortfolioController
{
    public function index()
    {
        return Inertia::render('portfolio', [
            'hero' => HeroSettings::first(),
            'about' => AboutSettings::first(),
            'experiences' => Experience::orderBy('position')->get(),
            'projects' => Project::orderBy('position')->get(),
            'techStacks' => TechStack::orderBy('position')->get(),
        ]);
    }
}
