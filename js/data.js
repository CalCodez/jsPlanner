const getByClass = (className) => document.getElementsByClassName(className);
const getById = (id) => document.getElementById(id);
const createElement = (element) => document.createElement(element);
const appendChild = (parent, child) => parent.appendChild(child);
const addClass = (element, className) => element.classList.add(className);
const removeClass = (element, className) => element.classList.remove(className);
const toggleClass = (element, className) => element.classList.toggle(className);
const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);
const textContent = (element, text) => (element.textContent = text);

const click = 'click';
const keyup = 'keyup';
const sideMenuToggle = getById('side-menu-toggler');
const sideMenuContainer = getById('side-menu-container');

sideMenuToggle.addEventListener(click, () => {
	if (!sideMenuContainer.classList.contains('active')) {
		toggleClass(sideMenuContainer, 'active');
	} else {
		toggleClass(sideMenuContainer, 'active');
	}
});
