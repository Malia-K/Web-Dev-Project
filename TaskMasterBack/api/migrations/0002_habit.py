# Generated by Django 4.1.7 on 2023-05-04 19:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Habit",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("description", models.TextField(default="")),
                ("isDone", models.BooleanField(default=False)),
                ("likes", models.FloatField(default=0)),
            ],
        ),
    ]
