const customAccordion1 = document.getElementById('ct-acc-1')
const customBody1 = customAccordion1.querySelector('.accordion-body-ct')
const customAccordion2 = document.getElementById('ct-acc-2')
const customBody2 = customAccordion2.querySelector('.accordion-body-ct')
const customAccordion3 = document.getElementById('ct-acc-3')
const customBody3 = customAccordion3.querySelector('.accordion-body-ct')
let ingrSearch = ''
let appSearch = ''
let ustSearh = ''
renderIngr()
renderApp()
renderUst()

// custom accordion
customAccordion1.querySelector('.bi-chevron-down').addEventListener('click', (e) => {
    onlyOneAccOpen(e.target)
    let icon = customAccordion1.querySelector('.ct-icon')
    if(!customAccordion1.querySelector('.accordion-header-ct').classList.contains('accordion-active')) {
        customAccordion1.querySelector('.accordion-header-ct').classList.add('accordion-active')
        customBody1.style.height = 'auto'
        customBody1.style.width = '620px'
        customBody1.style.padding = '10px'
        icon.style.transform = 'rotate(180deg)'
        customAccordion1.style.borderBottomRightRadius = '0'
        customAccordion1.style.borderBottomLeftRadius = '0'
        customAccordion1.querySelector('.accordion-ct-title').innerHTML = '<input type="text" placeholder="Rechercher des ingrédients..." id="input-acc-1" class="input-acc"/>'
        let input = document.getElementById('input-acc-1')
        input.addEventListener('keyup', () => {
            ingrSearch = input.value
            renderIngr()
        })
    } else {
        customAccordion1.querySelector('.accordion-header-ct').classList.remove('accordion-active')
        customBody1.style.height = '0'
        customBody1.style.padding = '0'
        icon.style.transform = 'rotate(0deg)'
        customAccordion1.style.borderBottomRightRadius = '5px'
        customAccordion1.style.borderBottomLeftRadius = '5px'
        customAccordion1.querySelector('.accordion-ct-title').innerHTML = 'Ingrédients'
    }
})

customAccordion2.querySelector('.bi-chevron-down').addEventListener('click', (e) => {
    onlyOneAccOpen(e.target)
    let icon = customAccordion2.querySelector('.ct-icon')
    if(!customAccordion2.querySelector('.accordion-header-ct').classList.contains('accordion-active')) {
        customAccordion2.querySelector('.accordion-header-ct').classList.add('accordion-active')
        customBody2.style.height = 'auto'
        customBody2.style.width = '620px'
        customBody2.style.padding = '10px'
        icon.style.transform = 'rotate(180deg)'
        customAccordion2.style.borderBottomRightRadius = '0'
        customAccordion2.style.borderBottomLeftRadius = '0'
        customAccordion2.querySelector('.accordion-ct-title').innerHTML = '<input type="text" placeholder="Rechercher des ingrédients..." id="input-acc-2" class="input-acc"/>'
        let input = document.getElementById('input-acc-2')
        input.addEventListener('keyup', () => {
            appSearch = input.value
            renderApp()
        })
    } else {
        customAccordion2.querySelector('.accordion-header-ct').classList.remove('accordion-active')
        customBody2.style.height = '0'
        customBody2.style.padding = '0'
        icon.style.transform = 'rotate(0deg)'
        customAccordion2.style.borderBottomRightRadius = '5px'
        customAccordion2.style.borderBottomLeftRadius = '5px'
        customAccordion2.querySelector('.accordion-ct-title').innerHTML = 'Appareils'
    }
})

customAccordion3.querySelector('.bi-chevron-down').addEventListener('click', (e) => {
    onlyOneAccOpen(e.target)
    let icon = customAccordion3.querySelector('.ct-icon')
    if(!customAccordion3.querySelector('.accordion-header-ct').classList.contains('accordion-active')) {
        customAccordion3.querySelector('.accordion-header-ct').classList.add('accordion-active')
        customBody3.style.height = 'auto'
        customBody3.style.width = '620px'
        customBody3.style.padding = '10px'
        icon.style.transform = 'rotate(180deg)'
        customAccordion3.style.borderBottomRightRadius = '0'
        customAccordion3.style.borderBottomLeftRadius = '0'
        customAccordion3.querySelector('.accordion-ct-title').innerHTML = '<input type="text" placeholder="Rechercher des ingrédients..." id="input-acc-3" class="input-acc"/>'
        let input = document.getElementById('input-acc-3')
        input.addEventListener('keyup', () => {
            ustSearh = input.value
            renderUst()
        })
    } else {
        customAccordion3.querySelector('.accordion-header-ct').classList.remove('accordion-active')
        customBody3.style.height = '0'
        customBody3.style.padding = '0'
        icon.style.transform = 'rotate(0deg)'
        customAccordion3.style.borderBottomRightRadius = '5px'
        customAccordion3.style.borderBottomLeftRadius = '5px'
        customAccordion3.querySelector('.accordion-ct-title').innerHTML = 'Ustensils'
    }
})

// initialiser le contenu avec les données et render avec le filtre
function renderIngr() {
    if(ingrSearch === '') {
        customBody1.innerHTML = ''
        listeIngredient.map(e => {
                let span = document.createElement('span')
                span.innerText = e
                span.className = "col-4"
                span.addEventListener('click', () => {
                    if(!filter.ingredients.includes(e)) {
                        filter.ingredients.push(e)
                        render(sortRecipesWithNativeLoop(recipes, filter))
                        createTags(filter)
                    }
                })
                customBody1.appendChild(span)
        })
    } else {
        listeIngrFiltered = []
        listeIngredient.map(e => {
            if(e.toLowerCase().includes(ingrSearch.toLowerCase())) {
                listeIngrFiltered.push(e)
            }
        })
        customBody1.innerHTML = ''
        listeIngrFiltered.map(e => {
            let span = document.createElement('span')
            span.innerText = e
            span.className = "col-4"
            span.addEventListener('click', () => {
                if(!filter.ingredients.includes(e)) {
                    filter.ingredients.push(e)
                    render(sortRecipesWithNativeLoop(recipes, filter))
                    createTags(filter)
                }
            })
            customBody1.appendChild(span)
        })
    }
}

// faire la même chose pour les appareils
let tagsAlreadyCreatedAppliance = []
function renderApp() {
    if(appSearch === '') {
        customBody2.innerHTML = ''
        listeAppliance.map(e => {
            let span = document.createElement('span')
            span.innerText = e
            span.className = "col-4"
            span.addEventListener('click', () => {
                if(!filter.appliance.includes(e) && tagsAlreadyCreatedAppliance.length < 1) {
                    filter.appliance = e
                    render(sortRecipesWithNativeLoop(recipes, filter))
                    createTags(filter)
                }
            })
        
            customBody2.appendChild(span)
        })
    } else {
        listeApplianceFiltered = []
        listeAppliance.map(e => {
            if(e.toLowerCase().includes(appSearch.toLocaleLowerCase())) {
                listeApplianceFiltered.push(e)
            }
        })
        customBody2.innerHTML = ''
        listeApplianceFiltered.map(e => {
            let span = document.createElement('span')
            span.innerText = e
            span.className = "col-4"
            span.addEventListener('click', () => {
                if(!filter.appliance.includes(e) && tagsAlreadyCreatedAppliance.length < 1) {
                    filter.appliance = e
                    render(sortRecipesWithNativeLoop(recipes, filter))
                    createTags(filter)
                }
            })
        
            customBody2.appendChild(span)
        })
    }
}

//faire la même chose pour les ustensils
function renderUst() {
    if(ustSearh === '') {
        customBody3.innerHTML = ''
        listeUstensil.map(e => {
            let span = document.createElement('span')
            span.innerText = e
            span.className = "col-4"
            span.addEventListener('click', () => {
                if(!filter.ustensils.includes(e)) {
                    filter.ustensils.push(e)
                    render(sortRecipesWithNativeLoop(recipes, filter))
                    createTags(filter)
                }
            })
        
            customBody3.appendChild(span)
        })
    } else {
        let listeUstensilFiltered = []
        listeUstensil.map(e => {
            if(e.toLocaleLowerCase().includes(ustSearh.toLowerCase())) {
                listeUstensilFiltered.push(e)
            }
        })
        customBody3.innerHTML = ''
        listeUstensilFiltered.map(e => {
            let span = document.createElement('span')
            span.innerText = e
            span.className = "col-4"
            span.addEventListener('click', () => {
                if(!filter.ustensils.includes(e)) {
                    filter.ustensils.push(e)
                    render(sortRecipesWithNativeLoop(recipes, filter))
                    createTags(filter)
                }
            })
        
            customBody3.appendChild(span)
        })
    }
   
}

function onlyOneAccOpen(target) {
    if(customAccordion1.querySelector('.accordion-header-ct').classList.contains('accordion-active') && !target.classList.contains('acc-1')) {
        let icon = customAccordion1.querySelector('.ct-icon')
        customAccordion1.querySelector('.accordion-header-ct').classList.remove('accordion-active')
        customBody1.style.height = '0'
        customBody1.style.padding = '0'
        icon.style.transform = 'rotate(0deg)'
        customAccordion1.style.borderBottomRightRadius = '5px'
        customAccordion1.style.borderBottomLeftRadius = '5px'
        customAccordion1.querySelector('.accordion-ct-title').innerHTML = 'Ingrédients'
    }

    if(customAccordion2.querySelector('.accordion-header-ct').classList.contains('accordion-active') && !target.classList.contains('acc-2')) {
        let icon = customAccordion2.querySelector('.ct-icon')
        customAccordion2.querySelector('.accordion-header-ct').classList.remove('accordion-active')
        customBody2.style.height = '0'
        customBody2.style.padding = '0'
        icon.style.transform = 'rotate(0deg)'
        customAccordion2.style.borderBottomRightRadius = '5px'
        customAccordion2.style.borderBottomLeftRadius = '5px'
        customAccordion2.querySelector('.accordion-ct-title').innerHTML = 'Appareils'
    }

    if(customAccordion3.querySelector('.accordion-header-ct').classList.contains('accordion-active') && !target.classList.contains('acc-3')) {
        let icon = customAccordion3.querySelector('.ct-icon')
        customAccordion3.querySelector('.accordion-header-ct').classList.remove('accordion-active')
        customBody3.style.height = '0'
        customBody3.style.padding = '0'
        icon.style.transform = 'rotate(0deg)'
        customAccordion3.style.borderBottomRightRadius = '5px'
        customAccordion3.style.borderBottomLeftRadius = '5px'
        customAccordion3.querySelector('.accordion-ct-title').innerHTML = 'Ustensils'
    }
}