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


// Opens image upon click
const images = document.getElementsByClassName('image');
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const photos = document.querySelectorAll('.photo-section img')

let currentImageIndex = 0;

function openImage(image) {
  modal.style.display = 'block';
  modalImage.src = image.src;
  currentIndex = Array.from(images).indexOf(image);
}

modalImage.onload = function () {
  var modalWidth = modal.offsetWidth - 40; // Adjust for padding and borders
  var modalHeight = modal.offsetHeight - 40;
  var imageWidth = modalImage.naturalWidth;
  var imageHeight = modalImage.naturalHeight;

  if (imageWidth > modalWidth) {
    var widthRatio = modalWidth / imageWidth;
    imageWidth *= widthRatio;
    imageHeight *= widthRatio;
  }

  if (imageHeight > modalHeight) {
    var heightRatio = modalHeight / imageHeight;
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
document.getElementById('previous-btn').addEventListener('click', function () {
  navigateBackward();
});

document.getElementById('next-btn').addEventListener('click', function () {
  navigateForward();
});

document.addEventListener('keydown', handleKeyPress);

document.addEventListener('DOMContentLoaded', function () {
  // using swipe events

  let touchstartX = 0
  let touchendX = 0

  function checkDirection() {
    if (touchendX < touchstartX) navigateBackward();
    if (touchendX > touchstartX) navigateForward();
  }

  document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
  })

  document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    checkDirection()
  })
});