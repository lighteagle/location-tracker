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

    setInterval(()=>{
        navigator.geolocation.getCurrentPosition(getPosition)
    },100)
}

var marker, circle

function getPosition(position) {
    
    var {coords} = position
    var {latitude, longitude, accuracy} = coords
    
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