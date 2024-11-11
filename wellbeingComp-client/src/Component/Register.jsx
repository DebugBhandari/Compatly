import { useState } from 'react';
import "../Styles/Login.css";
import { axiosInstance } from '../Services/config';

const Register = () => {
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [isCompany, setIsCompany] = useState('');

    const handleRegister = () => {
        // Perform registration logic here
        console.log('Registering user:', { email, fullname, password, isCompany });
        axiosInstance.post('/register', { fullname, email, password, isCompany })
            .then((response) => {
                console.log('Registration successful:', response.data);
                alert('Registration successful');
                window.location.href = "/login";

            })
            .catch((error) => {
                console.error('Error registering user:', error);
                alert('Error registering user', error);
            });

    };

    return (
        <div className="login_component">
            <h2>Register</h2>
            <form className="login_comp_form">
               
                <div className="radioDiv">
                <label>Candidate
                <input type="radio" id="candidate" name="isCompany"  onChange={()=> setIsCompany(0)} /></label>
                <label>Company
                <input type="radio" id="company" name="isCompany"  onChange={()=> setIsCompany(1)} /></label></div>
                <label>Email:</label>
                <input className="login_input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Full Name:</label>
                <input className="login_input"
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />

                <label>Password:</label>
                <input className="login_input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="signin_button" type="button" onClick={handleRegister}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;