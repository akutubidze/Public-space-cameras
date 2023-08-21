

var map = L.map('map').setView([40.75101, -73.97603], 13);

let basemap_layers = {
    toner: L.tileLayer("https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }),
    terrain: L.tileLayer("https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
}
basemap_layers.toner.addTo(map)
basemap_layers.terrain.addTo(map)

L.control.layers(basemap_layers).addTo(map)
///L.tileLayer(basemap_urls.toner, {
///maxZoom: 19,
///attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//}).addTo(map);

const num = 100;



const locations = [
    {
        location: [40.7594944319914,
            -73.97336211233576],
        name: '<b>Park Avenue Plaza</b><br>',
        time: "8AM-10PM"

    },
    {
        location: [40.75011226337686, -73.97052940124348],
        name: '<b>The Ford Foundation</b><br>',
        time: "8AM-6PM"
    },
    {
        location: [40.70539375159162, -74.00518636850742],
        name: '<b>Continental Center</b><br>',
        time: "Business hours N/A"
    },
    {
        location: [40.76266478733917, -73.97248206202708],
        name: '<b>The IBM Plaza</b><br>',
        time: "8AM-8PM"
    },
    {
        location: [40.713463027203375, -74.01433866872719],
        name: '<b>Brookfield Place Atrium</b><br>',
        time: "10AM-8PM"
    },
    {
        location: [40.75591680859877, -73.98434481658546],
        name: '<b>One Bryant Park</b><br>',
        time: "Open 24 hours"
    },
    {
        location: [40.763347685976164, -73.98029077370424],
        name: '<b>6 1/2 Avenue</b><br>',
        time: "Business hours N/A"
    },
    {
        location: [40.70650200547602, -74.00809079514653],
        name: '<b>60 Wall Street Plaza</b><br>',
        time: "Open 24 hours"
    },
    {
        location: [40.7715624099589, -73.98230403007832],
        name: '<b>David Rubinstain Atrium</b><br>',
        time: "8AM-10PM"
    },
    {
        location: [40.741723747425254, -73.98922729903411],
        name: '<b>Flatiron Public Plaza</b><br>',
        time: "24Hour(Outdoor)"
    },
    {
        location: [40.735054626067466, -73.99085381979647],
        name: '<b>Union Square</b><br>',
        time: "24Hour(Outdoor)"
    },
    {
        location: [40.730869146882696, -73.99790150199347],
        name: '<b>Washington Square Park</b><br>',
        time: "24Hour(Outdoor)"
    },
    {
        location: [40.720522816222655, -73.99218433131362],
        name: '<b>Sara D. Roosvelt Park</b><br>',
        time: "24Hour(Outdoor)"
    }
]


const subways = axios('https://raw.githubusercontent.com/Willjfield/FOSS-for-WebGIS/main/6-21/site/data/subways.geojson').then(resp => {
    console.log(resp);
    L.geoJSON(resp.data, {
        style: function (feature) {
            switch (feature.properties.rt_symbol) {
                case 'A': case 'C': case 'E': return { color: "blue" };
                case 'B': case 'M': case 'D': return { color: "orange" };
                case 'N': case 'Q': case 'R': case 'W': return { color: "yellow" };
                case '1': case '2': case '3': return { color: "red" };
                case 'J': case 'Z': return { color: "brown" };
                case '4': case '5': case '6': return { color: "green" };
                case '7': return { color: "purple" };
                case 'G': return { color: "lightgreen" };
                case 'S': case 'L': return { color: "gray" };
                default: return { color: "black" };
            }
        }
    }).addTo(map).bringToBack();
});

axios('https://raw.githubusercontent.com/akutubidze/Public-space-cameras/main/map.geojson').then(resp => {
    L.geoJSON(resp.data).addTo(map)
})


locations.forEach(function (locationObj) {


    const m = L.marker(locationObj.location).addTo(map)
        .bindPopup(locationObj.name + locationObj.time)
        .openPopup();

    const c = L.circle(locationObj.location, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.2,
        radius: 100
    }).addTo(map);

})

locations.forEach(function (publicspace, index) {
    const number = index + 1
    $("#locations").append("<a href='#' data-location=" + publicspace.location + ">" + number + ") " + publicspace.name + "</a><br>")
})


$("#locations").on("click", "a", function () {

    const location = $(this).data("location")
    console.log(location)

    const locationArr = location.split(",")
    console.log(locationArr)

    map.panTo(locationArr)

    map.setZoom(16)

});
console.log(locations)









