# Generated by Django 4.2.6 on 2024-02-18 04:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payment',
            name='turn_id',
        ),
        migrations.RemoveField(
            model_name='turn',
            name='availability_id',
        ),
        migrations.RemoveField(
            model_name='turn',
            name='professional_id',
        ),
        migrations.RemoveField(
            model_name='turn',
            name='user_id',
        ),
        migrations.AlterField(
            model_name='appointmenthistory',
            name='turn_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appointments.turn'),
        ),
        migrations.AlterField(
            model_name='message',
            name='turn_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appointments.turn'),
        ),
        migrations.AlterField(
            model_name='rating',
            name='turn_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appointments.turn'),
        ),
        migrations.DeleteModel(
            name='Availability',
        ),
        migrations.DeleteModel(
            name='Payment',
        ),
        migrations.DeleteModel(
            name='Turn',
        ),
    ]