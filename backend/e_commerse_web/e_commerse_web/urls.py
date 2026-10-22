"""
URL configuration for e_commerse_web project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)



urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/v1/auth/',include('users.urls')),
    path('api/v1/products/',include('products.urls')),
    path('api/v1/',include('categories.urls')),
    path('api/v1/',include('cart.urls')),
    path('api/v1/',include('orders.urls')),
    path('api/v1/',include('wishlist.urls')),
    path('api/v1/',include('payments.urls')),
    path('api/v1/',include('reviews.urls')),
    path('api/v1/',include('addresses.urls')),
    path('api/v1/',include('cart_items.urls')),
    path('api/v1/',include('coupen_usages.urls')),
    path('api/v1/',include('coupens.urls')),
    path('api/v1/',include('offers.urls')),
    path('api/v1/',include('offer_categories.urls')),
    path('api/v1/',include('offer_products.urls')),
    path('api/v1/',include('order_items.urls')),
    path('api/v1/',include('product_images.urls')),
    path('api/v1/',include('product_variants.urls')),
    path('api/v1/',include('wallets.urls')),
    path('api/v1/',include('wallet_transactions.urls')),
    path('api/v1/',include('wishlist_items.urls')),
    
    
    path(
            'api/schema/',
            SpectacularAPIView.as_view(),
            name='schema',
        ),
    
    path(
            'api/docs/',
            SpectacularSwaggerView.as_view(
                url_name='schema'
            ),
            name='swagger-ui',
        ),


    

]


