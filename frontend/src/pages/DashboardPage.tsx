import { Link, Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";
import Footer from "@/components/layout/Footer";
import { GearIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <PageContainer>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
          <div className="mx-auto grid w-full max-w-globalWidthContent gap-2">
            <h1 className="text-3xl font-semibold">Settings</h1>
          </div>
          <div className="mx-auto grid w-full max-w-globalWidthContent items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <nav
              className="grid gap-4 text-sm text-muted-foreground"
              x-chunk="dashboard-04-chunk-0"
            >
              <Button asChild size="lg">
                <Link
                  to="user"
                  className="flex items-center gap-2 font-semibold text-primary"
                >
                  <GearIcon />
                  General
                </Link>
              </Button>

              <Button asChild size="lg">
                <Link
                  to="text-editor"
                  className="flex items-center gap-2 font-semibold text-primary"
                >
                  <Pencil2Icon />
                  Write an article
                </Link>
              </Button>
            </nav>

            <div>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </PageContainer>
  );
}
