from odoo import http
from odoo.http import request


class TeidesatWebsite(http.Controller):

    @http.route('/teidesat', type='http', auth='public', website=True)
    def teidesat_page(self, **kwargs):
        return request.render('teidesat_website.teidesat_homepage')