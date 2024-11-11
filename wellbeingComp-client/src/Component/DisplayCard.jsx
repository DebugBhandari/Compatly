import { useEffect } from "react";
import { axiosInstance } from "../Services/config";
import PropTypes from "prop-types";
import "../Styles/DisplayCard.css";
import useZuStore from "../zuStore";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const DisplayCard = ({
  
  CompatibilityPercentage,
  setSwipeToggle,
  swipeToggle
}) => {
  const activeUser = useZuStore((state) => state.activeUser);
  const activeUserMetrics = useZuStore((state) => state.activeUserMetrics[0]);
  const compatibility_percentage = parseInt(CompatibilityPercentage); 
  const clearRandomCard = useZuStore((state) => state.clearRandomCard);

  const randomCard = useZuStore(state => state.randomCard);
//   const userId= parseInt(useZuStore(state => state.activeUser.id));

//   const isCompany = parseInt(useZuStore(state => state.activeUser.isCompany));
//   const setRandomCard = useZuStore((state) => state.setRandomCard);
 

  const handleLeftClick = async () => {
    try {
      const leftswipe = 1;
      await axiosInstance.post(
        `/metrics/swipe/${activeUser.id}/${randomCard.id}`,
        { leftswipe, compatibility_percentage }
      );
    } catch (error) {
      console.error("Error swiping:", error);
    }
    clearRandomCard();
    setSwipeToggle((prev) => !prev);
  };
  const handleRightClick = async () => {
    try {
    
      const leftswipe = 0;
      await axiosInstance.post(
        `/metrics/swipe/${activeUser.id}/${randomCard.id}`,
        { leftswipe,compatibility_percentage }
      );
    } catch (error) {
      console.error("Error swiping:", error);
    }
    clearRandomCard();
    setSwipeToggle((prev) => !prev);
  };

  useEffect(() => {
    
  }, [swipeToggle]);

const data = [
    {
      name: 'Mental WB',
      Self: (parseInt(activeUserMetrics?.mentalHealthDays) + parseInt(activeUserMetrics?.therapyAccess)+parseInt(activeUserMetrics?.digitalDetoxDays))/3,
      Candidate: (parseInt(randomCard.mentalHealthDays) + parseInt(randomCard.therapyAccess)+parseInt(randomCard.digitalDetoxDays))/3 ,
     
    },
    {
      name: 'Flexibility',
      Self: (parseInt(activeUserMetrics?.flexibleHours) + parseInt(activeUserMetrics?.workFromHome)+parseInt(activeUserMetrics?.unlimitedPto))/3,
      Candidate: (parseInt(randomCard.flexibleHours) + parseInt(randomCard.workFromHome)+parseInt(randomCard.unlimitedPto))/3,
     
    },
    {
      name: 'Growth',
      Self: parseInt(activeUserMetrics?.careerPathClarity) ,
      Candidate: parseInt(randomCard.careerPathClarity) ,
      
    },
    {
      name: 'Fitness',
      Self: (parseInt(activeUserMetrics?.gymAccess) + parseInt(activeUserMetrics?.wellnessStipend) + parseInt(activeUserMetrics?.groupBreathworkSessions))/3,
      Candidate: (parseInt(randomCard.gymAccess) + parseInt(randomCard.wellnessStipend)+ parseInt(randomCard.groupBreathworkSessions))/3,
      
    },
    {
      name: 'Diversity',
      Self: (parseInt(activeUserMetrics?.inclusivity) + parseInt(activeUserMetrics?.ecoConciousValues))/2,
      Candidate: (parseInt(randomCard.inclusivity) + parseInt(randomCard.ecoConciousValues))/2,
      
    }
  ];
  return (
    <div className="displaycard">
      <div className="cardHeader">
        {randomCard.fullname?<div className="cardAvatar"><h1>{randomCard.fullname}</h1>
        <h3>{randomCard.email}</h3></div>:<h2>WellbeingCompatibility</h2>}
      </div>
      <div className="cardLine"></div>
      <div className="cardBody">
        {randomCard.id ? (
          <div className="cardItem">
            <h2>{CompatibilityPercentage}% Match</h2></div>
        ) : (
          <div className="cardItem">
            <h1 style={{margin:0}}>No swipes left.</h1>
          </div>
        )}
         {randomCard.id ? 
        <ResponsiveContainer width="80%" height="60%">
        <BarChart
          width={200}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Self" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="Candidate" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="red" />} />
        </BarChart>
      </ResponsiveContainer> : null}
      </div>
      <div className="overlay-button left" onClick={handleLeftClick}></div>
      <div className="overlay-button right" onClick={handleRightClick}></div>
    </div>
  );
};

DisplayCard.propTypes = {
 
  CompatibilityPercentage: PropTypes.number.isRequired,
  setSwipeToggle: PropTypes.func.isRequired,
  swipeToggle: PropTypes.bool.isRequired
};

export default DisplayCard;
