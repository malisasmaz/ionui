import "./App.css";
import Login from "./components/Login/login";
import Welcome from "./components/Welcome/welcome";
import HomePage from "./components/HomePage/homepage";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="main">
        <div>
          <Route exact path='/' component={Welcome} />
        </div>
        <div>
          <Route exact path='/login' component={Login} />
        </div>
        <div>
          <Route exact path='/homepage' component={HomePage} />
        </div>
      </div>
    </Router>
  );
}

export default App;