// algo de tri

function sortRecipesWithArrayMethod(recipes, sortCriteria) {
    let recettesFiltres = recipes

    // trier d'abord par l'input de la barre de recherche
    if(sortCriteria.hasOwnProperty('name') && sortCriteria.name.length >= 3) {
        let input = sortCriteria.name
        let recetteFiltresCurrent = recettesFiltres.filter(recette => recette.name.toLowerCase().includes(input.toLowerCase()))
        
        recipes.map(recette => {
            recette.ingredients.map(ingredientObj => {
                if(ingredientObj.ingredient.toLowerCase().includes(input.toLowerCase()) && recetteFiltresCurrent.find(e => e.id === recette.id) === undefined) {
                    recetteFiltresCurrent.push(recette)
                }
            })
            if(recette.description.toLowerCase().includes(input.toLowerCase()) && recetteFiltresCurrent.find(e => e.id === recette.id) === undefined) {
                recetteFiltresCurrent.push(recette)
            }   
            
        })
        recettesFiltres = recetteFiltresCurrent
    }

    // filtrer ensuite les recettes en fn des ingrédients
    if(sortCriteria.hasOwnProperty('ingredients')) {
        const ingredientUtilise = sortCriteria.ingredients
        let recetteFiltresCurrent = []
        recettesFiltres.map(recette => {
            let ingredientCounter = 0
            recette.ingredients.map(ingredientObj => {
                if(ingredientUtilise.includes(ingredientObj.ingredient)) {
                    ingredientCounter ++
                }
            })
            if(ingredientUtilise.length === ingredientCounter) {
                recetteFiltresCurrent.push(recette)
            }
        })
        recettesFiltres = recetteFiltresCurrent
    }
        

    // filtrer ensuite en fn des ustensils
    if(sortCriteria.hasOwnProperty('ustensils')) {
        const ustensilUtilse = sortCriteria.ustensils
        let recetteFiltresCurrent = []
        recettesFiltres.map(recette => {
            let ustensilCounter = 0
            recette.ustensils.map(ustensil => {
                if(ustensilUtilse.includes(ustensil)) {
                    ustensilCounter ++
                }
            })
            if(ustensilCounter === ustensilUtilse.length) {
                recetteFiltresCurrent.push(recette)
            }
        })
        recettesFiltres = recetteFiltresCurrent
    }

    // filtrer ensuite en fn des apparteils
    if(sortCriteria.hasOwnProperty('appliance')) {
        recettesFiltres = recettesFiltres.filter(recette => recette.appliance.includes(sortCriteria.appliance))
    }

    recettesFiltres.sort((a, b) => a.id - b.id)

    return recettesFiltres
}