const sections = document.querySelectorAll('.section');
let currentSectionIndex = 0


function ss(index){
    sections.forEach((section,i)=>{
        if (i==index){
            section.classList.add('active')
        }
        else{
            section.classList.remove('active')
        }
    })
    document.getElementById('prevButton').style.display = index === 0 ? 'none': 'block'
    document.getElementById('nextButton').style.display = index === sections.length -1 ? 'none': 'block'
}

function nextSection(){
    if(currentSectionIndex < sections.length - 1){
        currentSectionIndex++
        ss(currentSectionIndex)
    }
}

function prevSection(){
    if(currentSectionIndex > 0 ){
        currentSectionIndex--
        ss(currentSectionIndex)
    }
}

ss(currentSectionIndex)



