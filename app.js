require("dotenv").config();
require("./db");

const express = require("express");
const app = express();

require("./config")(app);
require("./config/session.config")(app);



app.locals.appTitle = `Dungeonize`;
app.use((req, res, next) => {
    if (req.session.currentUser) {
        app.locals.username = req.session.currentUser.username;
        app.locals.guest = null
        //Check role for navbar
        if (req.session.currentUser.role === "Player") {
            app.locals.player = req.session.currentUser.role
        } 
        if (req.session.currentUser.role === "DM") {
            app.locals.dm = req.session.currentUser.role
        } 
        if (req.session.currentUser.role === "Admin") {
            app.locals.admin = req.session.currentUser.role
        } 

    } else {
        app.locals.guest = true;
        app.locals.username = null;  
        app.locals.player = null
        app.locals.dm = null
        app.locals.admin = null
    }
    next ()
});


require("./routes")(app);
require("./error-handling")(app);

module.exports = app;