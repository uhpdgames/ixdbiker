var config = {
    map: {
        maker: window.location.origin + "/img/taxi.png",
        type: "hybrid",
        key: "AIzaSyB3W5D8BP4I2KLTbTlHaFndHve9RV7A-4k",
        width: 500,
        height: 500,
        speed: 0,
        zoom: 17,
        maxZoom: 18,
        minZoom: 13,
        lat: 0,
        long: 0,
        accuracy: 0,
        timeout: 5000,
        timereset: 100,
    },
    meter: {
        width: 500,
        height: 500,
        maxseed: 150,
        rpm: .1,
        gear: "N",
    }
}

function toggleFullScreen(elem = 'document.body') {
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }


//        c1.addEventListener("touchstart", toggleFullScreen);
        document.addEventListener("mousedown", toggleFullScreen);

    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        //  c1.removeEventListener("touchstart", toggleFullScreen);
        document.removeEventListener("mousedown", toggleFullScreen);
    }
}

//watch

let id;
let target;
let options;

var marker, circle;

function getPosition(position) {

    updateGEO(position);

    if (typeof map != 'undefined' && typeof L != 'undefined') {
        if (marker) {
            map.removeLayer(marker)
        }

        if (circle) {
            map.removeLayer(circle)
        }

        marker = L.marker([config.map.lat, config.map.long])
        circle = L.circle([config.map.lat, config.map.long], {radius: config.map.accuracy})

        var featureGroup = L.featureGroup([marker, circle]).addTo(map)

        map.fitBounds(featureGroup.getBounds())
    }
}

function updateMAP() {
    function success(pos) {
        const crd = pos.coords;

        if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
            navigator.geolocation.clearWatch(id);
        } else {
            getPosition(pos);

            if (typeof map.setZoom != 'undefined') map.setZoom(config.map.zoom);
        }

    }

    function error(err) {

        mylog(`ERROR(${err.code}): ${err.message}`)
        //console.error();
    }

    target = {
        latitude: 0,
        longitude: 0
    };

    options = {
        zoom: config.map.zoom,
        desiredAccuracy: 1,
        frequency: config.map.timereset,
        enableHighAccuracy: false,
        timeout: config.map.timeout,
        maximumAge: 0
    };

    id = navigator.geolocation.watchPosition(success, error, options);
}

function updateGEO(position) {
    config.map.lat = position.coords.latitude
    config.map.long = position.coords.longitude
    config.map.accuracy = position.coords.accuracy
    config.map.speed = position.coords.speed;
}


function mylog(data = '') {
    var log = document.getElementById('log');
    if (typeof log != 'undefined') {
        log.innerHTML = data;
    }
}
