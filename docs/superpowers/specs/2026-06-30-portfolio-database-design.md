# Move portfolio data to SQLite database

## Goal

Replace hardcoded `resources/js/data.ts` with database-backed content via Laravel migrations, models, controller, and seeder. Frontend receives data as Inertia props.

## Schema

4 tables, JSON columns for nested arrays.

### `hero_settings` — single row

| Column | Type |
|---|---|
| id | integer PK |
| headline | string |
| subheadline | string |
| tagline | string |
| description | text |
| status | json (array of strings) |
| core_stack | json (array of strings) |
| timestamps | |

### `about_settings` — single row

| Column | Type |
|---|---|
| id | integer PK |
| header | string |
| competencies_header | string |
| concrete_image | text |
| paragraphs | json (array of strings) |
| competencies | json (array of strings) |
| sys_config_location | string |
| sys_config_timezone | string |
| sys_config_status | string |
| sys_config_languages | json (array of strings) |
| sys_config_frameworks | json (array of strings) |
| timestamps | |

### `experiences` — multiple rows, ordered

| Column | Type |
|---|---|
| id | integer PK |
| slug | string unique |
| role | string |
| company | string |
| period | string |
| bullets | json (array of strings) |
| technologies | json (array of strings) |
| position | integer |
| timestamps | |

### `projects` — multiple rows, ordered

| Column | Type |
|---|---|
| id | integer PK |
| slug | string unique |
| title | string |
| description | text |
| image_url | text |
| status | string |
| github_url | text nullable |
| demo_url | text nullable |
| details | text nullable |
| tags | json (array of strings) |
| position | integer |
| timestamps | |

### `tech_stacks` — multiple rows, ordered, typed

| Column | Type |
|---|---|
| id | integer PK |
| type | string enum: core, featured, backend, infrastructure, tooling |
| name | string |
| icon | string nullable |
| description | text nullable |
| version | string nullable |
| index_label | string nullable |
| role | string nullable |
| bullets | json array nullable |
| position | integer |
| timestamps | |

## Backend

### Models

- `HeroSettings` — has casts for `status` and `core_stack` as `array`
- `AboutSettings` — has casts for `paragraphs`, `competencies`, `sys_config_languages`, `sys_config_frameworks` as `array`
- `Experience` — has casts for `bullets` and `technologies` as `array`
- `Project` — has casts for `tags` as `array`
- `TechStack` — has cast for `bullets` as `array`

### Controller

`PortfolioController@index`:
- Query `HeroSettings::first()`
- Query `AboutSettings::first()`
- Query `Experience::orderBy('position')->get()`
- Query `Project::orderBy('position')->get()`
- Query `TechStack::orderBy('position')->get()`
- Pass all as Inertia props to `portfolio` page

### Route

`routes/web.php` — change from `Route::inertia('/', 'portfolio')` to `Route::get('/', [PortfolioController::class, 'index'])->name('home')`.

### Seeder

`PortfolioSeeder` — seeds all 4 tables with current `data.ts` values. Called from `DatabaseSeeder`.

## Frontend

### `portfolio.tsx`

- Receives props: `hero`, `about`, `experiences`, `projects`, `techStacks`
- All `<HERO_DATA.xxx>` becomes `<hero.xxx>`
- All `<EXPERIENCE_DATA>` becomes `<experiences>`
- Stack sections filter by `type`: `techStacks.filter(t => t.type === 'core')`, etc.
- Featured stack: `techStacks.find(t => t.type === 'featured')`

### Types

Add to `resources/js/types/portfolio.ts`:
- `HeroSettings` interface
- `AboutSettings` interface
- `TechStack` interface (with `type` field)

### Delete

- `resources/js/data.ts`

## Files

| Action | File |
|---|---|
| Create | `database/migrations/xxxx_create_hero_settings_table.php` |
| Create | `database/migrations/xxxx_create_about_settings_table.php` |
| Create | `database/migrations/xxxx_create_experiences_table.php` |
| Create | `database/migrations/xxxx_create_projects_table.php` |
| Create | `database/migrations/xxxx_create_tech_stacks_table.php` |
| Create | `app/Models/HeroSettings.php` |
| Create | `app/Models/AboutSettings.php` |
| Create | `app/Models/Experience.php` |
| Create | `app/Models/Project.php` |
| Create | `app/Models/TechStack.php` |
| Create | `app/Http/Controllers/PortfolioController.php` |
| Create | `database/seeders/PortfolioSeeder.php` |
| Modify | `routes/web.php` |
| Modify | `database/seeders/DatabaseSeeder.php` |
| Modify | `resources/js/pages/portfolio.tsx` |
| Modify | `resources/js/types/portfolio.ts` |
| Delete | `resources/js/data.ts` |
