import axios from 'axios';

export const getSpotifyToken = async () => {
	const SPOTIFY_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
	const SPOTIFY_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

	const url = 'https://accounts.spotify.com/api/token';
	try {
		const response = await axios(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Basic ' + btoa(SPOTIFY_ID + ':' + SPOTIFY_SECRET),
			},
			data: 'grant_type=client_credentials',
		});
		const result = await response.data;
		const { access_token } = result;
		return access_token;
	} catch (error) {
		return error;
	}
};
