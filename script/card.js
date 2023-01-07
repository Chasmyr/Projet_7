const cardWrapper = document.querySelector('.card-wrapper')

let filter = {}
let result = sortRecipesWithArrayMethod(recipes, filter)
render(result)

const input = document.querySelector('.search-bar input')
input.addEventListener('keydown', (e) => {
    let text = input.value
    if(text.length >= 3){
        filter.name = input.value
        console.log(filter)
        result = sortRecipesWithArrayMethod(recipes, filter)
        render(result)
        
    } else {
        result = recipes
        render(result)
    }
})

function render(result) {
    cardWrapper.innerHTML = ''
    if(result.length ===0){
        console.log('acucunne recette trouvée')
    } else {
        result.map(recette => {
            let div = document.createElement('div')
            div.className = 'card col-4'
        
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
                    `<h5>${recette.name}</h5>` +
                    `<h5><i class="fa-regular fa-clock ml-6"></i><strong>${recette.time}min</strong></h5>` +
                `</div>` +
                `<div class="col-6 list-ingr">` +
                `</div>` +
                `<div class="col-6 nopadding" style="font-size: 12px;">` +
                    `<p>${recette.description}</p>` +
                `</div>` +
            `</div>`
        
            div.querySelector('.list-ingr').appendChild(list)
            cardWrapper.appendChild(div)
        })
    }
}
