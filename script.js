// Navbar visibility and background
const navbar = document.querySelector('.navbar');
const whoWeAreSection = document.querySelector('#who-we-are');

const showNavbar = () => {
    const triggerHeight = whoWeAreSection.offsetTop - 100;
    if (window.scrollY >= triggerHeight) {
        navbar.classList.add('visible');
        navbar.classList.add('navbar-grey');
    } else {
        navbar.classList.remove('visible');
        navbar.classList.remove('navbar-grey');
    }
};

window.addEventListener('scroll', showNavbar);

// Navbar transparency on scroll
document.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const portfolioSection = document.getElementById('portfolio');
    const contactSection = document.getElementById('contact');
    const portfolioTop = portfolioSection.offsetTop;
    const contactTop = contactSection.offsetTop;
    const scrollPosition = window.scrollY + navbar.offsetHeight;

    if (scrollPosition >= portfolioTop) {
        navbar.classList.add('navbar-transparent');
        navbar.classList.remove('navbar-grey');
    } else {
        navbar.classList.remove('navbar-transparent');
        navbar.classList.add('navbar-grey');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
