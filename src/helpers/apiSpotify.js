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

export const searchAlbum = async (token, album) => {
	const { data } = await axios.get('https://api.spotify.com/v1/search', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		params: {
			q: album,
			type: 'album',
		},
	});

	return data.albums.items;
};

export const getImageAlbum = (album) => {
	const filtered = album.filter((e) => e.artists[0].name === 'Bob Dylan');
	const image = filtered.length > 0 ? filtered[0].images[0] : '';
	return image.url || '';
};
