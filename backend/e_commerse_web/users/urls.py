from django.urls import path
from .views import RegisterView,VerifyOTPView,LoginView,UserProfileView,LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView


urlpatterns = [
    # login
    path('api/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/',LoginView.as_view(),name='login'),
    
    # Refresh Token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Register
    path('register/',RegisterView.as_view(),name='register'),
    # path('verify-email/<str:token>/',verifyEmailView.as_view(),name='verify-email'),
    
    # OTP verification
    path("verify-otp/", VerifyOTPView.as_view(), name="verify-otp"),
    
    # protected api
    path('profile/',UserProfileView.as_view(),name='profile'),
    
    # logout 
    path('logout/',LogoutView.as_view(),name='logout'),
]
