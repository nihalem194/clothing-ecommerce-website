# django builtin token generator methods
from django.contrib.auth.tokens import PasswordResetTokenGenerator


class EmailVerificationTokenGenerator(PasswordResetTokenGenerator):
    pass

token_generator=EmailVerificationTokenGenerator()