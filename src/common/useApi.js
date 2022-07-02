import { useState } from "react"

export default (apiFunc) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const request = async (...args) => {
        setLoading(true)
        try {
            let result = await apiFunc(...args)
            setData(result)
        } catch (error) {
            setError(error.message || "Unexpected Error")
        }
        finally {
            setLoading(false)
        }
    }

    return {
        data, error, loading, request
    }
}