from django.contrib import admin

# Register your models here.
from rest_framework_simplejwt import token_blacklist

class OutstandingTokenAdmin(token_blacklist.admin.OutstandingTokenAdmin):

    def has_delete_permission(self, *args, **kwargs):
        return True # or whatever logic you want

admin.site.unregister(token_blacklist.models.OutstandingToken)
admin.site.register(token_blacklist.models.OutstandingToken, OutstandingTokenAdmin)

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from .models import Student

# Define an inline admin descriptor for Employee model
# which acts a bit like a singleton
class EmployeeInline(admin.StackedInline):
    model = Student
    can_delete = False
    verbose_name_plural = 'employee'

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (EmployeeInline,)
    list_display = ( 'username', 'email', 'first_name', 'last_name', 'college', 'degree_program', 'year_level' , 'is_staff')

    def college(self, obj):
        try:
            return obj.student.college
        except Student.DoesNotExist:
            return None

    def degree_program(self, obj):
        try:
            return obj.student.degree_program
        except Student.DoesNotExist:
            return None
        
    def year_level(self, obj):
        try:
            return obj.student.year_level
        except Student.DoesNotExist:
            return None        

    college.short_description = 'College'
    degree_program.short_description = 'Degree Program'
    year_level.short_description = 'Year Level'
# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

# Register the Employee model with its custom admin class
admin.site.register(Student)

from .models import College, Subject
admin.site.register(College)
admin.site.register(Subject)