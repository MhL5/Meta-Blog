import { ReactElement } from "react";
import Button from "../components/elements/button/Button";
import Header from "../components/layout/Header";
import DefaultPageContainer from "../components/layout/DefaultPageContainer";
import Footer from "../components/layout/footer/Footer";

function NotFoundPage(): ReactElement {
  return (
    <DefaultPageContainer>
      <Header />
      <div className="grid min-h-dvh place-items-center">
        <div className="space-y-6">
          <div className="text-center text-7xl capitalize">
            page not found! 😞
          </div>
          <div className="grid place-items-center">
            <Button to="/" el="anchor" variant="secondary">
              back to Homepage
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </DefaultPageContainer>
  );
}

export default NotFoundPage;
