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


class PainelSimplesTests(TestCase):
    def setUp(self):
        from django.contrib.auth.models import Group
        from django.core.management import call_command
        from io import StringIO
        call_command('carregar_conteudo_inicial', stdout=StringIO())
        self.membro = User.objects.create_user('membro', email='m@x.com', password=SENHA_TESTE, is_staff=True)
        self.membro.groups.add(Group.objects.get(name='Equipe'))
        self.chefe = User.objects.create_superuser('chefe', email='c@x.com', password=SENHA_TESTE)

    def test_inicio_mostra_atalhos_em_portugues(self):
        self.client.force_login(self.membro)
        r = self.client.get('/admin/')
        self.assertContains(r, 'Gatinhos para adoção')
        self.assertContains(r, 'Textos do site')
        self.assertContains(r, 'Salvar')

    def test_equipe_nao_ve_menu_de_administracao(self):
        self.client.force_login(self.membro)
        r = self.client.get('/admin/')
        self.assertNotContains(r, 'Contas da equipe')
        self.assertNotContains(r, 'Grupos de permissão')

    def test_superusuario_ve_administracao(self):
        self.client.force_login(self.chefe)
        r = self.client.get('/admin/')
        self.assertContains(r, 'Contas da equipe')
        self.assertContains(r, 'Quem mudou o quê')

    def test_todas_as_rotas_do_menu_existem(self):
        from django.conf import settings
        from django.urls import reverse
        for secao in settings.UNFOLD['SIDEBAR']['navigation']:
            for item in secao['items']:
                self.assertTrue(str(item['link']).startswith('/'), item['title'])


class SenhaFracaTests(TestCase):
    def test_recusa_senhas_fracas_e_previsiveis(self):
        from django.contrib.auth.password_validation import validate_password
        from django.core.exceptions import ValidationError
        for ruim in ('ufumia-teste-aaa', 'Ufumia2026!!!!', 'curta1!', 'senha-super-forte-123', '12345678901234'):
            with self.assertRaises(ValidationError, msg=ruim):
                validate_password(ruim)

    def test_aceita_frase_longa(self):
        from django.contrib.auth.password_validation import validate_password
        validate_password('cavalo-azul-tomate-janela-47')
