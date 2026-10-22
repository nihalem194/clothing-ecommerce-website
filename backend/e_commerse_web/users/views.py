from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.views import APIView
from .serializers import RegisterSerializer
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
# Email
from .tokens import token_generator
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse

# otp
from django.utils import timezone
from django.contrib.auth.hashers import make_password,check_password
import secrets
from datetime import timedelta
from .models import EmailOTP
# login
from rest_framework_simplejwt.views import TokenObtainPairView 
from .serializers import LoginSerializer

# logout
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError


# Create your views here.

User=get_user_model()

# class verifyEmailView(APIView):
#     permission_classes=[AllowAny]
#     authentication_classes=[]
    
#     def get(self,requst,token):
#         users=User.objects.filter(is_active=False)
            
#         for user in users:
#             if token_generator.check_token(user,token):
#                 user.is_active=True
#                 user.save(update_fields=['is_active'])
                
#                 return Response(
#                     {
#                         'message': 'Email verified successfully. you can now log in.'
#                     },
#                     status=status.HTTP_200_OK
#                 )
#         return Response(
#             {
#                 'message': 'invalid or expired verification link'
#             },
#             status=status.HTTP_400_BAD_REQUEST
#         )
    


class RegisterView(generics.CreateAPIView):
    serializer_class=RegisterSerializer
    permission_classes=[AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer=RegisterSerializer(data=request.data)     #  serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user=serializer.save()
        
        # otp connecting to api 
        
        try:
            send_email_otp(user)
        except Exception:
            # Avoid leaving an account active without verification
            user.delete()
            return Response(
                {'detail':'Unable to send verification email. Please try again.'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        return Response(
            {
                'message':'Registration successful, Please check you email for the verification code.',
                'email':user.email
             
            },
            status=status.HTTP_201_CREATED,
            
        )
        
        
        
    
class VerifyOTPView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        email = request.data.get("email", "").strip().lower()
        otp = request.data.get("otp", "").strip()

        if not email or not otp:
            return Response(
                {"detail": "Email and OTP are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if len(otp) != 6 or not otp.isdigit():
            return Response(
                {"detail": "Enter a valid 6-digit OTP."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = User.objects.get(email__iexact=email)
            otp_record = EmailOTP.objects.get(user=user)
        except (User.DoesNotExist, EmailOTP.DoesNotExist):
            return Response(
                {"detail": "Invalid or expired OTP."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user.is_active:
            return Response(
                {"detail": "Email is already verified."},
                status=status.HTTP_200_OK,
            )

        if otp_record.attempts >= 5:
            return Response(
                {"detail": "Too many attempts. Request a new OTP."},
                status=status.HTTP_429_TOO_MANY_REQUESTS,
            )

        if otp_record.expires_at <= timezone.now():
            otp_record.delete()
            return Response(
                {"detail": "OTP expired. Request a new OTP."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not check_password(otp, otp_record.otp_hash):
            otp_record.attempts += 1
            otp_record.save(update_fields=["attempts"])

            return Response(
                {"detail": "Incorrect OTP."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.is_active = True
        user.save(update_fields=["is_active"])
        otp_record.delete()

        return Response(
            {"message": "Email verified successfully. You can now log in."},
            status=status.HTTP_200_OK,
        )
        
        
        
        
        
        
        
        
        
        
    #    # Generate email verification token ///////////////////////////////////////////////////////////////
    
    #     token=token_generator.make_token(user)
        
    #     # create verification URL
    #     verification_path=reverse(
    #         'verify-email',kwargs={'token':token}
            
    #     )
        
    #     verification_url=request.build_absolute_uri(
    #         verification_path
    #     )
        
    #     # sent verification email
        
    #     send_mail(
    #         subject='verify your Email',
    #         message=(
    #             f"Hello  {user.username},\n\n"
    #             f"please click the link below to verify your email:\n\n"
    #             f'{verification_url}\n\n'
    #             'if you did not create this account, ignore this email.'
    #         ),
    #         from_email=settings.DEFAULT_FROM_EMAIL,
    #         recipient_list=[user.email],
    #         fail_silently=False,
    #     )
        
    #     
        
   
   
   

# OTP CREATION ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

def send_email_otp(user):
    
    # Generate a secure 6-digit OTP
    otp=str(secrets.randbelow(900000)+100000)
    
     # Save hashed OTP with 5-minute expiry
    EmailOTP.objects.update_or_create(
        user=user,
        defaults={
            'otp_hash':make_password(otp),
            'expires_at':timezone.now() + timedelta(minutes=4),
            'attempts':0,
        },
     )
    
    # Send OTP to user's email
    send_mail(
        subject='Verify Your Email',
        message=(
            f'Your email verification code is: {otp}\n\n'
            'This code expires in 4 minuts.\n'
            'If you did not create an account, Please ignore this email.'
        ),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )
    
    
    
    return Response(
        {
            'message':'Registration successful',
            'user':{
                'id':user.id,
                'username':user.username,
                'email':user.email,
            },
            # 'verification_token':token,
                
        },
        status=status.HTTP_201_CREATED,
    )
    
    
# login view

class LoginView(TokenObtainPairView):
    serializer_class=LoginSerializer
    permission_classes=[AllowAny]
    authentication_classes=[]
    
    
    
    
# protected Api

class UserProfileView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        return Response({
            'id':request.user.id,
            'username':request.user.username,
            'email':request.user.email,
            'role':request.user.role,
        })  

    
# logout Api

class LogoutView(APIView):
    permission_classes=[IsAuthenticated]
    
    def post(self,request):
        refresh_token=request.data.get('refresh')
        
        if not refresh_token:
            return Response(
                {'detail':'Refresh token is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            token=RefreshToken(refresh_token)
            token.blacklist()
        except Exception:
            return Response(
                {'detail':'Invalid or expired refresh token.'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        return Response(
            {'message':'Logout successful.'},
            status=status.HTTP_205_RESET_CONTENT
        )