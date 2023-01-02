const accordionBtn = document.querySelectorAll('.accordion')

for(let i = 0; i < accordionBtn.length; i++){
    let addEventListenerOnIcon = accordionBtn[i].querySelector('.icon')
    let input = accordionBtn[i].querySelector('.search-input-accordion')
    let filterTitle = accordionBtn[i].querySelector('.filter-title')
    let isOpen = false
    addEventListenerOnIcon.addEventListener('click', () => {
        if(isOpen) {
            accordionBtn[i].style.width="150px"
            filterTitle.style.display="block"
            input.style.display="none"
            isOpen=false
        } else {
            accordionBtn[i].style.width="300px"
            filterTitle.style.display="none"
            input.style.display="block"
            isOpen = true
        }
    })
}