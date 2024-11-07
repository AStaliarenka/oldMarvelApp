import { element } from "prop-types"
import AppContainer from "../appContainer"
import { getBemElementClass } from "../../helpers/common"

import "./style.scss"

const classNames = {
    name: "app-footer",
    elements: {
        title: "title"
    }
}

const AppFooter = () => {
    return (
        <footer className={classNames.name}>
            <AppContainer>
                <div className={getBemElementClass(classNames.name, classNames.elements.title)}>
                    FOOTER
                </div>
            </AppContainer>
        </footer>
    )
}

export default AppFooter