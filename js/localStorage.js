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
const extractNoteData = (eventNode) => {
	return {
		type: eventNode.querySelector(`.${generateNote.type.containerClass}`)
			.textContent,
		description: eventNode.querySelector(
			`.${generateNote.description.containerClass}`
		).textContent,
	};
};

const loadFromLocalStorage = (key) => {
	const data = localStorage.getItem(key);
	const parsedData = data ? JSON.parse(data) : [];

	// Create event nodes with applied classes
	const createEventNode = (event) => {
		if (!key == 'note') {
			const eventNode = document.createElement('div');
			addClass(eventNode, generateEvent.eventBox); // Optional: Add a general class for styling

			const typeDiv = document.createElement('div');
			addClass(typeDiv, generateEvent.type.containerClass);
			typeDiv.textContent = event.type;
			eventNode.appendChild(typeDiv);

			const titleDiv = document.createElement('div');
			addClass(title, generateEvent.title.containerClass);

			titleDiv.textContent = event.title;
			eventNode.appendChild(titleDiv);

			const dateDiv = document.createElement('div');
			addClass(dateDiv, generateEvent.date.containerClass);
			dateDiv.textContent = event.date;
			eventNode.appendChild(dateDiv);

			const descriptionDiv = document.createElement('div');
			addClass(descriptionDiv, generateEvent.description.containerClass);
			descriptionDiv.textContent = event.description;
			eventNode.appendChild(descriptionDiv);

			const timeStampDiv = document.createElement('div');
			timeStampDiv.classList.add(generateEvent.timeStamp.containerClass);
			addClass(timeStampDiv, generateEvent.timeStamp.containerClass);

			timeStampDiv.textContent = event.timeStamp;
			eventNode.appendChild(timeStampDiv);

			return eventNode;
		}
	};
	return parsedData.map(createEventNode);
};

const appendEvent = (obj, data, button1, button2) => {
	appendChild(obj.container, data);
	obj.eventCounter.push(data);
	textContent(obj.counter, `${obj.name}: ${obj.eventCounter.length}`);
	completeEvent(button1, obj.container, data, obj);
	deleteEvent(button2.obj.container, data, obj);
};
