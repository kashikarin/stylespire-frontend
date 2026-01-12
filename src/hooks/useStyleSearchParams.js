import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

export function useStyleSearchParams(onFormDataChange = () => {}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const callbackRef = useRef(onFormDataChange)
  callbackRef.current = onFormDataChange

  function parseFormData(key) {
    const value = searchParams.get(key)
    return value ? value.split(",") : []
  }

  function getFormDataFromParams(params) {
    return {
      gender: params.get("gender") || "",
      age: params.get("age") || "",
      mood: parseFormData("mood"),
      style: parseFormData("style"),
      purpose: parseFormData("purpose"),
    }
  }

  useEffect(() => {
    const dataFromUrl = getFormDataFromParams(searchParams)
    callbackRef.current(dataFromUrl)
  }, [searchParams])

  function updateSearchParamsFromFormData(formData) {
    const newParams = {}

    for (const key in formData) {
      const value = formData[key]
      
      if (!Array.isArray(value)) {
        newParams[key] = value || ""
        continue
      }

      newParams[key] = value.length ?
        value.join(",") :
        ""
    }

    setSearchParams(newParams)
  }
  
  return {
    updateSearchParamsFromFormData
  }

}
