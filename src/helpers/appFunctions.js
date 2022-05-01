export const convertTxtToArray = (dataDisc) => {
	var data = [];
	dataDisc.split('\n').map((el) => {
		const [year, name] = el.split(/\s+(.*)/);
		data.push({ year, name });
	});
	return data;
};

export const sortByYearAndName = (discography, year, name) => {
	return discography.sort((a, b) =>
		a[year] === b[year]
			? a[name].localeCompare(b[name])
			: a[year].localeCompare(b[year])
	);
};
