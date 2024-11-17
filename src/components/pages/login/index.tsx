import {useForm} from "react-hook-form"
import AppContainer from "../../appContainer"
import MarvelButton from "../../marvelButton"
import { getBemElementClass } from "../../../helpers/common"
import { useAppDispatch } from "../../../hooks/redux.hooks"
import { userLoggedIn } from "../../../app/reducers/auth"

import { useNavigate } from "react-router-dom"

import { LoginForm, ServerLoginDataWithMessage } from "./@types"

import "./style.scss"

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

const Testlogin = () => {
	const { register, handleSubmit, formState: {errors}, setError } = useForm<LoginForm>({
		defaultValues: {}
	})

	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const onValidSubmit = async (formData: LoginForm) => {
		console.log("onValidSubmit, data=", formData)
		const URL = "http://localhost:3500/auth/login"
		const userCredentials = {
			[loginBodyFields.username]: formData.username,
			[loginBodyFields.password]: formData.password,
			[loginBodyFields.isRemember]: formData.isRemember
		}
	
		try {
			const res = await fetch(URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				mode: "cors",
				body: JSON.stringify(userCredentials)
			})

			if (res.ok) {
				const data = await res.json() as unknown as ServerLoginDataWithMessage<true>

				if (data) {
					const {roleId, username} = data.userInfo

					dispatch(userLoggedIn({
						userId: roleId,
						username
					}))
	
					navigate("/")
					// TODO: to prev page
				}
			}
			else {
				const data = await res.json() as unknown as ServerLoginDataWithMessage<false>

				if (data) {
					const {field: errorField, message} = data

					setError(errorField, {message: message})
				}
			}
		} catch(error) {
			console.log("error:", error)
		}
	};
	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onInvalidSubmit = (...arrM: any[]) => {
		console.log("arrM", arrM)
	}

	const form = (
		<form
			className={`testForm ${cssClassNames.form.name}`}
			onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
		>
			<div className={getBemElementClass(cssClassNames.form.name, cssClassNames.form.elements.textInputsBlock)}>
				<input
					{...register(formInputNames.username, { maxLength: 20 })}
					placeholder="Enter username"
					aria-invalid={errors.username ? "true" : "false"}
				/>
				{
					errors.username && errors.username.type === "maxLength" && (
						<span role="alert">Max length exceeded</span>
					)
				}
				{
					errors.username && errors.username?.message && (
						<span role="alert">{errors.username.message}</span>
					)
				}
				<input
					{...register(formInputNames.password, { maxLength: 20 })}
					placeholder="Enter password"
					aria-invalid={errors.password ? "true" : "false"}
				/>
				{
					errors.password && errors.password.type === "maxLength" && (
						<span role="alert">Max length exceeded</span>
					)
				}
				{
					errors.password && errors.password?.message && (
						<span role="alert">{errors.password.message}</span>
					)
				}
			</div>
			{/* TODO: themeToggle is a component */}
			<div className='themeToggle'>
				<span className='themeToggle__label'>Remember</span>
				<label className = "switch">
					<input type="checkbox"
						{...register(formInputNames.isRemember)}
						defaultChecked = {false}
					>
					</input>
					<span className="slider round"></span>
				</label>
			</div>
			<div className={getBemElementClass(cssClassNames.form.name, cssClassNames.form.elements.buttons)}>
				<MarvelButton
					buttonStyle="main"
					text="Login"
					type="submit"
				/>
			</div>
		</form>
	)

	return (
		<AppContainer>
			<div className="formWrapper">
				{form}
			</div>
		</AppContainer>
	)
}

export default Testlogin