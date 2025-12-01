import { unsplashService } from "../services/unsplash.service";
import { useWeather } from "./useWeather";

export function useUnsplash(){
    const { getWeather } = useWeather()

    async function getUnsplashResults(formData){
        try {
            const weather = await getWeather()
            const query = unsplashService.composeQuery(formData, weather) 
            const res = await unsplashService.searchUnsplash(query)
            return res
        } catch(err){
            console.error("Error fetching outfits:", err)
            throw err
        }
    }

    return {
        getUnsplashResults,
    }
}