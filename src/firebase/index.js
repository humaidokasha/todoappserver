var firebase = require('firebase');
var admin = require("firebase-admin");
var serviceAccount = require("./path/todo-c9cbf-firebase-adminsdk-1mzjf-84d4889376.json");
var config = require("./path/config.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://new1-c9cbf.firebaseio.com"
});
firebase.initializeApp(config);
exports.fire_base = firebase
exports.firebase_dmin = admin
exports.firebase_app = firebaseapp