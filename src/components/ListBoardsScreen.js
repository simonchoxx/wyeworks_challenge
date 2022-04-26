import React from 'react';

export const ListBoardsScreen = ({ boards }) => {
	boards.sort((a, b) => b.id.localeCompare(a.id));

	return (
		<>
			<div className="row g-3 my-2">
				<strong>{boards.length} boards created</strong>
				{boards.map((e) => {
					return (
						<div className="col-md-3" key={e.id}>
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">{e.name}</h5>
									<p className="card-text">Without description</p>
									<a
										href={e.url}
										target="_blank"
										className="btn btn-outline-success"
										rel="noreferrer"
									>
										Open
									</a>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};
