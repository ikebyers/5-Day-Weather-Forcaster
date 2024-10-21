# BreezeAhead
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## Table of Contents
- [Description](#description)
- [Installation](#installation-instructions)
- [Usage](#usage)
- [License](#license)
- [Credits](#credits)
- [Tests](#tests)
- [Questions](#questions)

## Description
BreezeAhead is a weather forecasting application that allows you to search for any city and view both the current weather and a 5-day forecast. The app provides a structured display of city-specific weather information, including details about temperature, conditions, and more.

## Deployed URL
https://breezeahead.onrender.com/

## Features
    •	Search any city and get the current weather details.
    •	5-day weather forecast with detailed daily breakdowns.
    •	Easy-to-use, minimal interface for quick weather checks.
    •	Backend built with Node.js and TypeScript.
    •	Date-time formatting and management using Luxon.
    •	Persistent weather history tracking.

## Installation Instructions
Follow the steps below to set up and run the BreezeAhead weather application.

Prerequisites

Ensure that you have the following installed on your machine:

    •	Node.js (version 14.x or higher)
    •	npm (comes with Node.js) or yarn

1. Clone the Repository

    If you’re using Git, you can clone the repository from GitHub:

```bash
git clone https://github.com/ikebyers/BreezeAhead.git
```
Alternatively, download the ZIP file from the repository and extract it on your system.

2. Navigate to the Project Directory

    After cloning or extracting the project, navigate to the project’s root directory:
```bash
cd BreezeAhead
```

3. Install Dependencies

    Run the following command to install all required dependencies:
```bash
npm install
```
This will install the necessary packages, including:

Express for handling routes.
Luxon for date-time handling.
UUID for generating unique city request IDs.

4. Set Up Environment Variables

    Create a .env file in the root directory and add your OpenWeather API Key you can get one by signing up at OpenWeather --> (https://openweathermap.org/api):

```bash
OPENWEATHER_API_KEY=your_api_key_here
PORT=3000
```

5. Run the Application

    To start the server, run:
```bash
npm start
```

If you’re using TypeScript, ensure that your tsconfig.json is properly set up, and you can use ts-node for running the TypeScript directly:
```bash
npx ts-node src/server.ts
```
The app will run on http://localhost:3000.

## Usage
Usage

1. Search for a City

    •	Navigate to http://localhost:3000 in your web browser.
    •	You will see a search input where you can enter a city name (e.g., “London”, “New York”).
    •	Submit the search to view the current weather and the 5-day forecast for the specified city.

2. View Current Weather

    •	After entering a city, the app displays the current weather details including temperature, conditions (e.g., clear, cloudy), wind speed, and humidity.
    •	The current weather data is structured under the Current Weather section.

3. View 5-Day Forecast

    •	Beneath the current weather, you’ll find a 5-Day Forecast section, which shows the weather conditions for the upcoming days.
    •	Each day includes temperature, weather conditions, and a time breakdown.

4. Saving Weather Data

    The app automatically logs each city you search for into a weather history. You can extend this functionality with the /history endpoint if you want to retrieve previously searched cities or weather data in the future.

5. Deleting Weather Data

    The app has a 'delete' function where you're able to remove cities from the search history simply by clicking the trash can icon next the city.


## License 
MIT

## Credits
- Ike Byers
- Keith Sialana
- [Node.js Documentation](https://nodejs.org/en/docs/) – Used for server setup, routes handling, and file system operations.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) – For type-safe development and async handling in the weather application.
- [Node.js fs Module Documentation](https://nodejs.org/api/fs.html) – For managing file read/write operations with JSON.
- [UUID NPM Package](https://www.npmjs.com/package/uuid) – Utilized to generate unique identifiers for weather requests.
- [Luxon Documentation](https://moment.github.io/luxon/docs/) – To parse and manipulate date-time formats from the weather API.
- [OpenWeather API Documentation](https://openweathermap.org/api) – For retrieving and structuring the weather data for the application.

## Tests
```bash
N/A
```

## Questions
If you have any questions, please contact me at:
- GitHub: [ikebyers](https://github.com/ikebyers)
- Email: ikebyersmgmt@gmail.com
