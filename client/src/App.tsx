import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from './redux/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { AnyAction } from "redux";
import ProtectedRoute from './config/ProtectedRoute';
import Home from './pages/Home/Home';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import About from './pages/About/About';
import Contribute from './pages/Contribute/Contribute';
import SubjectBrowser from './pages/SubjectBrowser/Subjects';
import Profile from './pages/User/Profile';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import Subject from './pages/Subject/Subject';
import Notes from './pages/Notes/Notes';
import Dashboard from './pages/Admin/Dashboard';
import AddSubject from './pages/Admin/AddSubject';
import Subjects from './pages/Admin/Subjects';
import Users from './pages/Admin/Users';
import NotFound from './components/Layout/NotFound';
import Loader from './components/Layout/Loader';
import ChangePassword from './pages/User/ChangePassword';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUser() as unknown as AnyAction);
  }, [dispatch])
  
  const { isAuthenticated, user, loading, message, error } = useSelector((state: any) => state.auth);
  
  useEffect(() => {
    if(error) {
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
            <Route path="/about" element={<About />} />
            
            <Route
              path="/contribute"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Contribute />
                </ProtectedRoute>
              }>
            </Route>

            <Route path="/subjects" element={<SubjectBrowser />} />
            <Route path="/subject/:id" element={<Subject />} />
            <Route path="/notes/:id" element={<Notes />} />

            <Route
              path="/auth/login"
              element={
                <ProtectedRoute isAuthenticated={!isAuthenticated} redirect={"/user/profile"}>
                  <Login />
                </ProtectedRoute>
              }>
            </Route>

            <Route
              path="/auth/register"
              element={
                <ProtectedRoute isAuthenticated={!isAuthenticated} redirect={"/user/profile"}>
                  <Register />
                </ProtectedRoute>
              }>
            </Route>

            <Route
              path="/auth/forgot_password"
              element={
                <ProtectedRoute isAuthenticated={!isAuthenticated} redirect={"/user/profile"}>
                  <ForgotPassword />
                </ProtectedRoute>
              }>
            </Route>

            <Route
              path="/auth/reset_password/:token"
              element={
                <ProtectedRoute isAuthenticated={!isAuthenticated} redirect={"/user/profile"}>
                  <ResetPassword />
                </ProtectedRoute>
              }>
            </Route>
            
            <Route
              path="/user/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile user={user} />
                </ProtectedRoute>
              }>
            </Route>
            
            <Route
              path="/user/change_password"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ChangePassword />
                </ProtectedRoute>
              }>
            </Route>

            <Route path="*" element={<NotFound />}></Route>
            
            {/* Admin Routes ------------------------------------------------------------------------------------------------------ */}

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute adminRoute={true} isAuthenticated={isAuthenticated} isAdmin={user && user.role === "admin"}>
                  <Dashboard />
                </ProtectedRoute>
              }>
            </Route>

            <Route
              path="/admin/add_subject"
              element={
                <ProtectedRoute adminRoute={true} isAuthenticated={isAuthenticated} isAdmin={user && user.role === "admin"}>
                  <AddSubject />
                </ProtectedRoute>
              }>
            </Route>

            <Route
              path="/admin/subjects"
              element={
                <ProtectedRoute adminRoute={true} isAuthenticated={isAuthenticated} isAdmin={user && user.role === "admin"}>
                  <Subjects />
                </ProtectedRoute>
              }>
            </Route>

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute adminRoute={true} isAuthenticated={isAuthenticated} isAdmin={user && user.role === "admin"}>
                  <Users />
                </ProtectedRoute>
              }>
            </Route>
          </Routes>

          <Footer />
          <Toaster />
        </>
      )}
    </Router>
  );
}

export default App;