
from django.db import models
from django.core.validators import MinValueValidator


class Offer(models.Model):

    OFFER_TYPE_CHOICES = [
        ('product', 'Product Offer'),
        ('category', 'Category Offer'),
        ('festival', 'Festival Offer'),
        ('sitewide', 'Site-wide Offer'),
    ]

    DISCOUNT_TYPE_CHOICES = [
        ('percentage', 'Percentage'),
        ('fixed', 'Fixed Amount'),
    ]

    name = models.CharField(max_length=150)

    description = models.TextField(blank=True)

    offer_type = models.CharField(
        max_length=30,
        choices=OFFER_TYPE_CHOICES
    )

    discount_type = models.CharField(
        max_length=30,
        choices=DISCOUNT_TYPE_CHOICES
    )

    discount_value = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(0.01)]
    )

    start_date = models.DateTimeField()

    end_date = models.DateTimeField()

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name