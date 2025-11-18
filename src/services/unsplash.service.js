import axios from "axios"

const API_KEY = import.meta.env.VITE_UNSPLASH_KEY
console.log("🚀 ~ API_KEY:", API_KEY)

export async function searchUnsplash(query) {
  const url = "https://api.unsplash.com/search/photos";

  const res = await axios.get(url, {
    params: {
      query,
      per_page: 20,
      orientation: "portrait",
      content_filter: "high",   
      client_id: API_KEY
    }
  })

  return res.data.results
}

export function composeQuery(formData, weather){
    const { gender, age, mood, purpose, style } = formData
    const tempCategory = _getTempCategory(weather.temp)
    const condition = _getWeatherCondition(weather.condition)

    const genderMap = {
        female: ["woman"],
        male: ["man"],
        nonbinary: ["androgynous", "gender neutral fashion"]
    }

    const ageMap = {
        teen: ["teen fashion"],      
        '20-30': ["young adult fashion", "trendy outfit"],
        '30-45': ["contemporary fashion", "elegant casual"],
        '45-60': ["mature fashion", "classic chic"],
        '60+': ["timeless fashion", "soft neutral style"]
    }

    const moodMap = {
        playful: ["playful style", "vibrant"],
        comfi: ["cozy", "loungewear"],
        chic: ["chic", "elegant"],
        romantic: ["romantic", "soft feminine"],
        cool: ["laid back", "street style"],
        confident: ["power dressing", "bold"],
        energetic: ["sporty", "athleisure"],
        bold: ["edgy", "fashion forward"]
    }

    const styleMap = {
        casual: ["casual outfit", "street style", "everyday look"],
        sporty: ["sporty outfit", "activewear", "fitness fashion"],
        elegant: ["elegant outfit", "chic fashion", "refined style"],
        street: ["street style", "streetwear", "urban fashion"],
        boho: ["boho style", "bohemian fashion"],
        trendy: ["trendy", "fashion forward", "on trend"],
        minimal: ["minimalist fashion", "neutral aesthetic", "clean aesthetic"]
    }

    const purposeMap = {
        office: ["business casual", "smart casual"],
        errands: ["casual errands", "comfortable outfit"],
        date: ["date night", "romantic look"],
        dinner: ["dinner outfit", "stylish look"],
        nightout: ["party outfit", "night out fashion"],
        coffeestop: ["cozy cafe outfit", "cafe fashion"],
        friendsmeetup: ["hangout outfit", "casual social look"],
        pickingupkids: ["practical outfit", "comfortable casual"]
    }

    const weatherMap = {
        cold: ["winter outfit", "warm layers"],
        mild: ["spring outfit", "light jacket"],
        warm: ["summer outfit", "light clothes"],
        hot: ["heat outfit", "breezy outfit"],
        rain: ["rainy day outfit", "raincoat style"],
        snow: ["snow outfit", "puffer outfit"],
        cloudy: ["cloudy day outfit"],
        clear: ["sunny outfit"],
        fog: ["foggy outfit", "muted aesthetic"]
    }

    let terms = []

    terms.push(..._pickN(_getTerms(genderMap, gender), 1))
    terms.push(..._pickN(_getTerms(ageMap, age), 1))
    terms.push(..._pickN(_getTerms(styleMap, style), 2))
    terms.push(..._pickN(_getTerms(moodMap, mood), 1))
    terms.push(..._pickN(_getTerms(purposeMap, purpose), 1))
    terms.push(..._pickN(weatherMap[tempCategory] || [], 1))
    terms.push(..._pickN(weatherMap[condition] || [], 1))
    
    
    terms = _cleanTerms(terms)
    terms = [...new Set(terms)]
    terms.push('outfit')
    return terms.join(' ')
}

function _getTerms(map, field) {
    //if no value in field
    if (!field) return []

    //if a multiselect field (not age / gender)
    if (Array.isArray(field)) {
        return field.flatMap(f => map[_normalizeKey(f)] || [])
    }

    // if field is a single value, namely age or gender
    return map[_normalizeKey(field)] || []
}

function _pickN(arr, n) {
  if (!arr || arr.length === 0) return []
  if (arr.length <= n) return arr

  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

function _stripWeakWords(term) {
  return term
    .replace(/\boutfit\b/gi, "")
    .replace(/\blook\b/gi, "")
    .trim();
}

function _cleanTerms(terms) {
  return terms
    .map(_stripWeakWords)
    .filter(Boolean)
}

function _getTempCategory(temp) {
  if (temp <= 10) return "cold"
  if (temp <= 18) return "mild"
  if (temp <= 27) return "warm"
  return "hot"
}

function _getWeatherCondition(condition) {
  const lcCondition = condition.toLowerCase()
  if (lcCondition.includes("rain")) return "rain"
  if (lcCondition.includes("snow")) return "snow"
  if (lcCondition.includes("cloud")) return "cloudy"
  if (lcCondition.includes("fog") || lcCondition.includes("mist")) return "fog"
  return "clear"
}

function _normalizeKey(str = "") {
  return str
    .toLowerCase()
    .replace(/\s+/g, "")    
    .replace(/[^a-z0-9]/g, "")
}