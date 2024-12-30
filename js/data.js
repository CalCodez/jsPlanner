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
	return `created at: ${formattedString}`;
}

//``Toggle SideBar Menu var and Function
const sideMenuToggle = getById('side-menu-toggler');
const sideMenuContainer = getById('side-menu-container');

sideMenuToggle.addEventListener(click, () => {
	if (!sideMenuContainer.classList.contains('active')) {
		toggleClass(sideMenuContainer, 'active');
	} else {
		toggleClass(sideMenuContainer, 'active');
	}
});

//TODO: toggle category containers functions (todo, calendar, reminders, notes)

//``Toggle Event Form Var and Function
const eventFormTogglers = getByClass('create-event-togglers');
const evenFormCancelButton = getById('cancel-btn');
const eventFormContainer = getById('create-event-container');
for (let toggles of eventFormTogglers) {
	toggles.addEventListener(click, function () {
		if (!eventFormContainer.classList.contains(flexActive)) {
			toggleClass(eventFormContainer, flexActive);
		} else {
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

	evenFormCancelButton.addEventListener(click, function () {
		if (eventFormContainer.classList.contains(flexActive)) {
			toggleClass(eventFormContainer, flexActive);
		}
	});
}

//``Generate To Do Events vars and function
const eventFormIds = {
	eventType: getById('event-type'),
	eventTitle: getById('event-title'),
	eventDescription: getById('event-description'),
};

const eventBoxClasses = {
	eventBox: 'event-box',
	eventTitleContainer: 'event-title-container',
	eventDescriptionContainer: 'event-description-container',
	eventButtonContainer: 'event-button-container',
	completeButton: 'complete-buttons',
	deleteButtons: 'delete-buttons',
	timeStampContainer: 'time-stamp-container',
};

const generateEventButton = getById('generate-btn');
const toDoParentContainer = getById('to-do-parent-container');

generateEventButton.addEventListener(click, function () {
	const eventBoxes = [];
	for (let i = 0; i < 5; i++) {
		eventBoxes.push(createElement('div'));
	}
	const assignClasses = (array, object) => {
		addClass(array[0], object.eventBox);
		addClass(array[1], object.eventTitleContainer);
		addClass(array[2], object.eventDescriptionContainer);
		addClass(array[3], object.eventButtonContainer);
		addClass(array[4], object.timeStampContainer);
	};

	//added container class to all the event box divs
	for (let i of eventBoxes) {
		addClass(i, 'container');
	}
	assignClasses(eventBoxes, eventBoxClasses);
	const [eventBox, ...rest] = eventBoxes;
	appendChild(toDoParentContainer, eventBox);
	for (let innerDivs of rest) {
		appendChild(eventBox, innerDivs);
	}

	const inputValues = (array, object) => {
		textContent(array[0], object.eventTitle.value);
		textContent(array[1], object.eventDescription.value);
		textContent(array[3], generateTimeStampString());
	};

	inputValues(rest, eventFormIds);

	let eventButtons = [];

	for (let buttons = 0; buttons < 2; buttons++) {
		eventButtons.push(createElement('button'));
	}
	const buttonAssignment = (array, object) => {
		addClass(array[0], object.completeButton);
		addClass(array[1], object.deleteButtons);
	};

	buttonAssignment(eventButtons, eventBoxClasses);
	textContent(eventButtons[0], 'Complete');
	textContent(eventButtons[1], 'Delete');

	for (let eventBtns of eventButtons) {
		appendChild(rest[2], eventBtns);
	}

	toggleClass(eventFormContainer, flexActive);

	alert(`Create Event Successful!`);
});

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
