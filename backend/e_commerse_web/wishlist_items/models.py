from django.db import models
from users.models import User
from wishlist.models import Wishlist
from products.models import Products
# Create your models here.

class WishlistItems(models.Model):
    wishlist=models.ForeignKey(Wishlist,on_delete=models.CASCADE,related_name='items')
    product=models.ForeignKey(Products,on_delete=models.CASCADE,related_name='wishlistitems')
    created_at=models.DateTimeField(auto_now_add=True)
    
    # class Meta:
    #     constraints=[
    #         models.UniqueConstraint(
    #             fields=['wishlist','product'],
    #             name='unique_product_per_wishlist'
    #         )
    #     ]
    
        
    def __str__(self):
        return f"{self.product.name} in wishlist"