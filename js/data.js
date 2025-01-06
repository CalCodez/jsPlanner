const getByClass = (className) => document.getElementsByClassName(className);
const getById = (id) => document.getElementById(id);
const createElement = (element) => document.createElement(element);
const appendChild = (parent, child) => parent.appendChild(child);
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

const dateDisplay = getById('date-container');

dateDisplay.innerText = generateTimeStampString();

//``Toggle SideBar Menu var and Function
const sideMenuToggle = getById('side-menu-toggler');
const sideMenuContainer = getById('side-menu-container');

sideMenuToggle.addEventListener(click, () => {
	if (!sideMenuContainer.classList.contains('active')) {
		toggleClass(sideMenuContainer, 'active');
	} else {
		toggleClass(sideMenuContainer, 'active');
	}

	document.addEventListener(keyup, function (event) {
		if (
			event.key === 'Escape' &&
			sideMenuContainer.classList.contains('active')
		) {
			toggleClass(sideMenuContainer, 'active');
		}
	});
});

//TODO: toggle category containers functions (todo, calendar, reminders, notes)

//``Toggle Event Form Var and Function
const eventFormTogglers = getByClass('create-event-togglers');
const cancelCrateButton = getById('cancel-create-button');
const eventFormContainer = getById('create-event-container');

for (let toggles of eventFormTogglers) {
	toggles.addEventListener(click, function () {
		if (
			!eventFormContainer.classList.contains(flexActive) &&
			!sideMenuContainer.classList.contains('active')
		) {
			toggleClass(eventFormContainer, flexActive);
		} else if (
			!eventFormContainer.classList.contains(flexActive) &&
			sideMenuContainer.classList.contains('active')
		) {
			toggleClass(eventFormContainer, flexActive);
			toggleClass(sideMenuContainer, 'active');
		}
	});

	cancelCrateButton.addEventListener(click, function () {
		if (eventFormContainer.classList.contains(flexActive)) {
			toggleClass(eventFormContainer, flexActive);
		}
	});

	document.addEventListener(keyup, function (event) {
		if (
			event.key === 'Escape' &&
			eventFormContainer.classList.contains(flexActive)
		) {
			toggleClass(eventFormContainer, flexActive);
		}
	});
}

//``Toggle Event And Note Form Var and Function
const formOptionsContainer = getById('form-options-container');
const formsArray = {
	eventForm: {
		toggler: getById('toggle-create-event'),
		form: getById('event-form'),
		backButton: getById('back-event-btn'),
	},
	noteForm: {
		toggler: getById('toggle-create-note'),
		form: getById('note-form'),
		backButton: getById('back-note-btn'),
	},
};

const { eventForm, noteForm } = formsArray;

const toggleForms = (
	object1,
	object2,
	optionsContainer = formOptionsContainer
) => {
	object1.toggler.addEventListener(click, function () {
		if (
			!object1.form.classList.contains(flexActive) &&
			!object2.form.classList.contains(flexActive)
		) {
			toggleClass(object1.form, flexActive);
			toggleClass(optionsContainer, flexInactive);
		}

		object1.backButton.addEventListener(click, function () {
			while (object1.form.classList.contains(flexActive)) {
				toggleClass(object1.form, flexActive);
				toggleClass(optionsContainer, flexInactive);
			}
		});
	});

	const cancelFormButtons = getByClass('cancel-form-buttons');
	for (let cancelForm of cancelFormButtons) {
		cancelForm.addEventListener(click, function () {
			while (object1.form.classList.contains(flexActive)) {
				toggleClass(object1.form, flexActive);
				toggleClass(optionsContainer, flexInactive);
				toggleClass(eventFormContainer, flexActive);
			}
		});
	}
};
toggleForms(eventForm, noteForm);
toggleForms(noteForm, eventForm);

//``Collect Each event holder parent container Ids and sote in Array.from
const toDoContainer = getById('toDo-parent-container');
const otherContainer = getById('other-parent-container');
const appointmentContainer = getById('appointment-parent-container');
const noteContainer = getById('note-parent-container');

const toDoParent = Array.from(getById('toDo-parent-container'));
const otherParent = Array.from(getById('other-parent-container'));
const noteParent = Array.from(getById('note-parent-container'));

// Event Counters

const parentEventCounter = {
	toDo: {
		container: getById('toDo-parent-container'),
		counter: getById('to-do-count'),
	},
	appointment: {
		container: getById('appointment-parent-container'),
		counter: getById('appointment-count'),
	},

	other: {
		container: getById('other-parent-container'),
		counter: getById('other-count'),
	},
};

const totalEventCounter = getById('total-event-count');
const toDoEventCounter = Array.from(parentEventCounter.toDo.container);
const appointmentEventCounter = Array.from(
	parentEventCounter.appointment.container
);
const otherEventCounter = Array.from(parentEventCounter.other.container);
const totalEventCount = (a, b, c) => {
	return a.length + b.length + c.length;
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
	const [event, ...rest] = eventContainers;
	function buildEventBox(array, object) {
		addClass(array[0], object.eventBox);
		addClass(array[1], object.type.containerClass);
		addClass(array[2], object.title.containerClass);
		addClass(array[3], object.date.containerClass);
		addClass(array[4], object.description.containerClass);
		addClass(array[5], object.button.containerClass);
		addClass(array[6], object.timeStamp.containerClass);
		textContent(array[1], object.type.formInput.value);
		textContent(array[2], object.title.formInput.value);
		textContent(array[3], object.date.formInput.value);
		textContent(array[4], object.description.formInput.value);
		textContent(array[6], generateTimeStampString());
	}
	buildEventBox(eventContainers, generateEvent);
	addClass(event, 'container');
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
	textContent(eventBoxButtons[0], generateEvent.button.completeText);
	textContent(eventBoxButtons[1], generateEvent.button.deleteText);

	if (generateEvent.type.formInput.value == 'To Do') {
		appendChild(parentEventCounter.toDo.container, event);
		toDoEventCounter.push(event);
		textContent(
			parentEventCounter.toDo.counter,
			`ToDo: ${toDoEventCounter.length}`
		);
	} else if (generateEvent.type.formInput.value == 'Appointment') {
		appendChild(parentEventCounter.appointment.container, event);
		appointmentEventCounter.push(event);
		textContent(
			parentEventCounter.appointment.counter,
			`Appointments: ${appointmentEventCounter.length}`
		);
	} else if (generateEvent.type.formInput.value == 'Other') {
		appendChild(parentEventCounter.other.container, event);
		otherEventCounter.push(event);
		textContent(
			parentEventCounter.other.counter,
			`Other: ${otherEventCounter.length}`
		);
	}

	textContent(
		totalEventCounter,
		`Total: ${totalEventCount(
			toDoEventCounter,
			appointmentEventCounter,
			otherEventCounter
		)}`
	);

	toggleClass(eventFormContainer, flexActive);
	toggleClass(eventForm.form, flexActive);
	toggleClass(formOptionsContainer, flexInactive);
});

const noteGeneratorButton = getById('generate-note-btn');

const generateNote = {
	noteBox: 'note-box',
	type: { input: 'Note', containerClass: 'note-type-container' },
	description: {
		formInput: getById('note-description'),
		containerClass: 'note-description-container',
	},
};
const boxClasses = {};

//??Close Containers on click and Escape key Default

const activeContainers = [];

const exitContainer = (array) => {
	for (let containerActive of array) {
		containerActive.addEventListener(click, function () {
			if (containerActive.classList.contains(flexActive)) {
				toggleClass(containerActive, flexActive);
			}

			document.addEventListener(keyup, function (event) {
				if (
					event.key === 'Escape' &&
					containerActive.classList.contains(flexActive)
				) {
					toggleClass(containerActive, flexActive);
				}
			});
		});
	}
};

exitContainer(activeContainers);
