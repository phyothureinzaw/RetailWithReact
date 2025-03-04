import DefaultLayout from "@/layouts/DefaultLayout";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthLayout from "@/layouts/AuthLayout";
import { store } from "@/store";
import { Provider } from "react-redux";
import Loader from "@/components/Loader.tsx";
import { Toaster } from "./ui/toaster";
import StockView from "@/modules/stock-page/StockView";
import CartPage from "@/modules/cart-page/CartPage";
import NotFoundView from "@/modules/not-found/NotFoundView";
import LoginView from "@/modules/login/LoginView";
import HomeView from "@/modules/home/HomeView";
import CashierView from "@/modules/cashier-page/CashierView";
import ManagerView from "@/modules/manager-page/ManagerView";

const router = createBrowserRouter([
	{
		path: "/",
		element: <DefaultLayout />,
		children: [
			{
				path: "",
				element: <HomeView />,
			},
			{
				path: "/stock",
				element: <StockView />,
			},
			{
				path: "/cart",
				element: <CartPage />,
			},
			{
				path: "/cashier",
				element: <CashierView />,
			},
			{
				path: "/manager",
				element: <ManagerView />,
			},
		],
	},
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{
				path: "",
				element: <Navigate to="login" replace />,
			},
			{
				path: "login",
				element: <LoginView />,
			},
		],
	},
	{
		path: "*",
		element: <NotFoundView />,
	},
]);

const Wrapper = () => {
	const queryClient = new QueryClient();

	return (
		<>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<Loader />
					<Toaster />
					<RouterProvider router={router}></RouterProvider>
				</QueryClientProvider>
			</Provider>
		</>
	);
};

export default Wrapper;
