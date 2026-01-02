/**
 * NAME: demo_theme.mjs
 * AUTH: PptxGenJS Contributors
 * DESC: Demo slides for theme color palette feature
 * DEPS: Used by various demos (./demos/browser, ./demos/node, etc.)
 * VER.: 4.0.0
 * BLD.: 20260102
 */

export function genSlides_Theme(pptx) {
	pptx.addSection({ title: "Theme Colors" });

	genSlide01(pptx);
	genSlide02(pptx);
	genSlide03(pptx);
}

/**
 * SLIDE 1: Theme Color Overview - Shows all theme colors in action
 * @param {PptxGenJS} pptx
 */
function genSlide01(pptx) {
	const slide = pptx.addSlide({ sectionTitle: "Theme Colors" });
	slide.addNotes(
		"This slide demonstrates theme colors.\n" +
		"Theme colors can be set via pptx.theme.colors = { ... }\n" +
		"API Docs: https://gitbrent.github.io/PptxGenJS/docs/usage-pres-options.html"
	);

	// Title
	slide.addText("Theme Color Palette Demo", {
		x: 0.5,
		y: 0.3,
		w: "90%",
		h: 0.6,
		fontSize: 28,
		bold: true,
		color: "tx1", // Uses theme dark1/text1 color
	});

	// Subtitle explaining the feature
	slide.addText(
		"Set custom theme colors via: pptx.theme = { colors: { accent1: 'FF0000', ... } }",
		{
			x: 0.5,
			y: 0.9,
			w: "90%",
			h: 0.4,
			fontSize: 14,
			color: "tx2", // Uses theme dark2/text2 color
		}
	);

	// Color swatches showing all 12 theme colors
	const colorSlots = [
		{ name: "Dark 1 (tx1)", schemeClr: "tx1", row: 0, col: 0 },
		{ name: "Light 1 (bg1)", schemeClr: "bg1", row: 0, col: 1 },
		{ name: "Dark 2 (tx2)", schemeClr: "tx2", row: 0, col: 2 },
		{ name: "Light 2 (bg2)", schemeClr: "bg2", row: 0, col: 3 },
		{ name: "Accent 1", schemeClr: "accent1", row: 1, col: 0 },
		{ name: "Accent 2", schemeClr: "accent2", row: 1, col: 1 },
		{ name: "Accent 3", schemeClr: "accent3", row: 1, col: 2 },
		{ name: "Accent 4", schemeClr: "accent4", row: 1, col: 3 },
		{ name: "Accent 5", schemeClr: "accent5", row: 2, col: 0 },
		{ name: "Accent 6", schemeClr: "accent6", row: 2, col: 1 },
		{ name: "Hyperlink", schemeClr: "accent1", row: 2, col: 2, note: "(hlink)" },
		{ name: "Followed Hyperlink", schemeClr: "accent2", row: 2, col: 3, note: "(folHlink)" },
	];

	const startX = 0.5;
	const startY = 1.5;
	const boxW = 3;
	const boxH = 1.2;
	const gapX = 0.2;
	const gapY = 0.3;

	colorSlots.forEach(({ name, schemeClr, row, col, note }) => {
		const x = startX + col * (boxW + gapX);
		const y = startY + row * (boxH + gapY);

		// Color swatch box
		slide.addShape(pptx.ShapeType.rect, {
			x,
			y,
			w: boxW,
			h: boxH * 0.6,
			fill: { color: schemeClr },
			line: { color: "808080", width: 0.5 },
		});

		// Label
		slide.addText(name + (note ? ` ${note}` : ""), {
			x,
			y: y + boxH * 0.65,
			w: boxW,
			h: boxH * 0.35,
			fontSize: 10,
			align: "center",
			color: "tx1",
		});
	});
}

/**
 * SLIDE 2: Using scheme colors in text
 * @param {PptxGenJS} pptx
 */
function genSlide02(pptx) {
	const slide = pptx.addSlide({ sectionTitle: "Theme Colors" });
	slide.addNotes(
		"This slide shows how to use scheme colors in text.\n" +
		"Use color: 'tx1', 'accent1', etc. to reference theme colors."
	);

	slide.addText("Text with Theme Colors", {
		x: 0.5,
		y: 0.3,
		w: "90%",
		h: 0.6,
		fontSize: 28,
		bold: true,
		color: "tx1",
	});

	// Text examples with different theme colors
	const textExamples = [
		{ text: "This text uses tx1 (Dark 1 / Text 1)", color: "tx1" },
		{ text: "This text uses tx2 (Dark 2 / Text 2)", color: "tx2" },
		{ text: "This text uses accent1", color: "accent1" },
		{ text: "This text uses accent2", color: "accent2" },
		{ text: "This text uses accent3", color: "accent3" },
		{ text: "This text uses accent4", color: "accent4" },
		{ text: "This text uses accent5", color: "accent5" },
		{ text: "This text uses accent6", color: "accent6" },
	];

	textExamples.forEach((example, idx) => {
		slide.addText(example.text, {
			x: 0.5,
			y: 1.2 + idx * 0.5,
			w: "90%",
			h: 0.45,
			fontSize: 18,
			color: example.color,
		});
	});
}

/**
 * SLIDE 3: Shapes with theme colors
 * @param {PptxGenJS} pptx
 */
function genSlide03(pptx) {
	const slide = pptx.addSlide({ sectionTitle: "Theme Colors" });
	slide.addNotes(
		"This slide shows shapes using theme colors.\n" +
		"Shape fills can reference theme colors using the scheme color names."
	);

	slide.addText("Shapes with Theme Colors", {
		x: 0.5,
		y: 0.3,
		w: "90%",
		h: 0.6,
		fontSize: 28,
		bold: true,
		color: "tx1",
	});

	// Create a row of shapes with different accent colors
	const accents = ["accent1", "accent2", "accent3", "accent4", "accent5", "accent6"];
	const shapeW = 1.8;
	const startX = 0.7;
	const gap = 0.3;

	accents.forEach((accent, idx) => {
		// Rectangle
		slide.addShape(pptx.ShapeType.rect, {
			x: startX + idx * (shapeW + gap),
			y: 1.2,
			w: shapeW,
			h: 1.2,
			fill: { color: accent },
			line: { color: "tx1", width: 1 },
		});

		// Label
		slide.addText(accent, {
			x: startX + idx * (shapeW + gap),
			y: 2.5,
			w: shapeW,
			h: 0.3,
			fontSize: 11,
			align: "center",
			color: "tx2",
		});
	});

	// Additional shapes demonstrating theme colors
	slide.addText("Circles with transparency:", {
		x: 0.5,
		y: 3.2,
		w: 5,
		h: 0.4,
		fontSize: 14,
		color: "tx1",
	});

	accents.forEach((accent, idx) => {
		slide.addShape(pptx.ShapeType.ellipse, {
			x: startX + idx * (shapeW + gap) + 0.3,
			y: 3.7,
			w: 1.2,
			h: 1.2,
			fill: { color: accent, transparency: 40 },
		});
	});
}

/**
 * Create a presentation with custom theme colors
 * This function demonstrates how to set up custom theme colors
 * @param {PptxGenJS} pptx
 * @returns {PptxGenJS}
 */
export function setupCustomTheme(pptx) {
	// Example: Modern dark theme
	pptx.theme = {
		headFontFace: "Segoe UI",
		bodyFontFace: "Segoe UI Light",
		colors: {
			dark1: "1A1A2E",      // Deep navy - primary text
			light1: "EAEAEA",     // Off-white - primary background
			dark2: "16213E",      // Dark blue - secondary text
			light2: "E8E8E8",     // Light gray - secondary background
			accent1: "0F4C75",    // Deep blue
			accent2: "3282B8",    // Medium blue
			accent3: "BBE1FA",    // Light blue
			accent4: "FF6B6B",    // Coral red
			accent5: "4ECDC4",    // Teal
			accent6: "45B7D1",    // Sky blue
			hyperlink: "1E90FF",  // Dodger blue
			followedHyperlink: "9932CC", // Dark orchid
		},
	};

	return pptx;
}

/**
 * Create a presentation with vibrant theme colors
 * @param {PptxGenJS} pptx
 * @returns {PptxGenJS}
 */
export function setupVibrantTheme(pptx) {
	// Example: Vibrant colorful theme
	pptx.theme = {
		headFontFace: "Arial Black",
		bodyFontFace: "Arial",
		colors: {
			dark1: "2D3436",      // Charcoal
			light1: "FFFFFF",     // White
			dark2: "636E72",      // Gray
			light2: "DFE6E9",     // Light gray
			accent1: "E17055",    // Burnt sienna
			accent2: "00B894",    // Mint
			accent3: "FDCB6E",    // Mustard
			accent4: "E84393",    // Pink
			accent5: "6C5CE7",    // Purple
			accent6: "00CEC9",    // Cyan
			hyperlink: "0984E3",  // Blue
			followedHyperlink: "A29BFE", // Light purple
		},
	};

	return pptx;
}

