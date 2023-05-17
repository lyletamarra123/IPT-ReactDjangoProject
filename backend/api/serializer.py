from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Student

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['first_name'] = user.first_name
        # ...
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(max_length=30, required=True)
    last_name = serializers.CharField(max_length=30, required=True)
    college = serializers.CharField(max_length=100, required=True)
    degree_program = serializers.CharField(max_length=100, required=True)
    year_level = serializers.IntegerField(required=True)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'college', 'degree_program', 'year_level', 'password', 'password2' )

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        college = validated_data.pop('college')
        degree_program = validated_data.pop('degree_program')
        year_level = validated_data.pop('year_level')
        user = User.objects.create(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        student = Student.objects.create(
            user=user,
            college=college,
            degree_program=degree_program,
            year_level=year_level
        )

        user.set_password(validated_data['password'])
        user.save()

        return student

from .models import College, Subject, StudentEnrollment      
class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model =  College
        fields = '__all__'

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Subject
        fields = '__all__'


class StudentEnrollmentSerializer(serializers.ModelSerializer):
    student_username = serializers.CharField(source='student.user.username')

    class Meta:
        model = StudentEnrollment
        fields = ['id', 'enrollment_date', 'student', 'student_username', 'subjects']
