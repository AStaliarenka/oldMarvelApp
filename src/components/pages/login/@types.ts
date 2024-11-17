export type LoginForm = {
	username: string
	password: string
	isRemember: boolean
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