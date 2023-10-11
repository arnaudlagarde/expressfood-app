from django.contrib import admin
from .models import Clients, Livreurs, Plats, Commandes


@admin.register(Clients)
class ClientsAdmin(admin.ModelAdmin):
    list_display = ('id', 'firstName', 'lastName', 'email',
                    'phone', 'address', 'distance')


@admin.register(Livreurs)
class LivreursAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom', 'statut', 'latitude', 'longitude')


@admin.register(Plats)
class PlatsAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom', 'type', 'description', 'prix', 'image')


@admin.register(Commandes)
class CommandesAdmin(admin.ModelAdmin):
    list_display = ('id', 'client_info', 'dateCommande',
                    'statut', 'livreur', 'numeroCommande')

    def client_info(self, obj):
        return f"{obj.client.firstName} {obj.client.lastName}, {obj.client.email}"

    client_info.short_description = 'Client Info'
