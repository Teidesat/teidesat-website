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
    
    @http.route('/participa', type='http', auth='public', website=True)
    def participa(self, **kwargs):
        return request.render('teidesat_website.page_participa')
    
    @http.route('/contacto', type='http', auth='public', website=True)
    def contacto(self, **kwargs):
        return request.render('teidesat_website.page_contacto')
    
    @http.route('/departamentos/it', type='http', auth='public', website=True)
    def departamento_it(self, **kwargs):
        return request.render('teidesat_website.page_departamento_it')
    
    @http.route('/departamentos/arte', type='http', auth='public', website=True)
    def departamento_arte(self, **kwargs):
        return request.render('teidesat_website.page_departamento_arte')
    
    @http.route('/departamentos/divulgacion', type='http', auth='public', website=True)
    def departamento_divulgacion(self, **kwargs):
        return request.render('teidesat_website.page_departamento_divulgacion')
    
    @http.route('/departamentos/ads', type='http', auth='public', website=True)
    def departamento_ads(self, **kwargs):
        return request.render('teidesat_website.page_departamento_ads')
    
    @http.route('/departamentos/mecanica', type='http', auth='public', website=True)
    def departamento_mecanica(self, **kwargs):
        return request.render('teidesat_website.page_departamento_mecanica')
    
    @http.route('/departamentos/administracion', type='http', auth='public', website=True)
    def departamento_administracion(self, **kwargs):
        return request.render('teidesat_website.page_departamento_administracion')
    
    @http.route('/departamentos/rd', type='http', auth='public', website=True)
    def departamento_rd(self, **kwargs):
        return request.render('teidesat_website.page_departamento_rd')
    
    @http.route('/departamentos/electrocom', type='http', auth='public', website=True)
    def departamento_electrocom(self, **kwargs):
        return request.render('teidesat_website.page_departamento_electrocom')

    @http.route('/contacto/enviar', type='http', auth='public', website=True, methods=['POST'], csrf=True)
    def contacto_enviar(self, **post):
        nombre = (post.get('nombre') or '').strip()
        telefono = (post.get('telefono') or '').strip()
        email = (post.get('email') or '').strip()
        empresa = (post.get('empresa') or '').strip()
        asunto = (post.get('asunto') or '').strip()
        mensaje = (post.get('mensaje') or '').strip()

        descripcion = f"""
        <strong>Mensaje:</strong><br/>
        {mensaje}<br/><br/>

        <strong>Otra información:</strong><br/>
        ___________<br/><br/>

        <strong>Asunto:</strong> {asunto}<br/>
        <strong>Empresa:</strong> {empresa}<br/>
        <strong>Teléfono:</strong> {telefono}<br/>
        <strong>Email:</strong> {email}
        """

        lead_vals = {
            'name': nombre or f'Consulta web - {asunto}',
            'contact_name': nombre,
            'phone': telefono,
            'email_from': email,
            'partner_name': empresa,
            'description': descripcion,
            'type': 'opportunity',
        }

        request.env['crm.lead'].sudo().create(lead_vals)

        return request.redirect('/contacto?ok=1')