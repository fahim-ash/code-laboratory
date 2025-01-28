from django.contrib.auth.models import AnonymousUser
from django.http import JsonResponse
from django.urls import resolve
from django.utils.deprecation import MiddlewareMixin
from rest_framework.authentication import BaseAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication


class MiddlewareAuthentication(BaseAuthentication):
    def authenticate(self, request):
        user = getattr(request._request, "user", None)  # `_request` refers to the original WSGIRequest
        if user and not isinstance(user, AnonymousUser):
            return (user, None)  # Return the user and no authentication token
        return None


class JWTMiddleware(MiddlewareMixin):
    def process_request(self, request):
        request.user = AnonymousUser()
        resolver_match = resolve(request.path)
        view_name = resolver_match.view_name
        excluded_views = ["login", "register"]
        if view_name in excluded_views:
            return None

        access_token = request.COOKIES.get("jwt")
        if not access_token:
            return JsonResponse({"success": False, "message": "Authentication token not provided."}, status=401)

        try:
            auth = JWTAuthentication()
            validated_token = auth.get_validated_token(access_token)
            user = auth.get_user(validated_token)
            if user:
                request.user = user
        except Exception as e:
            return JsonResponse({"success": False, "message": "Invalid or expired token."}, status=401)

    def process_response(self, request, response):
        access_token = None
        if hasattr(response, 'data') and isinstance(response.data, dict):
            access_token = response.data.get('access')

        if access_token:
            try:
                response.set_cookie(
                    key='jwt',
                    value=access_token,
                    httponly=True,
                    secure=True,
                    samesite='None',
                    path='/',
                )

            except Exception as e:
                print("Authentication Error:", e)

        return response
