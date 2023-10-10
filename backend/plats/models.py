from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password # A utiliser pour hacher le mot de passe

# Create your models here.

class Clients(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)  # Champ pour le numéro de téléphone
    address = models.CharField(max_length=255)  # Champ pour l'adresse
    distance = models.DecimalField(max_digits=10, decimal_places=2)  # Champ pour la distance
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.user.username


class Livreurs(models.Model):
    nom = models.CharField(max_length=255)
    STATUT_CHOICES = (
        ('libre', 'Libre'),
        ('en_cours_de_livraison', 'En cours de livraison'),
    )
    statut = models.CharField(max_length=50, choices=STATUT_CHOICES, default='libre')
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    

class Plats(models.Model):
    nom = models.CharField(max_length=255)
    TYPE_CHOICES = (
        ('plat', 'Plat'),
        ('dessert', 'Dessert'),
    )
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    description = models.TextField()
    prix = models.DecimalField(max_digits=10, decimal_places=2)


class Commandes(models.Model):
    client = models.ForeignKey(Clients, on_delete=models.CASCADE)
    plats = models.ManyToManyField(Plats)
    dateCommande = models.DateTimeField()
    statut = models.CharField(max_length=255)
    livreur = models.ForeignKey(Livreurs, on_delete=models.CASCADE, null=True, blank=True)  # Laissez null=True et blank=True pour les commandes non assignées
    numeroCommande = models.CharField(max_length=10, unique=True)  # Champ pour le numéro de commande

