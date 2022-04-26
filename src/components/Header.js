import React from 'react';
import logoWWRed from '../resources/logoWW_red.svg';

export const Header = () => {
	return (
		<div className="bg-dark d-flex align-items-center justify-content-center">
			<img src={logoWWRed} alt="WyeWorks" width={300} height={300} />
		</div>
	);
};
