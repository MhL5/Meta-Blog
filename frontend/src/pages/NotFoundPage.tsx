import { Link } from "react-router-dom";

import Header from "../components/layout/Header";
import { Button } from "@/components/ui/button";
import PageContainer from "@/components/layout/PageContainer";
import Footer from "@/components/layout/Footer";

function NotFoundPage() {
  return (
    <PageContainer>
      <div className="flex min-h-dvh flex-col">
        <Header />
        <div className="m-auto text-center">
          <div className="my-14 text-4xl font-semibold capitalize text-red-600">
            page not found! 😞
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

export default NotFoundPage;
