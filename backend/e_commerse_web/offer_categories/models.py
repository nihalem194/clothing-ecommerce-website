
from django.db import models
from offers.models import Offer
from categories.models import Category

class OfferCategory(models.Model):

    offer = models.ForeignKey(
        # 'offers.Offer',
        Offer,
        on_delete=models.CASCADE,
        related_name='offer_categories'
    )

    category = models.ForeignKey(
        # 'categories.Category',
        Category,
        on_delete=models.CASCADE,
        related_name='category_offers'
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['offer', 'category'],
                name='unique_category_per_offer'
            )
        ]

    def __str__(self):
        return f"{self.offer.name} - {self.category.name}"