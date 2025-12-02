import { glowyTagMap } from "./styleTagMaps";

export function buildGlowyTags(formData){
    const { mood, style, purpose } = formData
    console.log("🚀 ~ buildGlowyTags ~ mood, style, purpose:", mood, style, purpose)
    const tags = []

    function normalize(str = '') {
        return str.toLowerCase().replace(/\s+/g, "")
    }

    [ ...(style || []), ...(mood || []), ...(purpose || [])].forEach(item => {
        const key = normalize(item)
        if (glowyTagMap[key]) tags.push(glowyTagMap[key])
    })

    return tags

}