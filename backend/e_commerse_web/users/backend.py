from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q


User = get_user_model()

class LoginBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        identifier = kwargs.get('email') or username
        
        if not identifier or not password:
            return None
        
        identifier = str(identifier).strip()
        try:
            user = User.objects.filter(
                Q(email__iexact=identifier) | Q(username__iexact=identifier)
            ).first()
        except Exception:
            return None
        
        if user and user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None