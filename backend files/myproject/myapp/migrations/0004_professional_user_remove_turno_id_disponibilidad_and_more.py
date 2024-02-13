# Generated by Django 5.0.2 on 2024-02-13 03:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("myapp", "0003_alter_profesional_role_alter_usuario_role"),
    ]

    operations = [
        migrations.CreateModel(
            name="Professional",
            fields=[
                (
                    "professional_id",
                    models.AutoField(primary_key=True, serialize=False),
                ),
                ("specialty", models.CharField(max_length=100)),
                ("description", models.TextField()),
                ("session_rate", models.DecimalField(decimal_places=2, max_digits=10)),
                ("availability_hours", models.CharField(max_length=255)),
                (
                    "role",
                    models.CharField(
                        choices=[("professional", "Professional"), ("user", "User")],
                        default="",
                        max_length=20,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                ("user_id", models.AutoField(primary_key=True, serialize=False)),
                ("first_name", models.CharField(max_length=100)),
                ("last_name", models.CharField(max_length=100)),
                ("email", models.EmailField(max_length=254)),
                ("password", models.CharField(max_length=255)),
                ("phone_number", models.CharField(max_length=20)),
                ("address", models.CharField(max_length=255)),
                ("registration_date", models.DateTimeField(auto_now_add=True)),
                (
                    "role",
                    models.CharField(
                        choices=[("professional", "Professional"), ("user", "User")],
                        default="",
                        max_length=20,
                    ),
                ),
            ],
        ),
        migrations.RemoveField(
            model_name="turno",
            name="id_disponibilidad",
        ),
        migrations.RemoveField(
            model_name="historaldecitas",
            name="id_turno",
        ),
        migrations.RemoveField(
            model_name="mensajes",
            name="destinatario",
        ),
        migrations.RemoveField(
            model_name="mensajes",
            name="id_turno",
        ),
        migrations.RemoveField(
            model_name="mensajes",
            name="remitente",
        ),
        migrations.RemoveField(
            model_name="pago",
            name="id_turno",
        ),
        migrations.RemoveField(
            model_name="profesional",
            name="id_usuario",
        ),
        migrations.RemoveField(
            model_name="turno",
            name="id_profesional",
        ),
        migrations.RemoveField(
            model_name="turno",
            name="id_usuario",
        ),
        migrations.RemoveField(
            model_name="valoracion",
            name="id_turno",
        ),
        migrations.CreateModel(
            name="Availability",
            fields=[
                (
                    "availability_id",
                    models.AutoField(primary_key=True, serialize=False),
                ),
                (
                    "day_of_week",
                    models.CharField(
                        choices=[
                            ("Monday", "Monday"),
                            ("Tuesday", "Tuesday"),
                            ("Wednesday", "Wednesday"),
                            ("Thursday", "Thursday"),
                            ("Friday", "Friday"),
                            ("Saturday", "Saturday"),
                            ("Sunday", "Sunday"),
                        ],
                        max_length=10,
                    ),
                ),
                ("start_time", models.TimeField()),
                ("end_time", models.TimeField()),
                (
                    "professional_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="myapp.professional",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Turn",
            fields=[
                ("turn_id", models.AutoField(primary_key=True, serialize=False)),
                ("date_and_time_of_turn", models.DateTimeField()),
                (
                    "turn_status",
                    models.CharField(
                        choices=[
                            ("confirmed", "Confirmed"),
                            ("pending", "Pending"),
                            ("cancelled", "Cancelled"),
                            ("completed", "Completed"),
                        ],
                        max_length=20,
                    ),
                ),
                ("message_to_professional", models.TextField(blank=True, null=True)),
                (
                    "availability_id",
                    models.ForeignKey(
                        default="",
                        on_delete=django.db.models.deletion.CASCADE,
                        to="myapp.availability",
                    ),
                ),
                (
                    "professional_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="myapp.professional",
                    ),
                ),
                (
                    "user_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="myapp.user"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Rating",
            fields=[
                ("rating_id", models.AutoField(primary_key=True, serialize=False)),
                (
                    "score",
                    models.IntegerField(
                        choices=[(1, "1"), (2, "2"), (3, "3"), (4, "4"), (5, "5")]
                    ),
                ),
                ("comment", models.TextField()),
                ("rating_date", models.DateTimeField(auto_now_add=True)),
                (
                    "turn_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="myapp.turn"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Payment",
            fields=[
                ("payment_id", models.AutoField(primary_key=True, serialize=False)),
                ("amount", models.DecimalField(decimal_places=2, max_digits=10)),
                ("payment_method", models.CharField(max_length=100)),
                ("date_and_time_of_payment", models.DateTimeField(auto_now_add=True)),
                (
                    "turn_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="myapp.turn"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="AppointmentHistory",
            fields=[
                ("history_id", models.AutoField(primary_key=True, serialize=False)),
                ("previous_status", models.CharField(max_length=20)),
                ("current_status", models.CharField(max_length=20)),
                (
                    "date_and_time_of_status_change",
                    models.DateTimeField(auto_now_add=True),
                ),
                (
                    "turn_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="myapp.turn"
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="professional",
            name="user_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="myapp.user"
            ),
        ),
        migrations.CreateModel(
            name="Messages",
            fields=[
                ("message_id", models.AutoField(primary_key=True, serialize=False)),
                ("message_content", models.TextField()),
                ("date_and_time_of_message", models.DateTimeField(auto_now_add=True)),
                (
                    "turn_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="myapp.turn"
                    ),
                ),
                (
                    "recipient",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="recipient",
                        to="myapp.user",
                    ),
                ),
                (
                    "sender",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="sender",
                        to="myapp.user",
                    ),
                ),
            ],
        ),
        migrations.DeleteModel(
            name="Disponibilidad",
        ),
        migrations.DeleteModel(
            name="HistoralDeCitas",
        ),
        migrations.DeleteModel(
            name="Mensajes",
        ),
        migrations.DeleteModel(
            name="Pago",
        ),
        migrations.DeleteModel(
            name="Profesional",
        ),
        migrations.DeleteModel(
            name="Usuario",
        ),
        migrations.DeleteModel(
            name="Turno",
        ),
        migrations.DeleteModel(
            name="Valoracion",
        ),
    ]
