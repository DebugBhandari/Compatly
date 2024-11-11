import express from "express";

import {
  createMetrics,
  getRandomMetrics,
  getCurrentUserMetrics,
  createSwipe,
  updateMetrics,
  getSwipeHistory,
  deleteSwipe
} from "../controllers/metricsController.js";

const router = express.Router();

// router.get("/", findAll);
// router.get("/:id", findOne);
router.post("/create", createMetrics);
//router.put("/:id", updateMetrics);
router.get("/random/:user_id/:isCompany", getRandomMetrics);
router.put("/update/:metric_id", updateMetrics);
router.get("/current/:user_id", getCurrentUserMetrics);
router.post("/swipe/:swiper_id/:swipee_id", createSwipe);
router.get("/swipehistory/:user_id", getSwipeHistory);
router.delete("/swipe/delete/:id", deleteSwipe);

export default router;
