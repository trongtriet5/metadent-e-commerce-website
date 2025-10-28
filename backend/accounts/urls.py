from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from . import views

urlpatterns = [
    path('login/', csrf_exempt(views.login_view), name='login'),
    path('logout/', csrf_exempt(views.logout_view), name='logout'),
    path('check/', views.check_auth, name='check-auth'),
]

