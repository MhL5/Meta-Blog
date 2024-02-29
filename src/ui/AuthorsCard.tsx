import { type ReactElement } from "react";

function AuthorsCard(): ReactElement {
  return (
    <div className="custom-hover-with-border || m-4 cursor-pointer bg-cardBackgroundColor p-8">
      <div>IMG</div>
      <div>NAME</div>
      <div>7 POST</div>
      <p>
        Biswajit Saha writes code at gbjsolution.com. He likes to ride a bicycle
        when free. Prefers tea over coffee.
      </p>
    </div>
  );
}

export default AuthorsCard;
