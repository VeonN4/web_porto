<?php

namespace App\Http\Controllers;

use App\Models\AboutSettings;
use App\Models\Experience;
use App\Models\HeroSettings;
use App\Models\Project;
use App\Models\TechStack;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminController
{
    // ── Auth ─────────────────────────────────────────────────────────────────

    public function showLogin()
    {
        if (Auth::check()) {
            return Redirect::route('admin.dashboard');
        }

        return Inertia::render('admin/login');
    }

    public function login(Request $request)
    {
        // Auto-provision a default admin if none exists
        if (User::count() === 0) {
            User::create([
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('admin'),
            ]);
        }

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();
            return Redirect::route('admin.dashboard');
        }

        return back()->withErrors(['auth' => 'Invalid credentials.'])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return Redirect::route('admin.login');
    }

    // ── Dashboard ────────────────────────────────────────────────────────────

    public function dashboard()
    {
        return Inertia::render('admin/dashboard', [
            'hero'        => HeroSettings::first(),
            'about'       => AboutSettings::first(),
            'experiences' => Experience::orderBy('position')->get(),
            'projects'    => Project::orderBy('position')->get(),
            'techStacks'  => TechStack::orderBy('position')->get(),
            'logs'        => \App\Models\SystemLog::orderBy('created_at', 'desc')->take(100)->get()->map(function ($log) {
                return [
                    'id' => (string)$log->id,
                    'time' => $log->created_at->setTimezone(config('app.timezone', 'UTC'))->format('H:i:s'),
                    'action' => $log->action,
                    'message' => $log->message,
                ];
            }),
        ]);
    }

    // ── Hero ────────────────────────────────────────────────────────────────

    public function updateHero(Request $request)
    {
        $hero = HeroSettings::firstOrNew([]);
        $hero->fill($request->only(['headline', 'subheadline', 'tagline', 'description', 'status', 'core_stack']));
        $hero->save();
        return back();
    }

    // ── About ───────────────────────────────────────────────────────────────

    public function updateAbout(Request $request)
    {
        $about = AboutSettings::firstOrNew([]);
        $about->fill($request->only([
            'header', 'competencies_header', 'concrete_image', 'paragraphs',
            'competencies', 'sys_config_location', 'sys_config_timezone',
            'sys_config_status', 'sys_config_languages', 'sys_config_frameworks',
        ]));
        $about->save();
        return back();
    }

    // ── Experiences ─────────────────────────────────────────────────────────

    public function createExperience(Request $request)
    {
        $maxPos = Experience::max('position') ?? -1;
        $exp = Experience::create([
            'slug'         => Str::slug($request->role . '-' . $request->company . '-' . time()),
            'role'         => $request->role,
            'company'      => $request->company,
            'period'       => $request->period,
            'bullets'      => $request->bullets ?? [],
            'technologies' => $request->technologies ?? [],
            'position'     => $maxPos + 1,
        ]);
        return back()->with('flash', ['experience' => $exp]);
    }

    public function updateExperience(Request $request, int $id)
    {
        $exp = Experience::findOrFail($id);
        $exp->fill($request->only(['role', 'company', 'period', 'bullets', 'technologies']));
        $exp->save();
        return back();
    }

    public function deleteExperience(int $id)
    {
        Experience::findOrFail($id)->delete();
        return back();
    }

    // ── Projects ─────────────────────────────────────────────────────────────

    public function createProject(Request $request)
    {
        $maxPos = Project::max('position') ?? -1;
        $project = Project::create([
            'slug'        => Str::slug($request->title . '-' . time()),
            'title'       => $request->title,
            'description' => $request->description,
            'image_url'   => $request->image_url ?? '',
            'status'      => $request->status ?? 'production',
            'github_url'  => $request->github_url,
            'demo_url'    => $request->demo_url,
            'details'     => $request->details,
            'tags'        => $request->tags ?? [],
            'position'    => $maxPos + 1,
        ]);
        return back()->with('flash', ['project' => $project]);
    }

    public function updateProject(Request $request, int $id)
    {
        $project = Project::findOrFail($id);
        $project->fill($request->only(['title', 'description', 'image_url', 'status', 'github_url', 'demo_url', 'details', 'tags']));
        $project->save();
        return back()->with('flash', ['project' => $project]);
    }

    public function deleteProject(int $id)
    {
        Project::findOrFail($id)->delete();
        return back();
    }

    // ── Tech Stacks ──────────────────────────────────────────────────────────

    public function createTechStack(Request $request)
    {
        $maxPos = TechStack::max('position') ?? -1;
        $item = TechStack::create([
            'type'        => $request->type,
            'name'        => $request->name,
            'icon'        => $request->icon,
            'description' => $request->description,
            'version'     => $request->version,
            'index_label' => $request->index_label,
            'role'        => $request->role,
            'bullets'     => $request->bullets,
            'position'    => $maxPos + 1,
        ]);
        return back()->with('flash', ['techStack' => $item]);
    }

    public function updateTechStack(Request $request, int $id)
    {
        $item = TechStack::findOrFail($id);
        $item->fill($request->only(['type', 'name', 'icon', 'description', 'version', 'index_label', 'role', 'bullets']));
        $item->save();
        return back();
    }

    public function deleteTechStack(int $id)
    {
        TechStack::findOrFail($id)->delete();
        return back();
    }

    public function createLog(Request $request)
    {
        $request->validate([
            'action' => 'required|string',
            'message' => 'required|string',
        ]);

        \App\Models\SystemLog::create([
            'action' => $request->action,
            'message' => $request->message,
        ]);

        return back();
    }

    public function clearCache()
    {
        try {
            \Illuminate\Support\Facades\Artisan::call('optimize:clear');
            \App\Models\SystemLog::create([
                'action' => 'DEPLOY',
                'message' => 'Cache cleared successfully'
            ]);
            return back()->with('success', 'Cache cleared successfully');
        } catch (\Exception $e) {
            \App\Models\SystemLog::create([
                'action' => 'WARN',
                'message' => 'Failed to clear cache: ' . $e->getMessage()
            ]);
            return back()->withErrors(['error' => 'Failed to clear cache']);
        }
    }

    public function runTests()
    {
        try {
            $output = [];
            $resultCode = 0;
            exec('php artisan test', $output, $resultCode);

            if ($resultCode === 0) {
                \App\Models\SystemLog::create([
                    'action' => 'DEPLOY',
                    'message' => 'PASS: All diagnostics OK'
                ]);
                return back()->with('success', 'PASS: All diagnostics OK');
            } else {
                \App\Models\SystemLog::create([
                    'action' => 'WARN',
                    'message' => 'FAIL: Diagnostics failed. Code ' . $resultCode
                ]);
                return back()->withErrors(['error' => 'Diagnostics failed']);
            }
        } catch (\Exception $e) {
            \App\Models\SystemLog::create([
                'action' => 'WARN',
                'message' => 'Failed to run tests: ' . $e->getMessage()
            ]);
            return back()->withErrors(['error' => 'Failed to run tests']);
        }
    }
}
