from django.db import models
from users.models import User
from categories.models import Category

# Create your models here.

class Products(models.Model):
    category=models.ForeignKey(Category,on_delete=models.CASCADE,related_name='products')
    name=models.CharField(max_length=255)
    slug=models.SlugField(max_length=260,unique=True)
    description=models.TextField()
    brand=models.CharField(max_length=250)
    is_active=models.BooleanField(default=True)
    create_at=models.DateTimeField(auto_now_add=True)
    update_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name