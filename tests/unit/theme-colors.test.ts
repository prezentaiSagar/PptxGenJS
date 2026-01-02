import { describe, it, expect } from 'vitest'
import { makeXmlTheme } from '../../src/gen-xml'
import { IPresentationProps, PresSlide, ThemeColorScheme, ThemeProps } from '../../src/core-interfaces'

describe('Theme Colors', () => {
	// Helper to create a minimal presentation props object
	const createPresProps = (themeColors?: ThemeColorScheme): IPresentationProps => ({
		author: 'Test',
		company: 'Test Co',
		layout: 'LAYOUT_16x9',
		masterSlide: {} as unknown as PresSlide,
		presLayout: { name: 'LAYOUT_16x9', width: 9144000, height: 5143500 },
		revision: '1',
		rtlMode: false,
		subject: 'Test',
		theme: themeColors ? { colors: themeColors } : {},
		title: 'Test',
		sections: [],
		slideLayouts: [],
		slides: [],
	})

	describe('makeXmlTheme', () => {
		it('should generate default Office theme colors when no custom colors provided', () => {
			const pres = createPresProps()
			const xml = makeXmlTheme(pres)

			// Check default colors are present
			expect(xml).toContain('<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>')
			expect(xml).toContain('<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>')
			expect(xml).toContain('<a:dk2><a:srgbClr val="44546A"/></a:dk2>')
			expect(xml).toContain('<a:lt2><a:srgbClr val="E7E6E6"/></a:lt2>')
			expect(xml).toContain('<a:accent1><a:srgbClr val="4472C4"/></a:accent1>')
			expect(xml).toContain('<a:accent2><a:srgbClr val="ED7D31"/></a:accent2>')
			expect(xml).toContain('<a:accent3><a:srgbClr val="A5A5A5"/></a:accent3>')
			expect(xml).toContain('<a:accent4><a:srgbClr val="FFC000"/></a:accent4>')
			expect(xml).toContain('<a:accent5><a:srgbClr val="5B9BD5"/></a:accent5>')
			expect(xml).toContain('<a:accent6><a:srgbClr val="70AD47"/></a:accent6>')
			expect(xml).toContain('<a:hlink><a:srgbClr val="0563C1"/></a:hlink>')
			expect(xml).toContain('<a:folHlink><a:srgbClr val="954F72"/></a:folHlink>')
		})

		it('should use custom dark1 color when provided', () => {
			const pres = createPresProps({ dark1: '1A1A2E' })
			const xml = makeXmlTheme(pres)

			expect(xml).toContain('<a:dk1><a:srgbClr val="1A1A2E"/></a:dk1>')
			// Other colors should remain default
			expect(xml).toContain('<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>')
		})

		it('should use custom light1 color when provided', () => {
			const pres = createPresProps({ light1: 'F5F5F5' })
			const xml = makeXmlTheme(pres)

			expect(xml).toContain('<a:lt1><a:srgbClr val="F5F5F5"/></a:lt1>')
			// dark1 should remain system color
			expect(xml).toContain('<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>')
		})

		it('should use custom dark2 and light2 colors when provided', () => {
			const pres = createPresProps({ dark2: '16213E', light2: 'E8E8E8' })
			const xml = makeXmlTheme(pres)

			expect(xml).toContain('<a:dk2><a:srgbClr val="16213E"/></a:dk2>')
			expect(xml).toContain('<a:lt2><a:srgbClr val="E8E8E8"/></a:lt2>')
		})

		it('should use custom accent colors when provided', () => {
			const pres = createPresProps({
				accent1: '0F4C75',
				accent2: '3282B8',
				accent3: 'BBE1FA',
				accent4: 'FF6B6B',
				accent5: '4ECDC4',
				accent6: '45B7D1',
			})
			const xml = makeXmlTheme(pres)

			expect(xml).toContain('<a:accent1><a:srgbClr val="0F4C75"/></a:accent1>')
			expect(xml).toContain('<a:accent2><a:srgbClr val="3282B8"/></a:accent2>')
			expect(xml).toContain('<a:accent3><a:srgbClr val="BBE1FA"/></a:accent3>')
			expect(xml).toContain('<a:accent4><a:srgbClr val="FF6B6B"/></a:accent4>')
			expect(xml).toContain('<a:accent5><a:srgbClr val="4ECDC4"/></a:accent5>')
			expect(xml).toContain('<a:accent6><a:srgbClr val="45B7D1"/></a:accent6>')
		})

		it('should use custom hyperlink colors when provided', () => {
			const pres = createPresProps({
				hyperlink: '1E90FF',
				followedHyperlink: '9932CC',
			})
			const xml = makeXmlTheme(pres)

			expect(xml).toContain('<a:hlink><a:srgbClr val="1E90FF"/></a:hlink>')
			expect(xml).toContain('<a:folHlink><a:srgbClr val="9932CC"/></a:folHlink>')
		})

		it('should handle complete custom color scheme', () => {
			const customColors: ThemeColorScheme = {
				dark1: '1A1A2E',
				light1: 'EAEAEA',
				dark2: '16213E',
				light2: 'E8E8E8',
				accent1: '0F4C75',
				accent2: '3282B8',
				accent3: 'BBE1FA',
				accent4: 'FF6B6B',
				accent5: '4ECDC4',
				accent6: '45B7D1',
				hyperlink: '1E90FF',
				followedHyperlink: '9932CC',
			}
			const pres = createPresProps(customColors)
			const xml = makeXmlTheme(pres)

			expect(xml).toContain('<a:dk1><a:srgbClr val="1A1A2E"/></a:dk1>')
			expect(xml).toContain('<a:lt1><a:srgbClr val="EAEAEA"/></a:lt1>')
			expect(xml).toContain('<a:dk2><a:srgbClr val="16213E"/></a:dk2>')
			expect(xml).toContain('<a:lt2><a:srgbClr val="E8E8E8"/></a:lt2>')
			expect(xml).toContain('<a:accent1><a:srgbClr val="0F4C75"/></a:accent1>')
			expect(xml).toContain('<a:accent2><a:srgbClr val="3282B8"/></a:accent2>')
			expect(xml).toContain('<a:accent3><a:srgbClr val="BBE1FA"/></a:accent3>')
			expect(xml).toContain('<a:accent4><a:srgbClr val="FF6B6B"/></a:accent4>')
			expect(xml).toContain('<a:accent5><a:srgbClr val="4ECDC4"/></a:accent5>')
			expect(xml).toContain('<a:accent6><a:srgbClr val="45B7D1"/></a:accent6>')
			expect(xml).toContain('<a:hlink><a:srgbClr val="1E90FF"/></a:hlink>')
			expect(xml).toContain('<a:folHlink><a:srgbClr val="9932CC"/></a:folHlink>')
		})

		it('should mix custom colors with defaults', () => {
			// Only set some colors, rest should be defaults
			const pres = createPresProps({
				accent1: 'FF0000',
				accent3: '00FF00',
			})
			const xml = makeXmlTheme(pres)

			// Custom colors
			expect(xml).toContain('<a:accent1><a:srgbClr val="FF0000"/></a:accent1>')
			expect(xml).toContain('<a:accent3><a:srgbClr val="00FF00"/></a:accent3>')
			// Default colors
			expect(xml).toContain('<a:accent2><a:srgbClr val="ED7D31"/></a:accent2>')
			expect(xml).toContain('<a:accent4><a:srgbClr val="FFC000"/></a:accent4>')
		})

		it('should generate valid XML structure', () => {
			const pres = createPresProps()
			const xml = makeXmlTheme(pres)

			// Check XML declaration
			expect(xml).toContain('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>')
			// Check root element
			expect(xml).toContain('<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"')
			// Check color scheme wrapper
			expect(xml).toContain('<a:clrScheme name="Office">')
			expect(xml).toContain('</a:clrScheme>')
			// Check theme elements wrapper
			expect(xml).toContain('<a:themeElements>')
			expect(xml).toContain('</a:themeElements>')
		})

		it('should include font scheme with custom fonts', () => {
			const pres: IPresentationProps = {
				...createPresProps(),
				theme: {
					headFontFace: 'Helvetica',
					bodyFontFace: 'Arial',
					colors: { accent1: 'FF0000' },
				},
			}
			const xml = makeXmlTheme(pres)

			expect(xml).toContain('<a:latin typeface="Helvetica"/>')
			expect(xml).toContain('<a:latin typeface="Arial"/>')
		})

		it('should use default fonts when not specified', () => {
			const pres = createPresProps()
			const xml = makeXmlTheme(pres)

			expect(xml).toContain('typeface="Calibri Light"')
			expect(xml).toContain('typeface="Calibri"')
		})
	})

	describe('ThemeColorScheme integration', () => {
		it('should allow partial color schemes', () => {
			const pres = createPresProps({ accent1: 'CUSTOM1' })
			const xml = makeXmlTheme(pres)

			// Custom color should be used
			expect(xml).toContain('CUSTOM1')
			// Other defaults should still be present
			expect(xml).toContain('44546A') // default dark2
		})

		it('should handle empty color scheme', () => {
			const pres: IPresentationProps = {
				...createPresProps(),
				theme: { colors: {} },
			}
			const xml = makeXmlTheme(pres)

			// All defaults should be used
			expect(xml).toContain('<a:dk1><a:sysClr val="windowText"')
			expect(xml).toContain('4472C4') // default accent1
		})

		it('should handle undefined theme', () => {
			const pres: IPresentationProps = {
				...createPresProps(),
				theme: undefined as unknown as ThemeProps,
			}
			const xml = makeXmlTheme(pres)

			// Should not throw, should use defaults
			expect(xml).toContain('<a:clrScheme')
			expect(xml).toContain('4472C4') // default accent1
		})
	})
})

