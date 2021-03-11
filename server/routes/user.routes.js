import express from "express";
import userController from "../controllers/user.controller";

const router = express.Router();

router.route("/api/users").get(userController.list).post(userController.create);
router
  .route("/api/users/:userId")
  .get(userController.read)
  .put(userController.update)
  .delete(userController.remove);

router.param("userId", userController.userByID);

router.route("/api/users/:userId").get(userController.read);

router.route("/api/users/:userId").put(userController.update);

router.route("/api/users/:userId").delete(userController.remove);

export default router;
