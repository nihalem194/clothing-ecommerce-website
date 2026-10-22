
from django.db import models
from product_variants.models import ProductVariant
from orders.models import Orders


class OrderItem(models.Model):
    order = models.ForeignKey(
        # 'orders.Orders',
        Orders,
        on_delete=models.CASCADE,
        related_name='items'
    )

    variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.PROTECT,
        related_name='order_items'
    )

    product_name = models.CharField(max_length=255)
    sku = models.CharField(max_length=100)

    quantity = models.PositiveIntegerField()

    unit_price = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    total_price = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product_name} x {self.quantity}"