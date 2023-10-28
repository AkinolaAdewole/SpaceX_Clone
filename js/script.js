 // Mobile menu button
const btn = document.getElementById('menu-btn');

// Overlay for the mobile menu
const overlay = document.getElementById('overlay'); 

// The mobile menu itself
const menu = document.getElementById('mobile-menu'); 
const counters = document.querySelectorAll('.counter'); // Elements with class 'counter' that will be animated
let scrollStarted = false; // Flag to track if scrolling has started

// Add a click event listener to the mobile menu button
btn.addEventListener('click', navToggle);

// Add a scroll event listener to the document
document.addEventListener('scroll', scrollPage);

// Function to toggle the mobile menu
function navToggle() {
  // Toggle CSS classes to show/hide the menu and overlay
  btn.classList.toggle('open');
  overlay.classList.toggle('overlay-show');
  document.body.classList.toggle('stop-scrolling');
  menu.classList.toggle('show-menu');
}

// Function to handle scrolling
function scrollPage() {
  // Get the vertical scroll position
  const scrollPos = window.scrollY;

  // Check if the scroll position is below 100 pixels and scrolling has started
  if (scrollPos > 100 && !scrollStarted) {
    // If true, trigger the countUp function to animate the counters
    countUp();
    scrollStarted = true;
  } else if (scrollPos < 100 && scrollStarted) {
    // If false, reset the counters
    reset();
    scrollStarted = false;
  }
}

// Function to animate the counters
function countUp() {
  counters.forEach((counter) => {
    // Initialize the counter text to '0'
    counter.innerText = '0';

    const updateCounter = () => {
      // Get the target value from the 'data-target' attribute
      const target = +counter.getAttribute('data-target');
      // Get the current counter value
      const c = +counter.innerText;

      // Calculate an increment value (1% of the target)
      const increment = target / 100;

      // If the current counter is less than the target, increment it
      if (c < target) {
        // Increment and round up, then update the counter text
        counter.innerText = `${Math.ceil(c + increment)}`;

        // Schedule the next update with a delay of 75ms
        setTimeout(updateCounter, 75);
      } else {
        // If the target is reached, set the counter text to the target value
        counter.innerText = target;
      }
    };

    // Start the counter animation
    updateCounter();
  });
}

// Function to reset the counters to '0'
function reset() {
  counters.forEach((counter) => (counter.innerHTML = '0'));
}
