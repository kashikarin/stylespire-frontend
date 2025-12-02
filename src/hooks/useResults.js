import { useEffect, useState } from "react"
import { loadFavorites } from "../store/actions/favorite.actions"
import { useIsLoggedInUser } from "./useIsLoggedInUser"
import { useStyleSearchParams } from "./useStyleSearchParams"
import { useUnsplash } from "./useUnsplash"
import { useLocation } from "react-router-dom"

export function useResults() {
    const { getUnsplashResults } = useUnsplash()
    const location = useLocation()
    const routerFormData = location.state?.formData ?? null
    const [formData, setFormData] = useState(null)
    const [results, setResults] = useState(null)
    const [loading, setLoading] = useState(true)
    const { loggedInUser } = useIsLoggedInUser()

    const { updateSearchParamsFromFormData } = useStyleSearchParams((dataFromUrl) => {
        if (!routerFormData) {
            setFormData(dataFromUrl)
            loadResults(dataFromUrl)
        }
    })

    useEffect(() => {
        if (!routerFormData) return

        setFormData(routerFormData) 
        updateSearchParamsFromFormData(routerFormData) 
        loadResults(routerFormData)             
    }, [routerFormData])

    async function loadResults(data) {
        try {
            setLoading(true)
            const imgs = await getUnsplashResults(data)
            setResults(imgs)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        if (!loggedInUser) return
        loadFavorites({ userId: loggedInUser._id })
    }, [loggedInUser])

    function refresh() {
        if (formData) loadResults(formData)
    }

    return {
        results,
        formData,
        loading,
        refresh,
    }
}