import Logo from "@/assets/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useLogoutMutation } from "@/store/api/auth.api";
import { logout } from "@/store/slice/auth.slice";
import type { IError, TRole } from "@/types";
import redirectByRole from "@/utils/redirectByRole";
import { Link } from "react-router";
import { toast } from "sonner";
import { ModeToggle } from "./ModeToggle";

export default function Navigation() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const [logoutMutation] = useLogoutMutation();
  const dashboard = authState.isloggedIn
    ? redirectByRole(authState.user?.role as TRole)
    : "/login";
  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About", id: "about" },
    { href: "/contact", label: "Contact", id: "contact" },
    { href: dashboard, label: "Dashboard" },
    { href: "/track", label: "Track Parcel", id: "track-parcel" },
  ];

  const handleLogout = async () => {
    try {
      const toastId = toast.loading("Logging out...");
      await logoutMutation(null);
      toast.success("Logout successful", { id: toastId });
      dispatch(logout());
    } catch (error) {
      console.log(error);
      toast.error((error as IError)?.message || "Something went wrong");
    }
  };

  return (
    <header className="border-b px-4 md:px-6 border-primary/70" id="nav">
      <div className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink className="py-1.5" asChild>
                        <Link id={link.id} to={link.href}>
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          <div className="flex items-center gap-6">
            <Link to={"/"} className="text-primary hover:text-primary/90">
              <Logo />
            </Link>

            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                      asChild
                    >
                      <Link id={link.id} to={link.href}>
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {authState.isloggedIn ? (
            <Button
              asChild
              size="sm"
              className="text-sm"
              variant={"outline"}
              onClick={handleLogout}
            >
              <Link to="/">Log Out</Link>
            </Button>
          ) : (
            <Button asChild size="sm" className="text-sm text-foreground">
              <Link to="/login">Log In</Link>
            </Button>
          )}

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
