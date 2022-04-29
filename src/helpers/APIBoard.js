import { searchAlbum, getImageAlbum } from '../helpers/searchAlbum';

const TRELLO_KEY = process.env.REACT_APP_TRELLO_API_KEY;
const TRELLO_TOKEN = process.env.REACT_APP_TRELLO_TOKEN;
const TRELLO_ORG = process.env.REACT_APP_TRELLO_ORGANIZATION;

// FUNCTION TO CREATE A BOARD
export const createBoard = async (name) => {
	const postBoard = `https://api.trello.com/1/boards/?name=${name}&key=${TRELLO_KEY}&token=${TRELLO_TOKEN}&defaultLists=false&prefs_permissionLevel=public`;
	try {
		const response = await fetch(postBoard, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		return result;
	} catch (error) {
		return error;
	}
};

// FUNCTION TO CREATE LISTS AND CARDS ON THE CURRENT BOARD
export const createLists = async (idBoard, discs, token) => {
	for (let key in discs) {
		let decade = key;
		const postList = `https://api.trello.com/1/lists?name=${decade}&idBoard=${idBoard}&key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`;
		try {
			const response = await fetch(postList, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const result = await response.json();
			const { id } = result;
			let value = discs[key];
			for (let i = 0; i < value.length; i++) {
				let name = value[i].name;
				let year = value[i].year;

				const postCard = `https://api.trello.com/1/cards?idList=${id}&name=${year} - ${name}&desc=The ${name} album was created in ${year}&key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`;
				try {
					const response = await fetch(postCard, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
					});
					const { id } = await response.json();

					const album = await searchAlbum(token, name);
					const image =
						(await getImageAlbum(album)) ||
						'http://www.losprincipios.org/images/default.jpg';

					// if (!!image) {
					const addAttach = `https://trello.com/1/cards/${id}/attachments?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}&url=${image}&setCover=true`;
					try {
						const response = await fetch(addAttach, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
						});
						await response.json();
					} catch (error) {
						return error;
					}
					// } else {
					// 	const setColorCover = `https://api.trello.com/1/cards/${id}?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`;
					// 	try {
					// 		const response = await fetch(setColorCover, {
					// 			method: 'PUT',
					// 			headers: {
					// 				'Content-Type': 'application/json',
					// 			},
					// 			body: JSON.stringify({ cover: { color: 'red' } }),
					// 		});
					// 		await response.json();
					// 	} catch (error) {
					// 		return error;
					// 	}
					// }
				} catch (error) {
					return error;
				}
			}
			// return result;
		} catch (error) {
			return error;
		}
	}
	return { result: true };
};

// FUNCTION TO GET ALL BOARDS CREATED
export const getAllBoards = async () => {
	const getBoards = `https://api.trello.com/1/organizations/${TRELLO_ORG}/boards?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`;
	try {
		const response = await fetch(getBoards, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		return result;
	} catch (error) {
		return error;
	}
};

export const deleteBoard = async (id) => {
	const deleteBoard = `https://api.trello.com/1/boards/${id}?key=4805d0de9f883129e7fda22ae0061be4&token=b9e3f590c14fc5c9362b575e9812f897c7a0577ad931d1be75e1a89d565989ef`;
	try {
		const response = await fetch(deleteBoard, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		return result;
	} catch (error) {
		return error;
	}
};
