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
  const sql = `INSERT INTO metrics (user_id, isCompany, mentalHealthDays, 
    therapyAccess, digitalDetoxDays, gymAccess, wellnessStipend, 
    flexibleHours, workFromHome, unlimitedPto, inclusivity, 
    ecoConciousValues, careerPathClarity, groupBreathworkSessions) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
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
  const sql = `UPDATE metrics SET mentalHealthDays = ?, therapyAccess = ?, digitalDetoxDays 
    = ?, gymAccess = ?, wellnessStipend = ?, flexibleHours = ?, workFromHome = ?,
     unlimitedPto = ?, inclusivity = ?, ecoConciousValues = ?, careerPathClarity =
      ?, groupBreathworkSessions = ? WHERE id = ?`;
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
  const sql = `SELECT metrics.*, users.fullname, users.email FROM metrics
     LEFT OUTER JOIN swipes ON metrics.user_id = swipes.swipee_id AND
      swipes.swiper_id = ? LEFT OUTER JOIN users ON metrics.user_id 
      = users.id WHERE metrics.isCompany != ? AND swipes.swipee_id IS NULL;`;
  const [results] = await connection.query(sql, [user_id, isCompany]);
  await connection.end();
  return results[Math.floor(Math.random() * results.length)];
}

async function getCurrentUserMetrics(user_id) {
  const connection = await mysql.createConnection(dbConfig);
  const sql = "SELECT * FROM metrics WHERE user_id = ?";
  const [results] = await connection.query(sql, [user_id]);
  await connection.end();
  return results[0];
}

//Swipes Route
async function createSwipe({
  swiper_id,
  swipee_id,
  leftswipe,
  compatibility_percentage
}) {
  const connection = await mysql.createConnection(dbConfig);
  const sql = `INSERT INTO swipes (swiper_id, swipee_id, leftswipe, compatibility_percentage)
     VALUES ( ?, ?, ?, ?)`;
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
  const sql = `SELECT 
    s.id,
    s.swiper_id,
    s.swipee_id,
    s.compatibility_percentage, s.leftswipe,
    u.fullname, u.email
FROM 
    swipes s
JOIN 
    users u ON s.swipee_id = u.id
WHERE 
    s.swiper_id = ?;`;
  const [results] = await connection.query(sql, [swiper_id]);
  await connection.end();
  return results;
}

//delete swipe
async function deleteSwipe(id) {
  const connection = await mysql.createConnection(dbConfig);
  const sql = `DELETE FROM swipes WHERE id = ?`;
  await connection.query(sql, [id]);
  await connection.end();
}

export default {
  create,
  getRandomMetrics,
  getCurrentUserMetrics,
  createSwipe,
  updateMetrics,
  getSwipeHistory,
  deleteSwipe
};
