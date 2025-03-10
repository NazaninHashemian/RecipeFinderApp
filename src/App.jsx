//App.jsx
import RecipeList from './components/RecipeList';
import MealName from './components/MealName';
import './app.css';

function App() {
  const [activeComponent, setActiveComponent] = useState('mealName');
  return (
    <>
      <MealName />
      <RecipeList />
    </>
  );
}

export default App;
