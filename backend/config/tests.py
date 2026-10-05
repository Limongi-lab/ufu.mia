from django.contrib.auth.models import User
from django.test import TestCase, override_settings
import secrets

# senha aleatória gerada a cada execução dos testes (nada fixo no código)
SENHA_TESTE = secrets.token_urlsafe(16) + 'aA1!'


class LoginBloqueadoTests(TestCase):
    """django-axes: após 5 erros o login é bloqueado, mesmo com a senha certa."""

    def setUp(self):
        User.objects.create_superuser('chefe', password=SENHA_TESTE)

    def _tenta(self, senha, ip='10.0.0.1'):
        return self.client.post(
            '/admin/login/?next=/admin/',
            {'username': 'chefe', 'password': senha},
            REMOTE_ADDR=ip,
        )

    def test_bloqueia_apos_cinco_erros(self):
        for _ in range(5):
            self._tenta('errada')
        r = self._tenta(SENHA_TESTE)
        self.assertIn(r.status_code, (403, 429))

    def test_outro_ip_nao_e_afetado_pelo_bloqueio(self):
        """Bloqueio por usuário+IP: um atacante não tranca a conta para a equipe."""
        for _ in range(5):
            self._tenta('errada', ip='10.0.0.1')
        r = self._tenta(SENHA_TESTE, ip='10.0.0.2')
        self.assertEqual(r.status_code, 302)  # login ok → redireciona

    def test_senha_certa_entra(self):
        r = self._tenta(SENHA_TESTE)
        self.assertEqual(r.status_code, 302)
