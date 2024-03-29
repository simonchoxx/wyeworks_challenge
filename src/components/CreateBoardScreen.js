import React, { useEffect, useState } from 'react';
import { createBoard, createLists, getAllBoards } from '../helpers/apiBoard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ListBoardsScreen } from './ListBoardsScreen';
import { MessagesScreen } from './MessagesScreen';
import { getSpotifyToken } from '../helpers/apiSpotify';

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
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getBoards();
		getTokenSpotify();
	}, []);

	const getBoards = async () => {
		setBoards(await getAllBoards());
		setLoading(false);
	};

	const getTokenSpotify = async () => {
		setToken(await getSpotifyToken());
	};

	const handleInputChange = (e) => {
		e.preventDefault();
		setBoardName(e.target.value);
	};

	const preCreateBoard = () => {
		setButtonDisabled(true);
		setBoardUrl(null);
		setFinish(false);
	};

	const postCreateBoard = (result) => {
		setButtonDisabled(false);
		setFinish(result);
		getBoards();
		notify(`Board ${boardName} created successfully`, 'Success');
	};

	const createBoardComplete = async () => {
		try {
			// CHECK IF CAN CREATE A BOARD
			if (boardName && boards.length < 10) {
				preCreateBoard();
				const { id, url } = await createBoard(boardName);
				setBoardUrl(url);
				setBoardNameAux(boardName);
				const { result } = await createLists(id, discs, token);
				postCreateBoard(result);
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
		<div className="container">
			<div className="mt-3 justify-content-center align-items-center d-flex gap-3">
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
			<ListBoardsScreen boardsProp={boards} loading={loading} />
		</div>
	);
};
