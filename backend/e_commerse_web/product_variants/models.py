from django.db import models
from products.models import Products

# Create your models here.

class ProductVariant(models.Model):
    SIZE_CHOICES=(
        ('XS', 'Extra Small'),
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', 'Extra Large'),
        ('XXL', 'Double Extra Large'),
        ('FREE', 'Free Size'),
    )
    product=models.ForeignKey(Products,on_delete=models.CASCADE,related_name='productvariant')
    sku=models.CharField(max_length=100,unique=True)
    
    size=models.CharField(
        max_length=10,
        choices=SIZE_CHOICES
    )
    
    color=models.CharField(
        max_length=50
    )
    
    price=models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )
    
    stock=models.PositiveIntegerField(default=0)
    is_active=models.BooleanField(default=True)
    create_at=models.DateTimeField(
        auto_now_add=True
    )
    
    update_at=models.DateTimeField(
        auto_now=True
    )
    
    def __str__(self):
        return f"{self.product.name} - {self.size} - {self.color}"