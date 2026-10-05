from io import StringIO

from django.contrib.auth.models import Group, User
from django.core.exceptions import ValidationError
from django.core.management import call_command
from django.test import TestCase, override_settings

from .models import AreaContato, ContatoEquipe, FrenteAtuacao, PerguntaFAQ, TextoSite
from .validators import validar_link, validar_telefone
import secrets

# senha aleatória gerada a cada execução dos testes (nada fixo no código)
SENHA_TESTE = secrets.token_urlsafe(16) + 'aA1!'


def carregar():
    call_command('carregar_conteudo_inicial', stdout=StringIO())


class CargaInicialTests(TestCase):
    def test_carrega_textos_e_listas(self):
        carregar()
        self.assertTrue(TextoSite.objects.filter(chave='hero.titulo').exists())
        self.assertEqual(PerguntaFAQ.objects.count(), 7)
        self.assertEqual(FrenteAtuacao.objects.count(), 6)
        self.assertEqual(AreaContato.objects.count(), 7)
        self.assertEqual(ContatoEquipe.objects.count(), 9)

    def test_rodar_duas_vezes_nao_duplica(self):
        carregar()
        antes = (TextoSite.objects.count(), PerguntaFAQ.objects.count(), ContatoEquipe.objects.count())
        carregar()
        depois = (TextoSite.objects.count(), PerguntaFAQ.objects.count(), ContatoEquipe.objects.count())
        self.assertEqual(antes, depois)

    def test_nao_sobrescreve_edicoes_da_equipe(self):
        carregar()
        TextoSite.objects.filter(chave='hero.selo').update(valor='TEXTO EDITADO')
        PerguntaFAQ.objects.all().delete()
        carregar()
        self.assertEqual(TextoSite.objects.get(chave='hero.selo').valor, 'TEXTO EDITADO')
        # lista que a equipe esvaziou volta a ser carregada só se estiver vazia (comportamento documentado)
        self.assertEqual(PerguntaFAQ.objects.count(), 7)

    def test_nao_cria_usuarios_nem_senhas(self):
        carregar()
        self.assertEqual(User.objects.count(), 0)

    def test_grupos_existem_e_equipe_nao_gerencia_usuarios(self):
        equipe = Group.objects.get(name='Equipe')
        coord = Group.objects.get(name='Coordenação')
        codigos = set(equipe.permissions.values_list('codename', flat=True))
        self.assertIn('change_animal', codigos)
        self.assertIn('change_textosite', codigos)
        self.assertNotIn('add_textosite', codigos)
        self.assertNotIn('delete_textosite', codigos)
        self.assertFalse({c for c in codigos if c.endswith('_user')})
        self.assertFalse({c for c in coord.permissions.values_list('codename', flat=True) if c.endswith('_user')})


class ApiConteudoTests(TestCase):
    def setUp(self):
        carregar()

    def test_publico_le_sem_login(self):
        r = self.client.get('/api/conteudo/')
        self.assertEqual(r.status_code, 200)
        dados = r.json()
        self.assertEqual(
            set(dados),
            {'textos', 'pontos_sobre', 'frentes', 'formas_de_ajudar', 'faq', 'estatisticas', 'contatos'},
        )
        self.assertIn('Cache-Control', r.headers)
        self.assertIn('max-age=60', r.headers['Cache-Control'])

    def test_nenhuma_escrita_pela_api(self):
        for metodo in ('post', 'put', 'patch', 'delete'):
            r = getattr(self.client, metodo)('/api/conteudo/', data={}, content_type='application/json')
            self.assertEqual(r.status_code, 405, metodo)

    def test_ocultos_e_vazios_ficam_de_fora(self):
        FrenteAtuacao.objects.filter(titulo='Artes').update(ativo=False)
        TextoSite.objects.filter(chave='hero.selo').update(valor='   ')
        ContatoEquipe.objects.filter(nome='Sabrina').update(ativo=False)
        dados = self.client.get('/api/conteudo/').json()
        self.assertNotIn('Artes', [f['titulo'] for f in dados['frentes']])
        self.assertNotIn('hero.selo', dados['textos'])
        marketing = next(a for a in dados['contatos'] if a['funcao'] == 'Marketing')
        self.assertEqual(marketing['pessoas'], [])

    def test_api_expoe_so_o_necessario_dos_contatos(self):
        dados = self.client.get('/api/conteudo/').json()
        pessoa = dados['contatos'][0]['pessoas'][0]
        self.assertEqual(set(pessoa), {'nome', 'telefone', 'whatsapp', 'foto'})
        self.assertTrue(pessoa['whatsapp'].isdigit())


class ValidadoresTests(TestCase):
    def test_link_bloqueia_esquemas_perigosos(self):
        for ruim in ('javascript:alert(1)', 'data:text/html,x', 'http://sem-https.com', '//outro.com', 'ftp://x'):
            with self.assertRaises(ValidationError, msg=ruim):
                validar_link(ruim)
        for bom in ('/animais', 'https://instagram.com/ufu.mia', ''):
            validar_link(bom)

    def test_telefone(self):
        validar_telefone('+55 34 99999-9999')
        with self.assertRaises(ValidationError):
            validar_telefone('99999-9999')


@override_settings(DEBUG=False)
class AdminSemAcessoAnonimoTests(TestCase):
    def test_admin_exige_login(self):
        r = self.client.get('/admin/conteudo/textosite/')
        self.assertEqual(r.status_code, 302)
        self.assertIn('login', r['Location'])

    def test_equipe_so_edita_textos(self):
        carregar()
        u = User.objects.create_user('membro', password=SENHA_TESTE, is_staff=True)
        u.groups.add(Group.objects.get(name='Equipe'))
        self.client.force_login(u)
        self.assertEqual(self.client.get('/admin/conteudo/textosite/').status_code, 200)
        self.assertEqual(self.client.get('/admin/conteudo/textosite/add/').status_code, 403)
        self.assertEqual(self.client.get('/admin/auth/user/').status_code, 403)
