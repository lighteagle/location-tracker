// Map initialization
var CENTER_MAP = [-6.2472854, 106.8532497]
var DEFAULT_ZOOM = 1

var map = L.map('map').setView(CENTER_MAP, DEFAULT_ZOOM);

// OSM Layer
var URL_OSM = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

var osm = L.tileLayer(URL_OSM)
osm.addTo(map)


var current_position = {
    latitude: 0,
    longitude: 0,
    accuracy: 0
}
var line = []
var marker, circle, polyline

if (!navigator.geolocation) {
    console.log("Your Browser doesn't support this geolocation feature")
} else {

    navigator.geolocation.getCurrentPosition(getPosition)
    setTimeout(() => init_position(current_position), 1000)

    window.addEventListener('keydown', (e) => {
        var movement = {
            latitude: 0,
            longitude: 0
        }
        switch (e.key) {
            case 'a':
                movement = {
                    latitude: 0,
                    longitude: -0.00001
                }
                break;
            case 'w':
                movement = {
                    latitude: 0.00001,
                    longitude: 0
                }
                break;
            case 'd':
                movement = {
                    latitude: 0,
                    longitude: 0.00001
                }
                break;
            case 's':
                movement = {
                    latitude: -0.00001,
                    longitude: 0
                }
                break;
            default:
                break;
        }
        move(current_position, movement)
    })

}


function getPosition(position) {
    var { coords } = position
    var { latitude, longitude, accuracy } = coords

    current_position = { latitude, longitude, accuracy }
    line.push([latitude, longitude])
}

function init_position(position) {
    var { latitude, longitude, accuracy } = position

    current_position = { latitude, longitude, accuracy }


    var new_center = new L.LatLng(latitude, longitude)

    marker = L.marker(new_center)
    circle = L.circle(new_center, { radius: accuracy })

    var new_feature_group = [marker, circle]

    var featureGroup = L.featureGroup(new_feature_group).addTo(map)

    map.fitBounds(featureGroup.getBounds())
}


function move(position, movement) {
    var { latitude, longitude, accuracy } = position

    current_position = { 
        latitude  : latitude + movement.latitude, 
        longitude : longitude + movement.longitude, 
        accuracy 
    }
    line.push([latitude + movement.latitude, longitude + movement.longitude])


    var new_center = new L.LatLng(latitude + movement.latitude, longitude + movement.longitude)

    marker && map.removeLayer(marker)
    circle && map.removeLayer(circle)
    polyline && map.removeLayer(polyline)

    marker = L.marker(new_center)
    circle = L.circle(new_center, { radius: accuracy })
    polyline = L.polyline(line, { color: 'red' }).addTo(map);

    var new_feature_group = [marker, circle]

    var featureGroup = L.featureGroup(new_feature_group).addTo(map)

    map.fitBounds(featureGroup.getBounds())

}