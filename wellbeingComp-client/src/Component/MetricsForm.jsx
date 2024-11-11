import { useState } from "react";
import "../Styles/Login.css";
import "../Styles/MetricsForm.css";
import { axiosInstance } from "../Services/config";
import useZuStore from "../zuStore";

const MetricsForm = () => {
  const [mentalHealthDays, setMentalHealthDays] = useState("1");
  const [therapyAccess, setTherapyAccess] = useState("1");
  const [digitalDetoxDays, setDigitalDetoxDays] = useState("1");
  const [gymAccess, setGymAccess] = useState("1");
  const [wellnessStipend, setWellnessStipend] = useState("1");
  const [flexibleHours, setFlexibleHours] = useState("1");
  const [workFromHome, setWorkFromHome] = useState("1");
  const [unlimitedPto, setUnlimitedPto] = useState("1");
  const [inclusivity, setInclusivity] = useState("1");
  const [ecoConciousValues, setEcoConciousValues] = useState("1");
  const [careerPathClarity, setCareerPathClarity] = useState("1");
  const [groupBreathworkSessions, setGroupBreathworkSessions] = useState("1");

  const user_id = parseInt(useZuStore((state) => state.activeUser.id));
  console.log(user_id);
  const isCompany =
    useZuStore((state) => state.activeUser.isCompany) == 1 ? 1 : 0;

  const setRandomCard = useZuStore((state) => state.setRandomCard);

  const handleMentalHealthDays = (e) => {
    setMentalHealthDays(e.target.value);
    console.log(mentalHealthDays);
  };

  const handleTherapyAccess = (e) => {
    setTherapyAccess(e.target.value);
  };

  const handleDigitalDetoxDays = (e) => {
    setDigitalDetoxDays(e.target.value);
  };

  const handleGymAccess = (e) => {
    setGymAccess(e.target.value);
  };

  const handleWellnessStipend = (e) => {
    setWellnessStipend(e.target.value);
  };
  const handleFlexibleHours = (e) => {
    setFlexibleHours(e.target.value);
  };
  const handleWorkFromHome = (e) => {
    setWorkFromHome(e.target.value);
  };
  const handleUnlimitedPto = (e) => {
    setUnlimitedPto(e.target.value);
  };
  const handleInclusivity = (e) => {
    setInclusivity(e.target.value);
  };
  const handleEcoConciousValues = (e) => {
    setEcoConciousValues(e.target.value);
  };
  const handleCareerPathClarity = (e) => {
    setCareerPathClarity(e.target.value);
  };
  const handleGroupBreathworkSessions = (e) => {
    setGroupBreathworkSessions(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/metrics/create", {
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
      })
      .then((response) => {
        console.log("Uploaded Metrices", response.data);
        setRandomCard(response.data);
        alert("Uploaded Metrices");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error uploading:", error);
        alert("Error uploading metrices", error);
      });
  };

  return (
    <div className="metrics_component">
      <h2>Fill in your Metrices</h2>

      <form onSubmit={handleSubmit} className="metrics_comp_form">
        <div className="metricsDiv">
          <div className="metricsSubDiv mentalWBDiv">
            <label>Mental Health Days:</label>
            <select
              className="metrics_input"
              value={mentalHealthDays}
              onChange={handleMentalHealthDays}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <label>Therapy Access:</label>
            <select
              className="metrics_input"
              value={therapyAccess}
              onChange={handleTherapyAccess}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label>Digital Detox Days:</label>
            <select
              className="metrics_input"
              value={digitalDetoxDays}
              onChange={handleDigitalDetoxDays}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="metricsSubDiv fitnessDiv">
            <label>Gym Access:</label>
            <select
              className="metrics_input"
              value={gymAccess}
              onChange={handleGymAccess}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label>Wellness Stipend:</label>
            <select
              className="metrics_input"
              value={wellnessStipend}
              onChange={handleWellnessStipend}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label>Group Breathwork Sessions:</label>
            <select
              className="metrics_input"
              value={groupBreathworkSessions}
              onChange={handleGroupBreathworkSessions}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="metricsSubDiv flexibilityDiv">
            <label>Flexible Hours:</label>
            <select
              className="metrics_input"
              value={flexibleHours}
              onChange={handleFlexibleHours}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label>Work From Home:</label>
            <select
              className="metrics_input"
              value={workFromHome}
              onChange={handleWorkFromHome}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
           
          </div>
          <div className="metricsSubDiv diversityDiv">
            <label>Inclusivity:</label>
            <select
              className="metrics_input"
              value={inclusivity}
              onChange={handleInclusivity}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label>Eco-Concious Values:</label>
            <select
              className="metrics_input"
              value={ecoConciousValues}
              onChange={handleEcoConciousValues}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="metricsSubDiv growthDiv">
            <label>Career Path Clarity:</label>
            <select
              className="metrics_input"
              value={careerPathClarity}
              onChange={handleCareerPathClarity}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label>Unlimited PTO:</label>
            <select
              className="metrics_input"
              value={unlimitedPto}
              onChange={handleUnlimitedPto}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
         
        </div>

        <button type="submit" className="signin_button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MetricsForm;
