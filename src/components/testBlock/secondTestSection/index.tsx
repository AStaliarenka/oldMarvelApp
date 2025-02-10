import { getBemElementClass } from "../../../helpers/common"
import AppContainer from "../../appContainer"
import { useAppSelector } from "../../../hooks/redux.hooks"

import "./style.scss"

import deadpoolIcon from "./deadpoolIcon.svg"

const classNames = {
	name: "second-section",
	elements: {
		title: "title",
		txtBlock: "text-block"
	}
} as const

const SecondTestSection = () => {
	const textDirection = useAppSelector((state) => state.textDirection)

	const arabicText = "بعد نصف ليل الاثنين بعثرين دقيقة شعرنا بهزة خفيفة بعد نصف ليل الاثنين بعثرين دقيقة شعرنا بهزة خفيفة"
	const arabicTitle = "كسقوط بعض جدران منها"
	const englishText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat necessitatibus aliquid
                        ducimus nostrum aspernatur corrupti rerum ullam, et quas amet, qui voluptate 
                        facilis ea iste omnis odit corporis libero? Blanditiis.`
	const englishTitle = "Hello World"

	let cardTitle: string, cardText: string

	if (textDirection === "ltr") {
		cardTitle = englishTitle
		cardText = englishText
	}
	else {
		cardTitle = arabicTitle
		cardText = arabicText
	}

	const generateCardsBlock = (numberOfCards: number) => {
		const cards = []

		for (let i=0; i<numberOfCards; i++) {
			cards.push(
				<div className="marvelCards__card card">
					<img className="card__img" src={deadpoolIcon}></img>
					<div className="card__textBlock">
						<h6 className="card__title">{cardTitle}</h6>
						<span className="card__text">{cardText}</span>
					</div>
				</div>
			)
		}

		return <div className="marvelCards">{cards}</div>
	}

	const marvelCards = generateCardsBlock(3)

	return (
		<section className={classNames.name}>
			<AppContainer>
				<h1 className={getBemElementClass(classNames.name, classNames.elements.title)}>Hello, it is a second section</h1>
				<div className={getBemElementClass(classNames.name, classNames.elements.txtBlock)}>
					{
						`Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat necessitatibus aliquid
                        ducimus nostrum aspernatur corrupti rerum ullam, et quas amet, qui voluptate 
                        facilis ea iste omnis odit corporis libero? Blanditiis.`
					}
				</div>
				{marvelCards}
			</AppContainer>
		</section>
	)
}

export default SecondTestSection