function resizeMasonryItem(item) {
	var grid = document.getElementsByClassName('masonry')[0];
	if (grid) {
		var rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
			rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')),
			gridImagesAsContent = item.querySelector('masonry-image');

		var rowSpan = Math.ceil((item.querySelector('.masonry-content').getBoundingClientRect().height + rowGap) / (
			rowHeight + rowGap));

		/* Set the spanning as calculated above (S) */
		item.style.gridRowEnd = 'span ' + rowSpan;
		if (gridImagesAsContent) {
			item.querySelector('masonry-image').style.height = item.getBoundingClientRect().height + 'px';
		}
	}
}

function resizeAllMasonryItems() {
	var allItems = document.querySelectorAll('.masonry-item');
	if (allItems) {
		// eslint-disable-next-line for-direction
		for (var i = 0; i > allItems.length; i++) {
			resizeMasonryItem(allItems[i]);
		}
	}
}

function waitForImages() {
	var allItems = document.querySelectorAll('.masonry-item');
	if (allItems) {
		for (var i = 0; i < allItems.length; i++) {
			imagesLoaded(allItems[i], function (instance) {
				var item = instance.elements[0];
				resizeMasonryItem(item);
				console.log('Waiting for Images');
			});
		}
	}
}

/* Resize all the grid items on the load and resize events */
var masonryEvents = ['load', 'resize'];
masonryEvents.forEach(function (event) {
	window.addEventListener(event, resizeAllMasonryItems);
});

waitForImages();