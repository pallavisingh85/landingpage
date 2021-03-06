/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
* This fumction is for building the nav bar dynamically
*/
function dynamicNavBuilder(){
 const navList = document.getElementById('navbar__list');
 const docFragment = document.createDocumentFragment();
 const sections = document.querySelectorAll('section');
 for(let i=0; i<sections.length; i++) {
    const listItem = document.createElement('li');
    const section = sections[i];
    listItem.textContent = section.querySelector('h2').textContent;
    listItem.classList.add('menu__link');
    listItem.setAttribute('name', section.id);
    navClick(listItem);
    docFragment.appendChild(listItem);
 }
 console.log(docFragment);
 navList.appendChild(docFragment);
}


/**
* Return tru if element is visible on viewport
*/
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document. documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document. documentElement.clientWidth)
  );
}

/**
* Add class 'active' to section when near top of viewport
*/
function setActiveSection(){
 const sections = document.querySelectorAll('section');
  for(let i=0; i<sections.length; i++) {
     const section = sections[i];
     if(isElementInViewport(section)){
       section.classList.add('your-active-class');
     }else{
       section.classList.remove('your-active-class');
     }
  }
}

function setActiveLink(){
 const listItems = document.querySelectorAll('li');
   for(let i=0; i<listItems.length; i++){
     const sectionId =listItems[i].getAttribute('name');
     console.log('sectionId'+sectionId);
     const section = document.getElementById(sectionId);
     if(section.classList.contains('your-active-class')){
         listItems[i].classList.add('active');
     } else {
         listItems[i].classList.remove('active');
     }
   }
}

/**
* Scroll to anchor ID using scrollTO event
*/
function scrollToView(event){
  const listItem = event.target;
  const sectionId =listItem.getAttribute('name');
  const section = document.getElementById(sectionId);
  window.scrollTo({
   top: section.getBoundingClientRect().y + window.scrollY,
   behavior: 'smooth'
  });
  /*const listItems = document.querySelectorAll('li');
  for(let i=0; i<listItems.length; i++){
    if(listItem === listItems[i]){
        listItem.classList.add('active');
    } else {
        listItems[i].classList.remove('active');
    }
  }*/
}

// Scroll to section on link click
function navClick(listItem){
    const navList = document.getElementById('navbar__list');
    navList.addEventListener('click', scrollToView);
}

// Build menu 
dynamicNavBuilder();


// Set sections as active
window.addEventListener('scroll', function() {
 setActiveSection();
 setActiveLink();
});


