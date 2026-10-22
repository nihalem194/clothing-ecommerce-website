
from django.db import models
from django.conf import settings
from coupens.models import Coupon
from orders.models import Orders


class CouponUsage(models.Model):

    coupon = models.ForeignKey(
        # 'coupons.Coupon',
        Coupon,
        on_delete=models.PROTECT,
        related_name='usages'
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='coupon_usages'
    )

    order = models.ForeignKey(
        # 'orders.Order',
        Orders,
        on_delete=models.PROTECT,
        related_name='coupon_usages'
    )

    discount_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    used_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['coupon', 'order'],
                name='unique_coupon_per_order'
            )
        ]

    def __str__(self):
        return f"{self.coupon.code} - {self.order}"