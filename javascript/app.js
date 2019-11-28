const UICtrl = (function(){
  const UISelectors = {
    homeTab: '#home-tab',
    jobsTab: '#jobs-tab',
    lifeTab: '#life-tab',
    carousel: '.carousel'
  }

  return {
    getSelectors: function(){
      return UISelectors;
    },
    activateTab: function(tab){
      tab.classList.add("active");
    },
    resetTabs: function(){
      document.querySelector(UISelectors.homeTab).parentElement.classList.remove("active");
      document.querySelector(UISelectors.jobsTab).parentElement.classList.remove("active");
      document.querySelector(UISelectors.lifeTab).parentElement.classList.remove("active");
    }
  }
})();

const App = (function(UICtrl){
  const UISelectors = UICtrl.getSelectors();
  const loadEventListeners = function(){
    document.querySelector(UISelectors.homeTab).addEventListener('click', tabClick);
    document.querySelector(UISelectors.jobsTab).addEventListener('click', tabClick);
    document.querySelector(UISelectors.lifeTab).addEventListener('click', tabClick);
    // document.querySelector(UISelectors.carousel).addEventListener('click', toast);
  } 
  const tabClick = function(e){
    UICtrl.resetTabs();
    UICtrl.activateTab(e.target.parentElement);
    e.preventDefault();
  }

  const toast = function(e){
    M.toast({html: 'spinny spinny!', classes: 'toasty', displayLength: 2000});
    e.preventDefault();
  }

  return {
    init: function(){
      // Load event listeners
      loadEventListeners();
    }
  }
  
})(UICtrl);

document.addEventListener('DOMContentLoaded', function() {

  const parallaxElems = document.querySelectorAll('.parallax');
  const parallaxOptions = {
    
  }
  const parallaxInstances = M.Parallax.init(parallaxElems, parallaxOptions);
  
});

App.init();



$(document).ready(function() {
  $(".dropdown-trigger").dropdown();
});

var header = $('#header');
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

var emoji = ["🤗", "🤠", "😎"]
var text = ["hello world", "howdy partner", "suh cuh"];
var counter = 1;
var headerTitle = $("#header-title");
logoImage.html(emoji[0]);
headerTitle.html(`${emoji[0]}  ${text[0]}`);

setInterval(change, 3000);
function change() {
  if(!headerHidden) {
    logoImage.fadeOut();
    headerTitle.fadeOut(function(){
      logoImage.html(emoji[counter]);
      headerTitle.html(`${emoji[counter]} ${text[counter]}`);
          counter++;
          if(counter >= text.length) { counter = 0; }
          headerTitle.fadeIn();
          logoImage.fadeIn();
      });
  }
}