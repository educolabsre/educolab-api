const express = require("express");

const studentController = require("../controllers/student");

const router = express.Router();

router.get("/confirmed-students/:forumID", studentController.getConfirmedStudents);
router.get("/students/recomCode/:forumID", studentController.getStudentsRecomCode);
router.post("/register-students", studentController.postRegisterStudents);
router.post("/update/recomCode", studentController.postUpdateRecomCode);

module.exports = router;
