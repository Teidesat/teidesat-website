{
    'name': 'Teidesat Website',
    'version': '1.0',
    'summary': 'Custom website for Teidesat',
    'category': 'Website',
    'depends': ['website'],
    'data': [
        'views/templates.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'teidesat_website/static/src/css/style.css',
            'teidesat_website/static/src/js/script.js',
        ],
    },
    'installable': True,
    'application': True,
}