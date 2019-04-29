const fastify = require('fastify')({ logger: true })
const userHandler = require('./handlers/TodoUser')
const authHandler = require('./handlers/auth')
const personalTodo = require('./handlers/personal')
const collaborativeTodo = require('./handlers/collaborative')
fastify.post('/auth/login', authHandler.userLogin)
fastify.post('/user/register', userHandler.registerUser)
fastify.post('/reset/password', userHandler.resetPassword)
fastify.post('/personaltodo/', personalTodo.addPersonalTodo)
fastify.get('/personaltodo/', personalTodo.fetchPersonalTodo)
fastify.put('/personaltodo', personalTodo.updatePersonalTodo)
fastify.delete('/personaltodo', personalTodo.deletePersonalTodo)
fastify.post('/colaborativetodo', collaborativeTodo.addCollaborativeTodo)
fastify.get('/colaborativetodo', collaborativeTodo.fetchCollaborativeTodo)
fastify.put('/colaborativetodo', collaborativeTodo.updateCollaborativeTodo)
fastify.delete('/colaborativetodo', collaborativeTodo.deleteCollaborativeTodo)
const start = async() => {
    try {
        await fastify.listen(3000)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start() 
module.exports = start