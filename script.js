// Portfolio Artworks Data (More detailed descriptions)
const artworks = [
  {
    title: "Sister In My Bedroom",
    src: "art1.png",
    desc: "A poignant exploration of boundaries and burgeoning emotions, capturing a raw, intimate moment within familiar confines. This piece delves into unspoken desires with a soft yet intense gaze.",
    category: "Sister"
  },
  {
    title: "Golden Hour Serenity",
    src: "art2.png",
    desc: "Bathed in the ethereal glow of twilight, this artwork evokes a sense of profound beauty and passionate warmth. It's a study in light and shadow, highlighting moments of tranquil desire.",
    category: "Fantasy"
  },
  {
    title: "Forbidden Affection",
    src: "art3.png",
    desc: "This piece provocatively illustrates the allure of the forbidden, depicting a complex dynamic of seduction and shared intimacy. It challenges perceptions of boundaries and consent.",
    category: "Mother"
  },
  {
    title: "Kitchen Delights",
    src: "art4.png",
    desc: "A playful yet sensual take on everyday moments, transforming the mundane into a canvas for subtle desire. It's about finding beauty and allure in unexpected places.",
    category: "Fantasy"
  },
  {
    title: "Cherry Kiss Reverie",
    src: "art5.png",
    desc: "Sweetness laced with a hint of danger, this artwork captures a fleeting, intimate connection. The symbolism of the cherry adds a layer of innocent temptation to the narrative.",
    category: "Fantasy"
  },
  {
    title: "Sister's Secret Longing",
    src: "art6.png",
    desc: "Diving deep into the vulnerability of unspoken needs, this piece portrays a raw, emotional narrative of a young woman confronting her desires. It’s a delicate balance of innocence and emerging passion.",
    category: "Sister"
  },
  {
    title: "Lorie's Unveiled Desire",
    src: "https://ik.imagekit.io/ofyftxfhs/DeWatermark.ai_1754899108329.jpeg?updatedAt=1754900874511",
    desc: "A powerful depiction of fantasy realized, this artwork explores themes of collective intimacy and the breaking of conventional taboos. It’s a bold statement on sexual freedom and exploration.",
    category: "Fantasy"
  },
  {
    title: "Ghostly Nocturne",
    src: "https://ik.imagekit.io/ofyftxfhs/2025-08-10-8e8fbcf4-aea4-4e5d-8467-166cd9d9bbfc.png?updatedAt=1754863487159",
    desc: "Blending the ethereal with the carnal, this piece explores the spectral presence of desire in the quiet hours of the night. It's about the haunting beauty of longing.",
    category: "Fantasy"
  },
  {
    title: "Maternal Instincts Unleashed",
    src: "https://ik.imagekit.io/ofyftxfhs/2025-08-10-a37ce815-504c-4814-927a-719854727a33.png?updatedAt=1754849919238",
    desc: "A nuanced portrayal of mature desire, demonstrating that passion knows no age. This artwork focuses on the strength, vulnerability, and seductive power found in older women.",
    category: "Mother"
  },
  {
    title: "My Bully, My Step-Sister",
    src: "https://ik.imagekit.io/ofyftxfhs/2025-08-09-27d9a125-e6bc-47b0-a5a0-7972c46485f7.png?updatedAt=1754748874085",
    desc: "This piece delves into the complex and often challenging dynamics of family boundaries mixed with forbidden attraction. It’s a narrative of power, submission, and unexpected desires.",
    category: "Sister"
  }
];

// --- DOM Elements ---
const portfolioGrid = document.getElementById("portfolioGrid");
const filterButtons = document.querySelectorAll(".filter-buttons button");
const loadingIndicator = document.getElementById("loadingIndicator");
const pageLoader = document.getElementById('pageLoader');

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDesc = document.getElementById("lightboxDesc");
const closeLightbox = document.getElementById("closeLightbox");
const prevLightboxBtn = document.getElementById("prevLightboxBtn");
const nextLightboxBtn = document.getElementById("nextLightboxBtn");

const backToTopBtn = document.getElementById("backToTopBtn");
const contactEmailBtn = document.getElementById('contactEmailBtn');
const copyConfirm = document.getElementById('copyConfirm');
const scrollProgress = document.getElementById('scrollProgress');

// NEW: Navigation elements
const mainNav = document.querySelector('.main-nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');


// --- Global Variables ---
let currentLightboxIndex = 0;
let originalDocumentTitle = document.title;


// --- Utility Functions ---

/**
 * Shows a loading indicator.
 */
function showLoading() {
    loadingIndicator.classList.add('active');
    portfolioGrid.innerHTML = ''; // Clear existing items
    portfolioGrid.style.display = 'flex'; // Change to flex for centering spinner
    portfolioGrid.style.justifyContent = 'center';
    portfolioGrid.style.alignItems = 'center';
    portfolioGrid.style.minHeight = '300px'; // Ensure space for spinner
}

/**
 * Hides the loading indicator.
 */
function hideLoading() {
    loadingIndicator.classList.remove('active');
    portfolioGrid.style.display = 'grid'; // Revert to grid display
    portfolioGrid.style.minHeight = 'auto';
}

/**
 * Preloads an image.
 * @param {string} url - The URL of the image to preload.
 * @returns {Promise<HTMLImageElement>} - A promise that resolves with the loaded image.
 */
function preloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = (err) => {
            console.error(`Failed to load image: ${url}`, err);
            reject(err);
        };
    });
}

/**
 * Applies a reveal animation to portfolio items.
 */
function applyRevealAnimation() {
    const items = portfolioGrid.querySelectorAll('.portfolio-item');
    items.forEach((item, index) => {
        // Add a slight delay for staggered effect
        setTimeout(() => {
            item.classList.add('reveal');
        }, index * 70); // 70ms delay between each item
    });
}


// --- Portfolio Functions ---

/**
 * Loads artworks into the grid based on the given filter.
 * @param {string} filter - The category to filter by ('all', 'Sister', 'Mother', 'Fantasy').
 */
async function loadArtworks(filter = "all") {
    showLoading(); // Show loading indicator

    // Simulate network delay for better UX demonstration
    await new Promise(resolve => setTimeout(resolve, 500));

    const filteredArtworks = artworks.filter(art => filter === "all" || art.category === filter);
    portfolioGrid.innerHTML = ""; // Clear current grid

    if (filteredArtworks.length === 0) {
        portfolioGrid.innerHTML = '<p class="no-art-message">No artworks found for this category. Please check back later for new additions!</p>';
        hideLoading();
        return;
    }

    // Preload images for current view (optional, but good for performance)
    const preloadPromises = filteredArtworks.map(art => preloadImage(art.src));
    await Promise.all(preloadPromises).catch(error => console.error("Error preloading images from Promise.all:", error));

    filteredArtworks.forEach(art => {
      const item = document.createElement("div");
      item.classList.add("portfolio-item");
      item.setAttribute('tabindex', '0'); // Make focusable
      item.setAttribute('role', 'button'); // Indicate it's a button
      item.setAttribute('aria-label', `View ${art.title} artwork`);
      item.innerHTML = `
        <img src="${art.src}" alt="${art.title}" loading="lazy">
        <div class="item-overlay">
          <h3>${art.title}</h3>
          <p>${art.desc}</p>
        </div>
      `;
      item.addEventListener("click", () => openLightbox(art));
      item.addEventListener("keydown", (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openLightbox(art);
          }
      });
      portfolioGrid.appendChild(item);
    });

    hideLoading(); // Hide loading indicator
    applyRevealAnimation(); // Apply animation after loading
}

// Event listener for filter buttons (delegation for efficiency)
document.querySelector('.filter-buttons').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        // Update active state for buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Update aria-pressed attributes
        filterButtons.forEach(btn => btn.setAttribute('aria-pressed', 'false'));
        e.target.setAttribute('aria-pressed', 'true');

        loadArtworks(e.target.getAttribute("data-filter"));
    }
});


// --- Lightbox Functions ---

/**
 * Opens the lightbox with a specific artwork.
 * @param {object} art - The artwork object to display.
 */
function openLightbox(art) {
  currentLightboxIndex = artworks.findIndex(a => a.src === art.src);
  updateLightboxContent(art);
  lightbox.style.display = "flex";
  document.body.style.overflow = "hidden"; // Prevent scrolling
  document.title = `${art.title} - Queendom..`; // Dynamic tab title
  preloadNeighboringImages();
}

/**
 * Updates the content of the lightbox.
 * @param {object} art - The artwork object.
 */
function updateLightboxContent(art) {
    lightboxImg.src = art.src;
    lightboxImg.alt = art.title;
    lightboxTitle.textContent = art.title;
    lightboxDesc.textContent = art.desc;
}

/**
 * Preloads the previous and next images in the artwork array for smoother navigation.
 */
function preloadNeighboringImages() {
    const prevIndex = (currentLightboxIndex - 1 + artworks.length) % artworks.length;
    const nextIndex = (currentLightboxIndex + 1) % artworks.length;

    preloadImage(artworks[prevIndex].src).catch(err => console.error("Error preloading prev image in lightbox:", err));
    preloadImage(artworks[nextIndex].src).catch(err => console.error("Error preloading next image in lightbox:", err));
}

/**
 * Navigates the lightbox to the previous artwork.
 */
function navigateLightbox(direction) {
    let newIndex = currentLightboxIndex;
    if (direction === 'prev') {
        newIndex = (currentLightboxIndex - 1 + artworks.length) % artworks.length;
    } else { // direction === 'next'
        newIndex = (currentLightboxIndex + 1) % artworks.length;
    }
    currentLightboxIndex = newIndex;
    updateLightboxContent(artworks[currentLightboxIndex]);
    preloadNeighboringImages();
}

// Lightbox navigation event listeners
prevLightboxBtn.addEventListener('click', () => navigateLightbox('prev'));
nextLightboxBtn.addEventListener('click', () => navigateLightbox('next'));

// Close lightbox event listener
closeLightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
  document.body.style.overflow = ""; // Restore scrolling
  document.title = originalDocumentTitle; // Restore original tab title
});

// Close lightbox when clicking outside the image/text
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
        document.body.style.overflow = "";
        document.title = originalDocumentTitle;
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') { // Only active if lightbox is open
        if (e.key === 'Escape') {
            closeLightbox.click();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox('prev');
        } else if (e.key === 'ArrowRight') {
            navigateLightbox('next');
        }
    }
});


// --- Back to Top Button Functions ---

/**
 * Shows/hides the back-to-top button based on scroll position.
 */
function toggleBackToTopButton() {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    backToTopBtn.style.display = "block";
    backToTopBtn.style.opacity = "1";
  } else {
    backToTopBtn.style.opacity = "0";
    setTimeout(() => {
        if (document.body.scrollTop <= 400 && document.documentElement.scrollTop <= 400) {
            backToTopBtn.style.display = "none";
        }
    }, 300); // Match CSS transition duration
  }
}

// Event listener for back-to-top button
backToTopBtn.addEventListener("click", () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});


// --- Contact Email Copy Function ---
contactEmailBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = contactEmailBtn.href.replace('mailto:', '');
    try {
        await navigator.clipboard.writeText(email);
        copyConfirm.textContent = 'Email copied to clipboard!';
        copyConfirm.classList.add('active');
        setTimeout(() => {
            copyConfirm.classList.remove('active');
        }, 2000); // Hide after 2 seconds
    } catch (err) {
        console.error('Failed to copy email: ', err);
        copyConfirm.textContent = 'Failed to copy email.';
        copyConfirm.classList.add('active');
        setTimeout(() => {
            copyConfirm.classList.remove('active');
        }, 2000);
    }
});


// --- Scroll Progress Indicator Function ---
function updateScrollProgress() {
    // Ensure that totalHeight is not zero to prevent division by zero
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (totalHeight > 0) {
        const scrolled = document.documentElement.scrollTop;
        const progress = (scrolled / totalHeight) * 100;
        scrollProgress.style.width = progress + '%';
    } else {
        scrollProgress.style.width = '0%'; // No scrollbar, no progress
    }
}


// --- Scroll-triggered animations (Intersection Observer API) ---
const scrollElements = document.querySelectorAll('.scroll-fade-in');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, { threshold: 0.15 }); // Trigger when 15% of element is visible

scrollElements.forEach(element => {
    observer.observe(element);
});

// --- NEW: Navigation Bar Toggle for Mobile ---
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Toggle aria-expanded for accessibility
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    document.body.classList.toggle('nav-open'); // To prevent body scroll when nav is open
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
        }
    });
});

// --- Initializations on Page Load ---
document.addEventListener('DOMContentLoaded', () => {
    // Hide page loader after everything is loaded
    pageLoader.classList.add('hidden');
    // Ensure body scroll is enabled after loader is hidden
    document.body.style.overflow = '';

    loadArtworks(); // Initial load of all artworks

    // Update copyright year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Attach scroll event listeners
    window.addEventListener('scroll', () => {
        toggleBackToTopButton();
        updateScrollProgress();
        // Optional: Add/remove sticky class for nav based on scroll if not using fixed
        // For a fixed nav, usually no scroll listener is needed here unless transparency changes.
    });
    toggleBackToTopButton(); // Call once on load in case page is already scrolled
    updateScrollProgress(); // Call once on load to set initial state

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') { // If just '#' scroll to top
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) { // Check if the target element exists
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});