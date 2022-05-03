import React from 'react';
import { SpinnerLoader } from './SpinnerLoader';

export const ListBoardsScreen = ({ boardsProp, loading }) => {
	boardsProp.sort((a, b) => b.id.localeCompare(a.id));

	return (
		<>
			<div className="row g-3 my-2">
				{boardsProp.length ? (
					<strong>{boardsProp.length} boards created</strong>
				) : !loading ? (
					<div className="text-center fs-6">There are no boards to show</div>
				) : (
					<SpinnerLoader color={'primary'} />
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
