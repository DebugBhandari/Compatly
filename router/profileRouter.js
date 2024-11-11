import express from "express";

import { createProfile } from "../controllers/profileController.js";

const router = express.Router();

/*router.get("/", findAll);
router.get("/:id", findOne);*/
router.post("/", createProfile);
//router.put("/:id", updateProfile);

export default router;
