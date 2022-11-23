const ocultNavbar = (req, res, next) => {
        if (req.session.currentUser) {
            req.app.locals.username = req.session.currentUser.username
            req.app.locals.guest = null
            
            if (req.session.currentUser.role === "Player") {
                req.app.locals.player = req.session.currentUser.role
            }
            if (req.session.currentUser.role === "DM") {
                req.app.locals.dm = req.session.currentUser.role
            }
            if (req.session.currentUser.role === "Admin") {
                req.app.locals.admin = req.session.currentUser.role
            }
            
        } else {
            req.app.locals.guest = true
            req.app.locals.username = null
            req.app.locals.player = null
            req.app.locals.dm = null
            req.app.locals.admin = null
        }
        next()
}
 
module.exports = ocultNavbar