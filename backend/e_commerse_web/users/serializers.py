from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

# for login
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


User=get_user_model()


# signup //////

class RegisterSerializer(serializers.ModelSerializer):
    
    password=serializers.CharField(
        write_only=True,
        validators=[validate_password]
    )
    
    confirm_password=serializers.CharField(
        write_only=True,
    )
    
    class Meta:
        model=User
        fields=[
            'id','username','email','password','confirm_password'
        ]
    
    read_only_fields=['id']
    
    def validate_email(self,value):
        value=value.strip().lower()
        
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                'An account with this email already exists.'
            )
            
        return value
    
    def validate(self,data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({
                'confirm_password':'password do not match.'
            })
            
        return data
    
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        validated_data['role']='customer'  
        validated_data['is_active']=False  
        
        return User.objects.create_user(**validated_data)        
    


# login ///////
class LoginSerializer(TokenObtainPairSerializer):
    username_field=User.EMAIL_FIELD