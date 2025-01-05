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
};
toggleForms(eventForm, noteForm);
toggleForms(noteForm, eventForm);

const boxClasses = {};
const fromIds = {};

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
