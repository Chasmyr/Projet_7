/* chat gpt
function sortRecipes(recipes, sortCriteria) {
    let filteredRecipes = recipes;
  
    // Trier les recettes en fonction du nom
    if (sortCriteria.hasOwnProperty('name')) {
      filteredRecipes = filteredRecipes.filter(recipe => {
        return recipe.name.includes(sortCriteria.name);
      });
    }
  
    // Filtrer les recettes en fonction des ingrédients sélectionnés
    if (sortCriteria.hasOwnProperty('ingredients')) {
      const selectedIngredients = sortCriteria.ingredients;
      filteredRecipes = filteredRecipes.filter(recipe => {
        for (const ingredient of selectedIngredients) {
          if (!recipe.ingredients.some(i => i.ingredient === ingredient)) {
            return false;
          }
        }
        return true;
      });
    }
  
    // Filtrer les recettes en fonction des appareils sélectionnés
    if (sortCriteria.hasOwnProperty('appliances')) {
      const selectedAppliances = sortCriteria.appliances;
      filteredRecipes = filteredRecipes.filter(recipe => {
        return selectedAppliances.includes(recipe.appliance);
      });
    }
  
    // Filtrer les recettes en fonction des ustensiles sélectionnés
    if (sortCriteria.hasOwnProperty('ustensils')) {
      const selectedUstensils = sortCriteria.ustensils;
      filteredRecipes = filteredRecipes.filter(recipe => {
        return recipe.ustensils.some(ustensil => selectedUstensils.includes(ustensil));
      });
    }
  
    // Trier les recettes filtrées par nom
    filteredRecipes.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  
    // Retourner les recettes filtrées
    return filteredRecipes
}

const recipeNames = sortRecipes(recipes, {
    name: 'choco',
    ingredients: ['Beurre'],
    ustensils: ['casserole', 'fouet'],
    appliance: ['Four']
});
console.log(recipeNames)
*/