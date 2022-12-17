// Map initialization
    var CENTER_MAP = [-6.2472854, 106.8532497]
    var DEFAULT_ZOOM = 1

    var map = L.map('map').setView(CENTER_MAP, DEFAULT_ZOOM);

// OSM Layer
    var URL_OSM = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

    var osm = L.tileLayer(URL_OSM)
    osm.addTo(map)


if(!navigator.geolocation){
    console.log("Your Browser doesn't support this geolocation feature")
}else{
    var start = {
        latitude :0,
        longitude :0,
        accuracy :0
    }
    var line = []

    navigator.geolocation.getCurrentPosition(getPosition)

    setInterval(()=>{
        randomMove(start)
        console.log(start)
    },100)
}

var marker, circle, polyline 

function getPosition(position) {
    
    var {coords} = position
    var {latitude, longitude, accuracy} = coords
       
    start = {latitude,longitude, accuracy}
    line.push([latitude, longitude])
}

function randomMove(position) {
    var {latitude, longitude, accuracy} = position
    latitude = latitude + (Math.random() * 0.0001)
    longitude = longitude + (Math.random() * 0.0001)
    
    start = {latitude, longitude, accuracy}
    line.push([latitude, longitude])


    var new_center = new L.LatLng(latitude, longitude)

    marker && map.removeLayer(marker) 
    circle && map.removeLayer(circle) 
    polyline && map.removeLayer(polyline) 

    marker = L.marker(new_center)
    circle = L.circle(new_center, {radius: accuracy})
    polyline = L.polyline(line, {color: 'red'}).addTo(map);

    var new_feature_group = [marker,circle]

    var featureGroup = L.featureGroup(new_feature_group).addTo(map)

    map.fitBounds(featureGroup.getBounds())
    
}

function xxx(position) {
    var {latitude, longitude, accuracy} = position
    
    var message = `Lat : ${latitude} | Long: ${longitude} | Accuracy : ${accuracy}`
    console.log(message)

    var new_center = new L.LatLng(latitude, longitude)

    marker && map.removeLayer(marker) 
    circle && map.removeLayer(circle) 

    marker = L.marker(new_center)
    circle = L.circle(new_center, {radius: accuracy})

    var new_feature_group = [marker,circle]

    var featureGroup = L.featureGroup(new_feature_group).addTo(map)

    map.fitBounds(featureGroup.getBounds())
}