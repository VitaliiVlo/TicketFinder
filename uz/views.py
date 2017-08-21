from django.http import JsonResponse
from django.shortcuts import render
from django.template.loader import render_to_string
from django.views.decorators.http import require_POST

from .parsing import *
from datetime import datetime


def main(request):
    now = datetime.now()
    date = now.year
    month = now.month
    months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    return render(request, 'main.html', {'date':date,'month':month,'months':months})


def ajax(request):
    from_var = request.POST['from']
    till_var = request.POST['till']
    date_var = request.POST['date']
    data = fun(from_var, till_var, date_var)
    return JsonResponse(data)


@require_POST
def find_station(request):
    title = request.POST['title']
    direction = request.POST['direction']
    stations = search(title)
    if len(stations) == 0:
        return JsonResponse({'html': True})
    else:
        context = {'stations': stations}
        html = ''
        if int(direction) == 1:
            html = render_to_string('dropdown1.html', context)
        elif int(direction) == 2:
            html = render_to_string('dropdown2.html', context)
        return JsonResponse({'html': html})
