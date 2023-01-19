// html element
const cardWrapper = document.querySelector('.card-wrapper')
const input = document.querySelector('.search-bar input')

let filter = {
    name: '',
    ingredients: [],
    appliance: '',
    ustensils: []
}
let result = sortRecipesWithNativeLoop(recipes, filter)
render(result)

// event listener
input.addEventListener('keyup', () => {
    let text = input.value
    if(text.length >= 3){
        let filterCurrent = filter
        filterCurrent.name = input.value
        filter = filterCurrent
        console.log(filter)
        result = sortRecipesWithNativeLoop(recipes, filter)
        render(result)
    } else {
        let filterCurrent = filter
        filterCurrent.name = ''
        filter = filterCurrent
        render(sortRecipesWithNativeLoop(recipes, filter))
    }
})

// fn pour rendre le contenu dynamique
function render(result) {
    cardWrapper.innerHTML = ''
    if(result.length ===0){
        let div = document.createElement('div')
        div.className = 'col-12 p-0 pt-4 text-center'
        let title = document.createElement('h2')
        title.innerText = `Aucunne recettes n'a été trouvées.`
        div.appendChild(title)
        cardWrapper.appendChild(div)
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
            
            div.innerHTML = `<img src="./images/ffffff.png" class="card-img-top" alt="...">` +
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
