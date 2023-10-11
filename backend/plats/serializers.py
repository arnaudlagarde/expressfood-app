from rest_framework import serializers
from .models import Plats  # Importez le modèle Plats depuis le bon emplacement


class PlatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plats
        fields = '__all__'


class CSRFTokenSerializer(serializers.Serializer):
    csrf_token = serializers.CharField()
