var csrfmiddlewaretoken = $("input[name=csrfmiddlewaretoken]").val();
var empty = '<li class="disabled"><a>Нічого не знайдено</a></li>';

function parse() {
    var from = $("#from").val();
    var till = $("#till").val();
    var day = $("#day").val();
    var month = $("#month").val();
    var year = $("#year").val();
    var date = day + '.' + month + '.' + year;
    $.ajax({
        url: '/ajax/',
        type: 'post',
        data: {
            csrfmiddlewaretoken: csrfmiddlewaretoken,
            from: from,
            till: till,
            date: date
        },
        success: function (data) {
            var p = $("#p");
            if (data.error === true) {
                if (data.value === 'По заданому Вами напрямку місць немає') {
                    p.text(data.value);
                    p.css('background-color', 'orange');
                }
                else {
                    p.text("Помилка. Неправильно введені дані");
                    p.css('background-color', 'red');
                }
            }
            else {
                p.text('Знайдено!!!');
                p.css('background-color', 'green');
                var a = window.open("http://booking.uz.gov.ua/", "_blank", "");
                a.blur();
                stop();
            }

            var times = $("#times");
            times.text(Number(times.text()) + 1);

        }
    });
}

var timer;

function start_timer() {
    var select = $("#select").val();
    var button = $("#start");
    button.attr('onclick', 'stop()');
    button.text('Зупинити');
    parse();
    timer = setInterval(parse, select * 1000);
}

function stop() {
    clearInterval(timer);
    var button = $("#start");
    button.attr('onclick', 'start_timer()');
    button.text('Почати');
}

function find_station1() {
    var input = $("#from");
    var station = input.val();

    $.ajax({
        url: '/ajax/find/',
        type: 'post',
        data: {
            csrfmiddlewaretoken: csrfmiddlewaretoken,
            title: station,
            direction: 1
        },
        success: function (data) {
            if (data.html === true) {
                $("#menu1").html(empty);
            } else {
                $("#menu1").html(data.html);
                input.dropdown();
            }
        }
    })
}

function find_station2() {
    var input = $("#till");
    var station = input.val();

    $.ajax({
        url: '/ajax/find/',
        type: 'post',
        data: {
            csrfmiddlewaretoken: csrfmiddlewaretoken,
            title: station,
            direction: 2
        },
        success: function (data) {
            if (data.html === true) {
                $("#menu2").html(empty);
            } else {
                $("#menu2").html(data.html);
                input.dropdown();
            }
        }
    })
}

function choose1(title) {
    var input;

    input = $("#from");
    input.val(title);
    input.dropdown('toggle');
}

function choose2(title) {
    var input;

    input = $("#till");
    input.val(title);
    input.dropdown('toggle');
}