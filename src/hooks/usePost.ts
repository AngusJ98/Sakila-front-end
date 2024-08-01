import { useState } from "react"


interface PostResult<T> {
    status: number | null;
    error: any | null;
    handlePost: (data: T) => Promise<void>
}

//Todo Make sure< this functions as intended
const usePost = <T>(url: string): PostResult<T> => {
    const [status, setStatus] = useState<number | null>(null);
    const [error, setError] = useState<any | null>(null);
  
    const handlePost = async (data: T) => {
      try {
        const response = await fetch(url, {method: "POST", headers: {"Content-Type":"application/json" },body:JSON.stringify(data)})
        .then(async res => {
            console.log(res)
            setStatus(res.status);
            setError(null);
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "An error has occurred")
            } else {
                setError(null);
                alert("Actor creation successful")
            }
        })
        } catch (err) {
            setStatus(500);
            setError(err);
            console.error('There was an error creating the resource:', error);
        }
    };
  
    return { status, error, handlePost };
};

export default usePost