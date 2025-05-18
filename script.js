// script.js

// --- Thank You Alert for Reservation ---
function showThankYou() {
    // You can enhance this with a more styled modal or message
    alert("Thank you for your reservation! We look forward to welcoming you.");
    // Optionally, reset the form
    // document.getElementById("reservation-form").reset(); 
}

document.addEventListener("DOMContentLoaded", function () {
    // --- Hero Section Background Slideshow ---
    const heroSection = document.getElementById('hero');
    if (heroSection) { // Check if heroSection exists
        let currentImageIndex = 0;
        const heroImages = [
            'owner1.jpg', // As per original JS
            'owner2.jpg',
            'owner3.jpg'
            // Consider adding more appealing restaurant/food images here
            // e.g., 'hero-image-1.jpg', 'hero-image-2.jpg', 'hero-image-3.jpg'
        ];

        // Preload images for smoother transitions
        heroImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
        
        // Set initial background
        if (heroImages.length > 0) {
            heroSection.style.backgroundImage = `url('${heroImages[0]}')`;
        }

        function showNextImage() {
            if (heroImages.length > 0) {
                currentImageIndex = (currentImageIndex + 1) % heroImages.length;
                heroSection.style.backgroundImage = `url('${heroImages[currentImageIndex]}')`;
            }
        }

        if (heroImages.length > 1) { // Only set interval if there's more than one image
          setInterval(showNextImage, 6000); // Change image every 6 seconds
        }
    }

    // --- Hamburger Menu for Mobile Navigation ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) { // Check if elements exist
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }
    
    // --- Active Navigation Link Highlighting on Scroll ---
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a.nav-link");

    function highlightNavLink() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // Adjust offsetTop for fixed header height (70px) + some buffer
            const sectionTop = current.offsetTop - 100; 
            let sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
        // Special case for hero section at the very top
        if (scrollY < sections[0].offsetTop - 100) {
             navLinks.forEach(link => link.classList.remove("active"));
             const heroLink = document.querySelector('.nav-menu a.nav-link[href="#hero"]');
             if (heroLink) heroLink.classList.add("active"); // Or remove active from all if prefered
        }
    }
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener("scroll", highlightNavLink);
        highlightNavLink(); // Initial call to set active link on page load
    }


    // --- Update Current Year in Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Reservation Form: Prevent actual submission if onsubmit has return false ---
    // The `onsubmit="showThankYou(); return false;"` in HTML already handles this
    // If you want to do it purely in JS:
    // const reservationForm = document.getElementById('reservation-form');
    // if (reservationForm) {
    //     reservationForm.addEventListener('submit', function(event) {
    //         event.preventDefault(); // Prevent default form submission
    //         showThankYou();
    //         // this.reset(); // Optionally reset the form
    //     });
    // }
});