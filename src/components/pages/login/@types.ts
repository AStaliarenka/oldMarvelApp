import { formInputNames } from "./constants"

export type LoginForm = {
	[formInputNames.username]: string
	[formInputNames.password]: string
	[formInputNames.isRemember]: boolean
}

type ServerDataMessage = {
	message: string
}

type ServerLoginData<isSuccess extends boolean>  = (isSuccess extends true ? {
	userInfo: {
		username: string
		roleId: number
	}
} : {
	field: "password" | "username"
})

export type ServerLoginDataWithMessage<isSuccess extends boolean>  =  ServerLoginData<isSuccess> & ServerDataMessage