import { axiosInstance } from "../Services/config";
import "../Styles/index.css";
import { useState, useEffect } from 'react';
import useZuStore from '../zuStore';
import DisplayCard from './DisplayCard';

const Dashboard = ()=> {
  const [compatibilityPercentage, setCompatibilityPercentage] = useState(0);
  const [swipeToggle, setSwipeToggle] = useState(false);
  const userId= parseInt(useZuStore(state => state.activeUser.id));
  const isCompany = parseInt(useZuStore(state => state.activeUser.isCompany));
  const randomCard = useZuStore(state => state.randomCard);
  const setRandomCard = useZuStore(state => state.setRandomCard);
  const clearRandomCard = useZuStore(state => state.clearRandomCard);
  const activeUserMetrics = useZuStore(state => state.activeUserMetrics);
  const setActiveUserMetrics = useZuStore(state => state.setActiveUserMetrics);

  const calculateEuclidianDistance = (activeUserMetrics, randomCardMetrics) => {
    const activeUserMetricsArray = Object.values(activeUserMetrics).map(value => parseInt(value));
    const randomCardMetricsArray = Object.values(randomCardMetrics).map(value => parseInt(value));
    
    const filteredMetricsArray = activeUserMetricsArray.filter((_, index) => {
        const metricKey = Object.keys(activeUserMetrics)[index];
        return (
            metricKey === 'mentalHealthDays' ||
            metricKey === 'therapyAccess' ||
            metricKey === 'digitalDetoxDays' ||
            metricKey === 'gymAccess' ||
            metricKey === 'wellnessStipend' ||
            metricKey === 'flexibleHours' ||
            metricKey === 'workFromHome' ||
            metricKey === 'unlimitedPto' ||
            metricKey === 'inclusivity' ||
            metricKey === 'ecoConciousValues' ||
            metricKey === 'careerPathClarity' ||
            metricKey === 'groupBreathworkSessions'
        );
    });
    const filteredRandomCardMetricsArray = randomCardMetricsArray.filter((_, index) => {
        const metricKey = Object.keys(randomCardMetrics)[index];
        return (
            metricKey === 'mentalHealthDays' ||
            metricKey === 'therapyAccess' ||
            metricKey === 'digitalDetoxDays' ||
            metricKey === 'gymAccess' ||
            metricKey === 'wellnessStipend' ||
            metricKey === 'flexibleHours' ||
            metricKey === 'workFromHome' ||
            metricKey === 'unlimitedPto' ||
            metricKey === 'inclusivity' ||
            metricKey === 'ecoConciousValues' ||
            metricKey === 'careerPathClarity' ||
            metricKey === 'groupBreathworkSessions'
        );
    });
    console.log('Filtered active user metrics:', filteredMetricsArray);
    console.log('Filtered random card metrics:', filteredRandomCardMetricsArray);
    const differences = filteredMetricsArray.map((metric, index) => {
        return Math.abs(metric - filteredRandomCardMetricsArray[index]);
    });
    const sumOfDifferences = differences.reduce((acc, curr) => acc + curr, 0);
    const euclidianDistance = Math.sqrt(sumOfDifferences);
    return Math.round((1 - euclidianDistance / 12) * 100);
    };
    useEffect(() => {
    
      const loadRandomCard = async () => {
        try {
          clearRandomCard();
          const response = await axiosInstance.get(`/metrics/random/${userId}/${isCompany}`);
          
          setRandomCard(response.data);
          console.log('Response.data:', response.data);
         
        } catch (error) {
          console.error('Error getting random card:', error);
        }
      };
      loadRandomCard();
    }, [swipeToggle]);
  useEffect(() => {
    if(!activeUserMetrics.id){
     const fetchCurrentUserMetrics = async () => {
      try {
        const response = await axiosInstance.get(`/metrics/current/${userId}`);
        console.log('User metrics:', response.data);
        setActiveUserMetrics(response.data);
      } catch (error) {
        console.error('Error getting user metrics:', error);
      }
    }
    fetchCurrentUserMetrics();
    }
   
    setTimeout(() => {
    setCompatibilityPercentage(calculateEuclidianDistance(randomCard, activeUserMetrics[0]));
    }, 1000);
    clearRandomCard();
    
    
    
  },[swipeToggle ]);

  return (
    <div className="dashboard">
     <DisplayCard CompatibilityPercentage={compatibilityPercentage} setSwipeToggle={setSwipeToggle} swipeToggle={swipeToggle}/>
    
    </div>
  )
}

export default Dashboard;
