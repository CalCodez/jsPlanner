const date = new Date();

const dateObject = {
	fullYear: date.getFullYear(),
	month: date.getMonth() + 1,
	longMonthName: date.toLocaleString('default', { month: 'long' }),
	shortMonthName: date.toLocaleString('default', { month: 'short' }),
	day: date.getDate(),
	longDayName: date.toLocaleString('default', { weekday: 'long' }),
	shortDayName: date.toLocaleString('default', { weekday: 'short' }),
	dayOfWeek: date.getDay() + 1,
	fullDate1: date.toDateString(),
	fullDate2: date.toLocaleDateString(),
};

const timeObject = {
	hours: date.getHours(),
	minutes: date.getMinutes(),
	seconds: date.getSeconds(),
};
