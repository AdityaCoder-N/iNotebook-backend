import './App.css';
import {useState} from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {

  const [alert,setAlert] = useState(null);  // manages alert

  const showAlert = (message,type) =>{
    setAlert({
      msg:message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar/>
        <Alert alert={alert} />

        
        <Routes>

          
          <Route path="/" element={<Home showAlert={showAlert} />}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login showAlert={showAlert} />}/>
          <Route path="/signup" element={<SignUp showAlert={showAlert} />}/>

        </Routes>

      </BrowserRouter>
      
      
    </NoteState>
    </>
  );
}

export default App;
