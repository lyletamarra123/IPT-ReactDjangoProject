# Generated by Django 4.2.1 on 2023-05-13 05:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='College',
            fields=[
                ('title', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('description', models.CharField(max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('offerCode', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('course_number', models.CharField(max_length=1000)),
                ('title', models.CharField(max_length=100)),
                ('units', models.IntegerField()),
                ('college_title', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.college')),
            ],
        ),
        migrations.AddConstraint(
            model_name='college',
            constraint=models.UniqueConstraint(fields=('title',), name='unique_college_title'),
        ),
    ]
