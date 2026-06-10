from odoo import models, fields


class TeidesatKidsQuestion(models.Model):
    _name = "teidesat.kids.question"
    _description = "Pregunta del minijuego TeidesatKids"
    _order = "sequence, id"

    sequence = fields.Integer(string="Orden", default=10)

    name = fields.Char(
        string="Pregunta",
        required=True
    )

    answer_1 = fields.Char(
        string="Respuesta 1",
        required=True
    )

    answer_2 = fields.Char(
        string="Respuesta 2",
        required=True
    )

    answer_3 = fields.Char(
        string="Respuesta 3",
        required=True
    )

    correct_answer = fields.Selection(
        [
            ("0", "Respuesta 1"),
            ("1", "Respuesta 2"),
            ("2", "Respuesta 3"),
        ],
        string="Respuesta correcta",
        required=True,
        default="0"
    )

    active = fields.Boolean(
        string="Activa",
        default=True
    )

    category = fields.Char(
        string="Categoría"
    )

    difficulty = fields.Selection(
        [
            ("easy", "Fácil"),
            ("medium", "Media"),
            ("hard", "Difícil"),
        ],
        string="Dificultad",
        default="easy"
    )