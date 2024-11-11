import { useEffect } from "react";
import { axiosInstance } from "../Services/config";
import PropTypes from "prop-types";
import "../Styles/DisplayCard.css";
import useZuStore from "../zuStore";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const DisplayCard = ({
  
  setSwipeToggle,
  swipeToggle
}) => {
  const activeUser = useZuStore((state) => state.activeUser);
  const activeUserMetrics = useZuStore((state) => state.activeUserMetrics);
 
  const clearRandomCard = useZuStore((state) => state.clearRandomCard);

  const randomCard = useZuStore(state => state.randomCard);
//   const userId= parseInt(useZuStore(state => state.activeUser.id));

//   const isCompany = parseInt(useZuStore(state => state.activeUser.isCompany));
//   const setRandomCard = useZuStore((state) => state.setRandomCard);
const compatibility_percentage = randomCard.compatibility_percentage;
 

  const handleLeftClick = async () => {
    try {
      const leftswipe = 1;
      await axiosInstance.post(
        `/metrics/swipe/${activeUser.id}/${randomCard.user_id}`,
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
        `/metrics/swipe/${activeUser.id}/${randomCard.user_id}`,
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
      Self: ((parseInt(activeUserMetrics?.mentalHealthDays) + parseInt(activeUserMetrics?.therapyAccess)+parseInt(activeUserMetrics?.digitalDetoxDays))/3).toFixed(2),
      Candidate: ((parseInt(randomCard.mentalHealthDays) + parseInt(randomCard.therapyAccess)+parseInt(randomCard.digitalDetoxDays))/3).toFixed(2) ,
     
    },
    {
      name: 'Flexibility',
      Self: ((parseInt(activeUserMetrics?.flexibleHours) + parseInt(activeUserMetrics?.workFromHome))/2).toFixed(2),
      Candidate: ((parseInt(randomCard.flexibleHours) + parseInt(randomCard.workFromHome))/2).toFixed(2),
     
    },
    {
      name: 'Growth',
      Self: ((parseInt(activeUserMetrics?.careerPathClarity)+parseInt(activeUserMetrics?.unlimitedPto))/2).toFixed(2) ,
      Candidate: ((parseInt(randomCard.careerPathClarity)+parseInt(randomCard.unlimitedPto))/2).toFixed(2) ,
      
    },
    {
      name: 'Fitness',
      Self: ((parseInt(activeUserMetrics?.gymAccess) + parseInt(activeUserMetrics?.wellnessStipend) + parseInt(activeUserMetrics?.groupBreathworkSessions))/3).toFixed(2),
      Candidate: ((parseInt(randomCard.gymAccess) + parseInt(randomCard.wellnessStipend)+ parseInt(randomCard.groupBreathworkSessions))/3).toFixed(2),
      
    },
    {
      name: 'Diversity',
      Self: ((parseInt(activeUserMetrics?.inclusivity) + parseInt(activeUserMetrics?.ecoConciousValues))/2).toFixed(2),
      Candidate: ((parseInt(randomCard.inclusivity) + parseInt(randomCard.ecoConciousValues))/2).toFixed(2),
      
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
            <h2>{compatibility_percentage}% Match</h2></div>
        ) : (
          <div className="cardItem">
            <h1 style={{margin:0}}>No swipes left.</h1>
          </div>
        )}
         {randomCard.id ? 
        <ResponsiveContainer width="90%" height="70%">
        <BarChart
          width={400}
          height={400}
          data={data}
          margin={{
            top: 0,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 5]}/>
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
 
 
  setSwipeToggle: PropTypes.func.isRequired,
  swipeToggle: PropTypes.bool.isRequired
};

export default DisplayCard;
