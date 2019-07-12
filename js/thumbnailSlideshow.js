// minHeight overrides maxHeight. So reading maxHeight from css and adjusting minHeight to expand container

let margin = 0;
let minHeight = 0; // set and retrieved from css
let thumbSize = 0; // set and retrieved from css
let thumbs, thumbEls, nextBtn, prevBtn, mainImg;

document.addEventListener('turbolinks:load', () => {
	thumbs = document.querySelector('.product-thumbnails');

	if (thumbs) {
		thumbEls = thumbs.querySelectorAll('.product-thumbnail');
		nextBtn = document.getElementById('product-thumbnails-next');
		prevBtn = document.getElementById('product-thumbnails-prev');
		mainImg = document.getElementById('product-image-main');

		updateSizes();

		if (thumbEls.length > minHeight / thumbSize) {
			nextBtn.classList.remove('is-invisible')
		}

		// Check sizes on resize
		window.addEventListener("resize", function() {
			updateSizes();
		})
	}
});

// Updated sizes from css
function updateSizes() {
	const newMinHeight = parseInt(getComputedStyle(thumbs).maxHeight);
	const newThumbSize = parseInt(getComputedStyle(thumbEls[0]).height)

	// If thumbSize changes
	if (newThumbSize != thumbSize) {
		if (margin) {
			margin = margin / thumbSize * newThumbSize
			thumbs.style.marginTop = `${margin}px`
		}

		thumbSize = newThumbSize;
	}

	// If maxHeight changes
	if (newMinHeight != minHeight + margin) {
		if (newMinHeight >= thumbEls.length * thumbSize) {
			// All thumbnails fit!
			margin = 0;
			minHeight = newMinHeight;
			thumbs.style.marginTop = 0;
			thumbs.style.minHeight = minHeight;
			nextBtn.classList.add('is-invisible');
			prevBtn.classList.add('is-invisible');
		} else {
			minHeight = newMinHeight - margin
			thumbs.style.minHeight = `${minHeight}px`;

			// If container overflow bottom, add to margin to push down another thumbnail
			if (minHeight > thumbEls.length * thumbSize) {
				margin += thumbSize;
				thumbs.style.marginTop = `${margin}px`;
			}

			// If last thumbnails visible, remove nextBtn
			if (thumbEls.length <= minHeight / thumbSize) {
				nextBtn.classList.add('is-invisible')
			} else {
				nextBtn.classList.remove('is-invisible')
			}
		}
	}
}

$(document).on('click', '.product-thumbnail-image', function(e) {
	const clickedImgId = e.target.src.split('/').pop();
	const mainImgSrc = mainImg.src.split('/')
	mainImgSrc.pop()
	mainImg.src = `${mainImgSrc.join('/')}/${clickedImgId}`
})

$(document).on('click', '#product-thumbnails-next', function(e) {

	prevBtn.classList.remove('is-invisible')

	thumbs.style.marginTop = `${margin - thumbSize}px`;
	thumbs.style.minHeight = `${minHeight + thumbSize}px`;
	margin -= thumbSize;
	minHeight += thumbSize;

	if (thumbEls.length <= minHeight / thumbSize) {
		e.target.classList.add('is-invisible')
	}
})

$(document).on('click', '#product-thumbnails-prev', function(e) {
	nextBtn.classList.remove('is-invisible')

	thumbs.style.marginTop = `${margin + thumbSize}px`;
	thumbs.style.minHeight = `${minHeight - thumbSize}px`;
	margin += thumbSize;
	minHeight -= thumbSize;

	if (margin >= 0) {
		prevBtn.classList.add('is-invisible')
	}
})
