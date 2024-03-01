export const format = (value) => {
    let formattedValue
 
    formattedValue = value.replace(/,/g,'.').replace(/\.(?=.*\.)/g, '')
    formattedValue = Number(formattedValue.split('$')[1].trim())
 
    formattedValue = String(value).includes('-') ? -formattedValue : formattedValue
 
    return formattedValue
}
 
export const randowNumber = () => {
    return Math.floor(Math.random() * 101)
 
}
 
export const prepareLocalStorage = (win) => {
 
    win.localStorage.setItem('dev.finances:transactions', JSON.stringify([
        {
            description: "Mesada",
            amount: randowNumber() * 100,
            date: "11/03/2021"
        },
        {
            description: 'Suco Kapo',
            amount: - (randowNumber() * 100),
            date: "12/03/2021"
        }
    ])
   )
}