
from django.db import models
from django.conf import settings
from users.models import User
from django.core.validators import MinValueValidator


class Wallet(models.Model):

    user = models.OneToOneField(
        # settings.AUTH_USER_MODEL,
        User,
        on_delete=models.PROTECT,
        related_name='wallet'
    )

    balance = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Wallet"