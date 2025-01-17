from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed


class JWTMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        access_token = None
        if hasattr(response, 'data') and isinstance(response.data, dict):
            access_token = response.data.get('access')

        if access_token:
            try:
                auth = JWTAuthentication()
                validated_token = auth.get_validated_token(access_token)
                user = auth.get_user(validated_token)

                print("Authenticated User:", user)
                response.set_cookie(
                    key='jwt',
                    value=access_token,
                    httponly=True,
                    secure=True,
                    samesite='None',
                    path='/',
                )

            except (InvalidToken, AuthenticationFailed) as e:
                print("Authentication Error:", e)

        return response
