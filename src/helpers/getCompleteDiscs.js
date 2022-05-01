import { sortByYearAndName } from './appFunctions';

export const getCompleteInfo = (orderDiscography) => {
	let completeDisc = [];
	let completeDiscOrdered = [];

	// OBTENGO Y AGREGO EL DATO DE LA DECADA DEL DISCO
	orderDiscography.map((el) => {
		let decade = el.year - (el.year % 10);
		return completeDisc.push({ ...el, decade });
	});

	// AGRUPO LOS DISCOS POR DECADA
	const groupByDecade = (array, property) => {
		return array.reduce((acc, obj) => {
			let key = obj[property];
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(obj);
			return acc;
		}, {});
	};

	// ORDENO LOS ARRAYS DE DECADA POR AÑO Y NOMBRE
	const groupedDiscs = groupByDecade(completeDisc, 'decade');

	for (let key in groupedDiscs) {
		let obj = groupedDiscs[key];
		const decadeOrdered = sortByYearAndName(obj, 'year', 'name');
		completeDiscOrdered.push({ decadeOrdered });
	}

	return groupedDiscs;
};
