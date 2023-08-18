// Allows fade in animation for content on page
const elements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

elements.forEach(element => {
  observer.observe(element);
});

// Navigation links 

const navOptionLinks = document.querySelector(".navigation__link")
const navigationList = document.querySelector(".navigation__nav")

if (navigationList.classList.contains('hidden')){
  navOptionLinks.classList.add('inactive-link');
} else {
  navOptionLinks.classList.remove('inactive-link');
}


// Opens image upon click
const images = document.querySelector('.image');
const modal = document.querySelector('#image-modal');
const modalImage = document.querySelector('#modal-image');
const photos = document.querySelectorAll('.photo-section img')

let currentImageIndex = 0;

function openImage(image) {
  modal.style.display = 'block';
  modalImage.src = image.src;
  currentIndex = Array.from(images).indexOf(image);
}

modalImage.onload = function () {
  let modalWidth = modal.offsetWidth - 40; // Adjust for padding and borders
  let modalHeight = modal.offsetHeight - 40;
  let imageWidth = modalImage.naturalWidth;
  let imageHeight = modalImage.naturalHeight;

  if (imageWidth > modalWidth) {
    let widthRatio = modalWidth / imageWidth;
    imageWidth *= widthRatio;
    imageHeight *= widthRatio;
  }

  if (imageHeight > modalHeight) {
    let heightRatio = modalHeight / imageHeight;
    imageWidth *= heightRatio;
    imageHeight *= heightRatio;
  }

  modalImage.style.width = imageWidth + 'px';
  modalImage.style.height = imageHeight + 'px';
};

function closeImage() {
  modal.style.display = 'none';
}

// Navigate through gallery of photos 

function navigateForward() {
  currentImageIndex++;
  if (currentImageIndex >= photos.length) {
    currentImageIndex = 0; // wrap around to the first image
  }
  openImage(photos[currentImageIndex]);
}

function navigateBackward() {
  currentImageIndex--;
  if (currentImageIndex < 0) {
    currentImageIndex = photos.length - 1;
  }
  openImage(photos[currentImageIndex]);
}

// using keydown event through arrows

function handleKeyPress(event) {
  if (event.keyCode === 37) {
    navigateBackward()
  } else if (event.keyCode === 39) {
    navigateForward();
  }
}

// using previous and next buttons
document.querySelector('#previous-btn').addEventListener('click', function () {
  navigateBackward();
});

document.querySelector('#next-btn').addEventListener('click', function () {
  navigateForward();
});

document.addEventListener('keydown', handleKeyPress);

