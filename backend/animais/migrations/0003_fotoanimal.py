import animais.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animais', '0002_add_ativo_ordem'),
    ]

    operations = [
        migrations.CreateModel(
            name='FotoAnimal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imagem', models.ImageField(help_text='Foto extra (máx. 5 MB, formatos: JPG, PNG, GIF, WebP).', upload_to=animais.models.upload_animais, validators=[animais.models.validar_imagem])),
                ('ordem', models.PositiveIntegerField(default=0, help_text='Ordem na galeria. Menor número aparece primeiro.')),
                ('animal', models.ForeignKey(help_text='Animal ao qual esta foto extra pertence.', on_delete=django.db.models.deletion.CASCADE, related_name='fotos', to='animais.animal')),
            ],
            options={
                'verbose_name': 'Foto extra',
                'verbose_name_plural': 'Fotos extras',
                'ordering': ['ordem', 'id'],
            },
        ),
    ]