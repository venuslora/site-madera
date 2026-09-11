```javascript
/* =========================================
   WEBSITE DATA
========================================= */

const rooms = {

    living: {
        title: "Living Room",
        number: "01",
        description:
            "Comfortable and functional furniture designed to make your living space feel like home.",

        images: [
            {
                src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=85",
                alt: "Modern living room sofa"
            },
            {
                src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=85",
                alt: "Living room furniture"
            },
            {
                src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
                alt: "Living room interior"
            }
        ]
    },


    bedroom: {
        title: "Bedroom",
        number: "02",
        description:
            "Calm, timeless furniture designed to create comfortable and relaxing bedrooms.",

        images: [
            {
                src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=85",
                alt: "Modern bedroom"
            },
            {
                src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
                alt: "Bedroom furniture"
            },
            {
                src: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1000&q=85",
                alt: "Bedroom interior"
            }
        ]
    },


    kitchen: {
        title: "Kitchen & Dining",
        number: "03",
        description:
            "Tables, chairs, and furniture designed for gathering, eating, and everyday life.",

        images: [
            {
                src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
                alt: "Modern kitchen"
            },
            {
                src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
                alt: "Dining area"
            },
            {
                src: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1000&q=85",
                alt: "Kitchen furniture"
            }
        ]
    },


    office: {
        title: "Home Office",
        number: "04",
        description:
            "Practical workspaces designed to look beautiful while helping you get things done.",

        images: [
            {
                src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
                alt: "Home office"
            },
            {
                src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85",
                alt: "Office desk"
            },
            {
                src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=85",
                alt: "Office furniture"
            }
        ]
    }
};


/* =========================================
   APP
========================================= */

const app = document.getElementById("app");


/* =========================================
   NAVIGATION
========================================= */

function createNavigation(activePage) {

    return `
        <header>

            <nav class="navbar">

                <a href="#" class="logo" data-page="home">
                    Oak & Home
                </a>

                <button
                    class="menu-button"
                    id="menuButton"
                    aria-label="Open menu"
                >
                    ☰
                </button>

                <div class="nav-links" id="navLinks">

                    <a
                        href="#"
                        data-page="home"
                        class="${activePage === "home" ? "active" : ""}"
                    >
                        Home
                    </a>

                    <a
                        href="#"
                        data-page="about"
                        class="${activePage === "about" ? "active" : ""}"
                    >
                        About
                    </a>

                    <a
                        href="#"
                        data-page="gallery"
                        class="${activePage === "gallery" ? "active" : ""}"
                    >
                        Gallery
                    </a>

                    <a
                        href="#"
                        data-page="contact"
                        class="${activePage === "contact" ? "active" : ""}"
                    >
                        Contact
                    </a>

                </div>

            </nav>

        </header>
    `;
}


/* =========================================
   FOOTER
========================================= */

function createFooter() {

    return `
        <footer>

            <div class="footer-inner">

                <div>

                    <div class="footer-logo">
                        Oak & Home
                    </div>

                    <p class="footer-description">
                        Beautiful furniture, thoughtfully made.
                    </p>

                </div>


                <div class="footer-links">

                    <a href="#" data-page="home">
                        Home
                    </a>

                    <a href="#" data-page="about">
                        About
                    </a>

                    <a href="#" data-page="gallery">
                        Gallery
                    </a>

                    <a href="#" data-page="contact">
                        Contact
                    </a>

                </div>

            </div>


            <div class="footer-bottom">

                <p>
                    © 2026 Oak & Home. All rights reserved.
                </p>

            </div>

        </footer>
    `;
}


/* =========================================
   HOME PAGE
========================================= */

function homePage() {

    return `

        ${createNavigation("home")}

        <main>


            <!-- HERO -->

            <section class="hero">

                <div class="hero-content">

                    <p class="eyebrow">
                        CRAFTED WITH CARE
                    </p>

                    <h1>
                        Furniture made for
                        <span>beautiful living.</span>
                    </h1>

                    <p class="hero-description">
                        Thoughtfully designed furniture made with
                        quality materials, attention to detail,
                        and a love for timeless interiors.
                    </p>

                    <div class="hero-buttons">

                        <a
                            href="#"
                            class="btn btn-white"
                            data-page="gallery"
                        >
                            View our work
                        </a>

                        <a
                            href="#"
                            class="btn btn-outline"
                            data-page="contact"
                        >
                            Get in touch
                        </a>

                    </div>

                </div>

            </section>


            <!-- INTRO -->

            <section class="section intro">

                <div>

                    <p class="eyebrow">
                        WELCOME
                    </p>

                    <h2 class="section-title">
                        Furniture with character
                    </h2>

                </div>


                <div class="intro-text">

                    <p>
                        At Oak & Home, we believe furniture should
                        be more than something that fills a room.
                        It should be beautiful, practical, and built
                        to last.
                    </p>

                    <p>
                        From living rooms and bedrooms to kitchens
                        and home offices, we create pieces that
                        make your space feel like home.
                    </p>

                    <a
                        href="#"
                        data-page="about"
                        class="text-link"
                    >
                        Learn more about us →
                    </a>

                </div>

            </section>


            <!-- ROOMS -->

            <section class="rooms">

                <div class="room-container">

                    <div class="center">

                        <p class="eyebrow">
                            EXPLORE
                        </p>

                        <h2 class="section-title">
                            Furniture for every room
                        </h2>

                        <p>
                            Take a look at some of the spaces
                            we've helped transform.
                        </p>

                    </div>


                    <div class="room-cards">


                        <a
                            href="#"
                            data-page="gallery"
                            class="room-card"
                        >

                            <div class="room-image living"></div>

                            <div class="room-info">

                                <h3>
                                    Living Room
                                </h3>

                                <span>
                                    Explore →
                                </span>

                            </div>

                        </a>


                        <a
                            href="#"
                            data-page="gallery"
                            class="room-card"
                        >

                            <div class="room-image bedroom"></div>

                            <div class="room-info">

                                <h3>
                                    Bedroom
                                </h3>

                                <span>
                                    Explore →
                                </span>

                            </div>

                        </a>


                        <a
                            href="#"
                            data-page="gallery"
                            class="room-card"
                        >

                            <div class="room-image kitchen"></div>

                            <div class="room-info">

                                <h3>
                                    Kitchen & Dining
                                </h3>

                                <span>
                                    Explore →
                                </span>

                            </div>

                        </a>

                    </div>

                </div>

            </section>


            <!-- CTA -->

            ${createCTA()}

        </main>

        ${createFooter()}
    `;
}


/* =========================================
   CTA
========================================= */

function createCTA() {

    return `

        <section class="cta">

            <div class="cta-content">

                <p class="eyebrow">
                    LET'S CREATE SOMETHING
                </p>

                <h2>
                    Have an idea for your space?
                </h2>

                <p>
                    Tell us what you're looking for and let's
                    talk about how we can bring it to life.
                </p>

                <a
                    href="#"
                    class="btn btn-white"
                    data-page="contact"
                >
                    Contact us
                </a>

            </div>

        </section>

    `;
}


/* =========================================
   PAGE HEADER
========================================= */

function pageHeader(title, eyebrow, description) {

    return `

        <section class="page-header">

            <p class="eyebrow">
                ${eyebrow}
            </p>

            <h1>
                ${title}
            </h1>

            <p>
                ${description}
            </p>

        </section>

    `;
}


/* =========================================
   ABOUT PAGE
========================================= */

function aboutPage() {

    return `

        ${createNavigation("about")}

        <main>

            ${pageHeader(
                "Made with passion, built to last.",
                "OUR STORY",
                "We create furniture that combines timeless design, quality materials, and careful craftsmanship."
            )}


            <!-- STORY -->

            <section class="section about-story">

                <div class="about-photo"></div>


                <div class="about-text">

                    <p class="eyebrow">
                        WHO WE ARE
                    </p>

                    <h2>
                        Furniture made with purpose
                    </h2>

                    <p>
                        Oak & Home started with a simple idea:
                        create beautiful furniture that people
                        can enjoy for years to come.
                    </p>

                    <p>
                        We are a small, independent furniture
                        business focused on craftsmanship and
                        personal service.
                    </p>

                    <p>
                        Every project receives our full attention,
                        from the initial idea to the finished piece.
                    </p>

                    <p>
                        Whether you are furnishing a new home or
                        looking for one special piece, we work
                        closely with our customers to create
                        furniture that fits their space and
                        lifestyle.
                    </p>

                </div>

            </section>


            <!-- VALUES -->

            <section class="values">

                <div class="section values-container">

                    <div class="center">

                        <p class="eyebrow">
                            WHAT MATTERS TO US
                        </p>

                        <h2 class="section-title">
                            Our values
                        </h2>

                    </div>


                    <div class="value-grid">


                        <div class="value-card">

                            <div class="value-number">
                                01
                            </div>

                            <h3>
                                Quality
                            </h3>

                            <p>
                                We choose materials carefully and
                                pay attention to the details that
                                make furniture last.
                            </p>

                        </div>


                        <div class="value-card">

                            <div class="value-number">
                                02
                            </div>

                            <h3>
                                Craftsmanship
                            </h3>

                            <p>
                                We take pride in the work that goes
                                into every piece, from construction
                                to finishing.
                            </p>

                        </div>


                        <div class="value-card">

                            <div class="value-number">
                                03
                            </div>

                            <h3>
                                Personal Service
                            </h3>

                            <p>
                                Every customer and project is
                                different. We listen and build
                                around your needs.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            <!-- PROCESS -->

            <section class="section process">

                <div>

                    <p class="eyebrow">
                        HOW IT WORKS
                    </p>

                    <h2 class="section-title">
                        From idea to finished piece
                    </h2>

                </div>


                <div class="process-list">


                    <div class="process-item">

                        <span class="process-number">
                            01
                        </span>

                        <div>

                            <h3>
                                Tell us your idea
                            </h3>

                            <p>
                                Get in touch and tell us about
                                the furniture you're looking for.
                            </p>

                        </div>

                    </div>


                    <div class="process-item">

                        <span class="process-number">
                            02
                        </span>

                        <div>

                            <h3>
                                Design & planning
                            </h3>

                            <p>
                                We discuss dimensions, materials,
                                style, and the details of your
                                project.
                            </p>

                        </div>

                    </div>


                    <div class="process-item">

                        <span class="process-number">
                            03
                        </span>

                        <div>

                            <h3>
                                Craftsmanship
                            </h3>

                            <p>
                                We carefully build and finish
                                your furniture.
                            </p>

                        </div>

                    </div>


                    <div class="process-item">

                        <span class="process-number">
                            04
                        </span>

                        <div>

                            <h3>
                                Enjoy your space
                            </h3>

                            <p>
                                Your finished piece is ready to
                                become part of your home.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            ${createCTA()}

        </main>

        ${createFooter()}
    `;
}


/* =========================================
   GALLERY PAGE
========================================= */

function galleryPage() {

    let galleryHTML = "";

    Object.values(rooms).forEach(room => {

        galleryHTML += `

            <section class="gallery-section">

                <div class="gallery-heading">

                    <div>

                        <p class="eyebrow">
                            ${room.number}
                        </p>

                        <h2>
                            ${room.title}
                        </h2>

                    </div>

                    <p>
                        ${room.description}
                    </p>

                </div>


                <div class="gallery-grid">

                    <div class="gallery-item large">

                        <img
                            src="${room.images[0].src}"
                            alt="${room.images[0].alt}"
                        >

                    </div>


                    <div class="gallery-item">

                        <img
                            src="${room.images[1].src}"
                            alt="${room.images[1].alt}"
                        >

                    </div>


                    <div class="gallery-item">

                        <img
                            src="${room.images[2].src}"
                            alt="${room.images[2].alt}"
                        >

                    </div>

                </div>

            </section>

        `;
    });


    return `

        ${createNavigation("gallery")}

        <main>

            ${pageHeader(
                "Furniture for every room.",
                "OUR WORK",
                "Browse some of our furniture and completed projects."
            )}

            ${galleryHTML}

            ${createCTA()}

        </main>

        ${createFooter()}
    `;
}


/* =========================================
   CONTACT PAGE
========================================= */

function contactPage() {

    return `

        ${createNavigation("contact")}

        <main>

            ${pageHeader(
                "Let's talk about your project.",
                "GET IN TOUCH",
                "Have a question or an idea for a piece of furniture? We'd love to hear from you."
            )}


            <section class="section contact">


                <!-- INFORMATION -->

                <div class="contact-info">

                    <p class="eyebrow">
                        CONTACT DETAILS
                    </p>

                    <h2>
                        We'd love to hear from you.
                    </h2>

                    <p class="contact-intro">
                        Contact us using the form or reach out
                        directly using the information below.
                    </p>


                    <div class="contact-details">


                        <div class="contact-detail">

                            <span class="contact-icon">
                                ✉
                            </span>

                            <div>

                                <h3>
                                    Email
                                </h3>

                                <a href="mailto:hello@oakandhome.com">
                                    hello@oakandhome.com
                                </a>

                            </div>

                        </div>


                        <div class="contact-detail">

                            <span class="contact-icon">
                                ☎
                            </span>

                            <div>

                                <h3>
                                    Phone
                                </h3>

                                <a href="tel:+40123456789">
                                    +40 123 456 789
                                </a>

                            </div>

                        </div>


                        <div class="contact-detail">

                            <span class="contact-icon">
                                ⌂
                            </span>

                            <div>

                                <h3>
                                    Workshop
                                </h3>

                                <p>
                                    Your Street 123<br>
                                    Your City, Romania
                                </p>

                            </div>

                        </div>


                        <div class="contact-detail">

                            <span class="contact-icon">
                                ◷
                            </span>

                            <div>

                                <h3>
                                    Opening Hours
                                </h3>

                                <p>
                                    Monday – Friday<br>
                                    09:00 – 17:00
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                <!-- FORM -->

                <div class="form-container">

                    <form
                        class="form"
                        id="contactForm"
                    >


                        <div class="form-row">


                            <div class="form-group">

                                <label for="name">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Your name"
                                    required
                                >

                            </div>


                            <div class="form-group">

                                <label for="email">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    placeholder="you@example.com"
                                    required
                                >

                            </div>

                        </div>


                        <div class="form-group">

                            <label for="phone">
                                Phone
                            </label>

                            <input
                                type="tel"
                                id="phone"
                                placeholder="+40..."
                            >

                        </div>


                        <div class="form-group">

                            <label for="subject">
                                What can we help with?
                            </label>

                            <select id="subject">

                                <option value="">
                                    Select an option
                                </option>

                                <option>
                                    Custom furniture
                                </option>

                                <option>
                                    Existing furniture
                                </option>

                                <option>
                                    Request a quote
                                </option>

                                <option>
                                    Other
                                </option>

                            </select>

                        </div>


                        <div class="form-group">

                            <label for="message">
                                Message
                            </label>

                            <textarea
                                id="message"
                                rows="7"
                                placeholder="Tell us about your project..."
                                required
                            ></textarea>

                        </div>


                        <button
                            type="submit"
                            class="btn btn-dark"
                        >
                            Send message
                        </button>


                        <p
                            id="formMessage"
                            class="form-message"
                        ></p>

                    </form>

                </div>

            </section>


            <section class="cta">

                <div class="cta-content">

                    <p class="eyebrow">
                        PREFER TO CALL?
                    </p>

                    <h2>
                        Let's have a conversation.
                    </h2>

                    <p>
                        Give us a call and we'll be happy to discuss
                        your project.
                    </p>

                    <a
                        href="tel:+40123456789"
                        class="btn btn-white"
                    >
                        Call us
                    </a>

                </div>

            </section>

        </main>

        ${createFooter()}
    `;
}


/* =========================================
   LOAD PAGE
========================================= */

function loadPage(page) {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (page === "home") {

        app.innerHTML = homePage();

    } else if (page === "about") {

        app.innerHTML = aboutPage();

    } else if (page === "gallery") {

        app.innerHTML = galleryPage();

    } else if (page === "contact") {

        app.innerHTML = contactPage();

    } else {

        app.innerHTML = homePage();

    }


    setupNavigation();
    setupContactForm();
}


/* =========================================
   NAVIGATION EVENTS
========================================= */

function setupNavigation() {

    const navigationLinks =
        document.querySelectorAll("[data-page]");


    navigationLinks.forEach(link => {

        link.addEventListener("click", function(event) {

            event.preventDefault();

            const page = this.dataset.page;

            loadPage(page);

        });

    });


    const menuButton =
        document.getElementById("menuButton");

    const navLinks =
        document.getElementById("navLinks");


    if (menuButton && navLinks) {

        menuButton.addEventListener("click", function() {

            navLinks.classList.toggle("open");

            if (navLinks.classList.contains("open")) {

                menuButton.textContent = "✕";

            } else {

                menuButton.textContent = "☰";

            }

        });


        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", function() {

                    navLinks.classList.remove("open");

                    menuButton.textContent = "☰";

                });

            });

    }
}


/* =========================================
   CONTACT FORM
========================================= */

function setupContactForm() {

    const form =
        document.getElementById("contactForm");

    const message =
        document.getElementById("formMessage");


    if (!form || !message) {
        return;
    }


    form.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const userMessage =
            document.getElementById("message").value.trim();


        if (
            name === "" ||
            email === "" ||
            userMessage === ""
        ) {

            message.textContent =
                "Please fill in all required fields.";

            message.classList.add("show");

            return;
        }


        message.textContent =
            `Thank you, ${name}! Your message has been received. We'll get back to you soon.`;

        message.classList.add("show");


        form.reset();

    });
}


/* =========================================
   START WEBSITE
========================================= */

loadPage("home");
```
 