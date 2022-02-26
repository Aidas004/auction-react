import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage"
import LoginPage from "./pages/LoginPage";
import ToolBar from "./components/ToolBar";
import AllAuctions from "./pages/AllAuctions";
import CreateAuction from "./pages/CreteAuction";
import SinglePost from "./pages/SinglePost";
import {useState} from "react";

function App() {
const [user, setUser] = useState()
    const [timeNow, setTimeNow] = useState()
    const [countdown, setCountDown] = useState ()

    const now = new Date().getTime();
    function onclick () {
        setCountDown(now + 60000)
        console.log(countdown)
    }



    function getTime () {
        const now = new Date().getTime();
        const timeNow = new Date(now).toLocaleTimeString("lt-LT");
        setTimeNow(timeNow)
    }
    const a = setInterval(getTime, 1000)


  return (
    <div className="App d-flex column">
        <Router>
            <ToolBar timeNow={timeNow} user={user}/>
            <Routes>
                <Route path="/register" element={<RegistrationPage/>}/>
                <Route path="/login" element={<LoginPage setUser={setUser}/>}/>
                <Route path="/create" element={<CreateAuction />}/>
                <Route path="/" element={<AllAuctions onclick={onclick}  />}/>
                <Route path="/getSingle/:id" element={<SinglePost timeNow={timeNow} setUser={setUser} user={user} />}/>
            </Routes>
        </Router>

    </div>
  );
}

export default App;
