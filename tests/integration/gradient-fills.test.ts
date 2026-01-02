import { describe, it, expect, beforeEach } from 'vitest'
import PptxGenJS from '../../src/pptxgen'
import type { TableRow } from '../../src/core-interfaces'

describe('Gradient Fills Integration', () => {
	let pptx: InstanceType<typeof PptxGenJS>

	beforeEach(() => {
		pptx = new PptxGenJS()
	})

	describe('Shape fills', () => {
		it('should create a shape with linear gradient fill', () => {
			const slide = pptx.addSlide()

			// Should not throw
			expect(() => {
				slide.addShape('rect', {
					x: 1,
					y: 1,
					w: 3,
					h: 2,
					fill: {
						type: 'linearGradient',
						stops: [
							{ position: 0, color: 'FF0000' },
							{ position: 100, color: '0000FF' },
						],
						angle: 45,
					},
				})
			}).not.toThrow()
		})

		it('should create a shape with path gradient fill', () => {
			const slide = pptx.addSlide()

			expect(() => {
				slide.addShape('rect', {
					x: 1,
					y: 1,
					w: 3,
					h: 2,
					fill: {
						type: 'pathGradient',
						stops: [
							{ position: 0, color: 'FFFFFF' },
							{ position: 100, color: '000000' },
						],
						path: 'circle',
					},
				})
			}).not.toThrow()
		})

		it('should create a shape with path gradient and custom fillToRect', () => {
			const slide = pptx.addSlide()

			expect(() => {
				slide.addShape('rect', {
					x: 1,
					y: 1,
					w: 3,
					h: 2,
					fill: {
						type: 'pathGradient',
						stops: [
							{ position: 0, color: 'FFFFFF' },
							{ position: 100, color: '000000' },
						],
						path: 'circle',
						fillToRect: { l: 25, t: 25, r: 75, b: 75 },
					},
				})
			}).not.toThrow()
		})

		it('should create a shape with gradient transparency', () => {
			const slide = pptx.addSlide()

			expect(() => {
				slide.addShape('rect', {
					x: 1,
					y: 1,
					w: 3,
					h: 2,
					fill: {
						type: 'linearGradient',
						stops: [
							{ position: 0, color: 'FF0000', transparency: 0 },
							{ position: 100, color: '0000FF', transparency: 50 },
						],
						angle: 90,
					},
				})
			}).not.toThrow()
		})

		it('should create an oval with path gradient', () => {
			const slide = pptx.addSlide()

			expect(() => {
				slide.addShape('ellipse', {
					x: 1,
					y: 1,
					w: 3,
					h: 2,
					fill: {
						type: 'pathGradient',
						stops: [
							{ position: 0, color: 'FFFFFF' },
							{ position: 100, color: '667EEA' },
						],
						path: 'shape',
					},
				})
			}).not.toThrow()
		})
	})

	describe('Text fills', () => {
		it('should create text with linear gradient color', () => {
			const slide = pptx.addSlide()

			expect(() => {
				slide.addText('Gradient Text', {
					x: 1,
					y: 1,
					w: 5,
					h: 1,
					fontSize: 24,
					color: {
						type: 'linearGradient',
						stops: [
							{ position: 0, color: '20A7E0' },
							{ position: 26, color: '00FFEB' },
							{ position: 40, color: '93FFA2' },
							{ position: 57, color: 'FFD769' },
							{ position: 70, color: 'FF9B3E' },
							{ position: 89, color: 'FF9143' },
						],
						angle: 0,
					},
				})
			}).not.toThrow()
		})

		it('should create text with path gradient color', () => {
			const slide = pptx.addSlide()

			expect(() => {
				slide.addText('Gradient Text', {
					x: 1,
					y: 1,
					w: 5,
					h: 1,
					fontSize: 24,
					color: {
						type: 'pathGradient',
						stops: [
							{ position: 0, color: 'FFFFFF' },
							{ position: 100, color: '000000' },
						],
						path: 'circle',
					},
				})
			}).not.toThrow()
		})

		it('should create text with multi-stop gradient', () => {
			const slide = pptx.addSlide()

			expect(() => {
				slide.addText('Rainbow Text', {
					x: 1,
					y: 1,
					w: 5,
					h: 1,
					fontSize: 24,
					color: {
						type: 'linearGradient',
						stops: [
							{ position: 0, color: 'FF0000' },
							{ position: 50, color: '00FF00' },
							{ position: 100, color: '0000FF' },
						],
						angle: 0,
					},
				})
			}).not.toThrow()
		})
	})

	describe('Slide backgrounds', () => {
		it('should create a slide with linear gradient background', () => {
			expect(() => {
				const slide = pptx.addSlide()
				slide.background = {
					type: 'linearGradient',
					stops: [
						{ position: 0, color: '000000' },
						{ position: 100, color: '333333' },
					],
					angle: 90,
				}
			}).not.toThrow()
		})

		it('should create a slide with path gradient background', () => {
			expect(() => {
				const slide = pptx.addSlide()
				slide.background = {
					type: 'pathGradient',
					stops: [
						{ position: 0, color: 'FFFFFF' },
						{ position: 100, color: '000000' },
					],
					path: 'circle',
				}
			}).not.toThrow()
		})
	})

	describe('Table cells', () => {
		it('should create a table with gradient cell fill', () => {
			const slide = pptx.addSlide()

			expect(() => {
				slide.addTable(
					[
						[
							{
								text: 'Gradient Cell',
								options: {
									fill: {
										type: 'linearGradient',
										stops: [
											{ position: 0, color: 'FF0000' },
											{ position: 100, color: '0000FF' },
										],
										angle: 45,
									},
								},
							},
						],
					] as TableRow[],
					{ x: 1, y: 1, w: 5 }
				)
			}).not.toThrow()
		})
	})

	describe('Edge cases', () => {
		it('should handle empty stops array', () => {
			const slide = pptx.addSlide()

			expect(() => {
				slide.addShape('rect', {
					x: 1,
					y: 1,
					w: 3,
					h: 2,
					fill: {
						type: 'linearGradient',
						stops: [],
					},
				})
			}).not.toThrow()
		})

		it('should handle single stop', () => {
			const slide = pptx.addSlide()

			expect(() => {
				slide.addShape('rect', {
					x: 1,
					y: 1,
					w: 3,
					h: 2,
					fill: {
						type: 'linearGradient',
						stops: [{ position: 50, color: 'FF0000' }],
					},
				})
			}).not.toThrow()
		})

		it('should handle gradient with flip option', () => {
			const slide = pptx.addSlide()

			expect(() => {
				slide.addShape('rect', {
					x: 1,
					y: 1,
					w: 3,
					h: 2,
					fill: {
						type: 'linearGradient',
						stops: [
							{ position: 0, color: 'FF0000' },
							{ position: 100, color: '0000FF' },
						],
						flip: 'xy',
					},
				})
			}).not.toThrow()
		})

		it('should handle gradient with rotWithShape false', () => {
			const slide = pptx.addSlide()

			expect(() => {
				slide.addShape('rect', {
					x: 1,
					y: 1,
					w: 3,
					h: 2,
					fill: {
						type: 'linearGradient',
						stops: [
							{ position: 0, color: 'FF0000' },
							{ position: 100, color: '0000FF' },
						],
						rotWithShape: false,
					},
				})
			}).not.toThrow()
		})
	})

	describe('Presentation export', () => {
		it('should export presentation with gradient shapes', async () => {
			const slide = pptx.addSlide()

			slide.addShape('rect', {
				x: 1,
				y: 1,
				w: 3,
				h: 2,
				fill: {
					type: 'linearGradient',
					stops: [
						{ position: 0, color: 'FF0000' },
						{ position: 100, color: '0000FF' },
					],
					angle: 45,
				},
			})

			slide.addText('Gradient Text', {
				x: 1,
				y: 4,
				w: 5,
				h: 1,
				fontSize: 24,
				color: {
					type: 'linearGradient',
					stops: [
						{ position: 0, color: 'FF0000' },
						{ position: 100, color: '0000FF' },
					],
				},
			})

			// Export as base64 to verify the presentation can be generated
			const result = await pptx.write({ outputType: 'base64' })
			expect(result).toBeDefined()
			expect(typeof result).toBe('string')
			expect((result as string).length).toBeGreaterThan(0)
		})

		it('should export presentation with path gradient shapes', async () => {
			const slide = pptx.addSlide()

			slide.addShape('rect', {
				x: 1,
				y: 1,
				w: 3,
				h: 2,
				fill: {
					type: 'pathGradient',
					stops: [
						{ position: 0, color: 'FFFFFF' },
						{ position: 100, color: '000000' },
					],
					path: 'circle',
					fillToRect: { l: 50, t: 50, r: 50, b: 50 },
				},
			})

			const result = await pptx.write({ outputType: 'base64' })
			expect(result).toBeDefined()
			expect(typeof result).toBe('string')
		})
	})
})

