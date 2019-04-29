const firebasedb = require('../firebase/index')
const authToken = require("../handlers/auth")
exports.addPersonalTodo = async(req, res) => {
    const todoObj = req.body;
    const { token } = req.headers;
    authToken.authenticateToken(token).then(auth => {
        if (auth) {
            firebasedb.fire_base.database().ref('todos/personal/' + auth.user_id).push({
                    title: todoObj.title,
                    todo: todoObj.todo,
                    isDeleted: false,
                    status: "pending",
                    createdAt: todoObj.time,
                    updatedAt: todoObj.time
                })
                .then(todo => {
                    if (todo)
                        res.send("todo created successfully")
                    else
                        res.send("Unable to create todo")
                })
                .catch(err => {
                    res.send(err)
                })
        } else {
            res.send("can't authenticate user")
        }
    });
};

exports.fetchPersonalTodo = async(req, res) => {
        if (auth) {
            firebasedb.fire_base.database().ref('todos/personal/' + auth.user_id).on('value', function(snapshot) { 
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

// Update Todo
exports.updatePersonalTodo = async(req, res) => {
    const obj = req.body;
    authToken.authenticateToken(req.headers.token).then(auth => {
        if (auth) {
            firebasedb.fire_base.database().ref('todos/personal/' + auth.user_id + '/' + obj.id) 
                .set({
                    title: obj.title,
                    todo: obj.todo,
                    status: obj.status,
                    updatedAt: new Date().getTime()
                })
                .then(todo => {
                    if (todo)
                        res.send("todo updated")
                    else
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

exports.deletePersonalTodo = async(req, res) => {
    const body = req.body;
    const taskId = body.id
    authToken.authenticateToken(req.headers.token).then(auth => {
        if (auth) {
            firebasedb.fire_base.database().ref('todos/personal/' + auth.user_id + '/' + taskId) 
                .set({
                    isDeleted: true,
                    updatedAt: new Date().getTime()
                })
                .then(todo => {
                    if (todo)
                        res.send("Todo deleted with success")
                    else
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