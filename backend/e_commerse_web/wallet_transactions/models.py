
from django.db import models
from wallets.models import Wallet
from django.core.validators import MinValueValidator


class WalletTransaction(models.Model):

    TRANSACTION_TYPE_CHOICES = [
        ('credit', 'Credit'),
        ('debit', 'Debit'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('success', 'Success'),
        ('failed', 'Failed'),
        ('reversed', 'Reversed'),
    ]

    wallet = models.ForeignKey(
        # 'wallets.Wallet',
        Wallet,
        on_delete=models.PROTECT,
        related_name='transactions'
    )

    transaction_type = models.CharField(
        max_length=30,
        choices=TRANSACTION_TYPE_CHOICES
    )

    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(0.01)]
    )

    balance_after = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )

    reference_type = models.CharField(
        max_length=50,
        blank=True,
        default=''
    )

    reference_id = models.PositiveBigIntegerField(
        null=True,
        blank=True
    )

    description = models.CharField(
        max_length=255,
        blank=True,
        default=''
    )

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default='pending'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return (
            f"{self.wallet.user.username} - "
            f"{self.transaction_type} - {self.amount}"
        )