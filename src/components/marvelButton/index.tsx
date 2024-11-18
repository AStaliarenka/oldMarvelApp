import { MouseEventHandler } from "react";
import { Objectvalues } from "../../helpers/common";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const buttonTypes = {
	button: "button",
	submit: "submit",
	reset: "reset"
} as const

type ButtonType = Objectvalues<typeof buttonTypes>

type ButtonProps = {
    type: ButtonType;
	disabled?: boolean;
    onClickHandler?: MouseEventHandler<HTMLButtonElement>;
    buttonStyle: "main" | "secondary";
    text: string
}

export default function MarvelButton({buttonStyle, type, onClickHandler, text, disabled}: ButtonProps) {
	return (
		<button
			className={`button button__${buttonStyle}`}
			type={type}
			onClick={onClickHandler ? onClickHandler : undefined}
			disabled={disabled ? disabled : undefined}
		>
			<div className="inner">
				{text}
			</div>
		</button>
	)
}