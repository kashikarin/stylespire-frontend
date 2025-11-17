import { useLocation } from "react-router-dom"

export function Results({formData, results}) {
    const location = useLocation()
    console.log(location.state)
    return(
        <h3>hi</h3>
    )
}