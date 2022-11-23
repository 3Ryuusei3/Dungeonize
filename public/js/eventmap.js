let eventMap;
let eventId;

function init() {
	getEventId();
	getEventLocation();
}

function getEventId() {
	eventId = location.pathname.split("/");
	while (eventId.length > 1) {
		eventId.shift()
	};
}

function getEventLocation() {
	axios
		.get(`/api/events/${eventId}`)
		.then((res) => renderMap(res.data))
		.catch((err) => console.log(err));
}

function renderMap(event) {
	const lat = event.location.coordinates[0];
	const lng = event.location.coordinates[1];

	eventMap = new google.maps.Map(
		document.getElementById("eventMap"),
		{
			zoom: 13,
			center: { lat, lng }
		}
	)
	setMarkers(event)
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