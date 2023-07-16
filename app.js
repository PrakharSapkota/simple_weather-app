// Fetching api key and url from the openweather map

const apiKey = "f4d2d3e9f2486fa1d27e07bc96197f7d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchCity = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
// const pressure = document.querySelector(".pressure");

// creating a async function to show the default weather when the web first lodes.

async function defaultWeather(){
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?&units=metric&q=Siraha" + `&appid=${apiKey}`);
    let data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " KM/H";
    document.querySelector(".pressure").innerHTML = `Pressure(atm):${data.main.pressure}Pa`;
}
defaultWeather();

// creating a async function to be able to search for any country/city from the search box.

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    // to check for the invalid city or country names and return the appropriate message.

    if (response.status == 404){
        document.querySelector(".error-msg").style.display = "block";
        document.querySelector(".weather").style.display = "none";

    //  ro return the appropriate output when the input is correct.

    } else{
        let data = await response.json();
        console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " KM/H";
    document.querySelector(".pressure").innerHTML = `Pressure(atm):${data.main.pressure}Pa`; 

    // to change the images according to the weather fetched. i.e.,clear sun if the weather is hot,etc.

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "./images/cloudy-day.png";

    } else if (data.weather[0].main == "Clear"){
        weatherIcon.src = "./images/sun.png";

    } else if (data.weather[0].main == "Rain"){
        weatherIcon.src = "./images/thunderstorm.png";

    } else if (data.weather[0].main == "Drizzle"){
        weatherIcon.src = "./images/drizzle.png";

    } else if (data.weather[0].main == "Mist"){
        weatherIcon.src = "./images/haze.png";
    } else if (data.weather[0].main == "Snow"){
        weatherIcon.src = "./images/snow.png";
    } 

    document.querySelector(".error-msg").style.display = "none";
    document.querySelector(".weather").style.display = "block";
}
    }

searchBtn.addEventListener("click",()=>{
    checkWeather(searchCity.value);
})
