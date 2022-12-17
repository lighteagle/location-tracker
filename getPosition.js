// Map initialization
    var CENTER_MAP = [-6.2472854, 106.8532497]
    var DEFAULT_ZOOM = 1

    var map = L.map('map').setView(CENTER_MAP, DEFAULT_ZOOM);

// OSM Layer
    var URL_OSM = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

    var osm = L.tileLayer(URL_OSM)
    osm.addTo(map)

    var line = []
    var marker, circle, polyline
    
    if(!navigator.geolocation){
        console.log("Your Browser doesn't support this geolocation feature")
    }else{
        
        setInterval(()=>{
            navigator.geolocation.getCurrentPosition(getPosition)
        },1000)
    }
    


function getPosition(position) {
    
    var {coords} = position
    var {latitude, longitude, accuracy} = coords
    
    var message = `Lat : ${latitude} | Long: ${longitude} | Accuracy : ${accuracy}`
    console.log(message, line)

    var new_center = new L.LatLng(latitude, longitude)
    line.push([latitude, longitude])

    marker && map.removeLayer(marker) 
    circle && map.removeLayer(circle) 
    if(line.length >= 2) polyline && map.removeLayer(polyline) 


    marker = L.marker(new_center)
    circle = L.circle(new_center, {radius: accuracy})    
    if(line.length >= 2)  polyline = L.polyline(line, {color: 'red'});


    if(line.length >= 2) {
        var new_feature_group = [marker,circle,polyline]
    }else{
        var new_feature_group = [marker,circle]
    }

    var featureGroup = L.featureGroup(new_feature_group).addTo(map)

    map.fitBounds(featureGroup.getBounds())
}