{
    'name': 'Teidesat Website',
    'version': '1.0',
    'summary': 'Custom website for Teidesat',
    'category': 'Website',
    'depends': ['website'],
    'data': [
        'views/pages/home.xml',
        'views/pages/divulgacion.xml',
        'views/pages/nosotros.xml',
        'views/pages/departamentos.xml',
        'views/pages/participa.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'teidesat_website/static/src/css/home.css',
            'teidesat_website/static/src/css/divulgacion.css',
            'teidesat_website/static/src/css/nosotros.css',
            'teidesat_website/static/src/js/home.js',
            'teidesat_website/static/src/css/departamentos.css',
            'teidesat_website/static/src/css/participa.css',
        ],
    },
    'installable': True,
    'application': True,
}