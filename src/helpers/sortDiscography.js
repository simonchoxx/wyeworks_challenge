export const sortByYearAndName = (discography, year, name) => {
	return discography.sort((a, b) =>
		a[year] === b[year]
			? a[name].localeCompare(b[name])
			: a[year].localeCompare(b[year])
	);
};
