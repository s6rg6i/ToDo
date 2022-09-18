from .base import *

DEBUG = False
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'todo',
        'USER': 'user1',
        'PASSWORD': '1',
        'HOST': 'db',
        'PORT': '5432',
    }
}

