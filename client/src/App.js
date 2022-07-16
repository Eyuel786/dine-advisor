import Header from './components/Header';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/home' element={<div>Home</div>} />
        <Route path='/restaurants' element={<div>Restaurants</div>} />
        <Route path='/restaurants/new' element={<div>Add Restaurant</div>} />
        <Route path='*' element={<div>Page not found</div>} />
      </Routes>
    </>
  );
}

export default App;
