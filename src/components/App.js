import React, { useState, useEffect } from 'react';
import { convertTxtToArray } from '../helpers/convertTxtToArray';
import { getCompleteInfo } from '../helpers/getCompleteDiscs';
import discography from '../resources/discography.txt';
import { CreateBoardScreen } from './CreateBoardScreen';
import { Header } from './HeaderScreen';

export const App = () => {
	const [text, setText] = useState();

	// OBTENGO EL ARCHIVO TXT
	const getDiscography = (textFile) => {
		fetch(textFile)
			.then((response) => response.text())
			.then((textContent) => {
				setText(textContent);
			});
		return text || '';
	};

	const dataDiscography = getDiscography(discography);

	// CONVIERTO ARCHIVO TXT A ARRAY DE OBJETOS
	let discographyParsed = convertTxtToArray(dataDiscography);

	// OBTENGO DISCOGRAFIA AGRUPADA POR DECADA Y ORDENADA POR AÑO Y NOMBRE
	const groupedDiscs = getCompleteInfo(discographyParsed);

	return (
		<>
			<Header />
			<div className="container">
				<CreateBoardScreen discs={groupedDiscs} />
			</div>
		</>
	);
};

export default App;
