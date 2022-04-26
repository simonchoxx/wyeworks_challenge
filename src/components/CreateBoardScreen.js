import React, { useEffect, useState } from 'react';
import { createBoard, createLists, getAllBoards } from '../helpers/APIBoard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ListBoardsScreen } from './ListBoardsScreen';

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

	useEffect(() => {
		getBoards();
	}, []);

	const getBoards = async () => {
		setBoards(await getAllBoards());
	};

	const handleInputChange = (e) => {
		e.preventDefault();
		setBoardName(e.target.value);
	};

	const createBoardComplete = async () => {
		if (boardName && boards.length < 10) {
			setButtonDisabled(true);
			setBoardUrl(null);
			setFinish(false);
			const { id, url } = await createBoard(boardName);
			setBoardUrl(url);
			setBoardNameAux(boardName);
			const { result } = await createLists(id, discs);
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
	};

	const notify = (msg, type) => {
		type === 'Success'
			? toast.success(msg, notifyOptions)
			: toast.error(msg, notifyOptions);
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
			<div className="text-center mt-3">
				{!finish && !boardUrl ? null : !finish && boardUrl ? (
					<div
						className="alert alert-warning d-flex align-items-center justify-content-center gap-3"
						role="alert"
					>
						<div>
							Creating board <strong>{boardNameAux}</strong>, please wait...
						</div>
						<div>
							<div
								className="spinner-border ms-auto text-warning"
								role="status"
								aria-hidden="true"
							></div>
						</div>
					</div>
				) : (
					<div className="alert alert-success text-center" role="alert">
						<strong>{boardNameAux}</strong> board created: {''}
						<a
							href={boardUrl}
							className="alert-link"
							target="_blank"
							rel="noreferrer"
						>
							{boardUrl}
						</a>
					</div>
				)}
			</div>
			<ListBoardsScreen boards={boards} />
		</div>
	);
};
