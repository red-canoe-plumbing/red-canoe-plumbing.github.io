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

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted');
});

// Google Places API configuration
function initGoogleReviews() {
    // You'll need to replace this with your actual Google Places API key
    const apiKey = 'YOUR_GOOGLE_PLACES_API_KEY';
    // Replace with your business's Place ID
    const placeId = 'YOUR_PLACE_ID';

    // Load the Places library
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.defer = true;
    script.async = true;
    script.onload = () => {
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        
        service.getDetails({
            placeId: placeId,
            fields: ['rating', 'reviews', 'user_ratings_total']
        }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                updateReviewsWidget(place);
            }
        });
    };
    document.head.appendChild(script);
}

function updateReviewsWidget(place) {
    // Update rating
    const ratingElement = document.getElementById('rating');
    ratingElement.textContent = place.rating.toFixed(1);

    // Update review count
    const reviewCountElement = document.getElementById('review-count');
    reviewCountElement.textContent = `(${place.user_ratings_total} reviews)`;

    // Update stars
    const starsElement = document.querySelector('.stars');
    starsElement.innerHTML = generateStars(place.rating);

    // Update recent reviews
    const recentReviewsElement = document.getElementById('recent-reviews');
    const recentReviews = place.reviews.slice(0, 3); // Show top 3 reviews
    recentReviewsElement.innerHTML = recentReviews
        .map(review => `
            <div class="review">
                <div class="review-stars">${generateStars(review.rating)}</div>
                <p class="review-text">${review.text.slice(0, 150)}${review.text.length > 150 ? '...' : ''}</p>
                <p class="review-author">- ${review.author_name}</p>
            </div>
        `).join('');
}

function generateStars(rating) {
    const fullStar = '<i class="fas fa-star"></i>';
    const halfStar = '<i class="fas fa-star-half-alt"></i>';
    const emptyStar = '<i class="far fa-star"></i>';
    
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += fullStar;
        } else if (i === fullStars && hasHalfStar) {
            stars += halfStar;
        } else {
            stars += emptyStar;
        }
    }
    return stars;
}

// Initialize reviews when the page loads
document.addEventListener('DOMContentLoaded', initGoogleReviews);

// Portfolio Carousel
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.portfolio-slider');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const slides = document.querySelectorAll('.portfolio-item');
    let currentIndex = 0;

    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.style.display = 'none';
        });
        for (let i = 0; i < 3; i++) {
            if (currentIndex + i < slides.length) {
                slides[currentIndex + i].style.display = 'block';
            }
        }
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 3;
        updateSlider();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < slides.length - 3) ? currentIndex + 1 : 0;
        updateSlider();
    });

    // Initialize slider
    updateSlider();
});

// AI scheduling bot integration will be added here
