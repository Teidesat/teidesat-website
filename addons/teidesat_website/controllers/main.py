from odoo import http
from odoo.http import request


class TeidesatWebsite(http.Controller):

    @http.route('/', type='http', auth='public', website=True)
    def teidesat_home(self, **kwargs):
        return request.render('teidesat_website.teidesat_homepage')

    @http.route('/divulgacion', type='http', auth='public', website=True)
    def teidesat_divulgacion(self, **kwargs):
        return request.render('teidesat_website.page_divulgacion')

    @http.route('/nosotros', type='http', auth='public', website=True)
    def teidesat_nosotros(self, **kwargs):
        return request.render('teidesat_website.page_nosotros')
    
    @http.route('/departamentos', type='http', auth='public', website=True)
    def departamentos(self, **kwargs):
        return request.render('teidesat_website.page_departamentos')