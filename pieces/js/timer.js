// Javascript starts
countdown4 = 259200;

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

// Converting date difference from seconds to actual time


function convert_to_time(secs) {
    secs = parseInt(secs);
    hh = secs / 3600;
    hh = parseInt(hh);
    mmt = secs - (hh * 3600);
    mm = mmt / 60;
    mm = parseInt(mm);
    ss = mmt - (mm * 60);

    if (hh > 23) {
        dd = hh / 24;
        dd = parseInt(dd);
        hh = hh - (dd * 24);
    } else {
        dd = 0;
    }

    if (ss < 10) {
        ss = "0" + ss;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    if (hh < 10) {
        hh = "0" + hh;
    }
    if (dd == 0) {
        return ("<div class='timer-item'><div class='timer-value'>"
                + hh +
                "</div><div class='timer-title'>часов</div></div><div class='timer-item'><div class='timer-value'>"
                + mm +
                "</div><div class='timer-title'>минут</div></div><div class='timer-item'><div class='timer-value'>"
                + ss +
                "</div><div class='timer-title'>секунд</div></div>");
    }
    else {
        if (dd > 1) {
            return ("<div class='timer-item'><div class='timer-value'>"
                    + dd +
                    "</div><div class='timer-title'>дней</div></div><div class='timer-item'><div class='timer-value'>"
                    + hh +
                    "</div><div class='timer-title'>часов</div></div><div class='timer-item'><div class='timer-value'>"
                    + mm +
                    "</div><div class='timer-title'>минут</div></div><div class='timer-item'><div class='timer-value'>"
                    + ss +
                    "</div><div class='timer-title'>секунд</div></div>");
        }
        else {
            return (dd + " day " + hh + ":" + mm + ":" + ss);
        }
    }
}
if(getCookie('countdown')){
    countdown4 = getCookie('countdown');
};

// Our function that will do the actual countdown
do_cd4 = function() {
    if (countdown4 < 0) {

        // change text
        document.getElementById('cd4').innerHTML = "началось";

    }
    else {
        document.getElementById('cd4').innerHTML = convert_to_time(countdown4);
        setTimeout('do_cd4()', 1000);
    }
    setCookie('countdown', countdown4, 3);
    countdown4 = countdown4 - 1;
}

document.write("<div id='cd4'></div>\n");
do_cd4();