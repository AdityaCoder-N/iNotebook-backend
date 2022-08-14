import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';

import styles from '../css/logincss.module.css'

const SignUp = (props) => {

    const host = "http://localhost:3001";
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
    
    let navigate = useNavigate();

    const onChange =(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(credentials.password!==credentials.cpassword){
            alert("Confirm Password Doesnt Match");
            return;
        }

        let url = `${host}/api/auth/createuser`;

        const response = await fetch(url, {
            method: 'POST', 
            
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name : credentials.name ,email : credentials.email, password : credentials.password})
        });

        const json = await response.json();
        console.log(json);

        if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token',json.authToken);
            navigate("/");
            props.showAlert("Account Created Successfully","success");
        }
        else{
            props.showAlert("Invalid Details","danger");
        }

    }
    return (
        <div className={styles.main_div}>
        <div className={styles.box}>

            <h1 className={styles.heading}>SignUp</h1>
            <form onSubmit={handleSubmit} >
                <div className={styles.inputBox}>
                    <label htmlFor="name" >Name</label>
                    <input type="text"  id="name" aria-describedby="emailHelp" onChange={onChange} name="name" value={credentials.name} required/>
                </div>
                <div className={styles.inputBox}>
                    <label htmlFor="email" >Email address</label>
                    <input type="email"  id="email" aria-describedby="emailHelp" onChange={onChange} name="email" value={credentials.email} required/>
                </div>
                <div className={styles.inputBox}>
                    <label htmlFor="password" >Password</label>
                    <input type="password"  id="password" onChange={onChange} name="password" value={credentials.password} required minLength={5}/>
                </div>
                <div className={styles.inputBox}>
                    <label htmlFor="cpassword" >Confirm Password</label>
                    <input type="password"  id="cpassword" onChange={onChange} name="cpassword" value={credentials.cpassword} required minLength={5}/>
                </div>
                <button type="submit" className={styles.loginbtn}>Create Account</button>

                <p style={{color:"white",marginTop:"15px"}} >Already have an account?</p>
                <Link className='btn-link' type="button" to="/login" style={{color:"white"}}>Login</Link>
            </form>
        </div>
        </div>
    )
}

export default SignUp