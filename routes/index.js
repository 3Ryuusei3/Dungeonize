module.exports = (app) => {
	// Index
	const indexRoutes = require("./index.routes");
	app.use("/", indexRoutes);

	// Auth Routes
	const authRoutes = require("./auth.routes");
	app.use("/", authRoutes);
	// require("./config")(app);
	// require("./auth.routes")(app);

	// Admin Routes
	const adminRoutes = require("./admin.routes");
	app.use("/", adminRoutes);

	// User Routes
	const userRoutes = require("./user.routes");
	app.use("/", userRoutes);

	// // Events Routes
	// const eventsRoutes = require("./events.routes");
	// app.use("/", eventsRoutes);
};
