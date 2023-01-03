
import './App.css';

import { Member } from './Member';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          My React App
        </h3>

        {/* <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/member">
                Member
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path='/member' component={Member}></Route>
        </Routes> */}
        <Member>
        </Member>
      </div>
    </BrowserRouter>
  );
}

export default App;
