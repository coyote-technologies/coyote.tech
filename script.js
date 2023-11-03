console.log("hello from script.js");

// main setup
const toggleButton = document.getElementsByClassName('toggle-button')[0];
toggleButton.addEventListener('click', () => {
	const navbarLinks = document.getElementsByClassName('navbar-links')[0];
	if (navbarLinks.classList.contains('active')) {
		closeLinksDrawer();
	} else {
		openLinksDrawer();
	}
})

let navbarLinks = Array.from(document.getElementsByClassName("navlink"));
navbarLinks.forEach((link) => {
	link.addEventListener('click', handleLinkClick);
})

function closeLinksDrawer() {
	const toggleButton = document.getElementsByClassName('toggle-button')[0];
	const navbarLinks = document.getElementsByClassName('navbar-links')[0];
	const toggleButtonBars = document.getElementsByClassName('bar');
	navbarLinks.classList.remove('active');
	navbarLinks.classList.add('inactive');
	toggleButtonBars[0].classList.remove('rotate-top');
	toggleButtonBars[0].classList.add('default-top');
	toggleButtonBars[1].classList.remove('rotate-middle');
	toggleButtonBars[1].classList.add('default-middle');
	toggleButtonBars[2].classList.remove('rotate-bottom');
	toggleButtonBars[2].classList.add('default-bottom');
}

function openLinksDrawer() {
	const toggleButton = document.getElementsByClassName('toggle-button')[0];
	const navbarLinks = document.getElementsByClassName('navbar-links')[0];
	const toggleButtonBars = document.getElementsByClassName('bar');
	navbarLinks.classList.add('active');
	navbarLinks.classList.remove('inactive');
	toggleButtonBars[0].classList.add('rotate-top');
	toggleButtonBars[0].classList.remove('default-top');
	toggleButtonBars[1].classList.add('rotate-middle');
	toggleButtonBars[1].classList.remove('default-middle');
	toggleButtonBars[2].classList.add('rotate-bottom');
	toggleButtonBars[2].classList.remove('default-bottom');
}

function handleLinkClick(e) {
	console.log(`hello from ${e.target.id}`);
	closeLinksDrawer();
	loadContent(e.target.id);
}

async function loadContent(id) {
	let url = id.split("-").join("_");
	try {
		let mainContent = await fetch(`/${url}`);
		if (!mainContent.ok) {
			throw new Error("Bad server response.");
		}
		htmlContent = await mainContent.text();
		document.getElementsByClassName("main-content")[0].innerHTML = htmlContent;
	} catch (error) {
		console.error('There was an error retrieving html content: ', error);
	}
}
