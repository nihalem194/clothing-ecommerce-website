from django.db import models
from users.models import User
from products.models import Products
from cart.models import Cart
from product_variants.models import ProductVariant
# Create your models here.

class CartItem(models.Model):
    cart=models.ForeignKey(Cart,on_delete=models.CASCADE,related_name='items')
    
    product=models.ForeignKey(
        Products,
        on_delete=models.CASCADE,
        related_name='cart_items'
    )
    
    variant=models.ForeignKey(
        ProductVariant,
        on_delete=models.PROTECT,
        related_name='cart_items'
    )
    
    quantity = models.PositiveIntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return(
            f"{self.product.name}- "
            f"{self.variant.size}-"
            f"{self.variant.color}"
        )