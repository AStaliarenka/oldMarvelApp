import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/App";
import "./style/style.scss";
import { Provider } from "react-redux";
import store from "./app/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
const queryClient = new QueryClient();

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

const wrappInGoogleProvider = (clientId: string | undefined, content: React.JSX.Element) => {
	if (clientId) {
		return (
			<GoogleOAuthProvider clientId={clientId}>
				{content}
			</GoogleOAuthProvider>
		)
	}
	return content
}

root.render(
	<React.StrictMode>
		{wrappInGoogleProvider(
			clientId,
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</Provider>
		)}
	</React.StrictMode>
);
