const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const Todo = require("../../model/Todo");

module.exports = {
    getAllTodos: async (req, res) => {
        const user = req.user.id;
        console.log(user);
        
        Todo.find({ createdUser: user })
            .then((data) => {
                console.log(data);
                res.json({
                    message:"all todos",
                    data:data
                })
                
            })
            .catch((error) => {
                console.log(error.message);
            });
    },
};
