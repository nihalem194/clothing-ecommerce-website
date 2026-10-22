from rest_framework import serializers
from .models import ProductVariant



class ProductVarientSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProductVariant
        fields='__all__'