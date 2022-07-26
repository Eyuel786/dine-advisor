import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RestaurantsList from './pages/RestaurantsList';
import AddRestaurant from './pages/AddRestaurant';
import RestaurantDetail from './pages/RestaurantDetail';
import EditRestaurant from './pages/EditRestaurant';
import { fetchAllRestaurants } from './store';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRestaurants());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/home' element={<Home />} />
        <Route path='/restaurants' element={<RestaurantsList />} />
        <Route path='/restaurants/new' element={<AddRestaurant />} />
        <Route path='/restaurants/:id' element={<RestaurantDetail />} />
        <Route path='/restaurants/:id/edit' element={<EditRestaurant />} />
        <Route path='/about' element={<div>About Us</div>} />
        <Route path='/contact' element={<div>Contact Us</div>} />
        <Route path='*' element={<div>Page not found</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
