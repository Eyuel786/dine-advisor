import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RestaurantsList from './pages/RestaurantsList';
import AddRestaurant from './pages/AddRestaurant';
import RestaurantDetail from './pages/RestaurantDetail';
import EditRestaurant from './pages/EditRestaurant';
import { fetchAllRestaurants } from './store';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.auth);
  console.log(user.token);

  useEffect(() => {
    dispatch(fetchAllRestaurants());
  }, [dispatch]);


  const ProtectedRoute = ({ token, children, redirectPath = '/restaurants' }) => {
    if (!token) return <Navigate to={redirectPath} replace />

    return children;
  }

  return (
    <>
      <Header
        token={user.token}
        image={user.image}
        username={user.username} />
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/home' element={<Home />} />
        <Route path='/restaurants' element={<RestaurantsList />} />
        <Route path='/restaurants/new' element={
          <ProtectedRoute token={user.token}>
            <AddRestaurant />
          </ProtectedRoute>} />
        <Route path='/restaurants/:id' element={<RestaurantDetail userId={user.userId} />} />
        <Route path='/restaurants/:id/edit' element={
          <ProtectedRoute token={user.token}>
            <EditRestaurant />
          </ProtectedRoute>} />
        <Route path='/about' element={<div>About Us</div>} />
        <Route path='/contact' element={<div>Contact Us</div>} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<div>Page not found</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
