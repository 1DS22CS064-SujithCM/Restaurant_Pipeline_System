function showThankYou() {
    alert("Thank you for your reservation!");
}

document.addEventListener("DOMContentLoaded", function () {
    let currentImageIndex = 0;
    const images = [
        'owner1.jpg',
        'owner2.jpg',
        'owner3.jpg'
    ];
    const heroSection = document.getElementById('hero');

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        heroSection.style.backgroundImage = `url('${images[currentImageIndex]}')`;
    }

    setInterval(showNextImage, 6000);
});
