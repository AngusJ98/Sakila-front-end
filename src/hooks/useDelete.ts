import { useState, useEffect } from "react"

interface DeleteResult {
    status: number | null;
    error: any | null;
    handleDelete: () => Promise<void>
}

//Todo Make sure this functions as intended

const useDelete = (url: string): DeleteResult => {
    const [status, setStatus] = useState<number | null>(null);
    const [error, setError] = useState<any | null>(null);
  
    const handleDelete = async () => {
      try {
        const response = await fetch(url, {method: "DELETE"})
        .then(async res => {
            setStatus(res.status);
            setError(null);
        })
        console.log('Delete successful:', response);
        } catch (err) {
            setStatus(500);
            setError(err);
            console.error('There was an error deleting the resource:', error);
        }
    };
  
    return { status, error, handleDelete };
};

export default useDelete;
  