// html element
const cardWrapper = document.querySelector('.card-wrapper')
const input = document.querySelector('.search-bar input')
const ingredientBody = document.querySelector('#collapseOne > .accordion-body')
const applianceBody = document.querySelector('#collapseTwo > .accordion-body')
const ustensilBody = document.querySelector('#collapseThree > .accordion-body')
const accordionIngr = document.getElementById('accordionOne')
const accordionApp = document.getElementById('accordionTwo')
const accordionUst = document.getElementById('accordionThree')
const tags = document.querySelector('.tags')

let filter = {
    name: '',
    ingredients: [],
    appliance: '',
    ustensils: []
}
let result = sortRecipesWithArrayMethod(recipes, filter)
render(result)

// ajouter l'input au clic du btn
const ingrBtn = accordionIngr.querySelector('.accordion-button')
accordionIngr.addEventListener('click', () => {
    // fermer les autres accordions
    if(!accordionApp.querySelector('.accordion-button').classList.contains('collapsed')) {
        accordionApp.querySelector('.accordion-button').classList.add('collapsed')
        document.getElementById('collapseTwo').classList.remove('show')
    }
    if(!accordionUst.querySelector('.accordion-button').classList.contains('collapsed')) {
        accordionUst.querySelector('.accordion-button').classList.add('collapsed')
        document.getElementById('collapseThree').classList.remove('show')
    }

    // générer l'input
    if(!ingrBtn.classList.contains('collapsed')) {
        ingrBtn.innerHTML = '<input type="text" class="input-filter" placeholder="Rechercher un ingrédient">'
        ingrBtn.querySelector('input').addEventListener('click', (e) => {
            console.log(e)
        })
    } else {
        ingrBtn.innerText = 'Ingrédients'
    }
})

// initialiser le contenu avec les données et render avec le filtre
listeIngredient.map(e => {
    let span = document.createElement('span')
    span.innerText = e
    span.className = "col-4"
    span.addEventListener('click', () => {
        if(!filter.ingredients.includes(e)) {
            filter.ingredients.push(e)
            render(sortRecipesWithArrayMethod(recipes, filter))
            createTags(filter)
        }
    })

    ingredientBody.appendChild(span)
})

// faire la même chose pour les appareils
let tagsAlreadyCreatedAppliance = []
listeAppliance.map(e => {
    let span = document.createElement('span')
    span.innerText = e
    span.className = "col-4"
    span.addEventListener('click', () => {
        if(!filter.appliance.includes(e) && tagsAlreadyCreatedAppliance.length < 1) {
            filter.appliance = e
            render(sortRecipesWithArrayMethod(recipes, filter))
            createTags(filter)
        }
    })

    applianceBody.appendChild(span)
})

//faire la même chose pour les ustensils
listeUstensil.map(e => {
    let span = document.createElement('span')
    span.innerText = e
    span.className = "col-4"
    span.addEventListener('click', () => {
        if(!filter.ustensils.includes(e)) {
            filter.ustensils.push(e)
            render(sortRecipesWithArrayMethod(recipes, filter))
            createTags(filter)
        }
    })

    ustensilBody.appendChild(span)
})

// event listener
input.addEventListener('change', (e) => {
    let text = input.value
    if(text.length >= 3){
        let filterCurrent = filter
        filterCurrent.name = input.value
        filter = filterCurrent
        console.log(filter)
        result = sortRecipesWithArrayMethod(recipes, filter)
        render(result)
    } else {
        let filterCurrent = filter
        filterCurrent.name = ''
        filter = filterCurrent
        render(sortRecipesWithArrayMethod(recipes, filter))
    }
})

// fn pour créer des tags
let tagsAlreadyCreatedIngr = []
let tagsAlreadyCreatedUsten = []
function createTags(filter) {
    filter.ingredients.map(e => {
        if(!tagsAlreadyCreatedIngr.includes(e)) {
            let div = document.createElement('div')
            div.className = 'bg-primary p-2 d-flex align-items-center text-white rounded me-2'
            div.style.width = 'fit-content'
            div.setAttribute('id', e)
    
            let p = document.createElement('p')
            p.className = 'px-1 m-0'
            p.innerText = e
    
            let icon = document.createElement('i')
            icon.className= 'fa-regular fa-circle-xmark px-2'
            icon.addEventListener('click', () => {
                let filterCurrent = filter
                for(let i =0; i < filter.ingredients.length; i++) {
                    if(filter.ingredients[i] === e) {
                        filterCurrent.ingredients.splice(i, 1)
                    }
                }
                for(let i =0; i < tagsAlreadyCreatedIngr.length; i++) {
                    if(tagsAlreadyCreatedIngr[i] === e) {
                        tagsAlreadyCreatedIngr.splice(i, 1)
                    }
                }
                console.log(filter)
                filter = filterCurrent
                console.log(filter)
                render(sortRecipesWithArrayMethod(recipes, filter))
                document.getElementById(`${e}`).remove()
            })
            tagsAlreadyCreatedIngr.push(e)
            div.appendChild(p)
            div.appendChild(icon)
            tags.appendChild(div)
        }       
    })
    filter.ustensils.map(e => {
        if(!tagsAlreadyCreatedUsten.includes(e)) {
            let div = document.createElement('div')
            div.className = 'bg-danger p-2 d-flex align-items-center text-white rounded me-2'
            div.style.width = 'fit-content'
            div.setAttribute('id', e)
    
            let p = document.createElement('p')
            p.className = 'px-1 m-0'
            p.innerText = e
    
            let icon = document.createElement('i')
            icon.className= 'fa-regular fa-circle-xmark px-2'
            console.log(filter)
            icon.addEventListener('click', () => {
                let filterCurrent = filter
                for(let i =0; i < filter.ustensils.length; i++) {
                    if(filter.ustensils[i] === e) {
                        filterCurrent.ustensils.splice(i, 1)
                    }
                }
                for(let i =0; i < tagsAlreadyCreatedUsten.length; i++) {
                    if(tagsAlreadyCreatedUsten[i] === e) {
                        tagsAlreadyCreatedUsten.splice(i, 1)
                    }
                }
                filter = filterCurrent
                console.log(filter)
                render(sortRecipesWithArrayMethod(recipes, filter))
                document.getElementById(`${e}`).remove()
            })

            tagsAlreadyCreatedUsten.push(e)
            div.appendChild(p)
            div.appendChild(icon)
            tags.appendChild(div)
        }
    })
    if(filter.appliance != '' && tagsAlreadyCreatedAppliance.length < 1) {
        tagsAlreadyCreatedAppliance.push(filter.appliance)
        let div = document.createElement('div')
        div.className = 'bg-success p-2 d-flex align-items-center text-white rounded me-2'
        div.style.width = 'fit-content'
        div.setAttribute('id', filter.appliance)
    
        let p = document.createElement('p')
        p.className = 'px-1 m-0'
        p.innerText = filter.appliance
    
        let icon = document.createElement('i')
        icon.className= 'fa-regular fa-circle-xmark px-2'
        icon.addEventListener('click', () => {
            let filterCurrent = filter
            document.getElementById(`${filter.appliance}`).remove()
            filterCurrent.appliance = ''
            filter = filterCurrent
            console.log(filter)
            render(sortRecipesWithArrayMethod(recipes, filter))
            tagsAlreadyCreatedAppliance = []
            })

        div.appendChild(p)
        div.appendChild(icon)
        tags.appendChild(div)
    }
}

// fn pour rendre le contenu dynamique
function render(result) {
    cardWrapper.innerHTML = ''
    if(result.length ===0){
        console.log('acucunne recette trouvée')
    } else {
        result.map(recette => {
            let div = document.createElement('div')
            div.className = 'card col-4 p-0 bg-light'
        
            let list = document.createElement('ul')
            list.style.listStyleType = 'none'
            list.style.fontSize = '12px'
            list.className = 'p-1'
        
            let unit = ''
            let quantity = ''
            recette.ingredients.map(ingredient => {
                if(ingredient.hasOwnProperty('unit') && ingredient.unit != undefined) {
                    if(ingredient.unit === 'grammes') {
                        unit = 'g'
                    } else if (ingredient.unit.length > 3) {
                        unit = ' ' + ingredient.unit
                    } else {
                        unit = ingredient.unit
                    }
                } else {
                    unit = ''
                }
                if(ingredient.hasOwnProperty('quantity')) {
                    quantity = ingredient.quantity
                } else {
                    quantity = ''
                }
                let li = document.createElement('li')
                li.innerHTML = `<strong>${ingredient.ingredient}: </strong>${quantity}${unit}`
                list.appendChild(li)
            })
            
            div.innerHTML = `<img src="http://via.placeholder.com/380x178/1f1a38/ffffff?text=Image" class="card-img-top" alt="...">` +
            `<div class="card-body row mb-2">` +
                `<div class="card-title d-flex justify-content-between">` +
                    `<h5 style="max-width: 250px;">${recette.name}</h5>` +
                    `<h5><i class="fa-regular fa-clock me-1"></i><strong>${recette.time}min</strong></h5>` +
                `</div>` +
                `<div class="col-6 list-ingr">` +
                `</div>` +
                `<div class="col-6 nopadding" style="font-size: 12px;">` +
                    `<p class="overflow-hidden" style="max-height: 110px;">${recette.description}</p>` +
                `</div>` +
            `</div>`
        
            div.querySelector('.list-ingr').appendChild(list)
            cardWrapper.appendChild(div)
        })
    }
}
