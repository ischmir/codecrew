function openMobileNav() {
	const navOverlay = document.getElementById('desktopNav');
	navOverlay.classList.toggle('navActive');
	navOverlay.classList.toggle('nav-overlay');
}

function ChangeNavFocus() {
	const allLinks = document.querySelectorAll('nav li');
	const endpoint = window.location.pathname.replace('/', '');

	allLinks.forEach(link => {
		if (link.firstChild.innerHTML === 'Admin setting' && endpoint === 'admin_user_settings') {
			link.classList.add('navLink_highlighted');
		}
		if (
			(link.firstChild.innerHTML === 'User setting' && endpoint === 'settings') ||
			(link.firstChild.innerHTML === 'User setting' && endpoint === 'settings-password')
		) {
			link.classList.add('navLink_highlighted');
		}
		if (link.firstChild.innerHTML.toLowerCase() === endpoint) {
			link.classList.add('navLink_highlighted');
		}
	});
}
ChangeNavFocus();
