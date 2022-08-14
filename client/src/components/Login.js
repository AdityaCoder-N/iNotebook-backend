import React,{useState} from 'react'
import { Link, useNavigate } from "react-router-dom";

import styles from '../css/logincss.module.css'

const Login = (props) => {

    const host = "http://localhost:3001";
    const [credentials, setCredentials] = useState({email:"",password:""});
    
    let navigate = useNavigate();

    const onChange =(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
      }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        let url = `${host}/api/auth/login`;

        const response = await fetch(url, {
            method: 'POST', 
            
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email : credentials.email, password : credentials.password})
        });

        const json = await response.json();
        console.log(json);

        if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token',json.authToken);
            navigate("/");
            props.showAlert("Logged in Successfully","success");
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }

    }

    return (
        <div className={styles.main_div}>
        <div className={styles.box}>
            <h1 className={styles.heading} >Login</h1>
            <form onSubmit={handleSubmit} >
                <div className={styles.inputBox}>
                    <label htmlFor="email">Email address</label>
                    <input onChange={onChange} type="email" value={credentials.email}  id="email" name="email" aria-describedby="emailHelp" />
                </div>
                <div className={styles.inputBox}>
                    <label htmlFor="password" >Password</label>
                    <input onChange={onChange} type="password" value={credentials.password} id="password" name="password"/>
                </div>
                
                <button type="submit" className={styles.loginbtn} >Login</button>

                <p style={{color:"white",marginTop:"15px"}} >Do not have an account? Create one!</p>
                <Link className='btn btn-link' type="button" to="/signup" style={{color:"white",padding:"0px 0px"}}>SignUp</Link>
            </form>
        </div>
        </div>
    )
}

export default Login