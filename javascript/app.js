const UICtrl = (function(){
  const UISelectors = {
    height: '#height',
    width: '#width',
    homeTab: '#home-tab',
    jobsTab: '#jobs-tab',
    lifeTab: '#life-tab',
    profilePic: '.profile-pic',
    companyCard: '.company-card'
  }

  return {
    getSelectors: function(){
      return UISelectors;
    },
    getHeight: function(){
      return document.querySelector(UISelectors.height);
    },
    getWidth: function(){
      return document.querySelector(UISelectors.width);
    },
    activateTab: function(tab){
      tab.classList.add("active");
    },
    activeCompanyCardMobile: function(){
      console.log("activate horizontal cards");
      let companyCards = document.querySelectorAll(UISelectors.companyCard);
      companyCards.forEach((card) => {
        card.classList.add("horizontal")
      });
    },
    deactivateCompanyCardMobile: function(){
      console.log("DEactivate horizontal cards");
      let companyCards = document.querySelectorAll(UISelectors.companyCard);
      companyCards.forEach((card) => {
        card.classList.remove("horizontal")
      });
    },
    shake: function() {
      let profilePic = document.querySelector(UISelectors.profilePic);
      profilePic.classList.add("shake")
    },
    resetTabs: function(){
      document.querySelector(UISelectors.homeTab).parentElement.classList.remove("active");
      document.querySelector(UISelectors.jobsTab).parentElement.classList.remove("active");
      document.querySelector(UISelectors.lifeTab).parentElement.classList.remove("active");
    },
    reset_animation: function() {
      var el = document.getElementById('animated');
      el.style.animation = 'none';
      el.offsetHeight; /* trigger reflow */
      el.style.animation = null; 
    }
  }
})();

const App = (function(UICtrl){
  const UISelectors = UICtrl.getSelectors();
  const tabletBreakpoint = 992;
  const mobileBreakpoint = 600;
  let mobile = false;
  let tablet = false;
  let desktop = false;
  const loadEventListeners = function(){
    window.addEventListener('resize', reportWindowSize);
    document.querySelector(UISelectors.profilePic).addEventListener('click', toast);
  } 

  const reportWindowSize = function(e) {
    // console.log(`height: ${window.innerHeight}`);
    let width = window.innerWidth;
    console.log(`width: ${width}`);
    
    if(width <= mobileBreakpoint && mobile === false){
      console.log('We hit mobile');
      mobile = true;
      tablet = false;
      desktop = false;
      UICtrl.activeCompanyCardMobile();
    } else if (width > mobileBreakpoint && width <= tabletBreakpoint && tablet === false) {
      console.log('We hit tablet');
      mobile = false;
      tablet = true;
      desktop = false;
      UICtrl.activeCompanyCardMobile();
    } else if (width > tabletBreakpoint && desktop === false) {
      console.log('We hit desktop');
      mobile = false;
      tablet = false;
      desktop = true;
      UICtrl.deactivateCompanyCardMobile();
    }
  }

  const toast = function(e){
    const suhs = ['SUH?', 'kamaown!!', 'Hello there sir', '👀👀', '💯💯💯', '🙏', 'GANG GANG', 'GOTTTTIII!!!', 'oooldee time roooad!', 'MENDOKUSAII...', 'なに?!'];
    let random = Math.floor(Math.random() * suhs.length); 
    M.toast({html: suhs[random], classes: 'toast', displayLength: 2000});
    UICtrl.shake();
    UICtrl.reset_animation();
    e.preventDefault();
  }

  return {
    init: function(){
      // Load event listeners
      loadEventListeners();
      reportWindowSize();
    }
  }
  
})(UICtrl);

// Load up MaterializeCSS JS
document.addEventListener('DOMContentLoaded', function() {

  // parallax JS
  const parallaxElems = document.querySelectorAll('.parallax');
  const parallaxOptions = {
  }
  const parallaxInstances = M.Parallax.init(parallaxElems, parallaxOptions);

  // tooltip JS
  const tooltipElems = document.querySelectorAll('.tooltipped');
  const tooltipOptions = {
  }
  const tooltopInstances = M.Tooltip.init(tooltipElems, tooltipOptions);
  
  // collapsible JS
  const collapsibleElems = document.querySelectorAll('.collapsible');
  const collapsibleOptions = {
  }
  var collapsibleInstances = M.Collapsible.init(collapsibleElems, collapsibleOptions);

  // scrollspy JS
  const scrollspyElems = document.querySelectorAll('.scrollspy');
  const scrollspyOptions = {
  }
  const scrollspyInstances = M.ScrollSpy.init(scrollspyElems, scrollspyOptions);

  const pushpinElems = document.querySelectorAll('.pushpin');
  const pushpinOptions = {
  }
  const pushpinInstances = M.Pushpin.init(pushpinElems, pushpinOptions);
  
  // tap-target JS
  const tapElems = document.querySelectorAll('.tap-target');
  const tapOptions = {
  }
  const tapInstances = M.TapTarget.init(tapElems, tapOptions);
  
  // select JS
  const selectElems = document.querySelectorAll('select');
  const selectOptions = {
  }
  const selectInstances = M.FormSelect.init(selectElems, selectOptions);

});

// Init MaterializeCSS
App.init();

// Push Pin Function
$('.table-of-contents').each(function() {
  var $this = $(this);
  var $target = $('#' + $(this).attr('data-target'));
  $this.pushpin({
    top: $target.offset().top,
    bottom: $target.offset().top + $target.outerHeight() - $this.height()
  });
});

/*
$(document).ready(function() {
  $(".dropdown-trigger").dropdown();
});
*/

var header = $('#header');
var greeting = $('#greeting');
var logoImage = $("#logo-image");
var headerHidden = false;

$(window).on('scroll', function () {
  
  var scrollTop = $(this).scrollTop(),
      height = header.outerHeight(),
      offset = 0,
      calc = 1 - (scrollTop - offset) / height;
  
  header.css({ 'opacity': calc });
  logoImage.css({ 'opacity': Math.abs(calc - 1)});

  headerHidden = calc < '0' ? true : false;
});

var emoji = ["🤗🤗", "🤠🐎", "💯💯💯"]
var text = ["Hello World!", "Howdy yall", "suuuh cuh"];
var counter = 1;
var headerTitle = $("#header-title");
logoImage.html(emoji[0]);
greeting.html(text[0]);
headerTitle.html(`${text[0]} ${emoji[0]}`);

setInterval(change, 3000);
function change() {
  if(!headerHidden) {
    logoImage.fadeOut();
    greeting.fadeOut();
    headerTitle.fadeOut(function(){
      logoImage.html(emoji[counter]);
      greeting.html(text[counter]);
      headerTitle.html(`${text[counter]} ${emoji[counter]}`);
          counter++;
          if(counter >= text.length) { counter = 0; }
          headerTitle.fadeIn();
          greeting.fadeIn();
          logoImage.fadeIn();
      });
  }
}
