type ButtonProps = {
    // type: React.ButtonHTMLAttributes<HTMLButtonElement>.type,
    type: "button" | "submit" | "reset";
    onClickHandler(): void;
    buttonStyle: "main" | "secondary";
    text: string
}

export default function MarvelButton(props: ButtonProps) {
    return (
        <button className={`button button__${props.buttonStyle}`} type={props.type} onClick={() => {props.onClickHandler()}}>
          <div className="inner">
            {props.text}
          </div>
        </button>
    );
}