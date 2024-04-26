
const ApiKey = '1b006de33827f13d38f9419bc24ef83e';
let city;

function getWeather() {
    city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const ApiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`

    $.ajax({
        url: ApiLink,
        dataType: "json",
        success: function (data, status) {
            $("#temp-div").empty();
            $("#weather-info").empty();

            let description = data.weather[0].description;
            let iconCode = data.weather[0].icon;
            let CityName = data.name;
            let temperature = Math.round(data.main.temp - 273.15);
            let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

            const temperatureHTML = `<p>${temperature}°C</p>`;
            const weatherHtml = `<p>${CityName}</p><p>${description}</p>`;


            $("#temp-div").append(temperatureHTML);
            $("#weather-info").append(weatherHtml);
            $("#weather-icon").attr("src", iconUrl);
            showImage();

            getForecastWeather();
        },
        error: function (xhr, status, error) {
            alert('City not found. Please enter a valid city name.');
            console.error(error);
        }
    });
}



function getForecastWeather() {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${ApiKey}`;

    $.ajax({
        url: forecastUrl,
        dataType: "json",
        success: function (data, status) {
            $('#hourly-forecast').empty();
            $.each(data.list, function (index, forecast) {
                const dateTime = new Date(forecast.dt * 1000); // Convert timestamp to milliseconds
                const hour = dateTime.getHours();
                let temp = Math.round(forecast.main.temp - 273.15);
                let icon = forecast.weather[0].icon;

                let forecastHtml = `
                    <div class="hourly-item">
                        <span>${hour}:00</span>
                        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
                        <span>${temp}°C</span>
                    </div>
                `;
                $('#hourly-forecast').append(forecastHtml);
            });

        }
    })
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}
