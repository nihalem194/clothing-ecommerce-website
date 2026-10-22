
from django.db import models
from django.core.validators import MinValueValidator


class Coupon(models.Model):

    DISCOUNT_TYPE_CHOICES = [
        ('percentage', 'Percentage'),
        ('fixed', 'Fixed Amount'),
    ]

    code = models.CharField(
        max_length=50,
        unique=True
    )

    description = models.TextField(blank=True)

    discount_type = models.CharField(
        max_length=30,
        choices=DISCOUNT_TYPE_CHOICES
    )

    discount_value = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(0.01)]
    )

    minimum_order_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0)]
    )

    maximum_discount_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)]
    )

    usage_limit = models.PositiveIntegerField(
        null=True,
        blank=True
    )

    per_user_limit = models.PositiveIntegerField(default=1)

    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.code