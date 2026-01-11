import axios from "axios"

const CACHE_KEY = "weather_cache_v1"
const CACHE_TTL = 1000 * 60 * 15 // cache for 15 minutes

export const weatherService = {
    getWeatherData
}


// try browser geolocation first
async function _getBrowserLocation() {
  return _withTimeout(
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        pos => resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        }),
        err => reject(err)
      )
    }),
    5000
  )
}

// IP-based fallback 
async function _getIPLocation() {
  try {
    const res = await _withTimeout(axios("https://ipapi.co/json/"), 5000)
    const data = res.data
    return {
      lat: data.latitude,
      lon: data.longitude,
      country: data.country_code,
      city: data.city
    }
  } catch (err) {
    console.error("IP geolocation failed:", err);
    return null
  }
}

// Fetch actual weather from OpenWeatherMap
async function _getWeather(lat, lon) {
  const API_KEY = import.meta.env.VITE_WEATHER_KEY

  try {
     const res = await _withTimeout(
        axios(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        ),
        5000
    )
    const data = res.data

    return {
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        condition: data.weather[0].main,
        country: data.sys.country,
        city: data.name
    }
  } catch(err){
        throw new Error("Weather API error", err)
  }
}


// Main function — BEST PRACTICE - Browser → IP → Default (Tel Aviv) WITH CACHE
export async function getWeatherData() {
  // --- check cache ---
  const cached = localStorage.getItem(CACHE_KEY)
  if (cached) {
    const parsed = JSON.parse(cached)
    if (Date.now() - parsed.timestamp < CACHE_TTL) {
      return parsed.data
    }
  }

  // --- 1. Browser geolocation (best accuracy) ---
  try {
    const loc = await _getBrowserLocation()
    const weather = await _getWeather(loc.lat, loc.lon)
    _saveToCache(weather)
    return weather
  } catch (err) {
    if (err?.code === 1) {
      console.info("User denied geolocation, falling back to IP")
    } else {
      console.error("Browser geolocation weather failed:", err)
    }
  }

  // --- 2. IP fallback (good enough) ---
  try {
    const ipLoc = await _getIPLocation()
    if (ipLoc) {
      const weather = await _getWeather(ipLoc.lat, ipLoc.lon)
      _saveToCache(weather)
      return weather
    }
  } catch (err) {
    console.error("IP location weather failed:", err)
  }
  // --- 3. Default fallback ---
  const defaultWeather = {
    temp: 25,
    feelsLike: 26,
    condition: "Clear",
    country: "IL",
    city: "Tel Aviv"
  };

  _saveToCache(defaultWeather)
  return defaultWeather
}


// Save in cache
function _saveToCache(data) {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      data,
      timestamp: Date.now()
    })
  )
}

// timeout wrapper (prevents app from hanging)
function _withTimeout(promise, ms = 8000) {
  let timeout
  const timeoutPromise = new Promise((_, reject) => {
    timeout = setTimeout(() => reject(new Error("Timeout exceeded")), ms)
  })
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeout))
}