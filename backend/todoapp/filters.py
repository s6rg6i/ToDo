from django_filters import rest_framework as filters, widgets

from todoapp.models import ToDo


class ToDoFilter(filters.FilterSet):
    date = filters.DateFromToRangeFilter(field_name='created_at', widget=widgets.RangeWidget(attrs={'type': 'date'}))
    project_name = filters.CharFilter(field_name='project__title', lookup_expr='contains')

    class Meta:
        model = ToDo
        fields = []
