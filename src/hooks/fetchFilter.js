import { useState, useEffect } from "react";

const fetchFilter = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://apiv1.lacuponera.store/api/v1/categories");
        if (!response.ok) throw new Error("Error al obtener las categorías");
        
        const data = await response.json();
        setCategories(data.categories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default fetchFilter;
