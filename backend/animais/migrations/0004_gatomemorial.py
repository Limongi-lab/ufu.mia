import animais.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animais', '0003_fotoanimal'),
    ]

    operations = [
        migrations.CreateModel(
            name='GatoMemorial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(help_text='Nome do gatinho (ex: "Pipoca").', max_length=100)),
                ('foto', models.ImageField(help_text='Foto do gatinho (máx. 5 MB, formatos: JPG, PNG, GIF, WebP).', upload_to=animais.models.upload_memorial, validators=[animais.models.validar_imagem])),
                ('periodo', models.CharField(blank=True, help_text='Período de vida ou ano (ex: "2019 – 2025"). Opcional.', max_length=50)),
                ('descricao', models.TextField(help_text='Texto de homenagem: como ele era, como foi a passagem pelo projeto.')),
                ('texto_ex_donos', models.TextField(blank=True, help_text='Palavras de quem cuidou ou adotou o gatinho. Opcional.')),
                ('autor_texto', models.CharField(blank=True, help_text='Quem escreveu o texto acima (ex: "Maria, ex-tutora"). Opcional.', max_length=100)),
                ('ativo', models.BooleanField(default=True, help_text='Desmarque para esconder do site sem apagar.')),
                ('ordem', models.PositiveIntegerField(default=0, help_text='Ordem de exibição no site. Menor número aparece primeiro.')),
                ('criado_em', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Gatinho em memória',
                'verbose_name_plural': 'Memorial',
                'ordering': ['ordem', '-criado_em'],
            },
        ),
    ]