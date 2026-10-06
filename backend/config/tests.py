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


class LoginPorEmailTests(TestCase):
    def setUp(self):
        self.senha = SENHA_TESTE
        User.objects.create_user('maria', email='Maria@Exemplo.com', password=self.senha, is_staff=True)

    def _login(self, usuario, senha):
        return self.client.post('/admin/login/?next=/admin/', {'username': usuario, 'password': senha})

    def test_entra_com_email_sem_diferenciar_maiusculas(self):
        self.assertEqual(self._login('maria@exemplo.COM', self.senha).status_code, 302)
        self.assertEqual(self.client.get('/admin/').status_code, 200)

    def test_ainda_entra_com_usuario(self):
        self.assertEqual(self._login('maria', self.senha).status_code, 302)

    def test_senha_errada_com_email_nao_entra(self):
        r = self._login('maria@exemplo.com', 'errada-123')
        self.assertEqual(r.status_code, 200)
        self.assertEqual(self.client.get('/admin/').status_code, 302)

    def test_email_repetido_em_duas_contas_e_recusado(self):
        User.objects.create_user('maria2', email='maria@exemplo.com', password=self.senha, is_staff=True)
        r = self._login('maria@exemplo.com', self.senha)
        self.assertEqual(r.status_code, 200)

    def test_email_tambem_conta_no_bloqueio_por_tentativas(self):
        for _ in range(5):
            self._login('maria@exemplo.com', 'errada-123')
        r = self._login('maria@exemplo.com', self.senha)
        self.assertIn(r.status_code, (403, 429))

    def test_tela_de_login_pede_email(self):
        r = self.client.get('/admin/login/')
        self.assertContains(r, 'E-mail')
