import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

// Define a City class with name and id properties
class Cities {
  name: string;
  id: string;

  constructor(name: string) {
    this.name = name;
    this.id = uuid();
  }
}
// Complete the HistoryService class
class HistoryService {
    private filePath: string;

    constructor() {
      this.filePath = path.resolve('db', 'searchHistory.json');
    }
  

  // Define a read method that reads from the searchHistory.json file
  private async read(): Promise<Cities[]> {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as Cities[];
    } catch (error) {
      console.error('Error reading file:', error);
      return [];
    }
  }

  
  // Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: Cities[]): Promise<void> {
    try {
      const data = JSON.stringify(cities, null, 2);
      await fs.promises.writeFile(this.filePath, data, 'utf-8')
    } catch (error) {
      console.error('Error writing to file', error)
    }
  }
  
  // Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<Cities[]> {
    return await this.read();
  }
  
  // Define an addCity method that adds a city to the searchHistory.json file
  async addCity(name: string): Promise<void> {
    try {
      let cities = await this.getCities();
      const newCity = new Cities(name);
      cities.push(newCity);
      await this.write(cities);
      this.read();
    } catch (error) {
      console.error ('Error adding city:', error)
    }
  }
  
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string): Promise<void> {
    try {
      let cities = await this.getCities();
      cities = cities.filter(city => city.id !== id);
      await this.write(cities);
      this.read();
    } catch (error) {
      console.error ('Error removing city:', error);
    }
  }
}

export default new HistoryService();
