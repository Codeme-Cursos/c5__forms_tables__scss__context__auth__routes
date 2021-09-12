import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar, { NavbarAdmin } from '../components/navbar/Navbar';
import { hasData } from '../components/utils/hasData';
import Admin from '../pages/Admin';
import Home from '../pages/home/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Products from '../pages/Products';

export default function Routes() {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
  };

  const login = (data) => {
    const { email, token } = data;
    setUser({
      email,
      token,
    });
  };

  return (
    <Router>
      {!hasData(user) ? (
        <>
          <Navbar />
          <div className="general_container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/products" component={Products} />
              <Route
                exact
                path="/login"
                component={() => <Login login={login} />}
              />
            </Switch>
          </div>
        </>
      ) : (
        <>
          <NavbarAdmin logout={logout} />
          <div className="general_container">
            <Switch>
              <Route exact path="/" component={Admin} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      )}
    </Router>
  );
}
