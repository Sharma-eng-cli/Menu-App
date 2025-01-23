export const fetchRecipes = async () => {
  try {
    const response = await fetch("https://dummyjson.com/recipes");
    const data = await response.json();
    return data.recipes; // Return only the recipes array
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
