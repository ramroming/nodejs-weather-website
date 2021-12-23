

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {

//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
let icon = document.getElementById('weather-icon')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevent refreshing the browser and do nothing
    const location = search.value
    
    icon.style.visibility = 'hidden'
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
 

fetch('/weather?address='+ location).then((response) => {


    response.json().then((data) => {
        if(data.error){
           messageOne.textContent = data.error
        } else{
           messageOne.textContent = data.location 
           messageTwo.textContent = data.forecast

           

           if (messageTwo.textContent != '') {
            icon.style.visibility = "visible"
            let iconUrl = new URL(data.iconUrl)
            icon.src =iconUrl.href
           }
        

        }
      
    })
})

})