import {Component} from 'react';

class ErrorBoundary extends Component {
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
