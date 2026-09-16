// ============================================================
// FURNITURE SITE GALLERY
// Add/remove images here.
// You can have ANY number of images in each room.
// ============================================================

const gallery = {
    "Proiect 1": {
        id: "unu",
        description: "Descriere placeholder.",
        images: [
            "images/living-room/1.jpg",
            "images/living-room/2.jpg",
            "images/living-room/3.jpg",
            "images/living-room/4.jpg"
        ]
    },

    "Proiect 2": {
        id: "doi",
        description: "Descriere placeholder.",
        images: [
            "images/bedroom/1.jpg",
            "images/bedroom/2.jpg",
            "images/bedroom/3.jpg"
        ]
    },

    "Proiect 3": {
        id: "trei",
        description: "Descriere placeholder.",
        images: [
            "images/kitchen/1.jpg",
            "images/kitchen/2.jpg",
            "images/kitchen/3.jpg",
            "images/kitchen/4.jpg",
            "images/kitchen/5.jpg"
        ]
    },

    "Proiect 4": {
        id: "patru",
        description: "Descriere placeholder.",
        images: [
            "images/office/1.jpg"
        ]
    }
};


// ============================================================
// BUILD THE GALLERY
// ============================================================

const galleryRoot = document.getElementById("gallery-root");

if (galleryRoot) {
    Object.entries(gallery).forEach(([roomName, room]) => {
        const section = document.createElement("section");
        section.className = "gallery-section";
        section.id = room.id;

        section.innerHTML = `
            <div class="gallery-heading">
                <h2>${roomName}</h2>
                <p>${room.description}</p>
            </div>

            <div
                class="carousel"
                tabindex="0"
                aria-label="${roomName} image gallery"
            >
                <div class="carousel-viewport">
                    <div class="carousel-track"></div>
                </div>

                <button
                    class="carousel-arrow carousel-prev"
                    type="button"
                    aria-label="Previous image"
                >
                    &#10094;
                </button>

                <button
                    class="carousel-arrow carousel-next"
                    type="button"
                    aria-label="Next image"
                >
                    &#10095;
                </button>

                <div class="carousel-controls">
                    <span class="carousel-counter">01 / 01</span>

                    <div
                        class="carousel-dots"
                        aria-label="Choose gallery image"
                    ></div>
                </div>
            </div>
        `;

        galleryRoot.appendChild(section);

        setupCarousel(section, room);
    });
}


// ============================================================
// CAROUSEL
// ============================================================

function setupCarousel(section, room) {
    const carousel = section.querySelector(".carousel");
    const track = section.querySelector(".carousel-track");
    const previousButton = section.querySelector(".carousel-prev");
    const nextButton = section.querySelector(".carousel-next");
    const counter = section.querySelector(".carousel-counter");
    const dotsContainer = section.querySelector(".carousel-dots");
    const controls = section.querySelector(".carousel-controls");

    let currentIndex = 0;

    // --------------------------------------------------------
    // Create slides
    // --------------------------------------------------------

    room.images.forEach((image, index) => {
        const slide = document.createElement("div");
        slide.className = "carousel-slide";

        const img = document.createElement("img");

        img.src = image;
        img.alt = `${Object.keys(gallery).find(
            key => gallery[key] === room
        )} - image ${index + 1}`;

        // First image loads normally.
        // Remaining images are lazy-loaded.
        if (index !== 0) {
            img.loading = "lazy";
        }

        // Clicking an image opens the lightbox.
        img.addEventListener("click", () => {
            openLightbox(room.images, index, img.alt);
        });

        slide.appendChild(img);
        track.appendChild(slide);
    });

    const slides = Array.from(
        track.querySelectorAll(".carousel-slide")
    );

    // --------------------------------------------------------
    // If there is only one image, hide carousel controls
    // --------------------------------------------------------

    if (slides.length <= 1) {
        previousButton.hidden = true;
        nextButton.hidden = true;
        controls.hidden = true;
    }

    // --------------------------------------------------------
    // Create dots
    // --------------------------------------------------------

    room.images.forEach((_, index) => {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "carousel-dot";

        dot.setAttribute(
            "aria-label",
            `Go to image ${index + 1}`
        );

        dot.addEventListener("click", () => {
            goToSlide(index);
        });

        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(
        dotsContainer.querySelectorAll(".carousel-dot")
    );

    // --------------------------------------------------------
    // Go to slide
    // --------------------------------------------------------

    function goToSlide(index) {
        if (slides.length === 0) return;

        if (index < 0) {
            index = slides.length - 1;
        }

        if (index >= slides.length) {
            index = 0;
        }

        currentIndex = index;

        track.style.transform =
            `translateX(-${currentIndex * 100}%)`;

        // Update counter
        counter.textContent =
            `${String(currentIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;

        // Update dots
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle(
                "active",
                dotIndex === currentIndex
            );
        });

        // Accessibility
        slides.forEach((slide, slideIndex) => {
            slide.setAttribute(
                "aria-hidden",
                slideIndex !== currentIndex
            );
        });
    }

    // --------------------------------------------------------
    // Previous / Next buttons
    // --------------------------------------------------------

    previousButton.addEventListener("click", () => {
        goToSlide(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        goToSlide(currentIndex + 1);
    });

    // --------------------------------------------------------
    // Keyboard navigation
    // --------------------------------------------------------

    carousel.addEventListener("keydown", event => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            goToSlide(currentIndex - 1);
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            goToSlide(currentIndex + 1);
        }
    });

    // --------------------------------------------------------
    // Touch / swipe support
    // --------------------------------------------------------

    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener(
        "touchstart",
        event => {
            touchStartX = event.changedTouches[0].screenX;
        },
        { passive: true }
    );

    track.addEventListener(
        "touchend",
        event => {
            touchEndX = event.changedTouches[0].screenX;

            const swipeDistance =
                touchStartX - touchEndX;

            // Swipe left
            if (swipeDistance > 50) {
                goToSlide(currentIndex + 1);
            }

            // Swipe right
            if (swipeDistance < -50) {
                goToSlide(currentIndex - 1);
            }
        },
        { passive: true }
    );

    // Start on first image
    goToSlide(0);
}


// ============================================================
// LIGHTBOX
// ============================================================

let lightboxImages = [];
let lightboxIndex = 0;

function createLightbox() {
    // Don't create it twice
    if (document.getElementById("gallery-lightbox")) {
        return;
    }

    const lightbox = document.createElement("div");

    lightbox.id = "gallery-lightbox";
    lightbox.className = "lightbox";
    lightbox.setAttribute("aria-hidden", "true");

    lightbox.innerHTML = `
        <div class="lightbox-backdrop"></div>

        <button
            class="lightbox-close"
            type="button"
            aria-label="Close image viewer"
        >
            &times;
        </button>

        <button
            class="lightbox-arrow lightbox-prev"
            type="button"
            aria-label="Previous image"
        >
            &#10094;
        </button>

        <div class="lightbox-content">
            <img
                class="lightbox-image"
                src=""
                alt=""
            />

            <div class="lightbox-counter"></div>
        </div>

        <button
            class="lightbox-arrow lightbox-next"
            type="button"
            aria-label="Next image"
        >
            &#10095;
        </button>
    `;

    document.body.appendChild(lightbox);

    // Close button
    lightbox
        .querySelector(".lightbox-close")
        .addEventListener("click", closeLightbox);

    // Background click
    lightbox
        .querySelector(".lightbox-backdrop")
        .addEventListener("click", closeLightbox);

    // Previous
    lightbox
        .querySelector(".lightbox-prev")
        .addEventListener("click", () => {
            changeLightboxImage(-1);
        });

    // Next
    lightbox
        .querySelector(".lightbox-next")
        .addEventListener("click", () => {
            changeLightboxImage(1);
        });
}


// Create lightbox when page loads
createLightbox();


// ============================================================
// OPEN LIGHTBOX
// ============================================================

function openLightbox(images, index, altText = "") {
    lightboxImages = images;
    lightboxIndex = index;

    const lightbox =
        document.getElementById("gallery-lightbox");

    if (!lightbox) return;

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("lightbox-open");

    updateLightboxImage(altText);

    // Prevent background scrolling
    document.body.style.overflow = "hidden";
}


// ============================================================
// CLOSE LIGHTBOX
// ============================================================

function closeLightbox() {
    const lightbox =
        document.getElementById("gallery-lightbox");

    if (!lightbox) return;

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("lightbox-open");

    document.body.style.overflow = "";
}


// ============================================================
// UPDATE LIGHTBOX IMAGE
// ============================================================

function updateLightboxImage(altText = "") {
    const lightbox =
        document.getElementById("gallery-lightbox");

    if (!lightbox || lightboxImages.length === 0) {
        return;
    }

    const image =
        lightbox.querySelector(".lightbox-image");

    const counter =
        lightbox.querySelector(".lightbox-counter");

    image.src = lightboxImages[lightboxIndex];

    image.alt =
        altText ||
        `Gallery image ${lightboxIndex + 1}`;

    counter.textContent =
        `${String(lightboxIndex + 1).padStart(2, "0")} / ${String(lightboxImages.length).padStart(2, "0")}`;
}


// ============================================================
// LIGHTBOX PREVIOUS / NEXT
// ============================================================

function changeLightboxImage(direction) {
    if (lightboxImages.length === 0) {
        return;
    }

    lightboxIndex += direction;

    // Loop to last image
    if (lightboxIndex < 0) {
        lightboxIndex = lightboxImages.length - 1;
    }

    // Loop to first image
    if (lightboxIndex >= lightboxImages.length) {
        lightboxIndex = 0;
    }

    updateLightboxImage();
}


// ============================================================
// LIGHTBOX KEYBOARD CONTROLS
// ============================================================

document.addEventListener("keydown", event => {
    const lightbox =
        document.getElementById("gallery-lightbox");

    if (!lightbox || !lightbox.classList.contains("active")) {
        return;
    }

    // Escape = close
    if (event.key === "Escape") {
        closeLightbox();
    }

    // Left arrow = previous
    if (event.key === "ArrowLeft") {
        changeLightboxImage(-1);
    }

    // Right arrow = next
    if (event.key === "ArrowRight") {
        changeLightboxImage(1);
    }
});


// ============================================================
// LIGHTBOX TOUCH / SWIPE
// ============================================================

let lightboxTouchStartX = 0;
let lightboxTouchEndX = 0;

document.addEventListener("touchstart", event => {
    const lightbox =
        document.getElementById("gallery-lightbox");

    if (
        !lightbox ||
        !lightbox.classList.contains("active")
    ) {
        return;
    }

    lightboxTouchStartX =
        event.changedTouches[0].screenX;
}, { passive: true });


document.addEventListener("touchend", event => {
    const lightbox =
        document.getElementById("gallery-lightbox");

    if (
        !lightbox ||
        !lightbox.classList.contains("active")
    ) {
        return;
    }

    lightboxTouchEndX =
        event.changedTouches[0].screenX;

    const swipeDistance =
        lightboxTouchStartX - lightboxTouchEndX;

    // Swipe left
    if (swipeDistance > 50) {
        changeLightboxImage(1);
    }

    // Swipe right
    if (swipeDistance < -50) {
        changeLightboxImage(-1);
    }
});


// ============================================================
// MOBILE NAVIGATION
// ============================================================

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
    });
}


/* =========================================================
   CONTACT FORM
   The form is configured for Formspree in contact.html.
   Replace YOUR_FORM_ID with your actual Formspree ID.
========================================================= */
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async event => {
        event.preventDefault();

        const submitButton = contactForm.querySelector("button[type='submit']");
        const originalText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = "Sending…";
        formStatus.textContent = "";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { Accept: "application/json" }
            });

            if (!response.ok) throw new Error("Form submission failed.");

            contactForm.reset();
            formStatus.textContent = "Thanks — your enquiry has been sent.";
        } catch (error) {
            formStatus.textContent =
                "Something went wrong. Please email us directly instead.";
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}
