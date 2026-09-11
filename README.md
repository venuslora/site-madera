# Oak & Home furniture website

## Files
- index.html — home
- about.html — about
- gallery.html — gallery
- contact.html — contact
- css/style.css — all styling and palette
- js/script.js — gallery configuration, mobile menu, lightbox and form handling

## Change the palette
Edit the :root section at the top of css/style.css.

## Change gallery images
Edit the `gallery` object at the top of js/script.js.
Each room has an `images` array. Add/remove paths as needed.

Example:
images: [
    "images/living-room/1.jpg",
    "images/living-room/2.jpg"
]

## Add another room
Copy one room object in js/script.js, give it a unique `id`, and add its image paths.

## Contact form
The form uses Formspree. Replace YOUR_FORM_ID in contact.html with your Formspree form ID.
Alternatively, replace the form action and JS submission logic with your own backend.

## Local images
Put your actual files into the images folders. The gallery does not require a fixed number of images.
