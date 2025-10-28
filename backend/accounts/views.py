from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .models import UserProfile
import logging

logger = logging.getLogger(__name__)


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    Login endpoint
    """
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=400)
        
        logger.info(f'Login attempt for user: {username}')
        
        user = authenticate(request=request, username=username, password=password)
        
        if user is None:
            logger.warning(f'Invalid credentials for user: {username}')
            return Response({'error': 'Invalid username or password'}, status=400)
        
        if not user.is_active:
            return Response({'error': 'User account is disabled'}, status=400)
        
        login(request, user)
        
        # Get user profile
        try:
            profile = user.profile
            role = profile.role
        except UserProfile.DoesNotExist:
            role = 'admin' if user.is_superuser else 'user'
            if user.is_superuser:
                UserProfile.objects.get_or_create(user=user, defaults={'role': 'admin'})
        
        logger.info(f'User {username} logged in successfully with role {role}')
        
        return Response({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email if user.email else '',
                'role': role,
            },
            'message': 'Login successful'
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        import traceback
        logger.error(f'Login error: {traceback.format_exc()}')
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def logout_view(request):
    """
    Logout endpoint
    """
    from django.contrib.auth import logout
    logout(request)
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def check_auth(request):
    """
    Check if user is authenticated
    """
    if not request.user.is_authenticated:
        return Response({'authenticated': False}, status=401)
    
    try:
        profile = request.user.profile
        role = profile.role
    except UserProfile.DoesNotExist:
        role = 'user'
    
    return Response({
        'user': {
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
            'role': role,
        },
        'authenticated': True
    }, status=status.HTTP_200_OK)
