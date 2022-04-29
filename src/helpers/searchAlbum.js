import axios from 'axios';

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
