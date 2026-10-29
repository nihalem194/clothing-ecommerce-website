from django.contrib import admin
from .models import Products
from product_images.admin import ProductImagesInline
# Register your models here.

admin.site.register(Products)

class ProductsAdmin(admin.ModelAdmin):
    inlines = [ProductImagesInline]

