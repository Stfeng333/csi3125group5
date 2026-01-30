// we want to keep track of user preferences in an object as asked in the instructions
let userPreferences = {
    vegetarian: false,
    glutenFree: false,
    organicPreference: 'all',
    largeText: false
};

// we want to wait until the DOM is fully loaded before initializing the app
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCustomerPage();
    loadPreferences();
});

// our navigation system
function initializeNavigation() {
    const navCustomer = document.getElementById('nav-customer');
    const navProducts = document.getElementById('nav-products');
    const navCart = document.getElementById('nav-cart');

    navCustomer.addEventListener('click', () => showSection('customer-section'));
    navProducts.addEventListener('click', () => showSection('products-section'));
    navCart.addEventListener('click', () => showSection('cart-section'));
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => section.classList.remove('active'));

    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // we want to highlight the current navigation section as active
    if (sectionId === 'customer-section') {
        document.getElementById('nav-customer').classList.add('active');
    } else if (sectionId === 'products-section') {
        document.getElementById('nav-products').classList.add('active');
    } else if (sectionId === 'cart-section') {
        document.getElementById('nav-cart').classList.add('active');
    }
}

// customer section functionality 
function initializeCustomerPage() {
    const saveBtn = document.getElementById('save-preferences');
    const largeTextCheckbox = document.getElementById('large-text');

    saveBtn.addEventListener('click', savePreferences);
    
    largeTextCheckbox.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('large-text');
        } else {
            document.body.classList.remove('large-text');
        }
    });
}

function savePreferences() {
    userPreferences.vegetarian = document.getElementById('vegetarian').checked;
    userPreferences.glutenFree = document.getElementById('gluten-free').checked;

    const organicRadio = document.querySelector('input[name="preference"]:checked');
    userPreferences.organicPreference = organicRadio ? organicRadio.value : 'all';

    userPreferences.largeText = document.getElementById('large-text').checked;

    localStorage.setItem('go5Preferences', JSON.stringify(userPreferences));

    if (userPreferences.largeText) {
        document.body.classList.add('large-text');
    } else {
        document.body.classList.remove('large-text');
    }

    alert('Your preferences have been saved!');
}

function loadPreferences() {
    const saved = localStorage.getItem('go5Preferences');
    if (saved) {
        userPreferences = JSON.parse(saved);

        document.getElementById('vegetarian').checked = userPreferences.vegetarian;
        document.getElementById('gluten-free').checked = userPreferences.glutenFree;
        document.getElementById('large-text').checked = userPreferences.largeText;

        if (userPreferences.organicPreference === 'organic') {
            document.getElementById('organic').checked = true;
        } else if (userPreferences.organicPreference === 'non-organic') {
            document.getElementById('non-organic').checked = true;
        } else {
            document.getElementById('no-preference').checked = true;
        }

        if (userPreferences.largeText) {
            document.body.classList.add('large-text');
        }
    }
}