import { useEffect } from 'react';
import { useAppDispatch } from './hooks/redux';
import { Outlet } from 'react-router';
import { refreshUser } from './store/reducers/auth/ActionCreators'
import './App.css';
import Navbar from './components/Navbar'

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
      dispatch(refreshUser())
  }, [dispatch]) 

  return (
    <div className="App">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
