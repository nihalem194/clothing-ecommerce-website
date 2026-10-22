from django.db import models
from django.conf import settings
from products.models import Products


class Review(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='reviews'
    )

    product = models.ForeignKey(
        # 'products.Product',
        Products,
        on_delete=models.CASCADE,
        related_name='reviews'
    )

    rating = models.PositiveSmallIntegerField()

    comment = models.TextField(blank=True)

    is_approved = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'product'],
                name='unique_review_per_user_product'
            ),
            models.CheckConstraint(
                condition=models.Q(rating__gte=1, rating__lte=5),
                name='review_rating_between_1_and_5'
            ),
        ]

    def __str__(self):
        return f"{self.user} - {self.product} ({self.rating}/5)"