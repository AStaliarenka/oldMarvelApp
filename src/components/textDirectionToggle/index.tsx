import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks"
import { useEffect } from "react"
import { setTextDirection } from "./slice"
import { TEXT_DIRECTION_VALUES } from "./slice/@types"

import "./style.scss"

// TODO: to select other toggle style
const TextDirectionToggle = () => {
	const textDirection = useAppSelector((state) => state.textDirection)

	const dispatch = useAppDispatch()

	useEffect(() => {
		document.querySelector("html")?.setAttribute("dir", textDirection)

		// localStorage.setItem("textDirection", textDirection);
	}, [ textDirection ]);

	const handleChange = () => {
		const next = textDirection === TEXT_DIRECTION_VALUES.leftToRight
			? TEXT_DIRECTION_VALUES.rightToLeft
			: TEXT_DIRECTION_VALUES.leftToRight

		dispatch(setTextDirection(next))
	}

	let toggleLabelValue: string, checkboxValue: boolean

	// TODO: checkboxValue
	// eslint-disable-next-line prefer-const
	checkboxValue = true
	
	if (textDirection === TEXT_DIRECTION_VALUES.rightToLeft) {
		toggleLabelValue = "RTL"
		// checkboxValue = true
	}
	else {
		toggleLabelValue = "LTR"
		// checkboxValue = false
	}

	return (
		// TODO: to create default TOGGLE
		// themeToggle from THEME component
		<div className='textDirectionToggle themeToggle'> 
			<span className='themeToggle__label'>{toggleLabelValue}</span>
			<label className = "switch">
				<input type="checkbox"
					defaultChecked = {checkboxValue}
					onClick={handleChange}>
				</input>
				<span className="slider round"></span>
			</label>
		</div>
	);
}

export default TextDirectionToggle