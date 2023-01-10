function sortRecipesWithNativeLoop(recipes, sortCriteria) {
    let recettesFiltres = []

    // filter en fn du nom
    if(sortCriteria.hasOwnProperty('name') && sortCriteria.name.length >= 3) {
        let recetteFiltresCurrent = []
        let input = sortCriteria.name
        for(let i = 0; i < recipes.length; i++) {
            if(recipes[i].name.toLowerCase().includes(input.toLowerCase())){
                recetteFiltresCurrent.push(recipes[i])
            }
            if(recipes[i].description.toLowerCase().includes(input.toLowerCase()) && recetteFiltresCurrent.find(e => e.id === recipes[i].id) === undefined) {
                recetteFiltresCurrent.push(recipes[i])
            }
            for(let j = 0; j < recipes[i].ingredients.length; j++) {
                if(recipes[i].ingredients[j].ingredient.toLowerCase().includes(input.toLowerCase()) && recetteFiltresCurrent.find(e => e.id === recipes[i].id) === undefined) {
                    recetteFiltresCurrent.push(recipes[i])
                }
            }
        }

        recettesFiltres = recetteFiltresCurrent
    } else {
        recettesFiltres = [...recipes]
    }

    // filtrer ensuite en fn des ingrédients
    if(sortCriteria.hasOwnProperty('ingredients')) {
        const ingredientUtilise = sortCriteria.ingredients
        let recetteFiltresCurrent = []
        for(let i = 0; i < recettesFiltres.length; i++){
            let ingredientCounter = 0
            let j = 0
            while (j < ingredientUtilise.length){
                for(let n = 0; n < recettesFiltres[i].ingredients.length; n++){
                    if(recettesFiltres[i].ingredients[n].ingredient === ingredientUtilise[j]){
                        ingredientCounter ++
                    }
                }
                j++
            }
            if(ingredientCounter === ingredientUtilise.length) {
                recetteFiltresCurrent.push(recettesFiltres[i])
            }
        }
        recettesFiltres = recetteFiltresCurrent
    }

    // filtrer ensuite en fn des ustensils
    if (sortCriteria.hasOwnProperty('ustensils')) {
        const ustensilUtilse = sortCriteria.ustensils
        let recetteFiltresCurrent = []
        for(let i = 0; i < recettesFiltres.length; i++){
            let includesAllUstensils = true
            let j = 0
            while (j < ustensilUtilse.length){
                if(!recettesFiltres[i].ustensils.includes(ustensilUtilse[j])){
                    includesAllUstensils = false
                }
                j++
            }
            if(includesAllUstensils) {
                recetteFiltresCurrent.push(recettesFiltres[i])
            }
        }
        recettesFiltres = recetteFiltresCurrent
    }

    // filtrer ensuite en fn des équipements
    if(sortCriteria.hasOwnProperty('appliance')) {
        let recetteFiltresCurrent = []
        for(let i = 0; i < recettesFiltres.length; i++) {
            if(recettesFiltres[i].appliance.includes(sortCriteria.appliance)){
                recetteFiltresCurrent.push(recettesFiltres[i])
            }
        }
        recettesFiltres = recetteFiltresCurrent
    }

    recettesFiltres.sort((a, b) => a.id - b.id)

    return recettesFiltres
}

const result2 = sortRecipesWithNativeLoop(recipes, {
    name: 'cho',
})