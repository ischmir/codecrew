function openMobileNav() {
	const navOverlay = document.getElementById('desktopNav');
	navOverlay.classList.toggle('navActive');
	navOverlay.classList.toggle('nav-overlay');
}

function ChangeNavFocus() {
	const allLinks = document.querySelectorAll('nav li');
	const endpoint = window.location.pathname.replace('/', '');

	allLinks.forEach(link => {
		if (
			(link.firstChild.innerHTML === 'Admin settings' && endpoint === 'admin_user_settings') ||
			(link.firstChild.innerHTML === 'Admin settings' && endpoint === 'template') || 
			(link.firstChild.innerHTML === 'Admin settings' && endpoint === 'create_template')
		) {
			link.classList.add('navLink_highlighted');
		}
		if (
			(link.firstChild.innerHTML === 'User settings' && endpoint === 'settings') ||
			(link.firstChild.innerHTML === 'User settings' && endpoint === 'settings-password') ||
			(link.firstChild.innerHTML === 'User settings' && endpoint === 'accessibility')
		) {
			link.classList.add('navLink_highlighted');
		}
		if (link.firstChild.innerHTML.toLowerCase() === endpoint) {
			link.classList.add('navLink_highlighted');
		}
	});
}
ChangeNavFocus();
