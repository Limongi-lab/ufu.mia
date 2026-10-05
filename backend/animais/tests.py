from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.exceptions import ValidationError
from django.test import TestCase

from .models import Animal, validar_imagem
import secrets

# senha aleatória gerada a cada execução dos testes (nada fixo no código)
SENHA_TESTE = secrets.token_urlsafe(16) + 'aA1!'

# imagem mínima válida (1x1 GIF)
GIF = (b'GIF89a\x01\x00\x01\x00\x80\x00\x00\x00\x00\x00\xff\xff\xff!\xf9\x04\x01\x00\x00\x00\x00,'
       b'\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00;')


class ApiAnimaisTests(TestCase):
    def setUp(self):
        foto = SimpleUploadedFile('a.gif', GIF, content_type='image/gif')
        self.visivel = Animal.objects.create(nome='Visível', idade='1 ano', descricao='x', foto=foto, ativo=True)
        foto2 = SimpleUploadedFile('b.gif', GIF, content_type='image/gif')
        self.oculto = Animal.objects.create(nome='Oculto', idade='1 ano', descricao='x', foto=foto2, ativo=False)

    def test_lista_so_ativos(self):
        nomes = [a['nome'] for a in self.client.get('/api/animais/').json()]
        self.assertEqual(nomes, ['Visível'])

    def test_oculto_nao_abre_pelo_id(self):
        self.assertEqual(self.client.get(f'/api/animais/{self.oculto.pk}/').status_code, 404)

    def test_api_somente_leitura(self):
        for url in ('/api/animais/', f'/api/animais/{self.visivel.pk}/', '/api/historias/'):
            for metodo in ('post', 'put', 'patch', 'delete'):
                r = getattr(self.client, metodo)(url, data={}, content_type='application/json')
                self.assertIn(r.status_code, (403, 405), f'{metodo} {url}')

    def test_basic_auth_nao_funciona_na_api(self):
        import base64
        User.objects.create_user('x', password=SENHA_TESTE)
        cred = base64.b64encode(f'x:{SENHA_TESTE}'.encode()).decode()
        r = self.client.post('/api/animais/', data={}, content_type='application/json',
                             HTTP_AUTHORIZATION=f'Basic {cred}')
        self.assertIn(r.status_code, (403, 405))


class UploadTests(TestCase):
    def test_rejeita_extensao_perigosa(self):
        with self.assertRaises(ValidationError):
            validar_imagem(SimpleUploadedFile('x.svg', b'<svg onload=alert(1)>', content_type='image/svg+xml'))
        with self.assertRaises(ValidationError):
            validar_imagem(SimpleUploadedFile('x.php', b'<?php', content_type='image/png'))

    def test_rejeita_arquivo_grande(self):
        grande = SimpleUploadedFile('g.png', b'0' * (5 * 1024 * 1024 + 1), content_type='image/png')
        with self.assertRaises(ValidationError):
            validar_imagem(grande)
