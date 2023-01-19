const tags = document.querySelector('.tags')

// fn pour créer des tags
let tagsAlreadyCreatedIngr = []
let tagsAlreadyCreatedUsten = []
function createTags(filter) {
    filter.ingredients.map(e => {
        if(!tagsAlreadyCreatedIngr.includes(e)) {
            let div = document.createElement('div')
            div.className = 'p-2 d-flex align-items-center text-white rounded me-2'
            div.style.width = 'fit-content'
            div.style.backgroundColor = '#3282F7'
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
                render(sortRecipesWithNativeLoop(recipes, filter))
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
            div.className = 'p-2 d-flex align-items-center text-white rounded me-2'
            div.style.width = 'fit-content'
            div.style.backgroundColor = '#ED6454'
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
                render(sortRecipesWithNativeLoop(recipes, filter))
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
        div.className = 'p-2 d-flex align-items-center text-white rounded me-2'
        div.style.width = 'fit-content'
        div.style.backgroundColor = '#68D9A4'
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
            render(sortRecipesWithNativeLoop(recipes, filter))
            tagsAlreadyCreatedAppliance = []
            })

        div.appendChild(p)
        div.appendChild(icon)
        tags.appendChild(div)
    }
}