import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactGA from "react-ga4";
import { useEffect } from 'react';
import { getUser } from './redux/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { AnyAction } from "redux";
import Home from './pages/Home/Home';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Notes from './pages/Notes/Notes';
import NotFound from './components/Layout/NotFound';
import Loader from './components/Layout/Loader';

const TRACKING_ID = "G-M2VTB22JD3";
ReactGA.initialize(TRACKING_ID);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser() as unknown as AnyAction);
  }, [dispatch])

  const { isAuthenticated, loading, error, message } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if(error && error !== "Please login to access") {
      toast.error(error)
      dispatch({ type: "clearError" });
    }

    if(message) {
      toast.success(message)
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message])
  
  return (
    <Router>
      {
        loading ? ( <Loader /> ) : (
        <>
          <Navbar isAuthenticated={isAuthenticated} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes/:id" element={<Notes />} />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>

          <Footer />
          <Toaster />
        </>
      )}
    </Router>
  );
}

export default App;