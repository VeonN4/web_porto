<?php

return [

    'ssr' => [
        'enabled' => false,
    ],

    'pages' => [
        'paths' => [
            resource_path('js/pages'),
        ],
        'extensions' => [
            'ts',
            'tsx',
        ],
    ],

    'testing' => [
        'ensure_pages_exist' => true,
    ],

];
