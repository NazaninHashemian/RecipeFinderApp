//App.jsx
import { useState } from 'react';
import RecipeList from './components/RecipeList';
import MealName from './components/MealName';
import Categories from './components/Categories';
import './app.css';

function App() {
  const [activeComponent, setActiveComponent] = useState('mealName');
  return (
    <div>
      <div className="nav">
        <button
          onClick={() => setActiveComponent('mealName')}
          className={activeComponent === 'mealName' ? 'active' : ''}
        >
          Meal Name
        </button>
        <button
          onClick={() => setActiveComponent('mainIngredien')}
          className={activeComponent === 'mainIngredien' ? 'active' : ''}
        >
          Main Ingredient 
        </button>
        <button
          onClick={() => setActiveComponent('category')}
          className={activeComponent === 'category' ? 'active' : ''}
        >
          Category
        </button>
      </div>
      {activeComponent == 'mealName' ? (
        <MealName />
      ) : activeComponent == 'mainIngredien' ? (
        <RecipeList />
      ) : (
        <Categories />
      )}
    </div>
  );
}

export default App;
