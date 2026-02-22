import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submited, setSubmited] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async(event, username, password) => {
        event.preventDefault();
        if(submited) return;
        setSubmited(true);
        //axios post for user verification
        try {
            const res = await axios.get('http://localhost:9000/getUser', { params: {username: username, password: password}})
                .catch((err) => {
                    alert(`Error in logging in: ${err}`);
                });
            if(res.status === 400) { //invalid username or password
                alert("Username or Password is incorrect");
            } else if (res.status === 200) { //Use admin login route
                localStorage.clear();
                localStorage.setItem('loggedInUser', JSON.stringify(res.data));
                navigate('/AdminHome');
            } else { //Use normal login route
                console.log(res.data);
                localStorage.clear();
                localStorage.setItem('loggedInUser', JSON.stringify(res.data));
                navigate('/Home');
            }
            
        } catch(err) {
            console.log(err);
        }
        finally {
            setSubmited(false);
        }
    }

    return (
        <div className="loginContainer">
            <form>
                <div className="form-group" style={{margin: '5px 0px 5px 0px'}}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group" style={{margin: '5px 0px 5px 0px'}}>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required                        
                    />
                </div>
                <div className="form-group">
                    <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={(event) => handleSubmit(event, username, password)}
                    >
                    Login
                    </button>
                </div>
                
                <label>Don't have account? <Link to="/SignUp">SignUp</Link></label>
            </form>
        </div>
    );
}

export default Login;