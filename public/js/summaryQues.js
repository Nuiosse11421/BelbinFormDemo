const quString = localStorage.getItem('sVal')
const quPara = quString.substring(1).split('&')
const values = {}

quPara.forEach(paramiter =>{
    const [key, value] = paramiter.split('=')
    values[key] = value
})

for (let section = 1;section<= 7; section++){
    for(let char = 'a'.charCodeAt(0);char<='i'.charCodeAt(0);char++){
        const fieldName = String.fromCharCode(char) + section
        const cellName = document.getElementById(fieldName)
        const callValue = document.getElementById(fieldName + '-value')
        if (callName && callValue){
            cellValue.textContent = values[fieldName] || ''
        }
    }
}
