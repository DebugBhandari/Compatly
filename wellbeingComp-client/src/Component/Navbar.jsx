import "../Styles/Navbar.css";
import useZuStore from "../zuStore";

export default function Navbar() {
    const activeUser = useZuStore(state => state.activeUser);
    const activeUserMetrics = useZuStore(state => state.activeUserMetrics);
    const logOut = useZuStore(state => state.logOut);
    const handleRoute = (e) => {
        if(e.target.innerHTML === "Register"){
            window.location.href = "/register";
        }else if(e.target.innerHTML === "Login"){
            window.location.href = "/login";
        }
        else{
            window.location.href = "/";
        }
    }
    const handleLogout = () => {
        logOut();
        window.location.href = "/";
    }


  return (
    <div className="navbar">
     
        
        <div className="navbar_logo_title" onClick={handleRoute}>
          <h1>Compatly</h1>
          <h6>Companies Candidates Compatibilities</h6>
        </div>
     
      {activeUser.fullname ? <div className="navDropDown">
        <button className={activeUser.isCompany=="0"?"userButton":"companyButton"}>{activeUser.fullname.split(" ")[0]}</button>
        <div className="navDropDownContent">
          <div className="navDropDownCardTop">
          <h2>{activeUser.fullname}</h2>
          <h4>{activeUser.email}</h4>
          <button className="signin_button" onClick={()=> window.location.href = "/profile"}>Profile</button>
        </div>
        <div className="navDropDownCardBottom">
          {!activeUserMetrics[0]?.id?<button className="signin_button" onClick={()=> window.location.href = "/metricsForm"}>Metrics</button>:
          <button className="signin_button" onClick={()=> window.location.href = "/editMetricsForm"}>Metrics</button>}
          
          <button className="companyButton" onClick={handleLogout}>Logout</button></div></div>
      </div>:
      <div className="navbar_menu">
        <button className="companyButton" onClick={handleRoute}>Register</button>
        <button className="signin_button" onClick={handleRoute}>Login</button>
      </div>}
    </div>
  );
}


