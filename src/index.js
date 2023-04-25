import './style.css'

const getTemp = function(city){
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=fd56d2ae12da4d228fb173301232404&q=${city}&days=1&aqi=no&alerts=no`,
    {
        mode:'cors', 
        headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
    .then(function(res) {
        return (res.json())
    })
    .then(function(res){
        setValues(res)
        console.log(res)
        return res
    })
    .then()
    .catch(err => {
        console.log(err)
    } )
}

const getCity = function(){
    const cityInput = document.getElementById("city")
    document.querySelector("form").addEventListener("submit", e => e.preventDefault())
    cityInput.addEventListener("keydown", e => {
        if (e.key == "Enter") {
          const cityName = cityInput.value
          cityInput.value = ""
          return getTemp(cityName)
        }
    })
}

const setValues = function(obj){
    const location = document.getElementById("location")
    const condition = document.getElementById("condition")
    const conditionIcon = document.getElementById("conditionIcon")
    const temperature = document.getElementById("temp")
    const feels = document.getElementById("feels")
    const humidity = document.getElementById("humidity")
    const max = document.getElementById("max")
    const min = document.getElementById("min")
    location.textContent = `${obj.location.name}, ${obj.location.region}, ${obj.location.country}`
    conditionIcon.src = obj.current.condition.icon
    condition.textContent = obj.current.condition.text
    temperature.textContent = `Current temp : ${obj.current.temp_c}°C`
    feels.textContent =  `Feels like : ${obj.current.feelslike_c}°C`
    humidity.textContent = `Humidity : ${obj.current.humidity}%`
    max.textContent = `Max temp : ${obj.forecast.forecastday[0].day.maxtemp_c}°C`
    min.textContent = `Min temp : ${obj.forecast.forecastday[0].day.mintemp_c}°C`

}

document.addEventListener("DOMContentLoaded", () => {
    getTemp("Paris")
    getCity()
})











