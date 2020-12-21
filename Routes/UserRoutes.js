const express = require("express");
const User = require("../model/User");
const passport = require("passport");
const router = express.Router();

const {
    registerUser,
    loginUser,
    createTodo,
    editTodo,
    deleteTodo,
} = require("../controller/apiController/UserApiController");

const {
    getAllTodos,
} = require("../controller/NormalController/UserNormalController");



router.post(
    "/user/todo",
    passport.authenticate("jwt", { session: false }),
    getAllTodos
);

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.post(
    "/edit/todo",
    passport.authenticate("jwt", { session: false }),
    editTodo
);
router.post(
    "/user/create-todo",
    passport.authenticate("jwt", { session: false }),
    createTodo
);
router.post(
    "/delete/todo",
    passport.authenticate("jwt", { session: false }),
    deleteTodo
);

module.exports = router;
