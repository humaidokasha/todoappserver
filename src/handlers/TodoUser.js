const firebasedb = require('../firebasedbbase/index')
exports.registerUser = async(req, res) => {
    const userObj = req.body
    const email = userObj.email
    const password = userObj.password
    if (email && password) {
        firebasedb.fire_base.auth().createUserWithEmailAndPassword(email, password).then(user => { 
            if (user) {
                res.send(user)
            } else {
                res.send("cant create user")
            }
        })
    } else {
        res.send("please provide complete info")
    }
}
exports.resetPassword = async(req, res) => {
    const userObj = req.body
    const email = userObj.email
    if (email) {
        firebasedb.fire_base.auth().sendPasswordResetEmail(email).then(link => { 
            if (link) {
                res.send("Password reset link sent")
            } else {
                res.send("cant reset password")
            }
        })
    } else {
        res.send("please provide email to reset password")
    }
}