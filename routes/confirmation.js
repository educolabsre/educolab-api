const express = require("express");

const confirmationController = require("../controllers/confirmation");

const router = express.Router();

router.get("/confirmed/:id", confirmationController.getConfirmed);
router.get("/participation/confirmed/:id", confirmationController.getParticipationConfirmed);
router.get("/confirm-registration/:id", confirmationController.getConfirmRegistration);
router.get("/confirm-participation/:id", confirmationController.getConfirmParticipation);
router.post("/confirm-registration", confirmationController.postConfirmRegistration);
router.post("/confirm-participation", confirmationController.postConfirmParticipation);
router.post("/unsubscribe-participation", confirmationController.postUnsubscribe);

module.exports = router;