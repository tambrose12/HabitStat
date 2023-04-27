import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router'
import { Root, NotFound } from './components/landings'
import SignUp from './components/SignUp'
import Login from './components/Login';
import UserDash from './components/UserDash';
import NavBar from './components/NavBar';
import { UserProvider } from './components/context/user';
import { UserContext } from './components/context/user';


function App() {

  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);


  function handleLogout() {
    setUser(null);
  }

  // console.log(`Hello ${user.username}!`)

  return (
    <div>
      <UserProvider >
        <NavBar onLogout={handleLogout} />
      </UserProvider>

      <Routes>
        <Route index element={<Root onLogout={handleLogout} user={user} />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<SignUp onLogin={setUser} />} />
        <Route path="/userdash" element={<UserDash user={user} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
