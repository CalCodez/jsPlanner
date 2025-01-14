const saveToLocalStorage = (key, array) => {
	localStorage.setItem(key, JSON.stringify(array));
};

const extractEventData = (eventNode) => {
	return {
		type: eventNode.querySelector(`.${generateEvent.type.containerClass}`)
			.textContent,
		title: eventNode.querySelector(`.${generateEvent.title.containerClass}`)
			.textContent,
		date: eventNode.querySelector(`.${generateEvent.date.containerClass}`)
			.textContent,
		description: eventNode.querySelector(
			`.${generateEvent.description.containerClass}`
		).textContent,
		timeStamp: eventNode.querySelector(
			`.${generateEvent.timeStamp.containerClass}`
		).textContent,
	};
};
