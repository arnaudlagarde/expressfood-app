# Generated by Django 4.1.12 on 2023-10-11 18:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("backend", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="clients",
            options={"verbose_name_plural": "Clients"},
        ),
        migrations.AlterModelOptions(
            name="commandes",
            options={"verbose_name_plural": "Commandes"},
        ),
        migrations.AlterModelOptions(
            name="livreurs",
            options={"verbose_name_plural": "Livreurs"},
        ),
        migrations.AlterModelOptions(
            name="plats",
            options={"verbose_name_plural": "Plats"},
        ),
    ]
