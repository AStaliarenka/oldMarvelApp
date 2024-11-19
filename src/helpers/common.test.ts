import { getBemElementClass, getBemModificatorClass, generateComplicatedClassName } from "./common"

describe("CSS classes names generators", () => {
	describe("BEM Classes", () => {
		test("validate normal value", () => {
			expect(getBemElementClass("block", "element")).toBe("block__element")
			expect(getBemModificatorClass("block", "element", "modificator")).toBe("block__element--modificator")
		})
	
		test("validate not normal value", () => {
			expect(getBemElementClass("", "element")).toBe(undefined)
			expect(getBemElementClass("block", "")).toBe(undefined)
			expect(getBemElementClass("", "")).toBe(undefined)
	
			expect(getBemModificatorClass("block", "", "")).toBe(undefined)
			expect(getBemModificatorClass("", "element", "")).toBe(undefined)
			expect(getBemModificatorClass("", "", "modificator")).toBe(undefined)
		})
	})

	describe("complicate classes generator", () => {
		test("validate normal value", () => {
			expect(generateComplicatedClassName("A", "B", "C")).toBe("A B C")
		})

		test("validate not normal value", () => {
			expect(generateComplicatedClassName("A", "", "C")).toBe(undefined)
			expect(generateComplicatedClassName("A", "", "")).toBe(undefined)
		})
	})
})