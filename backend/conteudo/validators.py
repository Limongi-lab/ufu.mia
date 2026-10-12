import re

from django.core.exceptions import ValidationError


def validar_link(valor):
    """
    Aceita só endereços seguros: caminhos do próprio site (/animais) ou links
    https://. Bloqueia coisas como "javascript:..." que poderiam ser usadas
    para atacar quem visita o site.
    """
    if not valor:
        return
    interno = valor.startswith('/') and not valor.startswith('//')
    externo = valor.lower().startswith('https://')
    if not (interno or externo):
        raise ValidationError(
            'Use um caminho do site (ex.: /animais) ou um link que comece com https://'
        )


def validar_telefone(valor):
    """O número, com DDI e DDD, precisa ter de 12 a 13 dígitos (ex.: +55 34 99999-9999)."""
    digitos = re.sub(r'\D', '', valor or '')
    if not 12 <= len(digitos) <= 13:
        raise ValidationError(
            'Informe o número completo com +55 e DDD (ex.: +55 34 99999-9999).'
        )
