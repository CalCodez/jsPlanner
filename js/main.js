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
const totalEventCounter = getById('total-event-count');

const parentEventCounter = {
	toDo: {
		name: 'To Do',
		container: getById('toDo-parent-container'),
		counter: getById('to-do-count'),
		eventCounter: Array.from(getById('toDo-parent-container')),
	},
	appointment: {
		name: 'Appointments',
		container: getById('appointment-parent-container'),
		counter: getById('appointment-count'),
		eventCounter: Array.from(getById('appointment-parent-container')),
	},

	other: {
		name: 'Other',
		container: getById('other-parent-container'),
		counter: getById('other-count'),
		eventCounter: Array.from(getById('other-parent-container')),
	},

	note: {
		name: 'Notes',
		container: getById('note-parent-container'),
		counter: getById('note-count'),
		eventCounter: Array.from(getById('note-parent-container')),
	},
};
const { toDo, appointment, other, note } = parentEventCounter;

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
				completeEvent(
					completeButton,
					toDo.eventCounter,
					event,
					toDo,
					toDo.name
				);
			} else if (
				completeButton.parentElement.parentElement.parentElement ==
				appointment.container
			) {
				completeEvent(
					completeButton,
					appointment.eventCounter,
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
					other.eventCounter,
					event,
					other,
					other.name
				);
			} else if (
				completeButton.parentElement.parentElement.parentElement ==
				note.container
			) {
				completeEvent(
					completeButton,
					note.eventCounter,
					event,
					note,
					note.name
				);
			}
		});

		deleteButton.addEventListener(click, function () {
			if (
				deleteButton.parentElement.parentElement.parentElement == toDo.container
			) {
				deleteEvent(deleteButton, toDo.eventCounter, event, toDo, toDo.name);
			} else if (
				deleteButton.parentElement.parentElement.parentElement ==
				appointment.container
			) {
				deleteEvent(
					deleteButton,
					appointment.eventCounter,
					event,
					appointment,
					appointment.name
				);
			} else if (
				deleteButton.parentElement.parentElement.parentElement ==
				other.container
			) {
				deleteEvent(deleteButton, other.eventCounter, event, other, other.name);
			} else if (
				deleteButton.parentElement.parentElement.parentElement == note.container
			) {
				deleteEvent(deleteButton, note.eventCounter, event, note, note.name);
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
		toDo.eventCounter.length +
		appointment.eventCounter.length +
		other.eventCounter.length +
		note.eventCounter.length
	);
}

const buildEventBox = (array, obj) => {
	addClass(array[0], obj.eventBox);
	addClass(array[1], obj.type.containerClass);
	addClass(array[2], obj.title.containerClass);
	addClass(array[3], obj.date.containerClass);
	addClass(array[4], obj.description.containerClass);
	addClass(array[5], obj.button.containerClass);
	addClass(array[6], obj.timeStamp.containerClass);
	textContent(array[1], obj.type.formInput.value);
	textContent(array[2], obj.title.formInput.value);
	textContent(array[3], obj.date.formInput.value);
	textContent(array[4], obj.description.formInput.value);
	textContent(array[6], generateTimeStampString());
};

const completeEvent = (toggler, parent, item, obj) => {
	toggler.addEventListener(click, function () {
		toggler.parentElement.parentElement.remove();
		appendChild(completedItemsContainer, toggler.parentElement.parentElement);
		parent.pop(item);
		textContent(obj.counter, `${obj.name}: ${parent.length}`);
		textContent(totalEventCounter, `Total: ${totalEventCount()}`);
		completedParent.push(item);
		removeFromLocalStorage(obj.name, 0);
		saveToLocalStorage('completedItems', completedParent);
	});
};

const deleteEvent = (toggler, parent, item, obj) => {
	toggler.addEventListener(click, function () {
		toggler.parentElement.parentElement.remove();
		parent.pop(item);
		textContent(obj.counter, `${obj.name}: ${parent.length}`);
		textContent(totalEventCounter, `Total: ${totalEventCount()}`);
		removeFromLocalStorage(obj.name, 0);
		removeFromLocalStorage('completedItems', 0);
	});
};

const appendEvent = (obj, container, data, button1, button2) => {
	appendChild(obj.container, container);
	obj.eventCounter.push(data);
	textContent(obj.counter, `${obj.name}: ${obj.eventCounter.length}`);
	saveToLocalStorage(obj.name, obj.eventCounter);
	completeEvent(button1, obj.eventCounter, data, obj);
	deleteEvent(button2, obj.eventCounter, data, obj);
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
	buildEventBox(eventContainers, generateEvent);

	const [eventBox, ...rest] = eventContainers;
	addClass(eventBox, 'container');
	for (let i of rest) {
		appendChild(eventBox, i);
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

	const clonedEvent = eventBox.cloneNode(true);
	const eventData = extractEventData(clonedEvent);

	if (generateEvent.type.formInput.value == 'To Do') {
		appendEvent(toDo, eventBox, eventData, completeButton, deleteButton);
	} else if (generateEvent.type.formInput.value == 'Appointment') {
		appendEvent(appointment, eventBox, eventData, completeButton, deleteButton);
	} else if (generateEvent.type.formInput.value == 'Other') {
		appendEvent(other, eventBox, eventData, completeButton, deleteButton);
	} else if (generateEvent.type.formInput.value == 'Note') {
		appendEvent(note, eventBox, eventData, completeButton, deleteButton);
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

//Load and append from local storage vars and function
const storageKeys = [
	toDo.name,
	appointment.name,
	other.name,
	note.name,
	'completedItems',
];
for (let key of storageKeys) {
	if (key == toDo.name) {
		loadFromLocalStorage(toDo.name).forEach((eventNode) =>
			appendChild(toDo.container, eventNode)
		);
		textContent(toDo.counter, `To Do: ${toDo.container.childElementCount}`);
		console.log(toDo.container.childElementCount);
	} else if (key == appointment.name) {
		loadFromLocalStorage(appointment.name).forEach((eventNode) =>
			appendChild(appointment.container, eventNode)
		);
		textContent(
			appointment.counter,
			`Appointments: ${appointment.container.childElementCount}`
		);
	} else if (key == other.name) {
		loadFromLocalStorage(other.name).forEach((eventNode) =>
			appendChild(other.container, eventNode)
		);
		textContent(other.counter, `Other: ${other.container.childElementCount}`);
	} else if (key == note.name) {
		loadFromLocalStorage(note.name).forEach((eventNode) =>
			appendChild(note.container, eventNode)
		);
	} else if (key == 'completedItems') {
		loadFromLocalStorage('completedItems').forEach((eventNode) =>
			appendChild(completedItemsContainer, eventNode)
		);
		textContent(note.counter, `Note: ${note.container.childElementCount}`);
	}
}
