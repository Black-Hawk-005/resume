document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const progressBar = document.getElementById('progressBar');
    const sidebarNav = document.querySelector('.sidebar-nav ul');

    function updateProgressBar() {
        // Total scrollable height
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;

        // Sidebar nav height
        const lastDot = sidebarNav.querySelector('li:last-child');
        const firstDot = sidebarNav.querySelector('li:first-child');

        if (firstDot && lastDot) {
            // Calculate the total height of the navigation dots area
            const totalNavHeight = lastDot.offsetTop - firstDot.offsetTop;
            // Calculate the progress height based on scroll position
            const progressHeight = (scrolled / scrollTotal) * totalNavHeight;
            // Set the height of the progress bar
            progressBar.style.height = `${Math.min(progressHeight, totalNavHeight)}px`;
        }
    }

    function updateActiveLink() {
        let currentSectionId = '';
        // Find the current section in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Check if the scroll position is past the top of the section
            if (window.pageYOffset >= sectionTop - 100) { // 100px offset for better accuracy
                currentSectionId = section.getAttribute('id');
            }
        });

        // Update active class on navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
            // Add active class to the link corresponding to the current section
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', () => {
        updateProgressBar();
        updateActiveLink();
    });

    // Initial calls to set state on page load
    updateProgressBar();
    updateActiveLink();
});