const searchBtn = document.getElementById("search");
const form = document.getElementById("search-location");
const moreInfoBtn = document.getElementById("more-information");
const countryRadioEl = document.getElementById("country");
const capitalRadioEl = document.getElementById("capital");
const inputEls = document.querySelectorAll("input");
const allCards = document.querySelectorAll("card-panel");
const containerDiv = document.querySelector(".container");
// locationSearchedObjectsArray = [];

/* 
function init() {
    loadSearchedLocation();
}
getLocation = localStorage.getItem("locationSearchedObjects");

locationSearchedObjects = JSON.parse(locationSearchedObjectsArray);
//Display Searched Location list 
if (locationSearchedObjectsArray) {
    locationSearchedObjectsArray.forEach(function (object) {
        var newSearchedLocation = $("<a>");
        newSearchedLocation.attr("href", "#");
        newSearchedLocation.attr("searchedLocation", object.location);
        newSearchedLocation.attr(
            "class",
            "list-group-item list-group-item-action list-group-item-light listItemSearchedLocation"
        );
        newSearchedLocation.text(object.location);
        $(".listSearchedLocation").append(newSearchedLocation);
    });
}

// Save searched cities array and data to local storage
var locationSearchedObjectsArrayString = JSON.stringify(
    locationSearchedObjectsArray
);
localStorage.setItem(
    "searchedCitiesObjects",
    locationSearchedObjectsArrayString
);
*/

// event listeners
searchBtn.addEventListener("click", getInput);

function getInput(e) {
  // console.log('working')
  e.preventDefault();
  input = form.value;
  console.log(input);
  // check which input is checked
  if (input && countryRadioEl.checked) {
    getLocation(input);
    searchWeather(input);
  } else if (input && capitalRadioEl.checked) {
    getLocationCapital(input);
    searchWeather(input);
  } else {
    showAlert(
      "Please enter a valid location name and select country or capital"
    );
  }
  // deselect checked radio selection
  deselectAnswers();
}

// search weather for desired location
var APIkey = "&units=imperial&appid=e96c7cdf8719334c7ad87ba089d635e4";
async function searchWeather(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}${APIkey}`
  );
  const data = await response.json();
  console.log(data);
  displayWeather(data);
}

// weather elements within card
const weatherTempEl = document.querySelector(".weather1");
const weatherWindSpeedEl = document.querySelector(".weather2");
const weatherHumidityEl = document.querySelector(".weather3");
const weatherIconEl = document.querySelector(".weathericon");
// display weather data within card
function displayWeather(currentWeather) {
  weatherTempEl.innerText =
    "Temperature: " + Math.floor(currentWeather.main.temp) + " °F";
  weatherWindSpeedEl.innerText =
    "WindSpeed: " +
    Math.floor(currentWeather.wind.speed) +
    "mph, Direction: " +
    currentWeather.wind.deg +
    "°";
  weatherHumidityEl.innerText =
    "Humidity: " + currentWeather.main.humidity + " %";
  weatherIconEl.setAttribute(
    "src",
    "https://openweathermap.org/img/wn/" +
      currentWeather.weather[0].icon +
      "@2x.png"
  );
}

function deselectAnswers() {
  // for each answer element, deselect answer checked option
  inputEls.forEach((inputEls) => (inputEls.checked = false));
}
// get country name by passing in user input data -- async/await to clean up previous fetch call
async function getLocation(name) {
  const response = await fetch(`https://restcountries.com/v3.1/name/` + name);
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    sectionContainer.style.display = "none";
    showAlert("Country not found, please try again.");
  } else {
    displayInfo(data);
  }
}

// get capital name by passing in user input data -- async/await to clean up previous fetch call
async function getLocationCapital(name) {
  const response = await fetch(
    `https://restcountries.com/v3.1/capital/` + name
  );
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    sectionContainer.style.display = "none";
    showAlert("Capital not found, please try again.");
  } else {
    displayInfo(data);
  }
}

const appendDiv = document.querySelector(".append-div");
const countryHeaderEl = document.createElement("h3");
const populationHeaderEl = document.createElement("h5");
const capitalEl = document.querySelector(".capital");
const currencyEl = document.querySelector(".currency");
const languageEl = document.querySelector(".language");
const sectionContainer = document.querySelector(".section-icons");

// section container displayed as none and set back to display in displayInfo function
sectionContainer.style.display = "none";

// display desired information from APIcall
function displayInfo(data) {
  console.log(data);

  const countryName = `${data[0].name["common"]} ${data[0].flag}`;
  countryHeaderEl.innerHTML = countryName;
  appendDiv.appendChild(countryHeaderEl);
  // use toLocaleString to show commas within population data
  populationHeaderEl.innerText =
    "Population: " + data[0].population.toLocaleString();
  countryHeaderEl.appendChild(populationHeaderEl);
  capitalEl.innerText = data[0].capital[0];
  currencyEl.innerText = `${
    data[0].currencies[Object.keys(data[0].currencies)[0]].name
  }  (${data[0].currencies[Object.keys(data[0].currencies)[0]].symbol})`;
  languageEl.innerText = data[0].languages[Object.keys(data[0].languages)[0]];
  // more information button is displayed with results after section container display set to block
  sectionContainer.style.display = "block";

  // when clicking more info button, redirects to a wiki page with more information about location
  moreInfoBtn.addEventListener("click", function (e) {
    e.preventDefault();
    input = form.value.trim();
    moreInfoBtn.target = "_blank";
    window.open(`https://en.wikipedia.org/wiki/${input}`, "_blank");
  });
}

function showAlert(message) {
  let div = document.createElement("div");
  div.classList.add("materialert");
  div.classList.add("warning");
  div.innerText = message;
  document.querySelector("#input").prepend(div);

  setTimeout(function () {
    $(".materialert").remove();
  }, 3000);
}













// // get capital name by passing in user entered data -- old version
// function getLocationCapital(name) {
//     let requestURL = "https://restcountries.com/v3.1/capital/" + name
//     console.log(requestURL);
//     fetch(requestURL)
//     .then(function(response){
//         if(response.ok){
//             console.log(response);
//             response.json().then(function(data){
//                 console.log(data);
//                 displayInfo(data);
//             });
//         }else {
//             alert('Country/Capital not found, please try again.');
//         }
//     })
// }

// get country name by passing in user input data -- old version
// function getLocation(name) {
//     let requestURL = `https://restcountries.com/v3.1/name/` + name
//     console.log(requestURL);
//     fetch(requestURL)
//     .then(function(response){
//         if(response.ok){
//             console.log(response);
//             response.json().then(function(data){
//                 console.log(data);
//                 displayInfo(data);
//             });
//         }else {
//             alert('Country/Capital not found, please try again.');
//         }
//     })
// }
