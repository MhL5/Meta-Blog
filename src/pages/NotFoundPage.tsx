import { ReactElement } from "react";
import Button from "../ui/Button";

function NotFoundPage(): ReactElement {
  return (
    <div>
      NOT FOUND
      <Button to="/" el="anchor" variant="primary">
        Homepage
      </Button>
    </div>
  );
}

export default NotFoundPage;
