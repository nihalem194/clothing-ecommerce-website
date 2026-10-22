
from django.db import models
from orders.models import Orders


class Payment(models.Model):

    PAYMENT_METHOD_CHOICES = [
        ('cod', 'Cash on Delivery'),
        ('upi', 'UPI'),
        ('card', 'Credit/Debit Card'),
        ('net_banking', 'Net Banking'),
        ('wallet', 'Wallet'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('success', 'Success'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]

    order = models.OneToOneField(
        # 'orders.Orders',
        Orders,
        on_delete=models.PROTECT,
        related_name='payment'
    )

    transaction_id = models.CharField(
        max_length=255,
        unique=True,
        null=True,
        blank=True
    )

    payment_method = models.CharField(
        max_length=50,
        choices=PAYMENT_METHOD_CHOICES
    )

    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default='pending'
    )

    paid_at = models.DateTimeField(
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Payment for Order {self.order} - {self.status}"