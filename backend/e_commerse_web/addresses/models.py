from django.db import models
from users.models import User

# Create your models here.

class Address(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='Address')
    full_name=models.CharField(max_length=200)
    address_line1=models.CharField(max_length=255)
    address_line2=models.CharField(max_length=255,blank=True,null=True)
    city=models.CharField(max_length=100)
    state=models.CharField(max_length=100)
    postal_code=models.CharField(max_length=20)
    country=models.CharField(max_length=100)
    is_default=models.BooleanField(default=False)
    create_at=models.DateTimeField(auto_now_add=True)
    update_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return  f"{self.city}-{self.full_name}"
    