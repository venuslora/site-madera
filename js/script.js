/* =========================================================
   CUSTOMISE YOUR GALLERY HERE
   Add/remove image paths. You do NOT need to edit gallery.html.
========================================================= */
const gallery = {
    "Living Room": {
        id: "living-room",
        description: "Custom seating, tables and storage designed around the way you live.",
        images: [
            "images/living-room/1.jpg",
            "images/living-room/2.jpg",
            "images/living-room/3.jpg"
        ]
    },

    "Bedroom": {
        id: "bedroom",
        description: "Calm, practical pieces made for comfortable bedrooms.",
        images: [
            "images/bedroom/1.jpg",
            "images/bedroom/2.jpg",
            "images/bedroom/3.jpg"
        ]
    },

    "Kitchen & Dining": {
        id: "kitchen",
        description: "Tables, chairs and cabinetry made for everyday meals and gatherings.",
        images: [
            "images/kitchen/1.jpg",
            "images/kitchen/2.jpg",
            "images/kitchen/3.jpg"
        ]
    },

    "Home Office": {
        id: "office",
        description: "Desks, shelving and storage designed for productive spaces.",
        images: [
            "images/office/1.jpg",
            "images/office/2.jpg",
            "images/office/3.jpg"
        ]
    }
};


/* =========================================================
   MOBILE NAVIGATION
========================================================= */
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        const open = navMenu.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", open);
        navToggle.textContent = open ? "×" : "☰";
    });

    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.textContent = "☰";
        });
    });
}


/* =========================================================
   GALLERY BUILDER
   Number of images is automatically determined by each array.
========================================================= */
const galleryRoot = document.querySelector("#gallery-root");

function buildGallery() {
    if (!galleryRoot) return;

    const sections = Object.entries(gallery);

    galleryRoot.innerHTML = sections.map(([name, room], roomIndex) => {
        const imageMarkup = room.images.map((src, imageIndex) => `
            <button
                class="gallery-item ${imageIndex === 0 ? "large" : ""}"
                type="button"
                data-lightbox="${src}"
                aria-label="Open ${name} image ${imageIndex + 1}"
            >
                <img
                    src="${src}"
                    alt="${name} furniture ${imageIndex + 1}"
                    loading="${roomIndex === 0 && imageIndex === 0 ? "eager" : "lazy"}"
                >
            </button>
        `).join("");

        return `
            <section class="gallery-section" id="${room.id}">
                <div class="gallery-section-inner">
                    <div class="gallery-heading">
                        <div>
                            <p class="eyebrow">${String(roomIndex + 1).padStart(2, "0")}</p>
                            <h2>${name}</h2>
                        </div>
                        <p>${room.description}</p>
                    </div>
                    <div class="gallery-grid">
                        ${imageMarkup}
                    </div>
                </div>
            </section>
        `;
    }).join("");

    setupLightbox();
}

buildGallery();


/* =========================================================
   LIGHTBOX
========================================================= */
function setupLightbox() {
    const items = document.querySelectorAll("[data-lightbox]");
    if (!items.length) return;

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
        <button class="lightbox-close" type="button" aria-label="Close image">×</button>
        <img src="" alt="">
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector("img");
    const closeButton = lightbox.querySelector(".lightbox-close");

    function closeLightbox() {
        lightbox.classList.remove("open");
        document.body.style.overflow = "";
    }

    items.forEach(item => {
        item.addEventListener("click", () => {
            const image = item.querySelector("img");
            lightboxImage.src = item.dataset.lightbox;
            lightboxImage.alt = image.alt;
            lightbox.classList.add("open");
            document.body.style.overflow = "hidden";
        });
    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeLightbox();
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
