from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE


class Clients(models.Model):
    user = models.OneToOneField(User, on_delete=CASCADE)
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    address = models.CharField(max_length=255)
    distance = models.DecimalField(max_digits=10, decimal_places=2)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.user.username


class Livreurs(models.Model):
    nom = models.CharField(max_length=255)
    STATUT_CHOICES = (
        ('libre', 'Libre'),
        ('en_cours_de_livraison', 'En cours de livraison'),
    )
    statut = models.CharField(
        max_length=50, choices=STATUT_CHOICES, default='libre')
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
    image = models.ImageField(upload_to='plats_images/', blank=True, null=True)

    def __str__(self):
        return self.nom


class Commandes(models.Model):
    client = models.ForeignKey(Clients, on_delete=CASCADE)
    plats = models.ManyToManyField(Plats)
    dateCommande = models.DateTimeField()
    statut = models.CharField(max_length=255)
    livreur = models.ForeignKey(
        Livreurs, on_delete=CASCADE, null=True, blank=True)
    numeroCommande = models.CharField(max_length=10, unique=True)
