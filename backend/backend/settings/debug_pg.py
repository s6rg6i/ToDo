from .debug import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'todo',
        'USER': 'user1',
        'PASSWORD': '1',
        'HOST': '127.0.0.1',
        'PORT': '54328',
    }
}

