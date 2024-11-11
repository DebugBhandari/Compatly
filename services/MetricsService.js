import { dbConfig } from "../server.js";
import mysql from "mysql2/promise";

async function create({
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
}) {
  const connection = await mysql.createConnection(dbConfig);
  const sql =
    "INSERT INTO metrics (user_id, isCompany, mentalHealthDays, therapyAccess, digitalDetoxDays, gymAccess, wellnessStipend, flexibleHours, workFromHome, unlimitedPto, inclusivity, ecoConciousValues, careerPathClarity, groupBreathworkSessions) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  await connection.query(sql, [
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
  ]);
  await connection.end();
}

async function updateMetrics({
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
}) {
  const connection = await mysql.createConnection(dbConfig);
  const sql =
    "UPDATE metrics SET mentalHealthDays = ?, therapyAccess = ?, digitalDetoxDays = ?, gymAccess = ?, wellnessStipend = ?, flexibleHours = ?, workFromHome = ?, unlimitedPto = ?, inclusivity = ?, ecoConciousValues = ?, careerPathClarity = ?, groupBreathworkSessions = ? WHERE id = ?";
  await connection.query(sql, [
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
  ]);
  await connection.end();
}

async function getRandomMetrics(user_id, isCompany) {
  const connection = await mysql.createConnection(dbConfig);
  const sql =
    "SELECT metrics.*, users.fullname, users.email FROM metrics LEFT OUTER JOIN swipes ON metrics.id = swipes.swipee_id AND swipes.swiper_id = ? LEFT OUTER JOIN users ON metrics.user_id = users.id WHERE metrics.isCompany != ? AND swipes.swipee_id IS NULL;";
  const [results] = await connection.query(sql, [user_id, isCompany]);
  await connection.end();
  return results[0];
}

async function getCurrentUserMetrics(user_id) {
  const connection = await mysql.createConnection(dbConfig);
  const sql = "SELECT * FROM metrics WHERE user_id = ?";
  const [results] = await connection.query(sql, [user_id]);
  await connection.end();
  return results;
}

//Swipes Route
async function createSwipe({
  swiper_id,
  swipee_id,
  leftswipe,
  compatibility_percentage
}) {
  const connection = await mysql.createConnection(dbConfig);
  const sql =
    "INSERT INTO swipes (swiper_id, swipee_id, leftswipe, compatibility_percentage) VALUES ( ?, ?, ?, ?)";
  await connection.query(sql, [
    swiper_id,
    swipee_id,
    leftswipe,
    compatibility_percentage
  ]);
  await connection.end();
}

//swipe history
async function getSwipeHistory(swiper_id) {
  const connection = await mysql.createConnection(dbConfig);
  const sql =
    "SELECT swipes.*, metrics.*, users.fullname, users.email FROM swipes LEFT OUTER JOIN metrics ON swipes.swipee_id = metrics.id LEFT OUTER JOIN users ON users.id = ?";
  const [results] = await connection.query(sql, [swiper_id]);
  await connection.end();
  return results;
}

export default {
  create,
  getRandomMetrics,
  getCurrentUserMetrics,
  createSwipe,
  updateMetrics,
  getSwipeHistory
};
