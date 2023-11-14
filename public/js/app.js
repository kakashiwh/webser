const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const secondOne = document.querySelector('#message-2')
// messageOne.textContent = 'From javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // stop from refreshing the page 

    const location = search.value
    messageOne.textContent = 'Loading...'
    secondOne.textContent = ''
    fetch(`http://localhost:3000/weather?address=${location}`) // client side java script not shown in node js 
        .then((response => {
            response.json().then((data) => {

                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent=data.location
                    secondOne.textContent=data.forcast
                   
                }
            })
        }))

})