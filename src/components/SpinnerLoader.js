import React from 'react';

export const SpinnerLoader = ({ color }) => {
	return (
		<div className="text-center">
			<div
				className={`spinner-border ms-auto text-${color}`}
				role="status"
				aria-hidden="true"
			></div>
		</div>
	);
};
