from django.db import models
from users.models import User

# Create your models here.

class Category(models.Model):
    name=models.CharField(max_length=200,unique=True)
    slug=models.CharField(max_length=200,blank=True)
    discription=models.TextField()
    image=models.ImageField(upload_to='categories/',blank=True,null=True)
    is_active=models.BooleanField()
    create_at=models.DateTimeField(auto_now_add=True)
    update_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name