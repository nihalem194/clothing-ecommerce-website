
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework import generics

from products.models import Products
from products.serializer import ProductSerializer


# 1. Product list + create
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Products.objects.filter(is_active=True)
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdminUser()]
        return [AllowAny()]


# 2. Product detail + update + delete
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAdminUser()]
        return [AllowAny()]
