import { Button } from "@/components/ui/button";
import Header from "../components/layout/Header";
import { Link } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import Footer from "@/components/layout/Footer";

function ErrorPage() {
  return (
    <PageContainer>
      <div className="flex min-h-dvh flex-col">
        <Header />
        <div className="m-auto text-center">
          <div className="my-14 text-4xl capitalize text-red-600">
            ERROR: SOMETHING WENT WRONG!☹️
          </div>
          <Button asChild>
            <Link to="/">Homepage</Link>
          </Button>
        </div>
        <Footer />
      </div>
    </PageContainer>
  );
}

export default ErrorPage;
