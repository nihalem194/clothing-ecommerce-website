from django.db import models
from users.models import User

# Create your models here.

class Wishlist(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='wishlist')
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.user.username