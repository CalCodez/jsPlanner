const date = new Date();

const month = {
	monthNumber: date.getMonth() + 1,
	longMonthName: date.toLocaleString('default', { month: 'long' }),
	shortMonthName: date.toLocaleString('default', { month: 'short' }),
	narrowMonthName: date.toLocaleString('default', { month: 'narrow' }),
};

const day = {
	dayNumber: date.getDate(),
	longDayName: date.toLocaleString('default', { weekday: 'long' }),
	shortDayName: date.toLocaleString('default', { weekday: 'short' }),
	narrowDayName: date.toLocaleString('default', { weekday: 'narrow' }),
	dayOfWeekNumber: date.getDay() + 1,
};

const year = {
	fullYear: date.getFullYear(),
	shortYear: date.getYear() - 100,
};

function getWeekNumber(d) {
	// Copy date so don't modify original
	d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	// Set to nearest Thursday: current date + 4 - current day number
	// Make Sunday's day number 7
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
	// Get first day of year
	var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	// Calculate full weeks to nearest Thursday
	var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
	// Return array of year and week number
	return [`Week: ` + weekNo];
}

console.log(getWeekNumber(date));

const fullDate = {
	fullDate1: date.toDateString(),
	fullDate2: date.toLocaleDateString(),
};

const time = {
	hours: date.getHours(),
	minutes: date.getMinutes(),
	seconds: date.getSeconds(),

	currentTime() {
		return `${this.hours}:${this.minutes}:${this.seconds}`;
	},
};
