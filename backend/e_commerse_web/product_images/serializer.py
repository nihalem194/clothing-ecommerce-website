from rest_framework import serializers
from .models import ProductImages


class ProductImageSrializers(serializers.ModelSerializer):
    class Meta:
        model=ProductImages
        fields='__all__'