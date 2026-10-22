
from django.db import models
from offers.models import Offer
from products.models import Products


class OfferProduct(models.Model):

    offer = models.ForeignKey(
        # 'offers.Offer',
        Offer,
        on_delete=models.CASCADE,
        related_name='offer_products'
    )

    product = models.ForeignKey(
        # 'products.Product',
        Products,
        on_delete=models.CASCADE,
        related_name='product_offers'
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['offer', 'product'],
                name='unique_product_per_offer'
            )
        ]

    def __str__(self):
        return f"{self.offer.name} - {self.product.name}"