import { unsplashService } from "../services/unsplash.service";
import { useWeather } from "./useWeather";

export function useUnsplash(){
    const { getWeather } = useWeather()

    async function getUnsplashResults(formData){
        try {
            const weather = await getWeather()
            const { query, page } = unsplashService.composeQuery(formData, weather) 
            const res = await unsplashService.searchUnsplash(query, page)

            if (!res || !Array.isArray(res)) return []
            return res.filter(img => img && img.urls)

        } catch(err){
            console.error("Error fetching outfits:", err)
            throw err
        }
    }

    return {
        getUnsplashResults,
    }
}