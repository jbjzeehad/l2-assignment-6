import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import type { TRole } from "@/types";
import redirectByRole from "@/utils/redirectByRole";
import { Link } from "react-router";

function HomePage() {
  const auth = useAppSelector((state) => state.auth);

  return (
    <div>
      <section className="bg-gradient-to-br from-gray-100 via-gray-200 to-muted dark:from-background dark:via-muted dark:to-background lg:grid lg:h-screen lg:place-content-center">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl text-center space-y-6">
            <h1 className="text-5xl font-extrabold tracking-tight text-primary sm:text-6xl">
              Parcel Delivery<span className="text-foreground"> System</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Your go-to platform for all your parcel delivery needs in
              Bangladesh.
            </p>
            <p className="text-lg text-muted-foreground">
              Want to send a parcel? We’ve got you covered.
            </p>

            <div>
              <Button asChild size="lg" id="get-started-btn">
                <Link
                  to={
                    auth.isloggedIn
                      ? redirectByRole(auth.user?.role as TRole)
                      : "/login"
                  }
                >
                  Click Here
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default HomePage;
