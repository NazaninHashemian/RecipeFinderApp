//App.jsx
import { useState } from 'react';
import RecipeList from './components/RecipeList';
import MealName from './components/MealName';
import FirstLetter from './components/FirstLetter';
import Categories from './components/Categories';
import Origin from './components/Origin';
import './app.css';

function App() {
  const [activeComponent, setActiveComponent] = useState('mealName');

  // Define the components and button configuration
  const components = {
    mealName: <MealName />,
    firstLetter: <FirstLetter />,
    mainIngredient: <RecipeList />,
    category: <Categories />,
    origin: <Origin />,
  };

  const buttons = [
    { name: 'mealName', content: 'Name' },
    { name: 'firstLetter', content: 'First Letter' },
    { name: 'mainIngredient', content: 'Ingredient' },
    { name: 'category', content: 'Category' },
    { name: 'origin', content: 'Origin' },
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
