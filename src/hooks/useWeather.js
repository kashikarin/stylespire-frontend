import { weatherService } from "../services/weather.service";

export function useWeather(){
    async function getWeather(){
        try {
            const weatherData = await weatherService.getWeatherData()
            return weatherData
        } catch(err){
            console.error('Failed to get weather data', err)
            throw err
        }
    }

    return {
        getWeather
    }
}