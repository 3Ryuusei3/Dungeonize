let eventMap;
let eventId;

function init() {
	renderMap();
	getEventId();
	getEventLocation();
}

function renderMap() {
	eventMap = new google.maps.Map(document.getElementById("eventMap"), {
		zoom: 13,
		center: { lat: 40.41328570929002, lng: -3.697121041240825 },
	});
}

function getEventId() {
	eventId = location.pathname.split("/");
}

function getEventLocation() {
	axios
		.get(`/api/events/${eventId[3]}`)
		.then((res) => setMarkers(res.data))
		.catch((err) => console.log(err));
}

function setMarkers(event) {
	const lat = event.location.coordinates[0];
	const lng = event.location.coordinates[1];

	new google.maps.Marker({
		map: eventMap,
		position: { lat, lng },
		title: event.title,
	});
}
