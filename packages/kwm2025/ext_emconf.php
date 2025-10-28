<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'KWM 2025',
    'description' => '',
    'category' => 'templates',
    'constraints' => [
        'depends' => [
            'bootstrap_package' => '15.0.0-15.99.99',
        ],
        'conflicts' => [
        ],
    ],
    'autoload' => [
        'psr-4' => [
            'Fhooe\\Kwm2025\\' => 'Classes',
        ],
    ],
    'state' => 'stable',
    'uploadfolder' => 0,
    'createDirs' => '',
    'clearCacheOnLoad' => 1,
    'author' => 'Theresa Krendl',
    'author_email' => 's2410456015@fhooe.at',
    'author_company' => 'fhooe',
    'version' => '1.0.0',
];
