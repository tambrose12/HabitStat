import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useContext } from 'react';
import { Routes, Route, Redirect } from 'react-router'
import { Root, NotFound } from './components/landings'
import SignUp from './components/SignUp'
import Login from './components/Login';
import UserDash from './components/UserDash';
import NavBar from './components/NavBar';
import { UserProvider } from './components/context/user';
import { UserContext } from './components/context/user';
import HabitsCard from './components/HabitsCard'
import HabitsList from './components/HabitsList'
// import AuthApi from './AuthApi';
import useSession from './components/useSession';
import Cookies from 'js-cookie'
import UserProfile from './components/UserProfile';


function App() {

  const { user, setUser } = useContext(UserContext)
  const [habits, setHabits] = useState([])

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });

  }, []);

  useEffect(() => {
    fetch("/habits")
      .then((response) => {
        if (response.ok) {
          response.json().then((habits) => setHabits(habits));
        }
      })
  }, [])

  function handleLogout() {
    setUser(null);
  }

  let habitCard = habits.map(habit => <HabitsCard key={habit.id} habit={habit} />)


  return (
    <div>

      <Routes>
        <Route index element={<Root onLogout={handleLogout} user={user} />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<SignUp onLogin={setUser} />} />
        <Route path="/userdash" element={<UserDash />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/habits" element={<HabitsList habitCard={habitCard} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;

