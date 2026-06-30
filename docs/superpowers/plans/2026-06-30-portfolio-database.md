# Move portfolio data to SQLite database — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace hardcoded `resources/js/data.ts` with database-backed content via Laravel migrations, models, controller, and seeder.

**Architecture:** 4 SQLite tables with JSON columns for nested arrays. Controller queries all tables and passes data as Inertia props. Seeder populates from current `data.ts` values. Frontend reads props instead of static import.

**Tech Stack:** Laravel 13, Eloquent ORM, SQLite, Inertia.js v3, React 19, TypeScript 5.7

## Global Constraints

- Use Laravel 13 patterns: `#[Fillable]` attributes, `casts()` method
- JSON columns for all nested arrays (bullets, technologies, tags, etc.)
- Single-row tables: `hero_settings`, `about_settings`
- Ordered tables: `experiences`, `projects`, `tech_stacks` (via `position` column)
- `tech_stacks.type` enum: core, featured, backend, infrastructure, tooling
- Frontend types must match database schema exactly

---

### Task 1: Create migrations

**Files:**
- Create: `database/migrations/2026_06_30_000001_create_hero_settings_table.php`
- Create: `database/migrations/2026_06_30_000002_create_about_settings_table.php`
- Create: `database/migrations/2026_06_30_000003_create_experiences_table.php`
- Create: `database/migrations/2026_06_30_000004_create_projects_table.php`
- Create: `database/migrations/2026_06_30_000005_create_tech_stacks_table.php`

- [ ] **Step 1: Create hero_settings migration**

Create `database/migrations/2026_06_30_000001_create_hero_settings_table.php`:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_settings', function (Blueprint $table) {
            $table->id();
            $table->string('headline');
            $table->string('subheadline');
            $table->string('tagline');
            $table->text('description');
            $table->json('status');
            $table->json('core_stack');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_settings');
    }
};
```

- [ ] **Step 2: Create about_settings migration**

Create `database/migrations/2026_06_30_000002_create_about_settings_table.php`:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_settings', function (Blueprint $table) {
            $table->id();
            $table->string('header');
            $table->string('competencies_header');
            $table->text('concrete_image');
            $table->json('paragraphs');
            $table->json('competencies');
            $table->string('sys_config_location');
            $table->string('sys_config_timezone');
            $table->string('sys_config_status');
            $table->json('sys_config_languages');
            $table->json('sys_config_frameworks');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_settings');
    }
};
```

- [ ] **Step 3: Create experiences migration**

Create `database/migrations/2026_06_30_000003_create_experiences_table.php`:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('role');
            $table->string('company');
            $table->string('period');
            $table->json('bullets');
            $table->json('technologies');
            $table->integer('position');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
```

- [ ] **Step 4: Create projects migration**

Create `database/migrations/2026_06_30_000004_create_projects_table.php`:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('description');
            $table->text('image_url');
            $table->string('status');
            $table->text('github_url')->nullable();
            $table->text('demo_url')->nullable();
            $table->text('details')->nullable();
            $table->json('tags');
            $table->integer('position');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
```

- [ ] **Step 5: Create tech_stacks migration**

Create `database/migrations/2026_06_30_000005_create_tech_stacks_table.php`:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tech_stacks', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('name');
            $table->string('icon')->nullable();
            $table->text('description')->nullable();
            $table->string('version')->nullable();
            $table->string('index_label')->nullable();
            $table->string('role')->nullable();
            $table->json('bullets')->nullable();
            $table->integer('position');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tech_stacks');
    }
};
```

- [ ] **Step 6: Run migrations**

Run: `php artisan migrate`

Expected: all 5 tables created

---

### Task 2: Create models

**Files:**
- Create: `app/Models/HeroSettings.php`
- Create: `app/Models/AboutSettings.php`
- Create: `app/Models/Experience.php`
- Create: `app/Models/Project.php`
- Create: `app/Models/TechStack.php`

- [ ] **Step 1: Create HeroSettings model**

Create `app/Models/HeroSettings.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSettings extends Model
{
    protected $fillable = [
        'headline',
        'subheadline',
        'tagline',
        'description',
        'status',
        'core_stack',
    ];

    protected function casts(): array
    {
        return [
            'status' => 'array',
            'core_stack' => 'array',
        ];
    }
}
```

- [ ] **Step 2: Create AboutSettings model**

Create `app/Models/AboutSettings.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutSettings extends Model
{
    protected $fillable = [
        'header',
        'competencies_header',
        'concrete_image',
        'paragraphs',
        'competencies',
        'sys_config_location',
        'sys_config_timezone',
        'sys_config_status',
        'sys_config_languages',
        'sys_config_frameworks',
    ];

    protected function casts(): array
    {
        return [
            'paragraphs' => 'array',
            'competencies' => 'array',
            'sys_config_languages' => 'array',
            'sys_config_frameworks' => 'array',
        ];
    }
}
```

- [ ] **Step 3: Create Experience model**

Create `app/Models/Experience.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'slug',
        'role',
        'company',
        'period',
        'bullets',
        'technologies',
        'position',
    ];

    protected function casts(): array
    {
        return [
            'bullets' => 'array',
            'technologies' => 'array',
        ];
    }
}
```

- [ ] **Step 4: Create Project model**

Create `app/Models/Project.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'description',
        'image_url',
        'status',
        'github_url',
        'demo_url',
        'details',
        'tags',
        'position',
    ];

    protected function casts(): array
    {
        return [
            'tags' => 'array',
        ];
    }
}
```

- [ ] **Step 5: Create TechStack model**

Create `app/Models/TechStack.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TechStack extends Model
{
    protected $fillable = [
        'type',
        'name',
        'icon',
        'description',
        'version',
        'index_label',
        'role',
        'bullets',
        'position',
    ];

    protected function casts(): array
    {
        return [
            'bullets' => 'array',
        ];
    }
}
```

---

### Task 3: Create controller

**Files:**
- Create: `app/Http/Controllers/PortfolioController.php`

- [ ] **Step 1: Create PortfolioController**

Create `app/Http/Controllers/PortfolioController.php`:

```php
<?php

namespace App\Http\Controllers;

use App\Models\AboutSettings;
use App\Models\Experience;
use App\Models\HeroSettings;
use App\Models\Project;
use App\Models\TechStack;
use Inertia\Inertia;

class PortfolioController extends Controller
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
```

---

### Task 4: Create seeder and update route

**Files:**
- Create: `database/seeders/PortfolioSeeder.php`
- Modify: `database/seeders/DatabaseSeeder.php`
- Modify: `routes/web.php`

- [ ] **Step 1: Create PortfolioSeeder**

Create `database/seeders/PortfolioSeeder.php`:

```php
<?php

namespace Database\Seeders;

use App\Models\AboutSettings;
use App\Models\Experience;
use App\Models\HeroSettings;
use App\Models\Project;
use App\Models\TechStack;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        HeroSettings::create([
            'headline' => 'ENGINEERING',
            'subheadline' => 'THE INVISIBLE',
            'tagline' => 'SYSTEM ONLINE',
            'description' => 'I am Alex. A software engineer and systems architect specializing in high-performance infrastructure and minimalist brutalist interfaces. Code as structural art.',
            'status' => [
                'Deploying scalable microservices.',
                'Optimizing rust binaries.',
                'Seeking complex problems.',
            ],
            'core_stack' => ['Rust', 'TypeScript', 'Go', 'React', 'k8s'],
        ]);

        AboutSettings::create([
            'header' => 'SYSTEM.INFO',
            'competencies_header' => 'Core_Competencies',
            'concrete_image' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRmWA4JFr8WRvWeIqdRgLyTZUL78ImP926YBllFIGcKhjo7Zx_iQ0A3kOxVK8Asvjyg3mhMl3uu59ahTiwy9ne4znrCBdsmcyMjdYVEnPUxNGjQvvBr-OGudC74L_L92LaRdt7bSk1wSE5wdsPVrvaL1VoSkamUJlLPt9a3FCwBEYcaorxT2FwbZTg9PJDJi2Kv5Q4RUZSCCk7q1QfOYWEXi0NLNALqwtU4dPnmjuPRjQR6ydtZDM4FEPSpm0U2NXet1j-LPhGPhXN',
            'paragraphs' => [
                'I engineer scalable architectures and build uncompromising digital interfaces. My focus is on creating systems that are performant, resilient, and structurally sound. I believe in minimalism not as an aesthetic choice, but as an operational necessity—removing complexity to reveal clarity.',
                'With over a decade of experience bridging the gap between back-end infrastructure and front-end execution, I specialize in distributed systems, modern web frameworks, and creating developer tools that accelerate velocity.',
                'When I\'m not writing code, I\'m analyzing system logs, optimizing compile times, or studying brutalist architecture.',
            ],
            'competencies' => [
                'System Architecture & Design',
                'High-Performance Web Applications',
                'API Development (REST, GraphQL, gRPC)',
                'Database Optimization & Scaling',
                'UI/UX Engineering (Component Driven)',
            ],
            'sys_config_location' => 'San Francisco, CA',
            'sys_config_timezone' => 'PST (UTC-8)',
            'sys_config_status' => 'Available for contract',
            'sys_config_languages' => ['TypeScript', 'Rust', 'Go', 'Python'],
            'sys_config_frameworks' => ['React', 'Next.js', 'Node.js', 'TailwindCSS'],
        ]);

        Experience::insert([
            [
                'slug' => 'stellar-dynamics',
                'role' => 'Senior Systems Engineer',
                'company' => 'Stellar Dynamics Inc.',
                'period' => '2021 — PRESENT',
                'bullets' => json_encode([
                    'Architected microservices infrastructure scaling to 5M+ daily requests, reducing latency by 40%.',
                    'Led a team of 5 engineers in migrating legacy monolith to Kubernetes-orchestrated containers.',
                    'Implemented zero-downtime deployment pipelines using GitHub Actions and ArgoCD.',
                ]),
                'technologies' => json_encode(['Go', 'Kubernetes', 'AWS']),
                'position' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'slug' => 'quantum-analytics',
                'role' => 'Full Stack Developer',
                'company' => 'Quantum Analytics',
                'period' => '2018 — 2021',
                'bullets' => json_encode([
                    'Developed real-time data visualization dashboards for enterprise clients using React and D3.js.',
                    'Designed and optimized RESTful APIs in Node.js, improving data retrieval speeds by 60%.',
                ]),
                'technologies' => json_encode(['React', 'Node.js', 'PostgreSQL']),
                'position' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'slug' => 'nexus-tech',
                'role' => 'Backend Engineer',
                'company' => 'Nexus Technologies',
                'period' => '2016 — 2018',
                'bullets' => json_encode([
                    'Maintained and refactored core backend services written in Python.',
                    'Collaborated with data science team to integrate machine learning models into production environments.',
                ]),
                'technologies' => json_encode(['Python', 'Django', 'Redis']),
                'position' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        Project::insert([
            [
                'slug' => 'neural-net-api',
                'title' => 'NEURAL_NET_API',
                'description' => 'High-throughput inference API for distributed machine learning models. Built to handle 10k+ concurrent requests with sub-50ms latency.',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo8nt8q_hEeoX7WSeiFwRP7f1ktgJzFtQh6skqH5WgZXPoZhtxPaZhkWxvum8Nll9XEQ4D83HsrELU_w7dMJIiZlGxtOEhYQ-5m3GMMefmpn-332mt-X0xTHHnyEpwUcAlTbrtwY3h5K13bSUkP2BCwJie71g4c2hjkRG7mFw75nqjUcXO1HCriUaCozCzTJY0Zu7gzs7AIYwJvwlzedk61gjyN2Eke7x7tNvMnRefHtsXq7oTotvotWO8bQ91_fVm9KTj6d_w7tEK',
                'status' => 'production',
                'github_url' => 'https://github.com/alex-dev/neural-net-api',
                'demo_url' => '#',
                'details' => 'This system compiles down to highly optimized binaries. It leverages cross-beam channels for lock-free concurrency and stores transient weight indices in a memory-mapped cache.',
                'tags' => json_encode(['Rust', 'gRPC', 'Redis']),
                'position' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'slug' => 'synapse-db',
                'title' => 'SYNAPSE_DB',
                'description' => 'Custom distributed key-value store optimized for read-heavy workloads. Implements a bespoke Raft consensus algorithm for fault tolerance.',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3U-4I-YMfWwCEwkcoMwC3bP3BvmQLO-dE4vL0TOYsOYxUuKZkcaLEfGq0oLJRLGLcSW7X26eUbZs9CD_Lo_3EXAPop1bK8ieuMwguV-Dt46bIVGq6Va_RMfqleW9jI9qtDTwFZ4tjvqUH1khHN6aSxErYR6oGrbPajzje9E50so3t5tij6WWcyaA2iXBp-XEhf2YLjjevwlj6xoQNMwOfwj5AyMfHAFikmO6PpQ_GdD9NzicYyXjGFDxdKpKi3T9gCoTD3PWzbFRU',
                'status' => 'production',
                'github_url' => 'https://github.com/alex-dev/synapse-db',
                'demo_url' => '#',
                'details' => 'A clean implementation of Raft consensus with leader election, log replication, and safe state machines. Features dynamic cluster membership changes and auto-snapshotting of key spaces.',
                'tags' => json_encode(['Go', 'Raft', 'LevelDB']),
                'position' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'slug' => 'quantum-router',
                'title' => 'QUANTUM_ROUTER',
                'description' => 'Layer 7 load balancer with predictive routing capabilities. Uses ML to dynamically adjust traffic paths based on historical anomaly data.',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB0nsdb2wBloqC7V4Z-Zn-9c-b05q1aZ3xrPypUZ-C332WiMmz7w80NslZV2ng1OcJTESLMk0UHdCSyw0wyaxjURt8kPk_CCWDBUIa3q6BnYOxj7Izf8lFkxC3JM76bDa1m_visoUY0Qqa86yNa1EVk_BRwRVZo5GQtMODh6lrfkSH2_nOWwDPurQNMlVhpnptHIj2gH8gdgpavQLgz2ajTKIiTPtTZ-IHT7rl9QuTlDqL0FH6cfSZA8qwTEoOmNEMXL0RrQVXu1Fr',
                'status' => 'production',
                'github_url' => 'https://github.com/alex-dev/quantum-router',
                'demo_url' => '#',
                'details' => 'Utilizes Linux eBPF filters for ultra-fast kernel-level packet inspection, feeding metrics into an inline neural network proxy modeled on raw TCP flow signatures.',
                'tags' => json_encode(['C++', 'eBPF', 'Envoy']),
                'position' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'slug' => 'void-ui-library',
                'title' => 'VOID_UI_LIBRARY',
                'description' => 'Headless UI component library built for extreme performance and zero runtime overhead. Strictly unstyled, providing structural primitives.',
                'image_url' => 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2tpFIeg9KDx1FjD0pF1w3kLHohOIc3ZePsyZ_QQyJhkaa6lJBIWeJkGFPaajxgpQYC9UM3Ssh_NQ_RIC_kYKKwT6N3g6vOv-b29P7W-W1uG7IeCfBu0V6-sKWDVDNDF3AvoYQKks7T60KyXDIRNM8NegVV223YJ-LK_r1dl0MLZu8818Q3CcrD6YNqZDSn61HoC2MTsqthK_f2o9-zeXOzql5_ouEH8NtG3dZTiCTaOSejcmQenPVqrT5K984PUP7RA0SMU6uCqwn',
                'status' => 'production',
                'github_url' => 'https://github.com/alex-dev/void-ui-library',
                'demo_url' => '#',
                'details' => 'Focuses entirely on standard accessibility tree hooks and focus state managers. It includes no pre-packaged theme styles, which yields a bundle weight of just 1.2kB gzipped.',
                'tags' => json_encode(['TypeScript', 'React', 'Tailwind']),
                'position' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        TechStack::insert([
            [
                'type' => 'core',
                'name' => 'React',
                'icon' => 'Code',
                'description' => 'v18.x / Concurrent Mode',
                'index_label' => '01',
                'position' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'core',
                'name' => 'TypeScript',
                'icon' => 'Braces',
                'description' => 'Strict Mode Enabled',
                'index_label' => '02',
                'position' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'core',
                'name' => 'Next.js',
                'icon' => 'Globe',
                'description' => 'App Router / SSR',
                'index_label' => '03',
                'position' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'featured',
                'name' => 'Tailwind CSS',
                'icon' => 'Palette',
                'description' => 'Utility-first styling for rapid, consistent UI development. Custom design system integration.',
                'index_label' => 'UI',
                'bullets' => json_encode(['JIT Compiler', 'Custom Tokens', 'CSS Variables']),
                'position' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'backend',
                'name' => 'Node.js',
                'icon' => 'Cpu',
                'description' => 'Runtime Environment',
                'position' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'backend',
                'name' => 'Python',
                'icon' => 'Terminal',
                'description' => 'Data & Scripting',
                'position' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'backend',
                'name' => 'PostgreSQL',
                'icon' => 'Database',
                'description' => 'Relational Data',
                'position' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'backend',
                'name' => 'Redis',
                'icon' => 'HardDrive',
                'description' => 'Caching Layer',
                'position' => 7,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'infrastructure',
                'name' => 'Docker',
                'role' => 'Containerization',
                'position' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'infrastructure',
                'name' => 'AWS',
                'role' => 'Cloud Provider',
                'position' => 9,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'infrastructure',
                'name' => 'Vercel',
                'role' => 'Edge Deployment',
                'position' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'tooling',
                'name' => 'Git',
                'role' => 'Version Control',
                'position' => 11,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'tooling',
                'name' => 'Vite',
                'role' => 'Build Tool',
                'position' => 12,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'tooling',
                'name' => 'Figma',
                'role' => 'UI Design',
                'position' => 13,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
```

- [ ] **Step 2: Update DatabaseSeeder**

Replace content of `database/seeders/DatabaseSeeder.php`:

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->call([
            PortfolioSeeder::class,
        ]);
    }
}
```

- [ ] **Step 3: Update route**

Replace content of `routes/web.php`:

```php
<?php

use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'index'])->name('home');
```

- [ ] **Step 4: Run seeder**

Run: `php artisan migrate:fresh --seed`

Expected: all tables created and seeded

---

### Task 5: Update frontend

**Files:**
- Modify: `resources/js/types/portfolio.ts`
- Modify: `resources/js/pages/portfolio.tsx`
- Delete: `resources/js/data.ts`

- [ ] **Step 1: Update types**

Replace content of `resources/js/types/portfolio.ts`:

```ts
export interface HeroSettings {
  headline: string;
  subheadline: string;
  tagline: string;
  description: string;
  status: string[];
  core_stack: string[];
}

export interface AboutSettings {
  header: string;
  competencies_header: string;
  concrete_image: string;
  paragraphs: string[];
  competencies: string[];
  sys_config_location: string;
  sys_config_timezone: string;
  sys_config_status: string;
  sys_config_languages: string[];
  sys_config_frameworks: string[];
}

export interface ExperienceItem {
  id: number;
  slug: string;
  role: string;
  company: string;
  period: string;
  bullets: string[];
  technologies: string[];
  position: number;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image_url: string;
  status: string;
  github_url: string | null;
  demo_url: string | null;
  details: string | null;
  tags: string[];
  position: number;
}

export interface TechStackItem {
  id: number;
  type: 'core' | 'featured' | 'backend' | 'infrastructure' | 'tooling';
  name: string;
  icon: string | null;
  description: string | null;
  version: string | null;
  index_label: string | null;
  role: string | null;
  bullets: string[] | null;
  position: number;
}

export interface LogMessage {
  text: string;
  type: 'info' | 'error' | 'success' | 'input';
  timestamp: string;
}
```

- [ ] **Step 2: Update portfolio.tsx to use props**

Read `resources/js/pages/portfolio.tsx` and make these changes:

1. Remove all data imports:
   - Delete: `import { HERO_DATA, ABOUT_DATA, EXPERIENCE_DATA, PROJECTS_DATA, STACK_CORES, STACK_FEATURED, STACK_BACKENDS, STACK_INFRASTRUCTURE, STACK_TOOLING } from '@/data';`

2. Add props interface and update function signature:
   ```tsx
   import type { HeroSettings, AboutSettings, ExperienceItem, Project, TechStackItem } from '@/types/portfolio';

   interface PortfolioProps {
     hero: HeroSettings;
     about: AboutSettings;
     experiences: ExperienceItem[];
     projects: Project[];
     techStacks: TechStackItem[];
   }

   export default function App({ hero, about, experiences, projects, techStacks }: PortfolioProps) {
   ```

3. Replace all data references:
   - `HERO_DATA.headline` → `hero.headline`
   - `HERO_DATA.subheadline` → `hero.subheadline`
   - `HERO_DATA.tagline` → `hero.tagline`
   - `HERO_DATA.description` → `hero.description`
   - `HERO_DATA.status` → `hero.status`
   - `HERO_DATA.coreStack` → `hero.core_stack`
   - `ABOUT_DATA.header` → `about.header`
   - `ABOUT_DATA.paragraphs` → `about.paragraphs`
   - `ABOUT_DATA.competenciesHeader` → `about.competencies_header`
   - `ABOUT_DATA.competencies` → `about.competencies`
   - `ABOUT_DATA.sysConfig.location` → `about.sys_config_location`
   - `ABOUT_DATA.sysConfig.timezone` → `about.sys_config_timezone`
   - `ABOUT_DATA.sysConfig.status` → `about.sys_config_status`
   - `ABOUT_DATA.sysConfig.languages` → `about.sys_config_languages`
   - `ABOUT_DATA.sysConfig.frameworks` → `about.sys_config_frameworks`
   - `ABOUT_DATA.concreteImage` → `about.concrete_image`
   - `EXPERIENCE_DATA` → `experiences`
   - `PROJECTS_DATA` → `projects`
   - `PROJECTS_DATA.length` → `projects.length`

4. Replace stack references:
   - `STACK_CORES` → `techStacks.filter(t => t.type === 'core')`
   - `STACK_FEATURED` → `techStacks.find(t => t.type === 'featured')!`
   - `STACK_BACKENDS` → `techStacks.filter(t => t.type === 'backend')`
   - `STACK_INFRASTRUCTURE` → `techStacks.filter(t => t.type === 'infrastructure')`
   - `STACK_TOOLING` → `techStacks.filter(t => t.type === 'tooling')`

5. Update property access for stack items:
   - `core.indexLabel` → `core.index_label`
   - `STACK_FEATURED.indexLabel` → `featured.index_label`
   - `STACK_FEATURED.bullets` → `featured.bullets`
   - `item.role` (in infrastructure/tooling) stays as `item.role`

6. Update project property access:
   - `project.imageUrl` → `project.image_url`
   - `project.githubUrl` → `project.github_url`
   - `project.demoUrl` → `project.demo_url`

- [ ] **Step 3: Delete data.ts**

Run: `rm resources/js/data.ts`

---

### Task 6: Verify

- [ ] **Step 1: Run migrations and seed**

Run: `php artisan migrate:fresh --seed`

Expected: clean migration, seeder runs without errors

- [ ] **Step 2: Run TypeScript check**

Run: `pnpm types:check`

Expected: no errors

- [ ] **Step 3: Run ESLint**

Run: `pnpm lint`

Expected: no errors

- [ ] **Step 4: Run dev server**

Run: `pnpm dev`

Expected: app starts, portfolio renders at `/` with database data
