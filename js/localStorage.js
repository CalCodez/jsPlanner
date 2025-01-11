// Event/Note tracking array
let items = [];

// Function to save data to localStorage
const saveToLocalStorage = () => {
	localStorage.setItem('items', JSON.stringify(items));
};

// Function to load data from localStorage
const loadFromLocalStorage = () => {
	const storedItems = JSON.parse(localStorage.getItem('items')) || [];
	storedItems.forEach((item) => {
		generateBox(item, false); // Regenerate UI from saved data
	});
	items = storedItems;
};

// Generic box generator (used for events and notes)
function generateBox(item, save = true) {
	const container = createElement('div');
	addClass(container, 'generated-box');

	// Populate the box with item properties
	for (const [key, value] of Object.entries(item)) {
		const div = createElement('div');
		addClass(div, `${key}-container`);
		textContent(div, value);
		appendChild(container, div);
	}

	// Add action buttons
	const completeButton = createElement('button');
	const deleteButton = createElement('button');
	textContent(completeButton, 'Complete');
	textContent(deleteButton, 'Delete');
	addClass(completeButton, 'complete-button');
	addClass(deleteButton, 'delete-button');
	appendChild(container, completeButton);
	appendChild(container, deleteButton);

	// Append to the appropriate parent container
	const parentContainer = getById(item.parentId);
	appendChild(parentContainer, container);

	// Add event listeners for buttons
	completeButton.addEventListener('click', () => {
		appendChild(completedItemsContainer, container);
		removeFromItems(item.id); // Remove from active items
	});

	deleteButton.addEventListener('click', () => {
		removeChild(parentContainer, container);
		removeFromItems(item.id); // Remove from tracking
	});

	// Save the item if it's newly generated
	if (save) {
		items.push(item);
		saveToLocalStorage();
	}
}

// Remove item by ID from the items array
const removeFromItems = (id) => {
	items = items.filter((item) => item.id !== id);
	saveToLocalStorage();
};

// Example usage for generating a new event/note
eventGeneratorButton.addEventListener(click, function () {
	const newEvent = {
		id: Date.now(), // Unique ID for tracking
		type: generateEvent.type.formInput.value,
		title: generateEvent.title.formInput.value,
		date: generateEvent.date.formInput.value,
		description: generateEvent.description.formInput.value,
		parentId: toDo.container.id, // Example parent container
		timestamp: generateTimeStampString(),
	};
	generateBox(newEvent);
});

noteGeneratorButton.addEventListener(click, function () {
	const newNote = {
		id: Date.now(),
		type: 'Note',
		description: generateNote.description.formInput.value,
		parentId: noteContainer.id,
		timestamp: generateTimeStampString(),
	};
	generateBox(newNote);
});

// Load saved data on page load
window.addEventListener('DOMContentLoaded', loadFromLocalStorage);
