from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Plats, Commandes  # Importez les modèles Plats et Commandes
from .serializers import PlatSerializer
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User


class Connexion(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': 'Connecté avec succès'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Identifiants incorrects'}, status=status.HTTP_401_UNAUTHORIZED)


class Inscription(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.create_user(username, password=password)
        login(request, user)
        return Response({'message': 'Inscrit et connecté avec succès'}, status=status.HTTP_201_CREATED)


class ListePlats(APIView):
    def get(self, request):
        # Récupérer tous les plats du jour depuis la base de données
        plats = Plats.objects.all()
        serializer = PlatSerializer(plats, many=True)
        return Response(serializer.data)


class PasserCommande(APIView):
    def post(self, request):
        # Exemple de logique pour passer une commande
        # Supposons que vous avez une relation client-utilisateur
        client = request.user.clients
        plats = [...]  # Récupérez les plats commandés depuis la requête
        date_commande = [...]  # Obtenez la date de la commande
        statut = "En attente"  # Par défaut, la commande est en attente
        livreur = None  # Pas de livreur assigné pour l'instant
        numero_commande = "XYZ123"  # Générez un numéro de commande unique

        # Créez une nouvelle commande
        commande = Commandes(
            client=client,
            dateCommande=date_commande,
            statut=statut,
            numeroCommande=numero_commande
        )
        commande.save()

        # Associez les plats à la commande (vous devrez boucler sur les plats commandés)
        commande.plats.set(plats)

        # Exemple de réponse
        response_data = {
            "message": "Commande passée avec succès."
        }
        return Response(response_data)


class SuiviCommande(APIView):
    def get(self, request):
        # Afficher la page de suivi de commande
        # Vous devrez récupérer les informations de commande pour le client actuel

        # Exemple de réponse
        response_data = {
            "message": "Page de suivi de commande"
        }
        return JsonResponse(response_data)

# Ajoutez d'autres vues et fonctionnalités en fonction de vos besoins
