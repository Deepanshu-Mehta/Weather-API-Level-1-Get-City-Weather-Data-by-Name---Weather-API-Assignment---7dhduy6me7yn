const fs = require('fs');

async function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    fs.readFile('src/data/data.json', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

async function saveDataToDatabase(data) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    fs.writeFile('src/data/data.json', jsonData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Level 1: Get City Weather Data by Name
async function getWeatherDataByName(cityName) {
  try {
    // Get data from database
    const weatherData = await getDataFromDatabase();
    
    // Find city by name (case insensitive)
    const city = weatherData.find(
      city => city.city.toLowerCase() === cityName.toLowerCase()
    );
    
    // If city not found, throw error
    if (!city) {
      throw new Error('City not found');
    }
    
    // Return formatted weather data
    return {
      city: city.city,
      temperature: city.weather.temperature,
      humidity: city.weather.humidity,
      windSpeed: city.weather.windSpeed,
      conditions: city.weather.conditions
    };
    
  } catch (error) {
    throw error;
  }
}


module.exports = {
  getWeatherDataByName
};