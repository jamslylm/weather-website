const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherImg = document.querySelector('.weather-img')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    weatherImg.setAttribute('alt', '😉')

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                weatherImg.setAttribute('alt', '😥')
            } else {
                messageOne.textContent = data.location + ', on ' + data.forecast.localTime
                messageTwo.textContent = data.forecast.weatherDesc + ', it\'s ' + data.forecast.temperature + ' degrees out but it\'s feels like ' + data.forecast.feelsLike + ' degrees out, himudity is set to ' + data.forecast.humidity + ' %'
                weatherImg.setAttribute('src', data.forecast.weatherIcon[0])
            }
        })
    })
});