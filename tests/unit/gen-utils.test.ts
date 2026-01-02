import { describe, it, expect } from 'vitest'
import {
	getSmartParseNumber,
	getUuid,
	encodeXmlEntities,
	inch2Emu,
	valToPts,
	convertRotationDegrees,
	createColorElement,
	genXmlColorSelection,
	correctShadowOptions,
} from '../../src/gen-utils'
import { EMU, ONEPT, SchemeColor } from '../../src/core-enums'
import { PresLayout } from '../../src/core-interfaces'

describe('gen-utils', () => {
	describe('getSmartParseNumber', () => {
		const mockLayout = { width: 914400 * 10, height: 914400 * 7.5 } as PresLayout

		it('should convert small numbers as inches to EMU', () => {
			expect(getSmartParseNumber(1, 'X', mockLayout)).toBe(EMU)
			expect(getSmartParseNumber(2.5, 'X', mockLayout)).toBe(Math.round(EMU * 2.5))
		})

		it('should return large numbers as-is (assumed EMU)', () => {
			expect(getSmartParseNumber(914400, 'X', mockLayout)).toBe(914400)
		})

		it('should handle percentage values', () => {
			expect(getSmartParseNumber('50%', 'X', mockLayout)).toBe(Math.round(mockLayout.width * 0.5))
			expect(getSmartParseNumber('50%', 'Y', mockLayout)).toBe(Math.round(mockLayout.height * 0.5))
		})

		it('should convert string numbers', () => {
			expect(getSmartParseNumber(2, 'X', mockLayout)).toBe(Math.round(EMU * 2))
		})

		it('should return 0 for invalid values', () => {
			expect(getSmartParseNumber(undefined as unknown as number, 'X', mockLayout)).toBe(0)
		})
	})

	describe('getUuid', () => {
		it('should generate a valid UUID format', () => {
			const uuid = getUuid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
			expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
		})

		it('should generate unique UUIDs', () => {
			const uuid1 = getUuid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
			const uuid2 = getUuid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
			expect(uuid1).not.toBe(uuid2)
		})
	})

	describe('encodeXmlEntities', () => {
		it('should encode ampersand', () => {
			expect(encodeXmlEntities('A & B')).toBe('A &amp; B')
		})

		it('should encode less than', () => {
			expect(encodeXmlEntities('A < B')).toBe('A &lt; B')
		})

		it('should encode greater than', () => {
			expect(encodeXmlEntities('A > B')).toBe('A &gt; B')
		})

		it('should encode quotes', () => {
			expect(encodeXmlEntities('A "B" C')).toBe('A &quot;B&quot; C')
		})

		it('should encode apostrophes', () => {
			expect(encodeXmlEntities('A \'B\' C')).toBe('A &apos;B&apos; C')
		})

		it('should handle null/undefined', () => {
			expect(encodeXmlEntities(null as unknown as string)).toBe('')
			expect(encodeXmlEntities(undefined as unknown as string)).toBe('')
		})
	})

	describe('inch2Emu', () => {
		it('should convert inches to EMU', () => {
			expect(inch2Emu(1)).toBe(EMU)
			expect(inch2Emu(2.5)).toBe(Math.round(EMU * 2.5))
		})

		it('should return large numbers as-is', () => {
			expect(inch2Emu(914400)).toBe(914400)
		})

		it('should handle string input', () => {
			expect(inch2Emu('1')).toBe(EMU)
			expect(inch2Emu('2in')).toBe(Math.round(EMU * 2))
		})
	})

	describe('valToPts', () => {
		it('should convert to points', () => {
			expect(valToPts(12)).toBe(Math.round(12 * ONEPT))
		})

		it('should handle string input', () => {
			expect(valToPts('12')).toBe(Math.round(12 * ONEPT))
		})

		it('should return 0 for NaN', () => {
			expect(valToPts('abc')).toBe(0)
		})
	})

	describe('convertRotationDegrees', () => {
		it('should convert degrees to PowerPoint rotation', () => {
			expect(convertRotationDegrees(45)).toBe(45 * 60000)
			expect(convertRotationDegrees(90)).toBe(90 * 60000)
		})

		it('should handle 0 degrees', () => {
			expect(convertRotationDegrees(0)).toBe(0)
		})

		it('should handle values over 360', () => {
			expect(convertRotationDegrees(450)).toBe(90 * 60000)
		})
	})

	describe('createColorElement', () => {
		it('should create srgbClr for hex colors', () => {
			const result = createColorElement('FF0000')
			expect(result).toBe('<a:srgbClr val="FF0000"/>')
		})

		it('should create schemeClr for theme colors', () => {
			const result = createColorElement(SchemeColor.accent1)
			expect(result).toBe('<a:schemeClr val="accent1"/>')
		})

		it('should include inner elements', () => {
			const result = createColorElement('FF0000', '<a:alpha val="50000"/>')
			expect(result).toBe('<a:srgbClr val="FF0000"><a:alpha val="50000"/></a:srgbClr>')
		})

		it('should handle lowercase hex colors', () => {
			const result = createColorElement('ff0000')
			expect(result).toBe('<a:srgbClr val="FF0000"/>')
		})
	})

	describe('genXmlColorSelection', () => {
		describe('solid fills', () => {
			it('should generate solid fill from string color', () => {
				const result = genXmlColorSelection('FF0000')
				expect(result).toContain('<a:solidFill>')
				expect(result).toContain('val="FF0000"')
				expect(result).toContain('</a:solidFill>')
			})

			it('should generate solid fill from object', () => {
				const result = genXmlColorSelection({ color: 'FF0000' })
				expect(result).toContain('<a:solidFill>')
				expect(result).toContain('val="FF0000"')
			})

			it('should handle transparency', () => {
				const result = genXmlColorSelection({ color: 'FF0000', transparency: 50 })
				expect(result).toContain('<a:alpha val="50000"/>')
			})

			it('should return empty string for null/undefined', () => {
				expect(genXmlColorSelection(null as unknown as string)).toBe('')
				expect(genXmlColorSelection(undefined as unknown as string)).toBe('')
			})
		})

		describe('linear gradient fills', () => {
			it('should generate linear gradient fill', () => {
				const result = genXmlColorSelection({
					type: 'linearGradient',
					stops: [
						{ position: 0, color: 'FF0000' },
						{ position: 100, color: '0000FF' },
					],
					angle: 45,
				})

				expect(result).toContain('<a:gradFill')
				expect(result).toContain('rotWithShape="1"')
				expect(result).toContain('<a:gsLst>')
				expect(result).toContain('<a:gs pos="0">')
				expect(result).toContain('val="FF0000"')
				expect(result).toContain('<a:gs pos="100000">')
				expect(result).toContain('val="0000FF"')
				expect(result).toContain('<a:lin')
				expect(result).toContain('ang="2700000"') // 45 * 60000
				expect(result).toContain('</a:gradFill>')
			})

			it('should handle transparency in gradient stops', () => {
				const result = genXmlColorSelection({
					type: 'linearGradient',
					stops: [
						{ position: 0, color: 'FF0000', transparency: 50 },
						{ position: 100, color: '0000FF' },
					],
					angle: 0,
				})

				expect(result).toContain('<a:alpha val="50000"/>')
			})

			it('should handle rotWithShape false', () => {
				const result = genXmlColorSelection({
					type: 'linearGradient',
					stops: [
						{ position: 0, color: 'FF0000' },
						{ position: 100, color: '0000FF' },
					],
					rotWithShape: false,
				})

				expect(result).toContain('rotWithShape="0"')
			})

			it('should handle scaled option', () => {
				const result = genXmlColorSelection({
					type: 'linearGradient',
					stops: [
						{ position: 0, color: 'FF0000' },
						{ position: 100, color: '0000FF' },
					],
					angle: 45,
					scaled: true,
				})

				expect(result).toContain('scaled="1"')
			})

			it('should handle tileRect', () => {
				const result = genXmlColorSelection({
					type: 'linearGradient',
					stops: [
						{ position: 0, color: 'FF0000' },
						{ position: 100, color: '0000FF' },
					],
					tileRect: { t: 10, r: 20, b: 30, l: 40 },
				})

				expect(result).toContain('<a:tileRect')
				expect(result).toContain('t="10000"')
				expect(result).toContain('r="20000"')
				expect(result).toContain('b="30000"')
				expect(result).toContain('l="40000"')
			})
		})

		describe('path gradient fills', () => {
			it('should generate path gradient fill with circle path', () => {
				const result = genXmlColorSelection({
					type: 'pathGradient',
					stops: [
						{ position: 0, color: 'FFFFFF' },
						{ position: 100, color: '000000' },
					],
					path: 'circle',
				})

				expect(result).toContain('<a:gradFill')
				expect(result).toContain('<a:gsLst>')
				expect(result).toContain('<a:path path="circle">')
				expect(result).toContain('<a:fillToRect')
				expect(result).toContain('</a:gradFill>')
			})

			it('should generate path gradient with rect path', () => {
				const result = genXmlColorSelection({
					type: 'pathGradient',
					stops: [
						{ position: 0, color: 'FFFFFF' },
						{ position: 100, color: '000000' },
					],
					path: 'rect',
				})

				expect(result).toContain('<a:path path="rect">')
			})

			it('should generate path gradient with shape path', () => {
				const result = genXmlColorSelection({
					type: 'pathGradient',
					stops: [
						{ position: 0, color: 'FFFFFF' },
						{ position: 100, color: '000000' },
					],
					path: 'shape',
				})

				expect(result).toContain('<a:path path="shape">')
			})

			it('should handle custom fillToRect', () => {
				const result = genXmlColorSelection({
					type: 'pathGradient',
					stops: [
						{ position: 0, color: 'FFFFFF' },
						{ position: 100, color: '000000' },
					],
					fillToRect: { l: 25, t: 25, r: 75, b: 75 },
				})

				expect(result).toContain('l="25000"')
				expect(result).toContain('t="25000"')
				expect(result).toContain('r="75000"')
				expect(result).toContain('b="75000"')
			})

			it('should use default fillToRect when not specified', () => {
				const result = genXmlColorSelection({
					type: 'pathGradient',
					stops: [
						{ position: 0, color: 'FFFFFF' },
						{ position: 100, color: '000000' },
					],
				})

				expect(result).toContain('l="50000"')
				expect(result).toContain('t="50000"')
				expect(result).toContain('r="50000"')
				expect(result).toContain('b="50000"')
			})

			it('should handle transparency in path gradient stops', () => {
				const result = genXmlColorSelection({
					type: 'pathGradient',
					stops: [
						{ position: 0, color: 'FFFFFF', transparency: 0 },
						{ position: 100, color: '000000', transparency: 50 },
					],
				})

				expect(result).toContain('<a:alpha val="50000"/>')
			})
		})

		describe('theme colors', () => {
			it('should handle theme colors in solid fill', () => {
				const result = genXmlColorSelection(SchemeColor.accent1)
				expect(result).toContain('<a:schemeClr val="accent1"/>')
			})

			it('should handle theme colors in gradient', () => {
				const result = genXmlColorSelection({
					type: 'linearGradient',
					stops: [
						{ position: 0, color: SchemeColor.accent1 },
						{ position: 100, color: SchemeColor.accent2 },
					],
				})

				expect(result).toContain('<a:schemeClr val="accent1"/>')
				expect(result).toContain('<a:schemeClr val="accent2"/>')
			})
		})
	})

	describe('correctShadowOptions', () => {
		it('should return undefined for non-object input', () => {
			expect(correctShadowOptions(null as unknown as Parameters<typeof correctShadowOptions>[0])).toBeUndefined()
			expect(correctShadowOptions('invalid' as unknown as Parameters<typeof correctShadowOptions>[0])).toBeUndefined()
		})

		it('should correct invalid shadow type', () => {
			const result = correctShadowOptions({ type: 'invalid' as 'outer' })
			expect(result?.type).toBe('outer')
		})

		it('should correct invalid angle', () => {
			const result = correctShadowOptions({ type: 'outer', angle: 500 })
			expect(result?.angle).toBe(270)
		})

		it('should round angle', () => {
			const result = correctShadowOptions({ type: 'outer', angle: 45.7 })
			expect(result?.angle).toBe(46)
		})

		it('should correct invalid opacity', () => {
			const result = correctShadowOptions({ type: 'outer', opacity: 2 })
			expect(result?.opacity).toBe(0.75)
		})

		it('should strip hash from color', () => {
			const result = correctShadowOptions({ type: 'outer', color: '#FF0000' })
			expect(result?.color).toBe('FF0000')
		})
	})
})

