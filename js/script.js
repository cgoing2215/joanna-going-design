const navOptions = document.querySelectorAll('.nav-option');

function expandOption() {
  this.style.transform = 'scale(1.1)';
}

function shrinkOption() {
  this.style.transform = 'scale(1)';
}

navOptions.forEach(option => {
  option.addEventListener('mouseover', expandOption);
  option.addEventListener('mouseout', shrinkOption);
});