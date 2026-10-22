from django.db import models
from django.conf import settings

# Create your models here.

class Orders(models.Model):
    STATUS_CHOICES=[
        ('pending','Pending'),
        ('confirmed','Confirmed'),
        ('processing','Processing'),
        ('shipped','Shipped'),
        ('delivered','Delivered'),
        ('cancelled','Cancelled'),
            
    ]
    
    PAYMENT_STATUS_CHOICES=[
        ('pending','Pending'),
        ('paid','Paid'),
        ('failed','Failed'),
        ('refunded','Refunded'),
        
    ]
    
    user=models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='orders'
    )
    
    order_number=models.CharField(max_length=50,unique=True)
    status=models.CharField(max_length=50,choices=STATUS_CHOICES,default='pending')
    
    payment_status=models.CharField(max_length=50,choices=PAYMENT_STATUS_CHOICES,default='pending')
    
    subtotal=models.DecimalField(max_digits=12,decimal_places=2,default=0)
    
    shipping_fee=models.DecimalField(max_digits=12,decimal_places=2,default=0)
    
    discount=models.DecimalField(max_digits=12,decimal_places=2,default=0)
    
    total_amount=models.DecimalField(max_digits=12,decimal_places=2,default=0)
    
    shipping_address_line1=models.CharField(max_length=255)
    shipping_address_line2=models.CharField(max_length=255,blank=True,default='')
    
    shipping_city=models.CharField(max_length=100)
    shipping_state=models.CharField(max_length=100)
    
    shipping_country=models.CharField(max_length=100)
    shipping_postal_code=models.CharField(max_length=20)
    
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.order_number