function getVal() {
    const section = 7
    const Dsection =[]
    for(let i = 1; i<=section; i++){
        const section1 = []
        for(let char = 'a'.charCodeAt(0); char <='i'.charCodeAt(0); char++){
            const fieldName = String.fromCharCode(char) + i
            const value = parseInt(document.querySelector('input[name="'+ fieldName + '"]:checked').value)
            section1[fieldName] = value
        }
        Dsection.push(section1)
    }
    const sVal = Dsection.map(section =>{
        return Object.keys(section).map(key => key +'='+section[key]).join('&')
    }).join('&')
    localStorage.setItem('sVal', sVal)
    
}
document.getElementById('sB').addEventListener('click', getVal)