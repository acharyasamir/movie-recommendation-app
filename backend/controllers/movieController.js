const axios = require('axios');

// Fetch movie by name
exports.getMovieByName = async (req, res) => {
    const movieName = req.params.name;
    const apiKey = process.env.TMDB_API_KEY;

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: { api_key: apiKey, query: movieName }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching the movie data:', error);
        res.status(500).json({ error: 'Error fetching movie data.' });
    }
};
