import { useState } from "react"


export const useLocationSearch = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [show, setShow] = useState(false);
    const [error, setError] = useState({
        isError: false,
        message: ''
    })
    const handleChange = async (e, cb) => {


        try {
            const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?types=country,address,place&access_token=pk.eyJ1IjoiaGltZWwxMjYiLCJhIjoiY2wxZ2FoeHM4MDd2OTNyb3JlcHZub3R4biJ9.iXUC5niBfA83FT2MYlWvpg&autocomplete=true&country=US`;

            const res = await fetch(endpoint);
            const data = await res.json();

            if (data.features.length) {
                setSuggestions(data.features);
                setShow(true);
            }

        } catch (error) {
            setError({
                isError: true,
                message: error.message
            })

        }
    };



    return {
        suggestions,
        show,
        setShow,
        handleChange,
        error,
    }
}