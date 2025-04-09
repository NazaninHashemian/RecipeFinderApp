// Categories.jsx
import { useEffect, useState } from 'react';
import './Categories.css';

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

const Categories: React.FC= () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{message: string} | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/categories.php`
        );

        const data = await response.json();
        if (data.categories) {
          setCategories(data.categories);
          // console.log(data.categories);
        } else {
          setCategories([]);
        }
        setLoading(false);
      } catch (error: unknown) {
        setLoading(false);
        if(error instanceof Error) setError({message: error.message});
      }
    };
    fetchCategories();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div className="category-list">
      <h1>Recipe Categories</h1>
      {categories.length > 0 ? (
        categories.map((category) => (
          <div key={category.idCategory}>
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              style={{ width: '100px', height: 'auto' }}
            />
            <h3>{category.strCategory}</h3>
            <p>{category.strCategoryDescription}</p>
          </div>
        ))
      ) : (
        <p>No categories available</p>
      )}
    </div>
  );
};
export default Categories;
