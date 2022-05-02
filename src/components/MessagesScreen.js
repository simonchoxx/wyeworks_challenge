import React from 'react';
import { SpinnerLoader } from './SpinnerLoader';

export const MessagesScreen = ({ finish, boardUrl, boardNameAux }) => {
	return (
		<div className="text-center mt-3">
			{!finish && !boardUrl ? null : !finish && boardUrl ? (
				<div className="alert alert-warning " role="alert">
					<div className="d-flex align-items-center justify-content-center gap-3">
						<div>
							Creating board <strong>{boardNameAux}</strong>, please wait...
						</div>

						<div>
							<SpinnerLoader color={'warning'} />
						</div>
					</div>
					<div>
						<p className="fw-lighter mb-0" style={{ fontSize: '0.8em' }}>
							The board, the lists and the corresponding cards are being
							created.
						</p>
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
	);
};
