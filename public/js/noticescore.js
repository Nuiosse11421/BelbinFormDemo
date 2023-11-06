
const fieldsets = document.querySelectorAll('fieldset')
const totalScoreNoti = document.getElementById('total-score-notifications')
const form = document.getElementById('BelbinForm')
const submitButton = document.getElementById('sB')


function cal(fieldset) {
    let fieldsetScore = 0
    const radioButtons = fieldset.querySelectorAll('input[type=radio]')
    radioButtons.forEach((radioButton) => {
        if(radioButton.checked){fieldsetScore += parseInt(radioButton.value)}
    });
    return fieldsetScore
}



fieldsets.forEach((fieldset)=>{
    const radioButtons = fieldset.querySelectorAll('input[type=radio]')
    radioButtons.forEach((radioButton)=>{
        radioButton.addEventListener('change', ()=>{
            const fieldsetScore = cal(fieldset)
            if (fieldsetScore>10){
                const fieldIndex = fieldset.getAttribute('data-index')
                totalScoreNoti.textContent = 'คะแนนในตอนนี้เกิน 10 ครับ ที่ section : '+ fieldIndex
                submitButton.disabled = true
            }else{
                totalScoreNoti.textContent = ''
                submitButton.disabled = false
            }
            
        })
    })
})


