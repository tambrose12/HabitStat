import './App.css';
import { useState, useEffect, useContext } from 'react';
import { Routes, Route, Redirect } from 'react-router'
import { Root, NotFound } from './components/landings'
import SignUp from './components/SignUp'
import Login from './components/Login';
import { UserContext } from './components/context/user';
import { StatsContext } from './components/context/stats';
import HabitsCard from './components/HabitsCard'
import HabitsList from './components/HabitsList'
import UserProfile from './components/UserProfile';
import StatsPage from './components/StatsPage';
import UserDash from './components/UserDash';



function App() {

  const { user, setUser } = useContext(UserContext)
  const [habits, setHabits] = useState([])
  const { stats, setStats } = useContext(StatsContext)

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

  if (!user) return (
    <div>
      <Routes>
        <Route index element={<Root onLogout={handleLogout} user={user} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  )

  return (
    <div>
      <Routes>
        <Route index element={<Root onLogout={handleLogout} user={user} />} />
        <Route path='/userdash' element={<UserDash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/habits" element={<HabitsList habitCard={habitCard} />} />
        <Route path="/userstats" element={<StatsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;

