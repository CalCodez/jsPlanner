const getByClass = (className) => document.getElementsByClassName(className);
const getById = (id) => document.getElementById(id);
const createElement = (element) => document.createElement(element);
const appendChild = (parent, child) => parent.appendChild(child);
const removeChild = (parent, child) => parent.removeChild(child);
const addClass = (element, className = '') => element.classList.add(className);
const removeClass = (element, className) => element.classList.remove(className);
const toggleClass = (element, className) => element.classList.toggle(className);
const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);
const textContent = (element, text) => (element.textContent = text);

const click = 'click';
const keyup = 'keyup';
const flexActive = 'flex-active';
const flexInactive = 'flex-inactive';

const date = new Date();
function generateTimeStampString() {
	const timestamp = Date.now();
	const date = new Date(timestamp);
	const formattedString = date.toLocaleString();
	return formattedString;
}

//Mobile Menu vars and function

const mobileMenuToggler = getById('mobile-menu-toggler');
const mobileMenuContainer = getById('mobile-menu-container');

mobileMenuToggler.addEventListener(click, function () {
	if (!mobileMenuContainer.classList.contains(flexActive)) {
		toggleClass(mobileMenuContainer, flexActive);
	} else {
		toggleClass(mobileMenuContainer, flexActive);
	}

	mobileMenuContainer.addEventListener('click', function () {
		if (mobileMenuContainer.classList.contains(flexActive)) {
			toggleClass(mobileMenuContainer, flexActive);
		}
	});

	document.addEventListener(keyup, function (event) {
		if (
			event.key == 'Escape' &&
			mobileMenuContainer.classList.contains(flexActive)
		) {
			toggleClass(mobileMenuContainer, flexActive);
		}
	});
});

const dateDisplay = getById('date-container');

dateDisplay.innerText = generateTimeStampString();

const completedEventContainer = getById('completed-events-container');
const completedItemsContainer = getById('completed-items-container');
const toggleCompletedEventsContainer = (
	container = completedEventContainer
) => {
	const completedEventsToggler = getById('completed-events-toggler');
	const menuCaret = getById('menu-caret');
	const caretOpen = 'fa-caret-left';
	const caretClose = 'fa-caret-right';
	const completedHeader = getById('completed-header');
	const eventContainerActive = 'completed-active';
	const clearCompletedItemsButton = getById('clear-completed-items-toggle');

	completedEventsToggler.addEventListener(click, function () {
		if (!container.classList.contains(eventContainerActive)) {
			toggleClass(container, eventContainerActive);
			toggleClass(completedHeader, flexInactive);
			removeClass(menuCaret, caretOpen);
			addClass(menuCaret, caretClose);
			clearCompletedItemsButton.style.visibility = 'visible';
		} else {
			toggleClass(container, eventContainerActive);
			toggleClass(completedHeader, flexInactive);
			removeClass(menuCaret, caretClose);
			addClass(menuCaret, caretOpen);
			clearCompletedItemsButton.style.visibility = 'hidden';
		}
	});

	clearCompletedItemsButton.addEventListener(click, function () {
		console.log(completedItemsContainer.firstChild);
		while (completedItemsContainer.firstChild) {
			removeChild(completedItemsContainer, completedItemsContainer.firstChild);
			localStorage.removeItem('completedItems');
		}
	});
};

toggleCompletedEventsContainer();

//``Toggle Event Form Var and Function
const eventFormTogglers = getByClass('create-event-togglers');
const cancelFormButton = getById('cancel-form-button');
const eventFormContainer = getById('create-event-container');

console.log(cancelFormButton);

const toggleCreateEvent = (array) => {
	for (let toggles of array) {
		toggles.addEventListener(click, function () {
			if (!eventFormContainer.classList.contains(flexActive)) {
				toggleClass(eventFormContainer, flexActive);
			} else {
				toggleClass(eventFormContainer, flexActive);
			}
		});
	}
	cancelFormButton.addEventListener(click, function () {
		toggleClass(eventFormContainer, flexActive);
	});

	document.addEventListener(keyup, function (event) {
		if (
			event.key == 'Escape' &&
			eventFormContainer.classList.contains(flexActive)
		) {
			toggleClass(eventFormContainer, flexActive);
		}
	});
};

toggleCreateEvent(eventFormTogglers);

//``Collect Each event holder parent container Ids and sote in Array.from

const completedParent = Array.from(getById('completed-items-container'));

// Event Counters

const parentEventCounter = {
	toDo: {
		name: 'To Do',
		container: getById('toDo-parent-container'),
		counter: getById('to-do-count'),
	},
	appointment: {
		name: 'Appointments',
		container: getById('appointment-parent-container'),
		counter: getById('appointment-count'),
	},

	other: {
		name: 'Other',
		container: getById('other-parent-container'),
		counter: getById('other-count'),
	},

	note: {
		name: 'Notes',
		container: getById('note-parent-container'),
		counter: getById('note-count'),
	},
};

const { toDo, appointment, other, note } = parentEventCounter;

const totalEventCounter = getById('total-event-count');
const toDoEventCounter = Array.from(parentEventCounter.toDo.container);
const appointmentEventCounter = Array.from(
	parentEventCounter.appointment.container
);
const otherEventCounter = Array.from(parentEventCounter.other.container);
const noteEventCounter = Array.from(parentEventCounter.note.container);

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

const loadFromLocalStorage = (key) => {
	const data = localStorage.getItem(key);
	const parsedData = data ? JSON.parse(data) : [];

	// Create event nodes with applied classes
	const createEventNode = (event) => {
		const eventNode = document.createElement('div');
		addClass(eventNode, generateEvent.eventBox);
		addClass(eventNode, 'container'); // Optional: Add a general class for styling

		const typeDiv = document.createElement('div');
		addClass(typeDiv, generateEvent.type.containerClass);
		typeDiv.textContent = event.type;
		eventNode.appendChild(typeDiv);

		const titleDiv = document.createElement('div');
		addClass(titleDiv, generateEvent.title.containerClass);

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

		const buttonContainer = createElement('div');
		addClass(buttonContainer, generateEvent.button.containerClass);
		let buttons = [];
		for (let i = 0; i < 2; i++) {
			buttons.push(createElement('button'));
		}
		for (let i of buttons) {
			appendChild(buttonContainer, i);
		}

		const [completeButton, deleteButton] = buttons;
		addClass(completeButton, generateEvent.button.buttonClass);
		addClass(deleteButton, generateEvent.button.buttonClass);
		textContent(completeButton, generateEvent.button.completeText);
		textContent(deleteButton, generateEvent.button.deleteText);
		appendChild(eventNode, buttonContainer);

		completeButton.addEventListener(click, function () {
			if (
				completeButton.parentElement.parentElement.parentElement ==
				toDo.container
			) {
				completeEvent(completeButton, toDoEventCounter, event, toDo, toDo.name);
			} else if (
				completeButton.parentElement.parentElement.parentElement ==
				appointment.container
			) {
				completeEvent(
					completeButton,
					appointmentEventCounter,
					event,
					appointment,
					appointment.name
				);
			} else if (
				completeButton.parentElement.parentElement.parentElement ==
				other.container
			) {
				completeEvent(
					completeButton,
					otherEventCounter,
					eventData,
					other,
					other.name
				);
			} else if (
				completeButton.parentElement.parentElement.parentElement ==
				note.container
			) {
				completeEvent(completeButton, noteEventCounter, event, note, note.name);
			}
		});

		deleteButton.addEventListener(click, function () {
			if (
				deleteButton.parentElement.parentElement.parentElement == toDo.container
			) {
				deleteEvent(deleteButton, toDoEventCounter, event, toDo, toDo.name);
			} else if (
				deleteButton.parentElement.parentElement.parentElement ==
				appointment.container
			) {
				deleteEvent(
					deleteButton,
					appointmentEventCounter,
					event,
					appointment,
					appointment.name
				);
			} else if (
				deleteButton.parentElement.parentElement.parentElement ==
				other.container
			) {
				deleteEvent(deleteButton, otherEventCounter, event, other, other.name);
			} else if (
				deleteButton.parentElement.parentElement.parentElement == note.container
			) {
				deleteEvent(deleteButton, noteEventCounter, event, note, note.name);
			} else if (
				deleteButton.parentElement.parentElement.parentElement ==
				completedItemsContainer
			) {
				deleteButton.parentElement.parentElement.remove();
				removeFromLocalStorage('completedItems', 0);
			}
		});

		const timeStampDiv = document.createElement('div');
		timeStampDiv.classList.add(generateEvent.timeStamp.containerClass);
		addClass(timeStampDiv, generateEvent.timeStamp.containerClass);
		timeStampDiv.textContent = event.timeStamp;
		eventNode.appendChild(timeStampDiv);
		return eventNode;
	};

	return parsedData.map(createEventNode);
};

//CODE: Study this local storage function
function removeFromLocalStorage(key, position) {
	// Get the data from localStorage
	let data = localStorage.getItem(key);
	// Check if the data exists
	if (data) {
		let parsedData = JSON.parse(data); // Parse the JSON string
		// Ensure the position is valid
		if (position >= 0 && position < parsedData.length) {
			parsedData.splice(position, 1); // Remove the object at the specified position

			if (parsedData.length === 0) {
				// If the array is empty, remove the key from localStorage
				localStorage.removeItem(key);
			} else {
				// Otherwise, update the localStorage with the modified array
				localStorage.setItem(key, JSON.stringify(parsedData));
			}
		} else {
			console.error('Invalid position: Out of bounds');
		}
	} else {
		console.error('No data found for the key:', key);
	}
}

function totalEventCount() {
	return (
		toDoEventCounter.length +
		appointmentEventCounter.length +
		otherEventCounter.length +
		noteEventCounter.length
	);
}

const deleteEvent = (toggler, parent, item, obj, key) => {
	toggler.addEventListener(click, function () {
		toggler.parentElement.parentElement.remove();
		parent.pop(item);
		textContent(obj.counter, `${obj.name}: ${parent.length}`);
		textContent(totalEventCounter, `Total: ${totalEventCount()}`);
		removeFromLocalStorage(key, 0);
		removeFromLocalStorage('completedItems', 0);
	});
};

const completeEvent = (toggler, parent, item, obj, key) => {
	toggler.addEventListener(click, function () {
		toggler.parentElement.parentElement.remove();
		appendChild(completedItemsContainer, toggler.parentElement.parentElement);
		parent.pop(item);
		textContent(obj.counter, `${obj.name}: ${parent.length}`);
		textContent(totalEventCounter, `Total: ${totalEventCount()}`);
		completedParent.push(item);
		removeFromLocalStorage(key, 0);
		saveToLocalStorage('completedItems', completedParent);
		console.log(completedParent);
	});
};

const generateEvent = {
	eventBox: 'event-box',
	type: {
		formInput: getById('event-type'),
		containerClass: 'event-type-container',
	},
	title: {
		formInput: getById('event-title'),
		containerClass: 'event-title-container',
	},
	date: {
		formInput: getById('event-date'),
		containerClass: 'event-date-container',
	},
	description: {
		formInput: getById('event-description'),
		containerClass: 'event-description-container',
	},
	button: {
		containerClass: 'event-button-container',
		buttonClass: 'toggle-buttons',
		completeText: 'Complete',
		deleteText: 'Delete',
	},
	timeStamp: {
		containerClass: 'event-timestamp-container',
	},
};

//Generate An Event Function
const eventGeneratorButton = getById('generate-event-btn');

eventGeneratorButton.addEventListener(click, function () {
	let eventContainers = [];
	for (let i = 0; i < 7; i++) {
		eventContainers.push(createElement('div'));
	}
	const [event, type, title, date, description, button, timeStamp] =
		eventContainers;

	addClass(event, generateEvent.eventBox);
	addClass(type, generateEvent.type.containerClass);
	addClass(title, generateEvent.title.containerClass);
	addClass(date, generateEvent.date.containerClass);
	addClass(description, generateEvent.description.containerClass);
	addClass(button, generateEvent.button.containerClass);
	addClass(timeStamp, generateEvent.timeStamp.containerClass);
	textContent(type, generateEvent.type.formInput.value);
	textContent(title, generateEvent.title.formInput.value);
	textContent(date, generateEvent.date.formInput.value);
	textContent(description, generateEvent.description.formInput.value);
	textContent(timeStamp, generateTimeStampString());

	const [eventBox, ...rest] = eventContainers;
	addClass(eventBox, 'container');
	for (let i of rest) {
		appendChild(event, i);
	}
	let eventBoxButtons = [];
	for (let i = 0; i < 2; i++) {
		eventBoxButtons.push(createElement('button'));
	}
	for (let toggles of eventBoxButtons) {
		addClass(toggles, generateEvent.button.buttonClass);
		appendChild(rest[4], toggles);
	}

	const [completeButton, deleteButton] = eventBoxButtons;
	textContent(completeButton, generateEvent.button.completeText);
	textContent(deleteButton, generateEvent.button.deleteText);

	const clonedEvent = event.cloneNode(true);
	const eventData = extractEventData(clonedEvent);

	//NOTE:CODE: Refactor this if statement to an arrow function using this obj.value to reduce this code

	if (generateEvent.type.formInput.value == 'To Do') {
		appendChild(toDo.container, event);
		toDoEventCounter.push(eventData);
		textContent(toDo.counter, `To Do: ${toDoEventCounter.length}`);
		saveToLocalStorage(toDo.name, toDoEventCounter);
		completeEvent(completeButton, toDoEventCounter, eventData, toDo, toDo.name);
		deleteEvent(deleteButton, toDoEventCounter, event, toDo, toDo.name);
	} else if (generateEvent.type.formInput.value == 'Appointment') {
		appendChild(appointment.container, event);
		appointmentEventCounter.push(eventData);
		textContent(
			appointment.counter,
			`Appointments: ${appointmentEventCounter.length}`
		);
		saveToLocalStorage(appointment.name, appointmentEventCounter);
		completeEvent(
			completeButton,
			appointmentEventCounter,
			eventData,
			appointment,
			appointment.name
		);

		deleteEvent(
			deleteButton,
			appointmentEventCounter,
			eventData,
			appointment,
			appointment.name
		);
	} else if (generateEvent.type.formInput.value == 'Other') {
		appendChild(other.container, event);
		otherEventCounter.push(eventData);
		saveToLocalStorage('other', otherEventCounter);
		textContent(other.counter, `Other: ${otherEventCounter.length}`);
		completeEvent(
			completeButton,
			otherEventCounter,
			eventData,
			other,
			other.name
		);
		deleteEvent(deleteButton, otherEventCounter, event, other, other.name);
	} else if (generateEvent.type.formInput.value == 'Note') {
		noteEventCounter.push(eventData);
		saveToLocalStorage(note.name, noteEventCounter);

		textContent(note.counter, `Notes: ${noteEventCounter.length}`);
		completeEvent(completeButton, noteEventCounter, eventData, note, note.name);
		deleteEvent(deleteButton, noteEventCounter, event, note, note.name);

		textContent(totalEventCounter, `Total: ${totalEventCount()}`);

		appendChild(note.container, eventBox);
	}

	textContent(totalEventCounter, `Total: ${totalEventCount()}`);
	toggleClass(eventFormContainer, flexActive);
});

//``Toggle Event Holder Containers Var and Function
const holderToggles = getByClass('holder-toggle');
console.log(holderToggles);
const [
	todoToggle,
	appointmentToggle,
	otherToggle,
	noteToggle,
	toDoButton,
	appointmentButton,
	otherButton,
	noteButton,
] = holderToggles;

const eventHolders = {
	todoHolder: {
		toggle: [todoToggle, toDoButton],
		holder: getById('toDo-event-holder'),
	},
	appointmentHolder: {
		toggle: [appointmentToggle, appointmentButton],
		holder: getById('appointment-event-holder'),
	},
	otherHolder: {
		toggle: [otherToggle, otherButton],
		holder: getById('other-event-holder'),
	},
	noteHolder: {
		toggle: [noteToggle, noteButton],
		holder: getById('note-event-holder'),
	},
};

const { todoHolder, appointmentHolder, otherHolder, noteHolder } = eventHolders;

const toggleEventHolders = (object1, object2, object3, object4) => {
	const holderToggled = 'holder-toggled';

	for (let toggler of object1.toggle) {
		toggler.addEventListener(click, function () {
			if (
				!object1.holder.classList.contains(holderToggled) &&
				!object2.holder.classList.contains(holderToggled) &&
				!object3.holder.classList.contains(holderToggled) &&
				!object4.holder.classList.contains(holderToggled)
			) {
				toggleClass(object1.holder, holderToggled);
				toggleClass(object2.holder, flexInactive);
				toggleClass(object3.holder, flexInactive);
				toggleClass(object4.holder, flexInactive);
			} else if (
				object1.holder.classList.contains(flexInactive) &&
				object2.holder.classList.contains(holderToggled) &&
				object3.holder.classList.contains(flexInactive) &&
				object4.holder.classList.contains(flexInactive)
			) {
				removeClass(object1.holder, flexInactive);
				addClass(object1.holder, holderToggled);
				removeClass(object2.holder, holderToggled);
				addClass(object2.holder, flexInactive);
			} else if (
				object1.holder.classList.contains(flexInactive) &&
				object2.holder.classList.contains(flexInactive) &&
				object3.holder.classList.contains(holderToggled) &&
				object4.holder.classList.contains(flexInactive)
			) {
				removeClass(object1.holder, flexInactive);
				addClass(object1.holder, holderToggled);
				removeClass(object3.holder, holderToggled);
				addClass(object3.holder, flexInactive);
			} else if (
				object1.holder.classList.contains(flexInactive) &&
				object2.holder.classList.contains(flexInactive) &&
				object3.holder.classList.contains(flexInactive) &&
				object4.holder.classList.contains(holderToggled)
			) {
				removeClass(object1.holder, flexInactive);
				addClass(object1.holder, holderToggled);
				removeClass(object4.holder, holderToggled);
				addClass(object4.holder, flexInactive);
			} else {
				toggleClass(object1.holder, holderToggled);
				removeClass(object2.holder, flexInactive);
				removeClass(object3.holder, flexInactive);
				removeClass(object4.holder, flexInactive);
			}
		});
	}
};

toggleEventHolders(todoHolder, appointmentHolder, otherHolder, noteHolder);
toggleEventHolders(appointmentHolder, todoHolder, otherHolder, noteHolder);
toggleEventHolders(otherHolder, todoHolder, appointmentHolder, noteHolder);
toggleEventHolders(noteHolder, todoHolder, appointmentHolder, otherHolder);

console.log(loadFromLocalStorage('appointments', appointmentEventCounter));

const storageKeys = [
	toDo.name,
	appointment.name,
	other.name,
	note.name,
	'completedItems',
];

//const loadEvents = loadFromLocalStorage(array);

for (let key of storageKeys) {
	if (key == toDo.name) {
		loadFromLocalStorage(toDo.name).forEach((eventNode) =>
			appendChild(toDo.container, eventNode)
		);
	} else if (key == appointment.name) {
		loadFromLocalStorage(appointment.name).forEach((eventNode) =>
			appendChild(appointment.container, eventNode)
		);
	} else if (key == other.name) {
		loadFromLocalStorage(other.name).forEach((eventNode) =>
			appendChild(other.container, eventNode)
		);
	} else if (key == note.name) {
		loadFromLocalStorage(note.name).forEach((eventNode) =>
			appendChild(note.container, eventNode)
		);
	} else if (key == 'completedItems') {
		loadFromLocalStorage('completedItems').forEach((eventNode) =>
			appendChild(completedItemsContainer, eventNode)
		);
	}
}
