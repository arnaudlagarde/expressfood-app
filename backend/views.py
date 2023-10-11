from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Plats, Commandes, Clients  # Importez les modèles Plats et Commandes
from .serializers import PlatSerializer
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny  # Importez AllowAny


class Connexion(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        client = Clients.objects.get(user__username=username)
        if client is not None and authenticate(request, username=username, password=password):
            login(request, client.user)
            return Response({'message': 'Connecté avec succès'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Identifiants incorrects'}, status=status.HTTP_401_UNAUTHORIZED)


class Inscription(APIView):
    permission_classes = [AllowAny] 
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        first_name = request.data.get('firstName')
        last_name = request.data.get('lastName')
        email = request.data.get('email')
        phone = request.data.get('phone')
        address = request.data.get('address')
        distance = request.data.get('distance')
        
        # Créez un nouvel utilisateur avec le modèle User
        user = User.objects.create(username=username, password=password)
        user.save()
        
        # Créez un nouveau client avec le modèle Clients
        client = Clients(
            user=user,
            firstName=first_name,
            lastName=last_name,
            email=email,
            phone=phone,
            address=address,
            distance=distance,
            password=password
        )
        client.save()
        
        # Connexion de l'utilisateur nouvellement inscrit
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
