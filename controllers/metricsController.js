import pkg from "express";
const { req, res, next } = pkg;
import MetricsService from "../services/MetricsService.js";
import calculateCompatibility from "./compatibilityCalculator.js";

//Create Metrics
export const createMetrics = async (req, res, next) => {
  try {
    const {
      user_id,
      isCompany,
      mentalHealthDays,
      therapyAccess,
      digitalDetoxDays,
      gymAccess,
      wellnessStipend,
      flexibleHours,
      workFromHome,
      unlimitedPto,
      inclusivity,
      ecoConciousValues,
      careerPathClarity,
      groupBreathworkSessions
    } = req.body;

    await MetricsService.create({
      user_id,
      isCompany,
      mentalHealthDays,
      therapyAccess,
      digitalDetoxDays,
      gymAccess,
      wellnessStipend,
      flexibleHours,
      workFromHome,
      unlimitedPto,
      inclusivity,
      ecoConciousValues,
      careerPathClarity,
      groupBreathworkSessions
    });
    res.json({
      user_id,
      isCompany,
      mentalHealthDays,
      therapyAccess,
      digitalDetoxDays,
      gymAccess,
      wellnessStipend,
      flexibleHours,
      workFromHome,
      unlimitedPto,
      inclusivity,
      ecoConciousValues,
      careerPathClarity,
      groupBreathworkSessions
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      next(console.log("Invalid Request", error));
    } else {
      next(console.log("Internal Server Error", error));
    }
  }
};

//Update Metrics
export const updateMetrics = async (req, res, next) => {
  try {
    const {
      user_id,
      isCompany,
      mentalHealthDays,
      therapyAccess,
      digitalDetoxDays,
      gymAccess,
      wellnessStipend,
      flexibleHours,
      workFromHome,
      unlimitedPto,
      inclusivity,
      ecoConciousValues,
      careerPathClarity,
      groupBreathworkSessions
    } = req.body;
    const metric_id = parseInt(req.params.metric_id, 10); // Convert to integer

    await MetricsService.updateMetrics({
      user_id,
      isCompany,
      mentalHealthDays,
      therapyAccess,
      digitalDetoxDays,
      gymAccess,
      wellnessStipend,
      flexibleHours,
      workFromHome,
      unlimitedPto,
      inclusivity,
      ecoConciousValues,
      careerPathClarity,
      groupBreathworkSessions,
      metric_id
    });
    res.json({
      user_id,
      isCompany,
      mentalHealthDays,
      therapyAccess,
      digitalDetoxDays,
      gymAccess,
      wellnessStipend,
      flexibleHours,
      workFromHome,
      unlimitedPto,
      inclusivity,
      ecoConciousValues,
      careerPathClarity,
      groupBreathworkSessions
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      next(console.log("Invalid Request", error));
    } else {
      next(console.log("Internal Server Error", error));
    }
  }
};

//getRandomMetric that is not in the swipe list
export const getRandomMetrics = async (req, res, next) => {
  try {
    const user_id = parseInt(req.params.user_id, 10); // Convert to integer
    const isCompany = req.params.isCompany == "0" ? 0 : 1;
    const metric = await MetricsService.getRandomMetrics(user_id, isCompany);
    //also get user metrics to calculate compatibility percentage
    const userMetric = await MetricsService.getCurrentUserMetrics(user_id);
    const compatibility_percentage = calculateCompatibility(userMetric, metric);
    res.json({ ...metric, compatibility_percentage });
  } catch (error) {
    if (error.name === "ValidationError") {
      next(console.log("Invalid Request", error));
    } else {
      next(console.log("Internal Server Error", error));
    }
  }
};

//Logged User Metrics
export const getCurrentUserMetrics = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const metric = await MetricsService.getCurrentUserMetrics(user_id);
    res.json(metric);
  } catch (error) {
    if (error.name === "ValidationError") {
      next(console.log("Invalid Request", error));
    } else {
      next(console.log("Internal Server Error", error));
    }
  }
};

//Create Swipe
export const createSwipe = async (req, res, next) => {
  try {
    const swiper_id = parseInt(req.params.swiper_id, 10); // Convert to integer
    const swipee_id = parseInt(req.params.swipee_id, 10); // Convert to integer
    const { leftswipe, compatibility_percentage } = req.body;

    console.log(swiper_id, swipee_id, leftswipe, compatibility_percentage);
    await MetricsService.createSwipe({
      swiper_id,
      swipee_id,
      leftswipe,
      compatibility_percentage
    });
    res.json({
      swiper_id,
      swipee_id,
      leftswipe,
      compatibility_percentage
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      next(console.log("Invalid Request", error));
    } else {
      next(console.log("Internal Server Error", error));
    }
  }
};

// swipe history
export const getSwipeHistory = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const swipeHistory = await MetricsService.getSwipeHistory(user_id);
    res.json(swipeHistory);
  } catch (error) {
    if (error.name === "ValidationError") {
      next(console.log("Invalid Request", error));
    } else {
      next(console.log("Internal Server Error", error));
    }
  }
};

//Delete Swipe
export const deleteSwipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    await MetricsService.deleteSwipe(id);
    res.json({ message: "Swipe Deleted" });
  } catch (error) {
    if (error.name === "ValidationError") {
      next(console.log("Invalid Request", error));
    } else {
      next(console.log("Internal Server Error", error));
    }
  }
};
