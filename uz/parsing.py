import requests

url = 'http://booking.uz.gov.ua/'


def fun(station_from, station_till, date_dep):
    full_url = url + 'purchase/search/'

    station_id_from = get_station_id(station_from)
    station_id_till = get_station_id(station_till)

    conditions = {'station_id_from': station_id_from,
                  'station_id_till': station_id_till,
                  'station_from': station_from,
                  'station_till': station_till,
                  'date_dep': date_dep,
                  'time_dep': '00:00',
                  'time_dep_till': '',
                  'another_ec': '0',
                  'search': ''}

    if station_id_from is not False and station_id_till is not False:
        r = requests.post(full_url, data=conditions)
        return r.json()
    else:
        return {'error':True,'value':'no arguments were passed to the script'}


def get_station_id(station):
    params = {'term': station}
    r = requests.get(url + 'purchase/station/', params=params)
    try:
        json = r.json()[0]
    except IndexError:
        return False
    if str(json['title']).lower() == station.lower():
        return str(json['value'])
    else:
        return False


def search(station):
    params = {'term': station}
    r = requests.get(url + 'purchase/station/', params=params)
    return r.json()
