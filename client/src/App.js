import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router'
import { Root, NotFound } from './components/landings'
import SignUp from './components/SignUp'
import Login from './components/Login';
import UserDash from './components/UserDash';


function App() {

  const [user, setUser] = useState(null);

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
    <Routes>
      <Route index element={<Root onLogout={handleLogout} user={user} />} />
      <Route path="/login" element={<Login onLogin={setUser} />} />
      <Route path="/signup" element={<SignUp onLogin={setUser} />} />
      <Route path="/userdash" element={<UserDash user={user} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
