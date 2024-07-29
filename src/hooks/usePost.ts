import { useState, useEffect } from "react"


//Todo Make sure this functions as intended
export default function usePost<T>(url: string, inData:T) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() => {
        fetch(url, {method: "POST", mode:"cors", body: JSON.stringify(inData)})
            .then(async res => { 
                if(!res.ok) throw await res.json();
                return res.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error("Error fetching data, ",  error)
                setError(error)
            })
            .finally(() => {
                setLoading(false);
            })

    }, [])

    return {data, loading, error}
}