import './App.css';
//Router for routing means navigating between pages
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import App1 from './components/App1';

//entry point via index.html in public folder
function App() {
  return (
    //Router must enclose whole frontend code
    <Router>
      <div className="container px-0">
        <Routes>
          {/*to login page can be reached directly, via home page, or via signup*/}
          <Route exact path='/login' element={<Login signup={false} />} />
          {/*to signup page can be reached directly, via home page, or via login*/}
          <Route exact path='/signup' element={<Login signup={true}/>} />
          {/*home page... initial not logged in.... if logged in or signuped localStorage get set to email...and history and bookmark is activated... data gets stored in db*/}
          <Route exact path='/*' element={<App1 />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
