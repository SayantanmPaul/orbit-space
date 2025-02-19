import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { RiLoader4Line } from "react-icons/ri";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { HoverCard } from "./ui/hover-card";

const GoogleLoginJSX = () => {
  const { status } = useSession();

  const popupCenter = (url: string, title: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };

  useEffect(() => {
    if (status === "authenticated") {
      toast.success("Logged in successfully");
    }
  }, [status]);

  return (
    <HoverCard>
      <div
        className="max-w-96 w-full bg-black/40 backdrop-blur-xl shadow-lg dark p-4 text-base z-auto rounded-md borderp-4 text-popover-foreground outline-none
            "
      >
        <div className="space-y-4 w-full ">
          <div className="space-y-2 w-full">
            <h4 className="text-md font-medium font-base">Orbit-Space</h4>
            <p className="text-muted-foreground text-sm ">
              Helping to stay focused & boost productivity. Log in to access
              music controls and other features.
            </p>
          </div>
          <Button
            onClick={() => popupCenter("/sign-in", "Sign in with Google")}
            className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-base"
          >
            <div className="flex items-center gap-2 ">
              Sign in with Google
              {status === "loading" ? (
                <RiLoader4Line className="h-5 w-5 animate-spin" />
              ) : (
                <FcGoogle className="h-5 w-5 " />
              )}
            </div>
          </Button>
        </div>
      </div>
    </HoverCard>
  );
};

export default GoogleLoginJSX;
