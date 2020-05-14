const Todo = require('./todo')

Todo.methods(['get','post','update','delete'])
Todo.updateOptions({new:true, runValidators:true})

module.exports = Todo