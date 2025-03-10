//App.jsx
import { useState } from 'react';
import RecipeList from './components/RecipeList';
import MealName from './components/MealName';
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
          Recipe List
        </button>
      </div>
      {activeComponent == 'mealName' ? <MealName /> : <RecipeList />}
    </div>
  );
}

export default App;
