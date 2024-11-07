import { getBemElementClass } from "../../../helpers/common"
import AppContainer from "../../appContainer"

import "./style.scss"

const classNames = {
	name: "third-section",
	elements: {
		title: "title",
		txtBlock: "text-block"
	}
} as const

const ThirdTestSection = () => {
	return (
		<section className={classNames.name}>
			<AppContainer>
				<h1 className={getBemElementClass(classNames.name, classNames.elements.title)}>Hello, it is a third section</h1>
				<div className={getBemElementClass(classNames.name, classNames.elements.txtBlock)}>
					{
						`Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat necessitatibus aliquid
                        ducimus nostrum aspernatur corrupti rerum ullam, et quas amet, qui voluptate 
                        facilis ea iste omnis odit corporis libero? Blanditiis.`
					}
				</div>
			</AppContainer>
		</section>
	)
}

export default ThirdTestSection