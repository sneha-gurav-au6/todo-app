const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/User");
const Todo = require("../../model/Todo");
module.exports = {
    //user register route from input form
    registerUser: async (req, res) => {
        //checking if user already existed or not
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res
                .status(400)
                .json({ message: "Email Already Exists, Please Login" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user) =>
                            res.json({
                                message:
                                    "Registered successfully. You can log in now",
                                user: user,
                                status: 201,
                            })
                        )
                        .catch((err) => console.log(err));
                });
            });
        }
    },

    //login user
    loginUser: async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        //checking for email and password match
        User.userFind(email, password)
            .then((user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({ message: "Invalid Creadintials" });
                }
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    subscribed: user.subscribed,
                    AskedQuestions: user.AskedQuestions,
                };
                jwt.sign(
                    payload,
                    "secret key",
                    { expiresIn: 60 * 60 * 30 },
                    (err, token) => {
                        res.json({
                            message: "Logged in Successfully",
                            token: token,
                        });
                    }
                );
            })

            //if email or password not matches throw error
            .catch((err) => {
                res.status(401).json({ message: "Incorrect Credentials" });
            });
    },
    createTodo: async (req, res) => {
        const newTodo = {
            title: req.body.title,
            description: req.body.description,
            createdUser: req.user.id,
        };
        const newTODOCreated = new Todo(newTodo);
        newTODOCreated
            .save()
            .then((savedProduct) => {
                User.findByIdAndUpdate(
                    { _id: savedProduct.createdUser },
                    { $push: { todo: savedProduct._id } },
                    { new: true }
                )
                    .then((user) =>
                        res.json({
                            massage: "Uploaded Succesfully",
                            data: user,
                        })
                    )
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    },
    editTodo: async (req, res) => {
        const product = {
            title: req.body.title,
            description: req.body.description,
        };
        Todo.findByIdAndUpdate(
            { _id: req.body.id },
            { $set: product },
            { new: true }
        )
            .then((product) =>
                res.json({ message: "Edited Successfully", data: product })
            )
            .catch((err) => console.log(err));
    },
    deleteTodo: async (req, res) => {
        const user = req.user.id;
        const todo_id = req.body.id;
        try {
            const product = await Todo.findOneAndDelete({
                createdUser: user,
                _id: todo_id,
            });
            await User.updateOne(
                { _id: user },
                {
                    $pullAll: { todo: [todo_id] },
                }
            );
            if (product === null) {
                res.status(403).send(
                    "You are not allowed to delete this product"
                );
            } else {
                res.status(200).json({
                    massage: "Product deleted successfully",
                    Product: product,
                });
            }
        } catch (err) {
            res.status(500).send("server error");
            console.log(err.massage);
        }
    },
};
