import React, { useState } from 'react';
import { convertTxtToArray } from '../helpers/appFunctions';
import { getCompleteDiscs } from '../helpers/getCompleteDiscs';
import discography from '../resources/discography.txt';
import { CreateBoardScreen } from './CreateBoardScreen';
import { Header } from './HeaderScreen';

export const App = () => {
	const [discs, setDiscs] = useState();

	// OBTENGO EL ARCHIVO TXT
	const getDiscography = (textFile) => {
		fetch(textFile)
			.then((response) => response.text())
			.then((textContent) => {
				setDiscs(textContent);
			});
		return discs || '';
	};

	const dataDiscography = getDiscography(discography);

	// CONVIERTO ARCHIVO TXT A ARRAY DE OBJETOS
	let discographyParsed = convertTxtToArray(dataDiscography);

	// OBTENGO DISCOGRAFIA AGRUPADA POR DECADA Y ORDENADA POR AÑO Y NOMBRE
	const groupedDiscs = getCompleteDiscs(discographyParsed);

	return (
		<>
			<Header />
			<CreateBoardScreen discs={groupedDiscs} />
		</>
	);
};

export default App;
