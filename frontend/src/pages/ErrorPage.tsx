import { Button } from "@/components/ui/button";
import Header from "../components/layout/Header";
import { Link, useSearchParams } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import Footer from "@/components/layout/Footer";

function ErrorPage() {
  const [searchParams] = useSearchParams();
  let errorMessage = "";
  if (searchParams.get("error"))
    errorMessage = `${searchParams.get("error")?.replace(/-/g, " ")} ${searchParams.get("statusCode") || ""}`;

  return (
    <PageContainer>
      <div className="flex min-h-dvh flex-col">
        <Header />
        <div className="m-auto text-center">
          <div className="my-14 text-4xl text-red-600">
            {errorMessage || `ERROR: SOMETHING WENT WRONG!☹️`}
          </div>
          <Button asChild size="sm">
            <Link to="/">Homepage</Link>
          </Button>
        </div>
        <Footer />
      </div>
    </PageContainer>
  );
}

export default ErrorPage;
