const express = require('express');
const app = express();
const port = 3000

const axios = require('axios'); 

require('dotenv').config();

app.get('/', (req, res) => {
    res.send('Starting Recommendation App')
})

app.get('/movie/:name', async (req, res) => {
    const movieName = req.params.name;
    const apiKey = process.env.TMDB_API_KEY;

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
                api_key: apiKey,
                query: movieName
            }
        });
        
        res.json(response.data)
    } catch(error) {
        console.error('Error fetching the movie data: ', error)
    }
});

app.listen(port, () =>{
    console.log(`Recommendation app listening on ports ${port}`);
})