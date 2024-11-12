import { useEffect, useState } from "react";
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
 
//Implementing swipe functionality
const [touchStart, setTouchStart] = useState(null);
const [touchEnd, setTouchEnd] = useState(null);
const [translateX, setTranslateX] = useState(0); // Track position
  const minSwipeDistance = 100;

  const onTouchStart = (e) => {
    setTouchEnd(null); 
    setTouchStart(e.targetTouches[0].clientX); 
    setTranslateX(0); // Reset position on start
  };

  const onTouchMove = (e) => {
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch); 
    setTranslateX(currentTouch - touchStart); // Update translateX
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleLeftClick();
      setTranslateX(-window.innerWidth); // Animate off-screen left
    } else if (isRightSwipe) {
      handleRightClick();
      setTranslateX(window.innerWidth); // Animate off-screen right
    } else {
      setTranslateX(0); // Reset if no swipe detected
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

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
    <div className="displaycard" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} style={{
        transform: `translateX(${translateX}px)`, // Move the card based on translateX
        transition: touchEnd ? "transform 0.3s ease" : "none", // Smooth transition
    }}>
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
            activeUser.id?
          <div className="cardItem">
            <h2 style={{margin:0}}>No swipes left.</h2>
          </div>:
            <div className="cardItem">
            <h2 style={{margin:0}}>Please login to find your match.</h2>
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
