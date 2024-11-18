const calculateCompatibility = (activeUserMetrics, randomCardMetrics) => {
  const metricKeys = [
    "mentalHealthDays",
    "therapyAccess",
    "digitalDetoxDays",
    "gymAccess",
    "wellnessStipend",
    "flexibleHours",
    "workFromHome",
    "unlimitedPto",
    "inclusivity",
    "ecoConciousValues",
    "careerPathClarity",
    "groupBreathworkSessions"
  ];

  // Extract and filter the relevant metrics from both objects
  const activeUserMetricsArray = metricKeys.map((key) =>
    parseInt(activeUserMetrics[key])
  );
  const randomCardMetricsArray = metricKeys.map((key) =>
    parseInt(randomCardMetrics[key])
  );
  const activeUserMetricsSum = activeUserMetricsArray.reduce(
    (acc, curr) => acc + curr
  );
  const randomCardMetricsSum = randomCardMetricsArray.reduce(
    (acc, curr) => acc + curr
  );
  console.log(activeUserMetricsSum, randomCardMetricsSum);
  if (activeUserMetricsSum >= randomCardMetricsSum) {
    return ((randomCardMetricsSum / activeUserMetricsSum) * 100).toFixed(1);
  } else {
    return ((activeUserMetricsSum / randomCardMetricsSum) * 100).toFixed(1);
  }
};
export default calculateCompatibility;
