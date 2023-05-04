import {Component} from 'react';

type State = {
	error: boolean;
}

class ErrorBoundary extends Component<{}, State> {
	state = {
		error: false
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		this.setState({
			error: true
		})
	}

	render() {
		if (this.state.error) {
			return <h2>Something went wrong</h2>
		}

		// TODO: delete
		// @ts-ignore
		return this.props.children;
	}
}

export default ErrorBoundary;
