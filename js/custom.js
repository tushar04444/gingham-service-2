const navbar = document.getElementById("mainNavbar");
  const videoSec = document.getElementById("videoSection");

  window.addEventListener("scroll", function () {
    // Shrink navbar on scroll
    if (window.scrollY > 50) {
      navbar.classList.add("shrink");
    } else {
      navbar.classList.remove("shrink");
    }

    // Expand video section smoothly
    if (window.scrollY > 200) {
      videoSec.classList.add("full-width");
    } else {
      videoSec.classList.remove("full-width");
    }
  });


window.addEventListener('scroll', function() {
    const left = document.querySelector('.left-content');
    const rightCont = document.querySelector('.scroll-col');

    if (!left || !rightCont) return;

    const leftRect = left.getBoundingClientRect();
    const leftBottomToWindowTop = leftRect.bottom;

    if (leftBottomToWindowTop <= 0) {
        // Left finished scrolling, release right
        rightCont.style.position = 'relative';
        rightCont.style.top = 'auto';
    } else {
        // Sticky
        rightCont.style.position = 'sticky';
        rightCont.style.top = '20px';
    }
});


  //accordation
  document.querySelectorAll(".faq-question").forEach((item) => {
    item.addEventListener("click", () => {
      const parent = item.parentNode;

      // Close others
      document.querySelectorAll(".faq-item").forEach((faq) => {
        if (faq !== parent) faq.classList.remove("active");
      });

      // Toggle current
      parent.classList.toggle("active");
    });
  });


  // brand
$(document).ready(function(){
  // Option click remains
  $(".option").click(function(){
      $(".option").removeClass("active");
      $(this).addClass("active");
  });

  // Mega menu hover
  $('.item-list .dropdown-item').hover(function(){
      var target = $(this).data('target');

      // hide all details
      $('.item-details .detail').removeClass('active');
      // show the hovered item's detail
      $('#' + target).addClass('active');
  });
});



// count
(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
	formatter: function (value, options) {
	  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	}
  });
  
  // start all the timers
  $('.timer').each(count);  
  
  function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
  }
});
// count

//check
// Toggle selection
const items = document.querySelectorAll('.check-item');
items.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});



//service card effect

// Detect which side the mouse is closest to
document.querySelectorAll('.card-1').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const topDist = y;
        const leftDist = x;
        const rightDist = rect.width - x;
        const bottomDist = rect.height - y;

        const min = Math.min(topDist, rightDist, bottomDist, leftDist);

        let side = '';
        if (min === topDist) side = 'top';
        else if (min === rightDist) side = 'right';
        else if (min === bottomDist) side = 'bottom';
        else side = 'left';

        card.setAttribute('data-side', side);
    });

    card.addEventListener('mouseleave', () => {
        card.removeAttribute('data-side');
    });
});


//wow js
 AOS.init({
    duration: 1000,
    once: false // 👈 false = animate every time you scroll in/out
  });


  // Fade in cards when scrolled into view
const steps = document.querySelectorAll('.step-col');

function checkVisibility() {
    const triggerBottom = window.innerHeight * 0.85;
    steps.forEach(step => {
        const stepTop = step.getBoundingClientRect().top;
        if (stepTop < triggerBottom) {
            step.classList.add('visible');
        } else {
            step.classList.remove('visible'); // animate out if scrolled up
        }
    });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);


const Items = document.querySelectorAll('.item-list .dropdown-item');
const details = document.querySelectorAll('.item-details .detail');

items.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const target = item.getAttribute('data-target');

        // Remove active from all details
        details.forEach(d => d.classList.remove('active'));

        // Activate target detail
        const detail = document.getElementById(target);
        if(detail) detail.classList.add('active');
    });
});
