// Global Variable
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// DOM

const loader = document.getElementById('loader');
const imgContainer = document.getElementById('image-container');

// Unsplash API
let isInitialLoad = true;
let apiCount = 10;
const apiKey = 'zkwqbFWcjgBcWfH_dyAhC4nB-RKJIj9k4Me9sE8c5dw';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${apiCount}`;

// Update apiCount
function updateApiCount(count) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
}

// Image Loader

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        displayPhotos();
    }
    console.log('image loaded');
}

// setAttributes Helper Function

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Display Image on the DOM

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each image in photosArray to get the image data
    photosArray.forEach((photo) => {
        // Create a Link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });
        // Render Image
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Load eventlistener
        img.addEventListener('load', imageLoaded);
        // Append Image in Anchor tag and Append Anchor tag in imageContainer
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}

// Fetch Image from Unsplash API

async function getImages() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) {
            updateApiCount(30);
            isInitialLoad = false;
        }
    } catch (error) {
        // Catch and handle error
        console.log(error);
    }
}

// Event Listeners

window.addEventListener('scroll', () => {
    if (((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1000)) && (ready)) {
        ready = false;
        getImages();
    }
});

// On Load
getImages();
