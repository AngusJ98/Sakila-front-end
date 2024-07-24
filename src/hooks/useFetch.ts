import { useEffect, useState } from "react";

interface FetchState<T> {
    data: T | null,
    loading: boolean
    error:unknown;
}

export default function useFetch<T>(url: string): FetchState<T> {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() => {
        fetch(url)
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