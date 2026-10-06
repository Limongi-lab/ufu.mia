"""
Login da equipe por E-MAIL (ou usuário), com o mesmo bloqueio por tentativas
do django-axes. Nenhuma senha é guardada aqui: ela fica criptografada no banco.
"""
from django.contrib.admin.forms import AdminAuthenticationForm
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

User = get_user_model()


class EmailOuUsuarioBackend(ModelBackend):
    """Aceita o e-mail no lugar do usuário. E-mail repetido em duas contas é recusado."""

    def authenticate(self, request, username=None, password=None, **kwargs):
        if username and '@' in username and password:
            candidatos = list(User.objects.filter(email__iexact=username.strip())[:2])
            if len(candidatos) == 1:
                usuario = candidatos[0]
                if usuario.check_password(password) and self.user_can_authenticate(usuario):
                    return usuario
                return None
        # Não era um e-mail (ou não achou): tenta o fluxo normal por usuário
        return super().authenticate(request, username=username, password=password, **kwargs)


class LoginEquipeForm(AdminAuthenticationForm):
    """Tela de login do painel: pede E-mail."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].label = 'E-mail'
        self.fields['username'].widget.attrs.update({'autocomplete': 'email', 'inputmode': 'email'})
        self.fields['password'].label = 'Senha'
