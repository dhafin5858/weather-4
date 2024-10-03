
# Weather App

This is a weather application built using Next.js, Tailwind CSS, and the OpenWeather API.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
5. [Usage](#usage)
6. [Configuration](#configuration)
   - [Environment Variables](#environment-variables)
7. [Deployment](#deployment)
8. [Contributing](#contributing)
9. [License](#license)

## Introduction
The Weather App is a web application that allows users to view the current weather conditions for a selected city. It fetches weather data from the OpenWeather API and displays the temperature, weather description, and wind speed.

## Features
- Display current weather information for a list of predefined cities
- Allow users to search for weather information by city
- Visually represent the weather conditions using icons
- Provide a clean and responsive user interface using Tailwind CSS

## Technologies Used
- **Next.js**: A React framework for building server-rendered and static websites.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **OpenWeather API**: A weather data API that provides current weather information.
- **Lucide React**: A set of open-source feather-inspired icons for React.

## Getting Started

### Prerequisites
- Node.js (version 12 or higher)
- npm (version 6 or higher)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/your-username/weather-app.git
   ```
2. Navigate to the project directory:
   ```
   cd weather-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the development server:
   ```
   npm run dev
   ```
2. Open your web browser and navigate to `http://localhost:3000`.
3. You should see the weather information for the predefined cities.
4. To search for a specific city, enter the city name in the search input and click the "Search" button.

## Configuration

### Environment Variables
The application uses the following environment variables:

- `REACT_APP_WEATHER_API_KEY`: Your OpenWeather API key.

To set the environment variables, create a `.env` file in the root of your project and add the following line:

```
REACT_APP_WEATHER_API_KEY=your-api-key-here
```

Make sure to replace `your-api-key-here` with your actual OpenWeather API key.

## Deployment
To deploy your Weather App, you can use a hosting service like Vercel, Netlify, or your own server. The deployment process will depend on the hosting service you choose, but generally, you'll need to set the environment variables on the hosting platform and then deploy your application.

## Contributing
If you'd like to contribute to the Weather App, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request to the original repository.

## License
This project is licensed under the [MIT License](LICENSE).
