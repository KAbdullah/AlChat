import "./App.css";
import io from "socket.io-client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ChatWindow from "./features/chat/pages/ChatWindow";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
	{
		path: "/",
		Component: HomePage,
	},
]);

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			{/* <ReactQueryDevtools initialIsOpen={true} /> */}
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
