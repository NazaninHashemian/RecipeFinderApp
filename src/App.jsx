//App.jsx
import { useState } from 'react';
import RecipeList from './components/RecipeList';
import MealName from './components/MealName';
import MealFirstLetter from './components/MealFirstLetter';
import Categories from './components/Categories';
import Origin from './components/Origin';
import Random from './components/Random';
import './app.css';

function App() {
  const [activeComponent, setActiveComponent] = useState('mealName');

  // Define the components and button configuration
  const components = {
    mealName: <MealName />,
    mealFirstLetter: <MealFirstLetter />,
    mainIngredient: <RecipeList />,
    cuisine: <Origin />,
    random: <Random />,
    category: <Categories />,
  };

  const buttons = [
    { name: 'mealName', content: 'Name' },
    { name: 'mealFirstLetter', content: 'First Letter' },
    { name: 'mainIngredient', content: 'Ingredient' },
    { name: 'cuisine', content: 'Cuisine' },
    { name: 'random', content: 'Random' },
    { name: 'category', content: 'Category' },
  ];

  return (
    <div>
      <div className="nav">
        {buttons.map(({ name, content }) => {
          return (
            <button
              key={name}
              onClick={() => setActiveComponent(name)}
              className={activeComponent === name ? 'active' : ''}
            >
              {content}
            </button>
          );
        })}
      </div>

      <div>{components[activeComponent]}</div>
    </div>
  );
}

export default App;
