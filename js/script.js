// CLICK IT, WAITS FOR 500 MILLISECONDS BEFORE REMOVING THE HIDDEN CLASS
// IF THE API RUNS BEFORE THE TIMER RUNS THEN IT JUST CLEARS IT
// IF TAKES LONGER THAN 500 MILISECONDS IT WILL REMOVE HIDDEN SHOWING THE INDICATOR



// GET LOADING INDICATOR
const loadingIndicator = document.getElementById('loadingIndicator');

// timeout indicator
let loadingTimer = null;

// check if timer already exists
// if it doesnt create timer and assign to
// loadingTimer
function showLoading() {
   if (loadingTimer == null) {
      loadingTimer = setTimeout(() => {
        // show the indicator
        loadingIndicator.classList.remove('hidden');
      }, 500);
}//adjust^^^ the numbers above for timer length
}

// check if loadingTimer exists
// if so, clear the timeout and
// clear the var
function endLoading() {
  if (loadingTimer != null) {
    clearTimeout(loadingTimer);
    loadingTimer = null;
  }
  // hide the indicator
  loadingIndicator.classList.add('hidden'); 
}



//OPENWEATHER API KEY
    const apiKey = 'cc335e5d0c49bacf914f73d9dc595e52';

//ONCLICK
    function getWeather() {
      const city = document.getElementById('city').value;

//RETURNS TRUE IF BOTH ARE EQUAL, FALSE OTHERWISE
      if (city.trim() === '') {
        alert('Please enter a city name');
        return;
      }

      showLoading();

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

      //checks if the response has a "cod" property with the value '404', and if true, it displays an alert saying "City not found.
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {


          // hide indicator
          endLoading();
          if (data.code === '404') {
            alert('City not found. Please enter a valid city name');
            return;
          }

        //STRING LITERAL
          const weatherInfo = `
            <h3>Weather in ${data.name}, ${data.sys.country}</h3>
            <p>Temperature: ${data.main.temp} &#8451;</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
          `;

          document.getElementById('weather-info').innerHTML = weatherInfo;
        })
        
        .catch(error => {

          // hide indicator
          endLoading();
          // console error
          console.error('Error fetching weather data:', error);
          //alert
          alert('An error occurred while fetching weather data. Please try again.');
        });
    }
 
