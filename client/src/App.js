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
import Cookies from 'js-cookie'
import UserProfile from './components/UserProfile';
import StatsPage from './components/StatsPage';


function App() {

  const { user, setUser } = useContext(UserContext)
  const [habits, setHabits] = useState([])
  const [stats, setStats] = useState([])

  // useEffect(() => {
  //   fetch("/check_session").then((response) => {
  //     if (response.ok) {
  //       response.json().then((user) => setUser(user));
  //     }
  //   });

  // }, []);

  useEffect(() => {
    fetch("/habits")
      .then((response) => {
        if (response.ok) {
          response.json().then((habits) => setHabits(habits));
        }
      })
  }, [])

  useEffect(() => {
    fetch("/stats")
      .then((response) => {
        if (response.ok) {
          response.json().then((stats) => setStats(stats));
        }
      })
  }, [])

  const addStatToState = (newStat) => {
    setStats([...stats, newStat])
  }

  const removeStatFromState = (deletedStatId => {
    setStats(stats => stats.filter(stat => {
      return stat.id != deletedStatId
    }))
  })



  function handleLogout() {
    setUser(null);
  }

  let habitCard = habits.map(habit => <HabitsCard key={habit.id} habit={habit} addStat={addStatToState} />)


  return (
    <div>

      <Routes>
        <Route index element={<Root onLogout={handleLogout} user={user} />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<SignUp onLogin={setUser} />} />
        <Route path="/userdash" element={<UserDash removeStat={removeStatFromState} />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/habits" element={<HabitsList habitCard={habitCard} />} />
        <Route path="/userstats" element={<StatsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;

