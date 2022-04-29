import React, { useEffect, useState } from 'react';
import { deleteBoard, getAllBoards } from '../helpers/APIBoard';

export const ListBoardsScreen = ({ boardsProp }) => {
	const [boards, setBoards] = useState(boardsProp);
	// useEffect(() => {
	// 	getBoards();
	// }, []);

	boardsProp.sort((a, b) => b.id.localeCompare(a.id));

	// const getBoards = async () => {
	// 	setBoards(await getAllBoards());
	// };

	const handleDelete = (id) => {
		deleteBoard(id);
		// setBoards([]);
		// getBoards();
	};

	return (
		<>
			<div className="row g-3 my-2">
				{boardsProp.length ? (
					<strong>{boardsProp.length} boards created</strong>
				) : (
					<div className="text-center fs-6">There are no boards to show</div>
				)}
				{boardsProp?.map((e) => {
					return (
						<div className="col-md-3" key={e.id}>
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">{e.name}</h5>
									<p className="card-text">Without description</p>
									<div className="d-flex justify-content-between">
										<a
											href={e.url}
											target="_blank"
											className="btn btn-outline-secondary btn-sm"
											rel="noreferrer"
										>
											Open
										</a>
										<button
											className="btn btn-outline-danger btn-sm"
											onClick={() => handleDelete(e.id)}
											// onClick={() => handleDelete(e.id)}
										>
											Delete
										</button>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};
