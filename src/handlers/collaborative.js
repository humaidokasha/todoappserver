const firebasedb = require('../firebase/index')
const firebaseCloudMessaging = require('../firebase/cloud-messaging')
const authToken = require("../handlers/auth")
exports.addCollaborativeTodo = async(req, res) => {
    const obj = req.body;
    authToken.authenticateToken(req.headers.token).then(userObj => { 
        if (userObj) {
            firebasedb.fire_base.database().ref('todos/Collaborative').push({
                    title: obj.title,
                    todo: obj.todo,
                    status: "pending",
                    createdAt: obj.time,
                    updatedAt: obj.time,
                    createdBy: userObj.user_id
                })
                .then(todo => {
                    if (todo) {
                        firebaseCloudMessaging.sendNotification(userObj.email + " " + 'added a todo', 'Todo', {}); 
                        res.send('todo added successfully')
                    } else {
                        res.send("cant create todo")
                    }
                })
                .catch(err => {
                    res.send(err)
                });
        } else {
            res.send("can't authenticate user")
        }
    }).catch(err => {
        res.send(err)
    });
};
exports.fetchCollaborativeTodo = async(req, res) => {
    authToken.authenticateToken(req.headers.token).then(auth => {
        if (auth) {
            firebasedb.fire_base.database().ref('todos/Collaborative/').on('value', function(snapshot) {
                const data = snapshot.val();
                const todos = {};
                Object.keys(data).forEach(item => {
                    if (data[item].status == "active") {
                        todos[item] = data[item];
                    }
                });
                if (todos)
                    res.send(todos)
                else
                    res.send("No acitve todos found")
            });
        } else {
            res.send("cant authenticate user")
        }
    });
};

exports.updateCollaborativeTodo = async(req, res) => {
    const obj = req.body;
    authToken.authenticateToken(req.headers.token).then(auth => { 
        if (auth) {
            firebasedb.fire_base.database().ref('todos/Collaborative/' + obj.id)
                .set({
                    title: obj.title,
                    todo: obj.todo,
                    status: obj.status,
                    updatedAt: new Date().getTime()
                })
                .then(todo => {
                    if (todo) {
                        firebaseCloudMessaging.sendNotification(auth.email + " " + 'updated a todo' + " " + obj.id, 'Todo', {}); 
                        res.send("todo updated")
                    } else
                        res.send("Can't update todo")
                })
                .catch(err => {
                    res.send(err)
                });
        } else {
            res.send("cant authenticate user")
        }
    });
};

exports.deleteCollaborativeTodo = async(req, res) => {
    const body = req.body;
    const taskId = body.id
    authToken.authenticateToken(req.headers.token).then(auth => { 
        if (auth) {
            firebasedb.fire_base.database().ref('todos/Collaborative/' + taskId)
                .set({
                    isDeleted: true,
                    updatedAt: new Date().getTime()
                })
                .then(todo => {
                    if (todo) {
                        firebaseCloudMessaging.sendNotification(auth.email + " " + 'deleted a todo' + " " + obj.id, 'Todo', {}); 
                        res.send("Todo deleted with success")
                    } else
                        res.send("unable to delete todo")
                })
                .catch(err => {
                    res.send(err)
                });
        } else {
            res.send("cant authenticate user")
        }
    });
};