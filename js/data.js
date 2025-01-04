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
const toggleEventButton = getById('toggle-create-event');
const toggleNoteButton = getById('toggle-create-note');
const eventForm = getById('event-form');
const noteForm = getById('note-form');
const eventBackButton = getById('back-event-btn');
const noteBackButton = getById('back-note-btn');

console.log(eventBackButton);

const toggleForms = (
	toggler,
	targetForm,
	checkForm,
	optionsContainer,
	toggler2
) => {
	toggler.addEventListener(click, function () {
		if (
			!targetForm.classList.contains(flexActive) &&
			!checkForm.classList.contains(flexActive)
		) {
			toggleClass(targetForm, flexActive);
			toggleClass(optionsContainer, flexInactive);
		}
		toggler2.addEventListener(click, function () {
			while (targetForm.classList.contains(flexActive)) {
				toggleClass(targetForm, flexActive);
				toggleClass(optionsContainer, flexInactive);
			}
		});
	});
};
toggleForms(
	toggleEventButton,
	eventForm,
	noteForm,
	formOptionsContainer,
	eventBackButton
);

toggleForms(
	toggleNoteButton,
	noteForm,
	eventForm,
	formOptionsContainer,
	noteBackButton
);

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
