function encodeSVG (data) {
	data = data.replace(/"/g, '\'');
	data = data.replace(/>\s{1,}</g, '><');
	data = data.replace(/\s{2,}/g, ' ');

	// Using encodeURIComponent() as replacement function
	// allows to keep result code readable
	return data.replace(/[\r\n%#()<>?[\\\]^`{|}]/g, encodeURIComponent);
}

export const flagBE = encodeSVG(`
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 23.0.3, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 328.82 243.78" style="enable-background:new 0 0 328.82 243.78;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#FAE042;}
	.st1{fill:#ED2939;}
</style>
<rect x="112.44" y="0" class="st0" width="103.94" height="243.78"/>
<rect x="216.38" y="0" class="st1" width="112.44" height="243.78"/>
<rect y="0" width="112.44" height="243.78"/>
</svg>
`);
