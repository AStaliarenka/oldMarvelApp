const cssClassNames = {
	form: {
		name: "login-form",
		elements: {
			buttons: "buttons",
			textInputsBlock: "text-inputs-block"
		}
	}
}

const formInputNames = {
	username: "username",
	password: "password",
	isRemember: "isRemember"
} as const

const loginBodyFields = {
	username: "username",
	password: "password",
	isRemember: "isRemember"
} as const

export {
	cssClassNames,
	formInputNames,
	loginBodyFields
}