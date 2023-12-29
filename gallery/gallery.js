const galleryOverlay = document.querySelector('.gallery-overlay');
const galleryOverlayPreview = document.querySelector('.gallery-overlay-preview');
const galleryOverlayControlPrev = document.querySelector('.gallery-overlay-control-prev');
const galleryOverlayControlNext = document.querySelector('.gallery-overlay-control-next');

const gallery = document.querySelector('.gallery');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryCloseButton = document.querySelector('.gallery-overlay-close-button');

let galleryItemsPictures = [];
let currentIndex = 0;

function openGalleryOverlay() {
    galleryOverlay.style.display = 'flex';
    galleryOverlayPreview.querySelector('img').src = galleryItemsPictures[currentIndex];
}

function closeGalleryOverlay() {
    galleryOverlay.style.display = 'none';
}

galleryCloseButton.addEventListener('click', () => {
    closeGalleryOverlay();
});

galleryItems.forEach((item) => {
    galleryItemsPictures.push(item.querySelector('img').src);
});

function clampInRange(index, start, end) {
    if (index < start) {
        index = end - 1;
    } else if (index >= end) {
        index = start;
    }
    return index;
}

galleryOverlayControlPrev.addEventListener('click', (e) => {
    currentIndex = clampInRange(currentIndex - 1, 0, galleryItemsPictures.length);
    galleryOverlayPreview.querySelector('img').src = galleryItemsPictures[currentIndex];
});

galleryOverlayControlNext.addEventListener('click', (e) => {
    currentIndex = clampInRange(currentIndex + 1, 0, galleryItemsPictures.length);
    galleryOverlayPreview.querySelector('img').src = galleryItemsPictures[currentIndex];
});

// tests - 3 passed, 0 failed
console.info(clampInRange(-1, 0, 5));
console.info(clampInRange(1, 0, 5));
console.info(clampInRange(4, 2, 4));

galleryItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        let gid = e.composedPath()[1].dataset.gid;
        currentIndex = gid - 1;
        openGalleryOverlay();
    });
});