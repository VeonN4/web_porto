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
            'headline' => 'FUTURE',
            'subheadline' => 'ENGINEER',
            'tagline' => 'SYSTEM PREPARING',
            'description' => 'Hi, I\'m Muhammad Razfaziya Adinata. As a student and developer, I build robust web applications, design efficient systems, and love bridging the gap between software and hardware. Always learning, always building.',
            'status' => [
                'CRON Job: PKL (* 9-16 * 6-9 1-5)',
                'Learning System Design',
                'Seeking complex problems.',
            ],
            'core_stack' => ['TypeScript', 'React', 'Python'],
        ]);

        AboutSettings::create([
            'header' => 'ABOUT ME',
            'competencies_header' => 'CORE SKILLS',
            'concrete_image' => '',
            'paragraphs' => [
                'Hi, I’m Muhammad Razfaziya Adinata. I am a software development student with a deep passion for building robust web applications, designing efficient system architectures, and exploring the endless possibilities of technology. My journey is driven by a constant curiosity to understand how things work under the hood, pushing me to dive headfirst into full-stack development.',
                'On the software side, I focus on crafting clean backend APIs and scalable databases. However, my technical curiosity doesn\'t stop at the server. I love bridging the gap between software and hardware—whether that means tinkering with microcontrollers, optimizing server environments, or building custom automation tools. I believe that understanding both the abstract code and the physical infrastructure makes me a more versatile developer.',
                'As a student, I don\'t wait for the curriculum to catch up with the industry. I am constantly teaching myself new tools, frameworks, and methodologies to stay ahead of the curve. "Always learning, always building" is how I approach every project, from standalone web applications to complex hardware-software integrations.',
            ],
            'competencies' => [
                'Full-Stack Web Development',
                'API Architecture & Design (REST, MVC)',
                'Real-Time Systems & Event-Driven Apps',
                'Database Management & Optimization',
                'Hardware-Software Integration (IoT)',
                'Self-Driven Technical Research',
            ],
            'sys_config_location' => 'Cianjur, Indonesia',
            'sys_config_timezone' => 'PST (UTC+7)',
            'sys_config_status' => 'Not Available',
            'sys_config_languages' => ['TypeScript', 'Python'],
            'sys_config_frameworks' => ['React', 'Next.js', 'Astro', 'Node.js', 'Bun', 'Elysia JS', 'TailwindCSS'],
        ]);

        Experience::insert([
            [
                'slug' => 'mobilus-pkl',
                'role' => 'Full-Stack Developer Intern (PKL)',
                'company' => 'Mobilus Interactive',
                'period' => 'June 2026 - Present',
                'bullets' => json_encode([
                    'Developed a full-stack web application for "Cigadung Greenland Complex" using Laravel, implementing core features for resident management and data tracking.',
                    'Configured and deployed a self-hosted Ubuntu Server VPS on physical Mini PC hardware, managing the local server environment for application hosting and network configuration.',
                    'Designed and built responsive portfolio websites with a focus on clean code architecture and optimized user experience.',
                ]),
                'technologies' => json_encode(['Laravel', 'Self-host', 'TypeScript']),
                'position' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        Project::insert([
            [
                'slug' => 'zie-experience',
                'title' => 'ZIE EXPERIENCE',
                'description' => 'An online registration platform for the SMKN 1 Cianjur Open House event, built to handle hundreds of visiting students and guests.',
                'image_url' => 'https://i.postimg.cc/Gtfyc2sk/Screenshot-2026-06-30-at-14-14-03-Open-House-Registration.png',
                'status' => 'unavailable',
                'github_url' => '#',
                'demo_url' => '#',
                'details' => 'Developed with Next.js for a smooth user interface and integrated with Supabase for user authentication and managing registration data.',
                'tags' => json_encode(['Next.js', 'Supabase']),
                'position' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'slug' => 'toriniku-geprek-pos',
                'title' => 'TORINIKU GEPREK',
                'description' => 'A Point of Sale (POS) application designed for the Toriniku Geprek MSME (UMKM) to streamline local business transactions.',
                'image_url' => 'https://i.postimg.cc/Mp3KN4VY/Screenshot-2026-06-30-at-14-17-23-Beranda.png', // Update with actual image if needed
                'status' => 'production',
                'github_url' => '#',
                'demo_url' => '#',
                'details' => 'Built with Next.js for a responsive desktop and mobile interface, utilizing Supabase for real-time order tracking, menu inventory management, and sales data storage.',
                'tags' => json_encode(['Next.js', 'Supabase']),
                'position' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        TechStack::insert([
            [
                'type' => 'core',
                'name' => 'React',
                'icon' => 'Code',
                'description' => 'v18.x / Concurrent Mode',
                'version' => null,
                'index_label' => '01',
                'role' => null,
                'bullets' => null,
                'position' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'core',
                'name' => 'TypeScript',
                'icon' => 'Braces',
                'description' => 'Strict Mode Enabled',
                'version' => null,
                'index_label' => '02',
                'role' => null,
                'bullets' => null,
                'position' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'core',
                'name' => 'Next.js',
                'icon' => 'Globe',
                'description' => 'App Router / SSR',
                'version' => null,
                'index_label' => '03',
                'role' => null,
                'bullets' => null,
                'position' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'featured',
                'name' => 'Tailwind CSS',
                'icon' => 'Palette',
                'description' => 'Utility-first styling for rapid, consistent UI development. Custom design system integration.',
                'version' => null,
                'index_label' => 'UI',
                'role' => null,
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
                'version' => null,
                'index_label' => null,
                'role' => null,
                'bullets' => null,
                'position' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'backend',
                'name' => 'Python',
                'icon' => 'Terminal',
                'description' => 'Data & Scripting',
                'version' => null,
                'index_label' => null,
                'role' => null,
                'bullets' => null,
                'position' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'backend',
                'name' => 'PostgreSQL',
                'icon' => 'Database',
                'description' => 'Relational Data',
                'version' => null,
                'index_label' => null,
                'role' => null,
                'bullets' => null,
                'position' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'infrastructure',
                'name' => 'Docker',
                'icon' => null,
                'description' => null,
                'version' => null,
                'index_label' => null,
                'role' => 'Containerization',
                'bullets' => null,
                'position' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'infrastructure',
                'name' => 'AWS',
                'icon' => null,
                'description' => null,
                'version' => null,
                'index_label' => null,
                'role' => 'Cloud Provider',
                'bullets' => null,
                'position' => 9,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'infrastructure',
                'name' => 'Vercel',
                'icon' => null,
                'description' => null,
                'version' => null,
                'index_label' => null,
                'role' => 'Edge Deployment',
                'bullets' => null,
                'position' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'tooling',
                'name' => 'Git',
                'icon' => null,
                'description' => null,
                'version' => null,
                'index_label' => null,
                'role' => 'Version Control',
                'bullets' => null,
                'position' => 11,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'tooling',
                'name' => 'Vite',
                'icon' => null,
                'description' => null,
                'version' => null,
                'index_label' => null,
                'role' => 'Build Tool',
                'bullets' => null,
                'position' => 12,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'tooling',
                'name' => 'Figma',
                'icon' => null,
                'description' => null,
                'version' => null,
                'index_label' => null,
                'role' => 'UI Design',
                'bullets' => null,
                'position' => 13,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
