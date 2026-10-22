from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
# Create your models here.

class User(AbstractUser):
    
    email=models.EmailField(unique=True)
    
    ROLE_CHOICES=(
        ('customer','Customer'),
        ('admin','Admin'),
        
    )
    
    role=models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='customer',
    )
    
    phone=models.CharField(max_length=15,blank=True)
    
    # is_active=models.BooleanField()
    # is_staff=models.BooleanField()
    
    create_at=models.DateTimeField(auto_now_add=True)
    update_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.username
    
    

    
    
class EmailOTP(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="email_otp"
    )
    
    otp_hash = models.CharField(max_length=128)
    expires_at = models.DateTimeField()
    attempts = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"OTP for {self.user.email}"

    
    
    
    