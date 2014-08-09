$(document).ready(function() {

	var sections = $('.input-block.input-section'),
		tabs = $('<div class="tabs tabs-section clearfix"></div>')
	;

	// Loop through sections, grabbing data for each
	sections.each(function() {
		var $this = $(this),
			title = $this.children('label').html(),
			slug = getSlug(title),
			wrap = $this.nextUntil(sections).andSelf() // Group .input-section and other input sections until the next .input-section
		;

		// Attach ID
		$(this).attr('id', slug);

		// Append to ul.tabs
		tabs.append('<a href="#' + slug +'">' + title + '</a>');

		// Wrap .block-wrap around section group
		wrap.wrapAll('<div class="tabs block-wrap" id="block-wrap-' + slug + '" />')
	});

	// Place contents on page
	if (tabs.find('a').length)
	{
		var firstTab = tabs.find('a').first();

		$('.block-wrap').first().before(tabs); // Load tabs before first block-wrap group
		firstTab.addClass('active'); // Make the first class active
		$('.tabs.block-wrap').not(':first').addClass('is-hidden'); // Add .is-hidden to all except first block-wrap block
	}

	// Tab Switching for fun and profit. Well, not profit.
	var tabs = {
		init: function() {
			this.bindUIActions();
		},

		bindUIActions: function() {
			$('body').on('click', '.tabs-section a', this.goDoTabs ); // Bind click events on tab links
		},

		goDoTabs: function(event) {
			var $this = $(this),
				clicked = $this.attr('href'),
				clickedLink = clicked.substring(1, clicked.length),
				inactiveTabs = $this.closest('.tabs-section').find('a')
			;

			console.log(clickedLink);

			inactiveTabs.removeClass('active'); // Remove active class from non-active tabs. Liars.
			$(this).addClass('active'); // Restore active class to the rightful owner.

			$('.tabs.block-wrap').addClass('is-hidden'); // Hide all the .block-wraps
			$('#block-wrap-' + clickedLink).removeClass('is-hidden'); // Show the active block wrap

			event.preventDefault();
		}
	}

	tabs.init();

});