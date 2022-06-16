const express = require('express')
const {
  createEventDocument,
  deleteEventById,
  editEventById,
  getEventByIdOrAll,
} = require("../Controllers/eventController.js") ;

const router = express.Router();

router.route("/events").get(getEventByIdOrAll).post(createEventDocument);

router.route("/events/:id").delete(deleteEventById).put(editEventById);

module.exports = router;

