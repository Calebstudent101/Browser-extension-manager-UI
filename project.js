const filterButtons = document.querySelectorAll(".nav-buttons");
const extensionCards = document.querySelectorAll(".cards");

function filterExtensions(filter) {
	extensionCards.forEach((card) => {
		const isActive = card.querySelector("input[type='checkbox']").checked;
		const shouldShow = filter === "all" || (filter === "active" && isActive) || (filter === "inactive" && !isActive);

		card.hidden = !shouldShow;
	});
}

function updateSelectedFilter(selectedButton) {
	filterButtons.forEach((button) => {
		const isSelected = button === selectedButton;

		button.classList.toggle("active", isSelected);
		button.setAttribute("aria-pressed", isSelected);
	});
}

filterButtons.forEach((button) => {
	button.addEventListener("click", () => {
		updateSelectedFilter(button);
		filterExtensions(button.dataset.filter);
	});
});

extensionCards.forEach((card) => {
	const toggle = card.querySelector("input[type='checkbox']");

	toggle.addEventListener("change", () => {
		const selectedButton = document.querySelector(".nav-buttons.active");

		filterExtensions(selectedButton.dataset.filter);
	});
});
