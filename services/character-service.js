const axios = require("axios");

class ApiService {
	constructor() {
		this.dndApi = axios.create({
			baseURL: "https://www.dnd5eapi.co/api",
		});
	}

	getClasses() {
		return this.dndApi.get("/classes").then(({ data }) => data)
	}
	getRaces() {
		return this.dndApi.get("/races").then(({ data }) => data)
	}
	getBackground() {
		return this.dndApi.get("/backgrounds/acolyte").then(({ data }) => data)
	}
	getClassInfo(classes) {
		return this.dndApi.get(`/classes/${classes}`).then(({ data }) => data)
	}
	getClassTraits() {
		return this.dndApi.get("/traits").then(({ data }) => data)
	}
	getRacesInfo(race) {
		return this.dndApi.get(`/races/${race}`).then(({ data }) => data)
	}

}

module.exports = ApiService;
