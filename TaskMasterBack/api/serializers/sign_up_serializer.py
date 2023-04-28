from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from ..models import User
class UserSignUpSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    password = serializers.CharField()

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        user = User.objects.create(**validated_data)
        return user

    '''
    {
"username": "qwerty",
"email": "qwert",
"first_name": "qwerty",
"last_name": "qwerty",
"password": "qwerty"
}
    '''