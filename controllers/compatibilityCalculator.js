const calculateEuclidianDistance = (activeUserMetrics, randomCardMetrics) => {
  const activeUserMetricsArray = Object.values(activeUserMetrics).map((value) =>
    parseInt(value)
  );
  const randomCardMetricsArray = Object.values(randomCardMetrics).map((value) =>
    parseInt(value)
  );

  const filteredMetricsArray = activeUserMetricsArray.filter((_, index) => {
    const metricKey = Object.keys(activeUserMetrics)[index];
    return (
      metricKey === "mentalHealthDays" ||
      metricKey === "therapyAccess" ||
      metricKey === "digitalDetoxDays" ||
      metricKey === "gymAccess" ||
      metricKey === "wellnessStipend" ||
      metricKey === "flexibleHours" ||
      metricKey === "workFromHome" ||
      metricKey === "unlimitedPto" ||
      metricKey === "inclusivity" ||
      metricKey === "ecoConciousValues" ||
      metricKey === "careerPathClarity" ||
      metricKey === "groupBreathworkSessions"
    );
  });
  const filteredRandomCardMetricsArray = randomCardMetricsArray.filter(
    (_, index) => {
      const metricKey = Object.keys(randomCardMetrics)[index];
      return (
        metricKey === "mentalHealthDays" ||
        metricKey === "therapyAccess" ||
        metricKey === "digitalDetoxDays" ||
        metricKey === "gymAccess" ||
        metricKey === "wellnessStipend" ||
        metricKey === "flexibleHours" ||
        metricKey === "workFromHome" ||
        metricKey === "unlimitedPto" ||
        metricKey === "inclusivity" ||
        metricKey === "ecoConciousValues" ||
        metricKey === "careerPathClarity" ||
        metricKey === "groupBreathworkSessions"
      );
    }
  );

  const differences = filteredMetricsArray.map((metric, index) => {
    return Math.abs(metric - filteredRandomCardMetricsArray[index]);
  });
  const sumOfDifferences = differences.reduce((acc, curr) => acc + curr, 0);
  const euclidianDistance = Math.sqrt(sumOfDifferences);
  return Math.round((1 - euclidianDistance / 12) * 100);
};

export default calculateEuclidianDistance;
