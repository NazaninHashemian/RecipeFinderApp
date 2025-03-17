import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainIngredient from './components/MainIngredient';
import MealName from './components/MealName';
import MealFirstLetter from './components/MealFirstLetter';
import Categories from './components/Categories';
import Cuisine from './components/Cuisine';
import Random from './components/Random';
import './app.css';

function App() {
  return (
    <Router>
      <div className="nav">
        <Link to="/name">
          {' '}
          <button>Name</button>{' '}
        </Link>
        <Link to="/first-letter">
          {' '}
          <button>First Letter</button>{' '}
        </Link>
        <Link to="/ingredient">
          {' '}
          <button>Ingredient</button>{' '}
        </Link>
        <Link to="/cuisine">
          {' '}
          <button>Cuisine</button>{' '}
        </Link>
        <Link to="/random">
          {' '}
          <button>Random</button>{' '}
        </Link>
        <Link to="/category">
          {' '}
          <button>Category</button>{' '}
        </Link>
      </div>

      <Routes>
        <Route path="/name" element={<MealName />} />
        <Route path="/first-letter" element={<MealFirstLetter />} />
        <Route path="/ingredient" element={<MainIngredient />} />
        <Route path="/cuisine" element={<Cuisine />} />
        <Route path="/random" element={<Random />} />
        <Route path="/category" element={<Categories />} />
        <Route path="*" element={<MealName />} /> {/* Default Route */}
      </Routes>
    </Router>
  );
}

export default App;
