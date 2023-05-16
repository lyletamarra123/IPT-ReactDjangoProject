from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, CollegeSerializer, SubjectSerializer, StudentEnrollmentSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated


from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/test/',
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/colleges/',
        '/api/subjects/',
    ]
    return Response(routes)



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulations {request.user.first_name}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)

from .models import College, Subject,StudentEnrollment
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def getSubjectsAPI(request, offerCode=""):
    if request.method == 'POST':
        data = request.data
        offer_code = data.get('offerCode')
        if Subject.objects.filter(offerCode=offer_code).exists():
            return Response({'error': 'Offer code already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = SubjectSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
        if offerCode:
            subject = Subject.objects.get(offerCode=offerCode)
            serializer = SubjectSerializer(subject)
            return Response(serializer.data, status=200)
        else:
            subject = Subject.objects.all()
            serializer = SubjectSerializer(subject, many=True)
            return Response(serializer.data, status=200)

    elif request.method == 'PUT':
        data = request.data
        subject = Subject.objects.get(offerCode=data['offerCode'])
        serializer = SubjectSerializer(subject, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        subject = Subject.objects.get(offerCode=offerCode)
        subject.delete()
        return Response(status=204)
    

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def getCollegesAPI(request, title=""):
    if request.method == 'POST':
        data = request.data
        serializer = CollegeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    elif request.method == 'GET':
        if title:
            college = College.objects.get(title=title)
            serializer = CollegeSerializer(college)
            return Response(serializer.data, status=200)
        else:
            college = College.objects.all()
            serializer = CollegeSerializer(college, many=True)
            return Response(serializer.data, status=200)

    elif request.method == 'PUT':
        data = request.data
        college = College.objects.get(offerCode=data['offerCode'])
        serializer = CollegeSerializer(college, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        college = College.objects.get(title=title)
        college.delete()
        return Response(status=204)
    
@api_view(['GET', 'POST'])
def enrollment_list(request, student = ""):
    if request.method == 'GET':
        if student:
            enrollment = StudentEnrollment.objects.filter(student=student)
            serializer = StudentEnrollmentSerializer(enrollment, many=True)
            return Response(serializer.data, status=200)
        else:
            enrollment = StudentEnrollment.objects.all()
            serializer = StudentEnrollmentSerializer(enrollment, many=True)
            return Response(serializer.data, status=200)
        
    elif request.method == 'POST':
        data = request.data
        student = request.user.student
        selected_subjects = request.data.get('selectedSubjects', [])

        enrollment = StudentEnrollment.objects.create(student=student)
        enrollment.subjects.set(selected_subjects)

        return Response({'message': 'Enrollment successful'}, status=status.HTTP_201_CREATED)