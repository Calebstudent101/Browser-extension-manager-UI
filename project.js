const filterButtons = document.querySelectorAll(".nav-buttons");
const extensionCards = document.querySelectorAll(".cards");
const themeButton = document.querySelector("#sunContainer");
const themeIcon = document.querySelector("#sun");

function updateTheme(isLightTheme) {
	document.body.classList.toggle("light-theme", isLightTheme);
	themeIcon.src = isLightTheme ? "assets/images/icon-moon.svg" : "assets/images/icon-sun.svg";
	themeButton.setAttribute("aria-label", isLightTheme ? "Switch to dark theme" : "Switch to light theme");
}

const savedTheme = localStorage.getItem("theme");
updateTheme(savedTheme === "light");

themeButton.addEventListener("click", () => {
	const isLightTheme = !document.body.classList.contains("light-theme");

	updateTheme(isLightTheme);
	localStorage.setItem("theme", isLightTheme ? "light" : "dark");
});

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
	const removeButton = card.querySelector(".remove-button");

	removeButton.addEventListener("click", () => {
		card.remove();

		const selectedButton = document.querySelector(".nav-buttons.active");
		filterExtensions(selectedButton.dataset.filter);
	});

	toggle.addEventListener("change", () => {
		const selectedButton = document.querySelector(".nav-buttons.active");

		filterExtensions(selectedButton.dataset.filter);
	});
});
