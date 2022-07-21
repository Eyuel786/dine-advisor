import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RestaurantsList from './pages/RestaurantsList';
import AddRestaurant from './pages/AddRestaurant';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/home' element={<Home />} />
        <Route path='/restaurants' element={<RestaurantsList />} />
        <Route path='/restaurants/new' element={<AddRestaurant />} />
        <Route path='/about' element={<div>About Us</div>} />
        <Route path='/contact' element={<div>Contact Us</div>} />
        <Route path='*' element={<div>Page not found</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
