from django.db import models
from users.models import User
from products.models import Products
from product_variants.models import ProductVariant
# Create your models here.

class Cart(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name='cart')
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username}'s cart"
    
