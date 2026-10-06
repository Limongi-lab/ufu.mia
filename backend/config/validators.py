from django.core.exceptions import ValidationError

PALAVRAS_PROIBIDAS = ('ufumia', 'ufu.mia', 'ufu mia', 'senha', 'password', 'gatinho', '123456', 'qwerty', 'abcdef')


class SenhaDoProjetoValidator:
    """Recusa senhas óbvias para este projeto (nome do projeto, sequências, 'senha'...)."""

    def validate(self, password, user=None):
        baixa = password.lower()
        if any(p in baixa for p in PALAVRAS_PROIBIDAS):
            raise ValidationError(
                'Essa senha é previsível (usa o nome do projeto ou uma sequência comum). '
                'Use uma frase longa que só você conheça.',
                code='senha_previsivel',
            )

    def get_help_text(self):
        return 'Não use o nome do projeto, "senha" nem sequências como 123456.'
