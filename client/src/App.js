import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Layout/Header';
import Courses from './components/Courses/Courses';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgetPassword from './components/Auth/ForgetPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import Subscribe from './components/Payment/Subscribe';
import NotFound from './components/Layout/NotFound';
import PaymentSuccess from './components/Payment/PaymentSuccess';
import PaymentFail from './components/Payment/PaymentFail';
import CourseDetails from './components/Courses/CourseDetails';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';
import ChangePassword from './components/Profile/ChangePassword';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import AdminCourses from './components/Admin/Dashboard/Courses/AdminCourses';
import CreateCourse from './components/Admin/Dashboard/Courses/CreateCourse';
import Users from './components/Admin/Dashboard/Users';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { getMyProfile } from './redux/actions/userAction';
import { ProtectedRoute } from 'protected-route-react';
import Loader from './components/Layout/Loader';

function App() {
  window.addEventListener('contextmenu', e => {
    e.preventDefault();
  });
  const { isAuthenticated, user, message, error, loading } = useSelector(
    state => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  // load user
  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Header isAuthenticated={isAuthenticated} user={user} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/changepassword"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updateprofile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UpdateProfile user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={ <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CourseDetails user={user} />
                </ProtectedRoute>} />
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/request" element={<Request />} />
            <Route
              path="/forgetpassword"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <ForgetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscribe"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Subscribe user={user} />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route path="/payment_success" element={<PaymentSuccess />} />
            <Route path="/payment_fail" element={<PaymentFail />} />
            <Route
              path="/resetpassword/:token"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            {/* Admin routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === 'admin'}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/admin_courses" element={<AdminCourses />} />
            <Route
              path="/admin/create_course"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === 'admin'}
                >
                  <CreateCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === 'admin'}
                >
                  <Users />
                </ProtectedRoute>
              }
            />
          </Routes>
        </>
      )}
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
