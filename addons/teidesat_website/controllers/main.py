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
    
    @http.route('/teidesatkids', type='http', auth='public', website=True)
    def teidesatkids(self, **kwargs):
        return request.render('teidesat_website.page_teidesatkids')

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
        asunto_libre = (post.get('asunto_libre') or '').strip()
        mensaje = (post.get('mensaje') or '').strip()

        # Si elige "Otro", usamos el texto libre solo como detalle,
        # pero la categoría interna sigue siendo "Otro"
        asunto_final = asunto_libre if asunto == 'Otro' and asunto_libre else asunto

        descripcion = f"""
        <strong>Mensaje:</strong><br/>
        {mensaje}<br/><br/>

        <strong>Otra información:</strong><br/>
        ___________<br/><br/>

        <strong>Asunto seleccionado:</strong> {asunto}<br/>
        <strong>Asunto final:</strong> {asunto_final}<br/>
        <strong>Empresa:</strong> {empresa}<br/>
        <strong>Teléfono:</strong> {telefono}<br/>
        <strong>Email:</strong> {email}
        """

        # Mapeo exacto asunto -> etiqueta CRM
        tag_map = {
            'Prácticas': 'Prácticas',
            'Voluntariado': 'Voluntariado',
            'Divulgación': 'Divulgación',
            'TFG/TFM': 'TFG/TFM',
            'Memes': 'Memes',
            'Otro': 'Otro',
        }

        tag_ids = []
        tag_name = tag_map.get(asunto)

        if tag_name:
            tag = request.env['crm.tag'].sudo().search([('name', '=', tag_name)], limit=1)
            if tag:
                tag_ids = [tag.id]

        # Para no romper lo que ya te funcionaba antes,
        # el nombre del lead será la categoría seleccionada.
        lead_name = asunto if asunto else (nombre or 'Consulta web')

        lead_vals = {
            'name': lead_name,
            'contact_name': nombre,
            'phone': telefono,
            'email_from': email,
            'partner_name': empresa,
            'description': descripcion,
            'type': 'opportunity',
            'tag_ids': [(6, 0, tag_ids)],
        }

        request.env['crm.lead'].sudo().create(lead_vals)

        return request.redirect('/contacto?ok=1')