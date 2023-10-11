"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views
from .views import Connexion, Inscription
# from .views import Connexion, Inscription, CSRFTokenView

urlpatterns = [
    path("admin/", admin.site.urls),
    # Affiche tous les plats du jour
    path('plats/', views.ListePlats.as_view(), name='liste_plats'),
    path('commande/', views.PasserCommande.as_view(),
         name='passer_commande'),  # Page de commande
    path('suivi-commande/', views.SuiviCommande.as_view(), name='suivi_commande'),
    path('connexion/', Connexion.as_view(), name='connexion'),
    path('inscription/', Inscription.as_view(), name='inscription'),
    # path('get-csrf-token/', CSRFTokenView.as_view(), name='get_csrf_token'),

    # Ajoutez d'autres URL pour les livreurs, etc. si nécessaire
]
