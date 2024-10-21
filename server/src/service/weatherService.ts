import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
import { DateTime } from 'luxon';

dotenv.config();

interface Coordinates {
  id: string;
  city: string;
  stateProv: string;
  country: string;
}

class Weather {
  id: string;
  city: string;
  date!: string;
  icon!: string;
  iconDescription!: string;
  tempF!: number;
  windSpeed!: number;
  humidity!: number;

  constructor(city: string) {
    this.city = city;
    this.id = uuid();
  }
}

class WeatherService {
  baseUrl: string | undefined = process.env.API_BASE_URL;
  apiKey: string | undefined = process.env.API_KEY;
  cityName: string = "";

  private createCoordinates(city: string, stateProv: string = '', country: string = ''): Coordinates {
    return {
      id: uuid(),
      city,
      stateProv,
      country
    };
  }

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseUrl}weather?q=${coordinates.city}&appid=${this.apiKey}&units=imperial`;
  }

  private buildForecastQuery(coordinates: Coordinates): string {
    return `${this.baseUrl}forecast?q=${coordinates.city}&appid=${this.apiKey}&units=imperial`;
  }

  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const queryUrl = this.buildWeatherQuery(coordinates);
    const response = await fetch(queryUrl);
    if (!response.ok) {
      throw new Error(`Error: Unable to get weather data`);
    }
    return response.json();
  }

  private async fetchForecastData(coordinates: Coordinates): Promise<any> {
    const queryUrl = this.buildForecastQuery(coordinates);
    const response = await fetch(queryUrl);
    if (!response.ok) {
      throw new Error(`Error: Unable to get forecast data`);
    }
    return response.json();
  }

  private formatResponseDates(response: any): any {
    if (!Array.isArray(response.list)) {
      console.error('Response list is not an array');
      return response;
    }
  
    return response;
  }

  private parseCurrentWeather(weatherResponse: any, coordinates: Coordinates): Weather {
    const currentWeather = new Weather(coordinates.city);

    const customDateTimeString = new Date (weatherResponse.dt * 1000);

    const formattedDate = (customDateTimeString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });

    console.log(formattedDate);
    
    currentWeather.date = formattedDate;
    currentWeather.icon = weatherResponse.weather[0]?.icon || '';
    currentWeather.iconDescription = weatherResponse.weather[0]?.description || '';
    currentWeather.tempF = weatherResponse.main.temp;
    currentWeather.windSpeed = weatherResponse.wind.speed;
    currentWeather.humidity = weatherResponse.main.humidity;

    return currentWeather;
  }

  private buildForecastArray(city: string, response: any): Weather[] {
    let weatherArray: Weather[] = [];
    const today = DateTime.now().startOf('day');
    // the method below includes today and the 5 day forcast!
    const fiveDays = today.plus({ days: 6 });
    
    for (let i = 0; i < response.list.length; i++) {
      const entry = response.list[i];



      const customDateTimeString = entry.dt_txt;
      const parsedDate = DateTime.fromFormat(customDateTimeString, "yyyy-MM-dd HH:mm:ss")
      
      const isoDate = parsedDate.toISO();
      let isoDateString = '';
        if (isoDate != null)
          isoDateString = isoDate;
      const forecastDateTime = DateTime.fromISO(isoDateString); 

      const formattedTime = forecastDateTime.toFormat('HH:mm:ss');
      if (forecastDateTime >= today && forecastDateTime <= fiveDays && formattedTime === '15:00:00') {
        const weatherObject = new Weather(city);
        weatherObject.date = forecastDateTime.toFormat('MM/dd/yyyy');
        weatherObject.icon = entry.weather[0]?.icon || '';
        weatherObject.iconDescription = entry.weather[0]?.description || '';
        weatherObject.tempF = entry.main.temp;
        weatherObject.windSpeed = entry.wind.speed;
        weatherObject.humidity = entry.main.humidity;
  
        weatherArray.push(weatherObject);
      } 
    } 
    return weatherArray;
  }

  async getWeatherForCity(city: string): Promise<Weather[]> {
    const coordinates = this.createCoordinates(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    let forecastData = await this.fetchForecastData(coordinates);

    forecastData = this.formatResponseDates(forecastData);
    const currentWeather = this.parseCurrentWeather(weatherData, coordinates);
    const forecastWeatherArray = this.buildForecastArray(city, forecastData);

    forecastWeatherArray.unshift(currentWeather);

    console.log(forecastWeatherArray);
    return forecastWeatherArray;
  }
} 

export default new WeatherService();