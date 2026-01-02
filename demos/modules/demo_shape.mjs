/**
 * NAME: demo_shapes.mjs
 * AUTH: Brent Ely (https://github.com/gitbrent/)
 * DESC: Common test/demo slides for all library features
 * DEPS: Used by various demos (./demos/browser, ./demos/node, etc.)
 * VER.: 3.5.0
 * BLD.: 20210401
 */

/**
 * CUSTOM GEOMETRY:
 * @see https://github.com/gitbrent/PptxGenJS/pull/872
 * Notes from the author [apresmoi](https://github.com/apresmoi):
 * I've implemented this by using a similar spec to the one used by `svg-points`.
 * The path or contour of the custom geometry is declared under the property points of the ShapeProps object.
 * With this implementation we are supporting all the custom geometry rules: moveTo, lnTo, arcTo, cubicBezTo, quadBezTo and close.
 *
 * A translation of an svg path to a custom geometry could be achieved by using the svg-points package and adding a custom translation between the arcs.
 * The svg arc is described by the variables x, y, rx, ry, xAxisRotation, largeArcFlag and sweepFlag.
 * On the other side the pptx freeform arc is described by x, y, hR, wR, stAng, swAng.
 * In order to add some sort of translation between svg-path and a custom geometry points array we should create a translation between those two representations of the arc.
 */

import { BASE_TABLE_OPTS, BASE_TEXT_OPTS_L, BASE_TEXT_OPTS_R } from "./enums.mjs";

export function genSlides_Shape(pptx) {
	pptx.addSection({ title: "Shapes" });

	genSlide01(pptx);
	genSlide02(pptx);
	genSlide03(pptx);
}

/**
 * SLIDE 1: Misc Shape Types (no text)
 * @param {PptxGenJS} pptx
 */
function genSlide01(pptx) {
	let slide = pptx.addSlide({ sectionTitle: "Shapes" });

	slide.addTable([[{ text: "Shape Examples 1: Misc Shape Types (no text)", options: BASE_TEXT_OPTS_L }, BASE_TEXT_OPTS_R]], BASE_TABLE_OPTS);
	slide.addNotes("API Docs: https://gitbrent.github.io/PptxGenJS/docs/api-shapes.html");

	// TOP-ROW

	slide.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 0.8, w: 1.5, h: 3.0, fill: { color: pptx.colors.ACCENT1 }, line: { type: "none" } });
	slide.addShape(pptx.shapes.OVAL, { x: 2.2, y: 0.8, w: 3.0, h: 1.5, fill: { type: "solid", color: pptx.colors.ACCENT2 } });
	slide.addShape(pptx.shapes.CUSTOM_GEOMETRY, {
		x: 2.5,
		y: 2.6,
		w: 2.0,
		h: 1.0,
		fill: { color: pptx.colors.ACCENT3 },
		line: { color: "151515", width: 1 },
		points: [
			{ x: 0.0, y: 0.0 },
			{ x: 0.5, y: 1.0 },
			{ x: 1.0, y: 0.8 },
			{ x: 1.5, y: 1.0 },
			{ x: 2.0, y: 0.0 },
			{ x: 0.0, y: 0.0, curve: { type: "quadratic", x1: 1.0, y1: 0.5 } },
			{ close: true },
		],
	});
	slide.addShape(pptx.shapes.RECTANGLE, { x: 5.7, y: 0.8, w: 1.5, h: 3.0, fill: { color: pptx.colors.ACCENT4 }, rotate: 45 });
	slide.addShape(pptx.shapes.OVAL, { x: 7.4, y: 1.5, w: 3.0, h: 1.5, fill: { color: pptx.colors.ACCENT6 }, rotate: 90 }); // TEST: no type
	slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
		x: 10,
		y: 0.8,
		w: 3.0,
		h: 1.5,
		rectRadius: 1,
		fill: { color: pptx.colors.ACCENT5 },
		line: "151515",
		lineSize: 1,
	}); // TEST: DEPRECATED: `fill`,`line`,`lineSize`
	slide.addShape(pptx.shapes.ARC, { x: 10.75, y: 2.45, w: 1.5, h: 1.45, fill: { color: pptx.colors.ACCENT3 }, angleRange: [45, 315] });

	// BOTTOM ROW

	slide.addShape(pptx.shapes.LINE, { x: 4.2, y: 4.4, w: 5.0, h: 0.0, line: { color: pptx.colors.ACCENT2, width: 1, dashType: "lgDash" } });
	slide.addShape(pptx.shapes.LINE, {
		x: 4.2,
		y: 4.8,
		w: 5.0,
		h: 0.0,
		line: { color: pptx.colors.ACCENT2, width: 2, dashType: "dashDot" },
		lineHead: "arrow",
	}); // TEST: DEPRECATED: lineHead
	slide.addShape(pptx.shapes.LINE, { x: 4.2, y: 5.2, w: 5.0, h: 0.0, line: { color: pptx.colors.ACCENT2, width: 3, endArrowType: "triangle" } });
	slide.addShape(pptx.shapes.LINE, {
		x: 4.2,
		y: 5.6,
		w: 5.0,
		h: 0.0,
		line: { color: pptx.colors.ACCENT2, width: 4, beginArrowType: "diamond", endArrowType: "oval" },
	});

	slide.addShape(pptx.shapes.RIGHT_TRIANGLE, {
		x: 0.4,
		y: 4.3,
		w: 5.0,
		h: 3.0,
		fill: { color: pptx.colors.ACCENT5 },
		line: { color: pptx.colors.ACCENT1, width: 3 },
		shapeName: "First Right Triangle",
	});
	slide.addShape(pptx.shapes.RIGHT_TRIANGLE, {
		x: 8.0,
		y: 4.3,
		w: 5.0,
		h: 3.0,
		fill: { color: pptx.colors.ACCENT5 },
		line: { color: pptx.colors.ACCENT1, width: 2 },
		flipH: true,
	});
	slide.addShape(pptx.shapes.RECTANGLE, {
		x: 5.1,
		y: 6,
		w: 3.0,
		h: 1,
		fill: {
			type: "linearGradient",
			stops: [
				{ position: 0, color: '000000', transparency: 10 },
				{ position: 100, color: '333333', transparency: 50 },
			],
			angle: 45,
			scaled: 1,
		},
	});
}

/**
 * SLIDE 2: Misc Shape Types with Text
 * @param {PptxGenJS} pptx
 */
function genSlide02(pptx) {
	let slide = pptx.addSlide({ sectionTitle: "Shapes" });

	slide.addTable([[{ text: "Shape Examples 2: Misc Shape Types (with text)", options: BASE_TEXT_OPTS_L }, BASE_TEXT_OPTS_R]], BASE_TABLE_OPTS);
	slide.addNotes("API Docs: https://gitbrent.github.io/PptxGenJS/docs/api-shapes.html");

	slide.addText("RECTANGLE", {
		shape: pptx.shapes.RECTANGLE,
		x: 0.5,
		y: 0.8,
		w: 1.5,
		h: 3.0,
		fill: { color: pptx.colors.ACCENT1 },
		align: "center",
		fontSize: 14,
	});
	slide.addText("OVAL (transparency:50)", {
		shape: pptx.shapes.OVAL,
		x: 2.2,
		y: 0.8,
		w: 3.0,
		h: 1.5,
		fill: { type: "solid", color: pptx.colors.ACCENT2, transparency: 50 },
		align: "center",
		fontSize: 14,
	});
	slide.addText("CUSTOM", {
		shape: pptx.shapes.CUSTOM_GEOMETRY,
		x: 2.5,
		y: 2.6,
		w: 2.0,
		h: 1.0,
		fill: { color: pptx.colors.ACCENT3 },
		line: { color: "151515", width: 1 },
		points: [
			{ x: 0.0, y: 0.0 },
			{ x: 0.5, y: 1.0 },
			{ x: 1.0, y: 0.8 },
			{ x: 1.5, y: 1.0 },
			{ x: 2.0, y: 0.0 },
			{ x: 0.0, y: 0.0, curve: { type: "quadratic", x1: 1.0, y1: 0.5 } },
			{ close: true },
		],
		align: "center",
		fontSize: 14,
	});
	slide.addText("RECTANGLE (rotate:45)", {
		shape: pptx.shapes.RECTANGLE,
		x: 5.7,
		y: 0.8,
		w: 1.5,
		h: 3.0,
		fill: { color: pptx.colors.ACCENT4 },
		rotate: 45,
		align: "center",
		fontSize: 14,
	});
	// TEST: DEPRECATED: `alpha`
	slide.addText("OVAL (rotate:90, transparency:75)", {
		shape: pptx.shapes.OVAL,
		x: 7.4,
		y: 1.5,
		w: 3.0,
		h: 1.5,
		fill: { type: "solid", color: pptx.colors.ACCENT6, alpha: 75 },
		rotate: 90,
		align: "center",
		fontSize: 14,
	});
	slide.addText("ROUNDED-RECTANGLE\ndashType:dash\nrectRadius:1", {
		shape: pptx.shapes.ROUNDED_RECTANGLE,
		x: 10,
		y: 0.8,
		w: 3.0,
		h: 1.5,
		fill: { color: pptx.colors.ACCENT5 },
		align: "center",
		fontSize: 14,
		line: { color: "151515", size: 1, dashType: "dash" },
		rectRadius: 1,
	});
	slide.addText("ARC", {
		shape: pptx.shapes.ARC,
		x: 10.75,
		y: 2.45,
		w: 1.5,
		h: 1.45,
		fill: { color: pptx.colors.ACCENT3 },
		angleRange: [45, 315],
		line: { color: "151515", width: 1 },
		fontSize: 14,
	});
	//
	slide.addText("LINE size=1", {
		shape: pptx.shapes.LINE,
		align: "center",
		x: 4.15,
		y: 4.4,
		w: 5,
		h: 0,
		line: { color: pptx.colors.ACCENT2, width: 1, dashType: "lgDash" },
	});
	slide.addText("LINE size=2", {
		shape: pptx.shapes.LINE,
		align: "left",
		x: 4.15,
		y: 4.8,
		w: 5,
		h: 0,
		line: { color: pptx.colors.ACCENT2, width: 2, dashType: "dashDot", endArrowType: "arrow" },
	});
	slide.addText("LINE size=3", {
		shape: pptx.shapes.LINE,
		align: "right",
		x: 4.15,
		y: 5.2,
		w: 5,
		h: 0,
		line: { color: pptx.colors.ACCENT2, width: 3, beginArrowType: "triangle" },
	});
	slide.addText("LINE size=4", {
		shape: pptx.shapes.LINE,
		x: 4.15,
		y: 5.6,
		w: 5,
		h: 0,
		line: { color: pptx.colors.ACCENT2, width: 4, beginArrowType: "diamond", endArrowType: "oval", transparency: 50 },
	});
	//
	slide.addText("RIGHT-TRIANGLE", {
		shape: pptx.shapes.RIGHT_TRIANGLE,
		align: "center",
		x: 0.4,
		y: 4.3,
		w: 5,
		h: 3,
		fill: { color: pptx.colors.ACCENT5 },
		line: { color: "696969", width: 3 },
	});
	slide.addText("HYPERLINK-SHAPE", {
		shape: pptx.shapes.RIGHT_TRIANGLE,
		align: "center",
		x: 8.0,
		y: 4.3,
		w: 5,
		h: 3,
		fill: { color: pptx.colors.ACCENT5 },
		line: { color: "696969", width: 2 },
		flipH: true,
		hyperlink: { url: "https://github.com/gitbrent/pptxgenjs", tooltip: "Visit Homepage" },
	});
	slide.addText("LINEAR GRADIENT", {
		shape: pptx.shapes.RECTANGLE,
		align: "center",
		x: 5.1,
		y: 6,
		w: 3.0,
		h: 1,
		fill: {
			type: "linearGradient",
			stops: [
				{ position: 0, color: '000000', transparency: 10 },
				{ position: 100, color: '333333', transparency: 50 },
			],
			angle: 45,
			scaled: 1,
		},
	});
}

/**
 * SLIDE 3: Gradient Fill Examples
 * @param {PptxGenJS} pptx
 */
function genSlide03(pptx) {
	let slide = pptx.addSlide({ sectionTitle: "Shapes" });

	slide.addTable([[{ text: "Shape Examples 3: Gradient Fills (Linear & Path/Radial)", options: BASE_TEXT_OPTS_L }, BASE_TEXT_OPTS_R]], BASE_TABLE_OPTS);
	slide.addNotes("API Docs: https://gitbrent.github.io/PptxGenJS/docs/api-shapes.html");

	// ROW 1: Linear Gradients with different angles

	// Linear gradient 0 degrees (left to right)
	slide.addText("Linear 0°", {
		shape: pptx.shapes.RECTANGLE,
		x: 0.5,
		y: 0.8,
		w: 2.0,
		h: 1.5,
		fill: {
			type: "linearGradient",
			stops: [
				{ position: 0, color: "FF6B6B" },
				{ position: 100, color: "4ECDC4" },
			],
			angle: 0,
		},
		align: "center",
		fontSize: 12,
		color: "FFFFFF",
	});

	// Linear gradient 45 degrees
	slide.addText("Linear 45°", {
		shape: pptx.shapes.RECTANGLE,
		x: 2.7,
		y: 0.8,
		w: 2.0,
		h: 1.5,
		fill: {
			type: "linearGradient",
			stops: [
				{ position: 0, color: "667EEA" },
				{ position: 100, color: "764BA2" },
			],
			angle: 45,
		},
		align: "center",
		fontSize: 12,
		color: "FFFFFF",
	});

	// Linear gradient 90 degrees (top to bottom)
	slide.addText("Linear 90°", {
		shape: pptx.shapes.RECTANGLE,
		x: 4.9,
		y: 0.8,
		w: 2.0,
		h: 1.5,
		fill: {
			type: "linearGradient",
			stops: [
				{ position: 0, color: "F093FB" },
				{ position: 100, color: "F5576C" },
			],
			angle: 90,
		},
		align: "center",
		fontSize: 12,
		color: "FFFFFF",
	});

	// Linear gradient with 3 stops
	slide.addText("3-Stop Gradient", {
		shape: pptx.shapes.RECTANGLE,
		x: 7.1,
		y: 0.8,
		w: 2.0,
		h: 1.5,
		fill: {
			type: "linearGradient",
			stops: [
				{ position: 0, color: "FF0000" },
				{ position: 50, color: "00FF00" },
				{ position: 100, color: "0000FF" },
			],
			angle: 0,
		},
		align: "center",
		fontSize: 12,
		color: "FFFFFF",
	});

	// Linear gradient with transparency
	slide.addText("With Transparency", {
		shape: pptx.shapes.RECTANGLE,
		x: 9.3,
		y: 0.8,
		w: 2.0,
		h: 1.5,
		fill: {
			type: "linearGradient",
			stops: [
				{ position: 0, color: "1A1A2E", transparency: 0 },
				{ position: 100, color: "16213E", transparency: 50 },
			],
			angle: 135,
		},
		align: "center",
		fontSize: 12,
		color: "FFFFFF",
	});

	// Oval with linear gradient
	slide.addText("Oval Gradient", {
		shape: pptx.shapes.OVAL,
		x: 11.5,
		y: 0.8,
		w: 1.8,
		h: 1.5,
		fill: {
			type: "linearGradient",
			stops: [
				{ position: 0, color: "11998E" },
				{ position: 100, color: "38EF7D" },
			],
			angle: 180,
		},
		align: "center",
		fontSize: 11,
		color: "FFFFFF",
	});

	// ROW 2: Path/Radial Gradients

	// Path gradient - circle (default)
	slide.addText("Path: Circle", {
		shape: pptx.shapes.RECTANGLE,
		x: 0.5,
		y: 2.6,
		w: 2.0,
		h: 1.5,
		fill: {
			type: "pathGradient",
			stops: [
				{ position: 0, color: "FFFFFF" },
				{ position: 100, color: "667EEA" },
			],
			path: "circle",
		},
		align: "center",
		fontSize: 12,
	});

	// Path gradient - rect
	slide.addText("Path: Rect", {
		shape: pptx.shapes.RECTANGLE,
		x: 2.7,
		y: 2.6,
		w: 2.0,
		h: 1.5,
		fill: {
			type: "pathGradient",
			stops: [
				{ position: 0, color: "FFFFFF" },
				{ position: 100, color: "F093FB" },
			],
			path: "rect",
		},
		align: "center",
		fontSize: 12,
	});

	// Path gradient - shape
	slide.addText("Path: Shape", {
		shape: pptx.shapes.OVAL,
		x: 4.9,
		y: 2.6,
		w: 2.0,
		h: 1.5,
		fill: {
			type: "pathGradient",
			stops: [
				{ position: 0, color: "FFFFFF" },
				{ position: 100, color: "FF6B6B" },
			],
			path: "shape",
		},
		align: "center",
		fontSize: 12,
	});

	// Path gradient with custom fillToRect (off-center)
	slide.addText("Off-Center", {
		shape: pptx.shapes.RECTANGLE,
		x: 7.1,
		y: 2.6,
		w: 2.0,
		h: 1.5,
		fill: {
			type: "pathGradient",
			stops: [
				{ position: 0, color: "FFFFFF" },
				{ position: 100, color: "4ECDC4" },
			],
			path: "circle",
			fillToRect: { l: 25, t: 25, r: 75, b: 75 },
		},
		align: "center",
		fontSize: 12,
	});

	// Path gradient with transparency
	slide.addText("Path Transparent", {
		shape: pptx.shapes.RECTANGLE,
		x: 9.3,
		y: 2.6,
		w: 2.0,
		h: 1.5,
		fill: {
			type: "pathGradient",
			stops: [
				{ position: 0, color: "FFFFFF", transparency: 0 },
				{ position: 100, color: "764BA2", transparency: 30 },
			],
			path: "circle",
		},
		align: "center",
		fontSize: 12,
	});

	// Rounded rectangle with path gradient
	slide.addText("Rounded Path", {
		shape: pptx.shapes.ROUNDED_RECTANGLE,
		x: 11.5,
		y: 2.6,
		w: 1.8,
		h: 1.5,
		rectRadius: 0.3,
		fill: {
			type: "pathGradient",
			stops: [
				{ position: 0, color: "FFFFFF" },
				{ position: 100, color: "11998E" },
			],
			path: "circle",
		},
		align: "center",
		fontSize: 11,
	});

	// ROW 3: Text with Gradient Colors

	// Text with linear gradient
	slide.addText("Gradient Text (Linear)", {
		x: 0.5,
		y: 4.4,
		w: 4.0,
		h: 0.8,
		fontSize: 24,
		bold: true,
		color: {
			type: "linearGradient",
			stops: [
				{ position: 0, color: "FF6B6B" },
				{ position: 100, color: "4ECDC4" },
			],
			angle: 0,
		},
	});

	// Text with path gradient
	slide.addText("Gradient Text (Path)", {
		x: 4.7,
		y: 4.4,
		w: 4.0,
		h: 0.8,
		fontSize: 24,
		bold: true,
		color: {
			type: "pathGradient",
			stops: [
				{ position: 0, color: "FFFFFF" },
				{ position: 100, color: "667EEA" },
			],
			path: "circle",
		},
	});

	// Text with 3-color gradient
	slide.addText("Rainbow Text", {
		x: 8.9,
		y: 4.4,
		w: 4.5,
		h: 0.8,
		fontSize: 24,
		bold: true,
		color: {
			type: "linearGradient",
			stops: [
				{ position: 0, color: "FF0000" },
				{ position: 50, color: "00FF00" },
				{ position: 100, color: "0000FF" },
			],
			angle: 0,
		},
	});

	// ROW 4: More gradient examples

	// Shape with gradient fill and solid text
	slide.addText("Shape with gradient,\nsolid text color", {
		shape: pptx.shapes.RECTANGLE,
		x: 0.5,
		y: 5.4,
		w: 3.5,
		h: 1.5,
		fill: {
			type: "linearGradient",
			stops: [
				{ position: 0, color: "2C3E50" },
				{ position: 100, color: "3498DB" },
			],
			angle: 45,
		},
		align: "center",
		fontSize: 14,
		color: "FFFFFF",
	});

	// Triangle with gradient
	slide.addText("Triangle", {
		shape: pptx.shapes.RIGHT_TRIANGLE,
		x: 4.2,
		y: 5.4,
		w: 2.5,
		h: 1.5,
		fill: {
			type: "linearGradient",
			stops: [
				{ position: 0, color: "E74C3C" },
				{ position: 100, color: "9B59B6" },
			],
			angle: 45,
		},
		align: "center",
		fontSize: 12,
		color: "FFFFFF",
	});

	// Pentagon with path gradient
	slide.addShape(pptx.shapes.PENTAGON, {
		x: 7.0,
		y: 5.4,
		w: 2.0,
		h: 1.5,
		fill: {
			type: "pathGradient",
			stops: [
				{ position: 0, color: "FFFFFF" },
				{ position: 100, color: "1ABC9C" },
			],
			path: "shape",
		},
	});

	// Diamond with linear gradient
	slide.addShape(pptx.shapes.DIAMOND, {
		x: 9.3,
		y: 5.3,
		w: 1.6,
		h: 1.6,
		fill: {
			type: "linearGradient",
			stops: [
				{ position: 0, color: "F39C12" },
				{ position: 100, color: "E74C3C" },
			],
			angle: 135,
		},
	});

	// Hexagon with path gradient
	slide.addShape(pptx.shapes.HEXAGON, {
		x: 11.2,
		y: 5.4,
		w: 2.0,
		h: 1.5,
		fill: {
			type: "pathGradient",
			stops: [
				{ position: 0, color: "ECF0F1" },
				{ position: 100, color: "34495E" },
			],
			path: "circle",
			fillToRect: { l: 50, t: 50, r: 50, b: 50 },
		},
	});
}
