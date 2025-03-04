import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogoutDialog } from "@/components/dialogs"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks"
import { useState } from "react"

const ProfileBox = () => {
	const location = useLocation();
	const [drawerOpen, setDrawerOpen] = useState(false);

	const closeDrawer = () => {
		setDrawerOpen(false);
	}

	const navigate = useNavigate();
	const { userLogout } = useAuth()

	const logoutClick = () => {
		userLogout()
		navigate("/auth/login")
	}
	return (
		<>
			<div className="flex justify-end  md:justify-between ">
				<div className="md:hidden ">
					<Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
						<DrawerTrigger><i className="pi pi-bars text-gray-700"></i></DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle className="text-left text-gray-500 font-bold mt-8">Retail Management</DrawerTitle>
							</DrawerHeader>
							<DrawerDescription>
								<div className="space-y-4 flex flex-col items-start ml-4">
									<Link to="/stock" className="flex justify-center" onClick={closeDrawer}>
										<div
											className={`w-52 p-2 rounded-sm shadow flex items-center gap-2 justify-start text-white 
            								${location.pathname === "/stock" ? "bg-red-500" : "bg-gray-400 hover:bg-gray-500"}`}
										>
											<i className="pi pi-warehouse mr-3"></i>
											<span className="text-md font-md">Stock Page</span>
										</div>
									</Link>

									<Link to="/cart" className="flex justify-center" onClick={closeDrawer}>
										<div
											className={`w-52 p-2 rounded-sm shadow flex items-center gap-2 justify-start text-white 
            								${location.pathname === "/cart" ? "bg-red-500" : "bg-gray-400 hover:bg-gray-500"}`}
										>
											<i className="pi pi-shopping-cart mr-3"></i>
											<span className="text-md font-md">Cart Page</span>
										</div>
									</Link>

									<Link to="/cashier" className="flex justify-center" onClick={closeDrawer}>
										<div
											className={`w-52 p-2 rounded-sm shadow flex items-center gap-2 justify-start text-white 
            								${location.pathname === "/cashier" ? "bg-red-500" : "bg-gray-400 hover:bg-gray-500"}`}
										>
											<i className="pi pi-wallet mr-3"></i>
											<span className="text-md font-md">Cashier Page</span>
										</div>
									</Link>

									<Link to="/manager" className="flex justify-center" onClick={closeDrawer}>
										<div
											className={`w-52 p-2 rounded-sm shadow flex items-center gap-2 justify-start text-white 
            								${location.pathname === "/manager" ? "bg-red-500" : "bg-gray-400 hover:bg-gray-500"}`}
										>
											<i className="pi pi-warehouse mr-3"></i>
											<span className="text-md font-md">Manager Page</span>
										</div>
									</Link>
								</div>

							</DrawerDescription>
							<DrawerFooter>
								<DrawerClose>
									<i className="pi pi-times-circle absolute top-2 right-2 z-10 text-lg text-red-500"></i>

									<div className="w-52 p-2 rounded-sm shadow flex items-center gap-2 justify-start text-white bg-gray-400" onClick={logoutClick}>
											<i className="pi pi-sign-out mr-3"></i>
											<span className="text-ms font-md">Logout</span>
									</div>

								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</div>
											
				<div className="hidden md:block ">
					<NavigationMenu >
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger>
									<div className="flex gap-3 items-center">
										<Avatar className="w-8 h-8">
											<AvatarImage
												src="https://i.pinimg.com/originals/41/93/b8/4193b809d92b4c203271ac784b6dd011.jpg"
												alt="Profile Image"
											/>
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>
										<div className="text-left">
											<h5 className="text-[13px] font-semibold">
												Phyo Thu Rein Zaw
											</h5>
											<p className="text-primary text-[10px]">
												Junior Programmer
											</p>
										</div>
									</div>
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="max-w-[200px] min-w-[180px] p-1">
										<h5 className="p-1 text-sm font-bold">
											My Account
										</h5>

										<hr />

										<LogoutDialog>
											<li className="p-1 text-[13px] hover:bg-accent m-1 rounded-lg text-destructive cursor-pointer">
												Log out
											</li>
										</LogoutDialog>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</div>
		</>
	)
}

export default ProfileBox