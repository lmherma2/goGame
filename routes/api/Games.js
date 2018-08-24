const router = require("express").Router();
const ArticlesController = require("../../controllers/GameController");
const db = require("../../models");

// Matches with "/api/Game"
router.route("/")
  .get(GameController.findAll)
  // .then(result => res.send("from db!!!"))
  
  
// Matches with "/api/Game/post"
router.route("/post")
  .then(console.log("post"))
  .post(GameController.create);

// Matches with "/api/Game/:id"
router
  .route("/:id")
  .get(GameController.findById)
  .put(GameController.update)
  .delete(GameController.remove);

module.exports = router;