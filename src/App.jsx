//App.jsx
import { useState } from 'react';
import RecipeList from './components/RecipeList';
import MealName from './components/MealName';
import './app.css';

function App() {
  const [activeComponent, setActiveComponent] = useState('mealName');
  return (
    <div>
      <div>
        <button onClick={() => setActiveComponent('mealName')}>
          Meal Name
        </button>
        <button onClick={() => setActiveComponent('mainIngredien')}>
          Recipe List
        </button>
      </div>
      {activeComponent == 'mealName' ? <MealName /> : <RecipeList />}
    </div>
  );
}

export default App;
