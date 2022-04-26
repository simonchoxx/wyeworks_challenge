export const convertTxtToArray = (dataDisc) => {
	var data = [];
	dataDisc.split('\n').map((el) => {
		const [year, name] = el.split(/\s+(.*)/);
		data.push({ year, name });
	});
	return data;
};
