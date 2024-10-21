import { Router, type Request, type Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

WeatherService.baseUrl = process.env.API_BASE_URL;
WeatherService.apiKey = process.env.API_KEY;

// POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    const cityName = req.body.cityName;
    if (!cityName) {
      return res.send({ error: 'City name is required.' });
    }

    const weatherData = await WeatherService.getWeatherForCity(cityName);
    // save city to serch history!!!
    await HistoryService.addCity(weatherData[0].city);

    return res.send(weatherData);
  } catch (err: any) {
    console.error(err);
    return res.send({ error: err.message })
  }
});


    
  // GET weather data from city name
  router.get('/history', async (_req: Request, res: Response) => {
    try {
      const cities = await HistoryService.getCities();
      if (cities.length === 0) {
        return res.send ({ message: 'No cities in search history.'});
      }
      return res.send(cities);
    } catch (err: any) {
      console.log(err);
      return res.send({ error: err.message});
    }
  });



// GET search history
router.get('/history', async (_req: Request, res: Response) => {
  const cities = HistoryService.getCities();
  console.log('city search history');
  res.send(cities);
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  let response = HistoryService.removeCity(req.params.id);
  res.send(response);
});

export default router;
