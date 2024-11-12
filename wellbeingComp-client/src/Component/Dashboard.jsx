import { axiosInstance } from "../Services/config";
import "../Styles/index.css";
import { useState, useEffect } from 'react';
import useZuStore from '../zuStore';
import DisplayCard from './DisplayCard';

const Dashboard = ()=> {
  
  const [swipeToggle, setSwipeToggle] = useState(false);
  const userId= parseInt(useZuStore(state => state.activeUser.id));
  const isCompany = parseInt(useZuStore(state => state.activeUser.isCompany));
  //const randomCard = useZuStore(state => state.randomCard);
  const setRandomCard = useZuStore(state => state.setRandomCard);
  const clearRandomCard = useZuStore(state => state.clearRandomCard);
  const activeUserMetrics = useZuStore(state => state.activeUserMetrics);
  const setActiveUserMetrics = useZuStore(state => state.setActiveUserMetrics);

  
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
   
    
    clearRandomCard();
    
    
    
  },[ ]);

  return (
    <div className="dashboard">
     <DisplayCard setSwipeToggle={setSwipeToggle} swipeToggle={swipeToggle}/>
    
    </div>
  )
}

export default Dashboard;
