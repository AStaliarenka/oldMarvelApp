import {Component} from "react";
import ErrorMessage from "../errorMessage/errorMessage";

type State = {
	hasError: boolean;
}

type Props = {
	fallback?: JSX.Element;
	children: JSX.Element;
}

class ErrorBoundary extends Component<Props, State> {
	state = {
		hasError: false
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.log("error", error);
	}

	static getDerivedStateFromError() {
		// Update state so the next render will show the fallback UI.
		return {hasError: true};
	}

	render() {
		if (this.state.hasError) {

			return this.props.fallback ? this.props.fallback : <ErrorMessage/>;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
