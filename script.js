
const urlLonLat = 'https://api.openweathermap.org/geo/1.0/';
const key = '58a5c04bcc623dc3b5b331ab9d2bb6b3';
const url = 'https://api.openweathermap.org/data/2.5/';


const weatherApi = (e) => {
    if(e.keyCode == "13")
        getResult(searchBar.value)
}

const getResult = (cityName) => {
    let lonlat =   `${urlLonLat}direct?q=${cityName}&limit=5&appid=${key}`;
    fetch (lonlat)
    .then(response => {
        return response.json()
    })
    .then(displayLonLat)
    .catch(error => console.error('Error fetching lon/lat:', error));
}

const searchBar = document.getElementById("searchbar");
searchBar.addEventListener("keypress", weatherApi);

const displayLonLat = (result) =>{
    if (!result || result.length === 0) {
        console.error('No location data found for the specified city.');
        return;
    }
    let lon = result[0].lon;
    let lat = result[0].lat ;
    
    let weather = `${url}weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=tr`
    fetch (weather)
    .then(response => {
        return response.json()
    })
    .then(displayResult)
    .catch(error => console.error('Error fetching weather data:', error));
    
}
function displayResult(result) {
    document.querySelector(".weather").textContent = result.weather[0].description;
    document.querySelector(".degree").textContent = `${result.main.temp}°C`;
    document.querySelector(".degreetext").textContent = result.name;
    document.getElementById("humidity").textContent = `${result.main.humidity}% Nem`;
    document.getElementById("wind-speed").textContent = `${result.wind.speed} km/h Rüzgar`;
    document.getElementById("visibility").textContent = `${result.visibility / 1000} km Görüş`;
    
   
    const weatherIcon = result.weather[0].main.toLowerCase();
    console.log(result)
    document.getElementById("icon").className = `fa-solid ${getWeatherIcon(weatherIcon)}`;
}


function getWeatherIcon(icon) {
    const iconMap = {
      "clear": "fa-sun",
      "cloud-sun": "fa-cloud-sun",
      "clouds": "fa-cloud",
      "heavy": "fa-cloud-showers-heavy",
      "rain": "fa-cloud-sun-rain",
      "bolt": "fa-bolt",
      "snowflake": "fa-snowflake",
      "smog": "fa-smog",
    };
    return iconMap[icon] || "fa-cloud";
  }
  const setDate = () => {
    const dateElement = document.getElementById("current-date");
    const today = new Date();
    const formattedDate = today.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    dateElement.textContent = formattedDate;
};

setDate(); 