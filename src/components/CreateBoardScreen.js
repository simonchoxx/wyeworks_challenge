import React, { useEffect, useState } from 'react';
import { createBoard, createLists, getAllBoards } from '../helpers/APIBoard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ListBoardsScreen } from './ListBoardsScreen';
import { MessagesScreen } from './MessagesScreen';
import { getSpotifyToken } from '../helpers/getSpotifyToken';

toast.configure();

const notifyOptions = {
	position: 'top-right',
	autoClose: 1500,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: false,
	draggable: false,
	progress: undefined,
};

export const CreateBoardScreen = ({ discs }) => {
	const [boardName, setBoardName] = useState('');
	const [boardNameAux, setBoardNameAux] = useState('');
	const [boardUrl, setBoardUrl] = useState(null);
	const [finish, setFinish] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [boards, setBoards] = useState([]);
	const [token, setToken] = useState('');

	useEffect(() => {
		getBoards();
		getTokenSpotify();
	}, []);

	const getBoards = async () => {
		setBoards(await getAllBoards());
	};

	const getTokenSpotify = async () => {
		setToken(await getSpotifyToken());
	};

	const handleInputChange = (e) => {
		e.preventDefault();
		setBoardName(e.target.value);
	};

	const createBoardComplete = async () => {
		try {
			if (boardName && boards.length < 10) {
				setButtonDisabled(true);
				setBoardUrl(null);
				setFinish(false);
				const { id, url } = await createBoard(boardName);
				setBoardUrl(url);
				setBoardNameAux(boardName);
				const { result } = await createLists(id, discs, token);
				setButtonDisabled(false);
				setFinish(result);
				getBoards();
				notify(`Board ${boardName} created successfully`, 'Success');
			} else if (!boardName) {
				notify(`You must provide a name for the board`, 'Error');
			} else if (boards.length === 10) {
				notify(`No more boards can be created`, 'Error');
			}
			setBoardName('');
		} catch (error) {
			console.log(error.name, error.message);
		}
	};

	const notify = (msg, type) => {
		switch (type) {
			case 'Success':
				return toast.success(msg, notifyOptions);
			case 'Error':
				return toast.error(msg, notifyOptions);
			case 'Warning':
				return toast.warning(msg, notifyOptions);
			default:
				break;
		}
	};

	return (
		<div>
			<div className="mt-3 justify-content-center d-flex gap-3">
				<div>
					<input
						type="Name"
						className="form-control"
						id="boardName"
						aria-describedby="boardName"
						placeholder="Enter board name"
						value={boardName}
						onChange={handleInputChange}
					></input>
				</div>
				<div>
					<button
						disabled={buttonDisabled}
						type="button"
						className="btn btn-outline-primary"
						onClick={createBoardComplete}
					>
						Create board
					</button>
				</div>
			</div>
			<MessagesScreen
				finish={finish}
				boardUrl={boardUrl}
				boardNameAux={boardNameAux}
			/>
			<ListBoardsScreen boardsProp={boards} />
		</div>
	);
};
