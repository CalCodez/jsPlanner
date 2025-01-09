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

const dateDisplay = getById('date-container');

dateDisplay.innerText = generateTimeStampString();

//``Toggle SideBar Menu var and Function
const sideMenuToggle = getById('side-menu-toggler');
const sideMenuContainer = getById('side-menu-container');

//``Toggle Event Form Var and Function
const eventFormTogglers = getByClass('create-event-togglers');
const cancelCrateButton = getById('cancel-create-button');
const eventFormContainer = getById('create-event-container');

for (let toggles of eventFormTogglers) {
	toggles.addEventListener(click, function () {
		if (!eventFormContainer.classList.contains(flexActive)) {
			toggleClass(eventFormContainer, flexActive);
		} else if (!eventFormContainer.classList.contains(flexActive)) {
			toggleClass(eventFormContainer, flexActive);
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

function totalEventCount() {
	return (
		toDoEventCounter.length +
		appointmentEventCounter.length +
		otherEventCounter.length +
		noteEventCounter.length
	);
}

const deleteEvent = (toggler, parent, item, obj) => {
	toggler.addEventListener(click, function () {
		toggler.parentElement.parentElement.remove();
		parent.pop(item);
		textContent(obj.counter, `${obj.name}: ${parent.length}`);
		textContent(totalEventCounter, `Total: ${totalEventCount()}`);
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

	//??Functions for the eventBox Buttons(HERE)

	if (generateEvent.type.formInput.value == 'To Do') {
		appendChild(toDo.container, event);
		toDoEventCounter.push(event);
		textContent(toDo.counter, `To Do: ${toDoEventCounter.length}`);
		//eventBox complete function (here)

		deleteEvent(deleteButton, toDoEventCounter, event, toDo);
	} else if (generateEvent.type.formInput.value == 'Appointment') {
		appendChild(appointment.container, event);
		appointmentEventCounter.push(event);
		textContent(
			appointment.counter,
			`Appointments: ${appointmentEventCounter.length}`
		);

		//eventBox complete function (here)
		deleteEvent(deleteButton, appointmentEventCounter, event, appointment);
	} else if (generateEvent.type.formInput.value == 'Other') {
		appendChild(other.container, event);
		otherEventCounter.push(event);
		textContent(other.counter, `Other: ${otherEventCounter.length}`);
		//eventBox complete function (here)

		deleteEvent(deleteButton, otherEventCounter, event, other);
	}

	textContent(totalEventCounter, `Total: ${totalEventCount()}`);

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

noteGeneratorButton.addEventListener(click, function () {
	let noteContainers = [];

	for (let i = 0; i < 5; i++) {
		noteContainers.push(createElement('div'));
	}

	const [noteMain, type, description, button, timeStamp] = noteContainers;

	addClass(noteMain, generateNote.noteBox);
	addClass(type, generateNote.type.containerClass);
	addClass(description, generateNote.description.containerClass);
	addClass(button, generateNote.button.containerClass);
	addClass(timeStamp, generateNote.timeStamp.containerClass);
	textContent(type, 'Note');
	textContent(description, generateNote.description.formInput.value);
	textContent(timeStamp, generateTimeStampString());

	const [noteBox, ...rest] = noteContainers;
	addClass(noteBox, 'container');
	for (let i of rest) {
		appendChild(noteBox, i);
	}

	let noteButtons = [];
	for (let i = 0; i < 2; i++) {
		noteButtons.push(createElement('buttons'));
	}
	for (let i of noteButtons) {
		addClass(i, generateNote.button.buttonClass);
		appendChild(rest[2], i);
	}
	const [completeButton, deleteButton] = noteButtons;
	textContent(completeButton, generateNote.button.completeText);
	textContent(deleteButton, generateNote.button.deleteText);

	//??Functions for the noteBox Buttons(HERE)

	noteEventCounter.push(noteBox);
	textContent(note.counter, `Notes: ${noteEventCounter.length}`);
	deleteEvent(deleteButton, noteEventCounter, noteBox, note);

	textContent(totalEventCounter, `Total: ${totalEventCount()}`);

	appendChild(noteContainer, noteBox);
	toggleClass(eventFormContainer, flexActive);
	toggleClass(noteForm.form, flexActive);
	toggleClass(formOptionsContainer, flexInactive);
});

//``Toggle Event Holder Containers Var and Function
const holderToggles = getByClass('holder-toggle');
const [todoToggle, appointmentToggle, otherToggle, noteToggle] = holderToggles;

const eventHolders = {
	todoHolder: { toggle: todoToggle, holder: getById('toDo-event-holder') },
	appointmentHolder: {
		toggle: appointmentToggle,
		holder: getById('appointment-event-holder'),
	},
	otherHolder: { toggle: otherToggle, holder: getById('other-event-holder') },
	noteHolder: { toggle: noteToggle, holder: getById('note-event-holder') },
};

const { todoHolder, appointmentHolder, otherHolder, noteHolder } = eventHolders;

const toggleEventHolders = (object1, object2, object3, object4) => {
	const holderToggled = 'holder-toggled';

	object1.toggle.addEventListener(click, function () {
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
};

toggleEventHolders(todoHolder, appointmentHolder, otherHolder, noteHolder);
toggleEventHolders(appointmentHolder, todoHolder, otherHolder, noteHolder);
toggleEventHolders(otherHolder, todoHolder, appointmentHolder, noteHolder);
toggleEventHolders(noteHolder, todoHolder, appointmentHolder, otherHolder);

console.log(eventHolders);

//CSS: create an active class that toggles on the target container to 100% on click;
//JS: apply flexInActive on other containers on click
