from django.db import models
from products.models import Products

# Create your models here.

class ProductImages(models.Model):
    product=models.ForeignKey(Products,on_delete=models.CASCADE,related_name='productimage')
    image=models.ImageField(upload_to='productimage/')
    alt_text=models.CharField(max_length=255)
    is_primary=models.BooleanField()
    create_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.product.name}image"