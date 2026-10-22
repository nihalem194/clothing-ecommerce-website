from rest_framework import serializers
from .models import Products
from product_variants.serializer import ProductVarientSerializer
from product_images.serializer import ProductImageSrializers


class ProductSerializer(serializers.ModelSerializer):
    varients=ProductVarientSerializer(many=True,read_only=True)
    images=ProductImageSrializers(many=True,read_only=True)
    class Meta:
        model=Products
        fields="__all__"
        read_only_fields=['id','create_at','update_at']