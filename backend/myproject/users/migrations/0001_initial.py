# Generated by Django 5.0.2 on 2024-03-04 07:25

import django.contrib.auth.models
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('appointments', '0001_initial'),
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('username', models.CharField(max_length=100)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('phone_number', models.CharField(max_length=20)),
                ('address', models.CharField(default='CDMX', max_length=255)),
                ('registration_date', models.DateTimeField(auto_now_add=True)),
                ('role', models.CharField(choices=[('professional', 'Professional'), ('user', 'User')], max_length=20)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='AppointmentHistory',
            fields=[
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('previous_status', models.CharField(max_length=20)),
                ('current_status', models.CharField(max_length=20)),
                ('date_and_time_of_status_change', models.DateTimeField(auto_now_add=True)),
                ('turn_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appointments.turn')),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('message_id', models.AutoField(primary_key=True, serialize=False)),
                ('message_content', models.TextField()),
                ('date_and_time_of_message', models.DateTimeField(auto_now_add=True)),
                ('recipient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recipient', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sender', to=settings.AUTH_USER_MODEL)),
                ('turn_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appointments.turn')),
            ],
        ),
        migrations.CreateModel(
            name='Professional',
            fields=[
                ('professional_id', models.AutoField(primary_key=True, serialize=False)),
                ('speciality', models.CharField(default='Contador', max_length=100)),
                ('description', models.TextField(default='Profesional de confianza', max_length=100)),
                ('availability_hours', models.CharField(blank=True, max_length=255)),
                ('neighborhood', models.CharField(blank=True, default='', max_length=100)),
                ('province', models.CharField(blank=True, default='Buenos Aires', max_length=100)),
                ('image', models.ImageField(default='default.jpg', upload_to='user_images')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='professional', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('rating_id', models.AutoField(primary_key=True, serialize=False)),
                ('score', models.IntegerField(choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')])),
                ('comment', models.TextField()),
                ('rating_date', models.DateTimeField(auto_now_add=True)),
                ('turn_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appointments.turn')),
            ],
        ),
    ]
