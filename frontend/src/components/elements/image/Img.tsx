import {
  ComponentPropsWithoutRef,
  SyntheticEvent,
  type ReactElement,
} from "react";
import imgPlaceholder from "../../../assets/imgPlaceholder.svg";

type ImgProps = ComponentPropsWithoutRef<"img">;
function Img(props: ImgProps): ReactElement {
  const { className, ...otherProps } = props;

  function handleError(e: SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src = imgPlaceholder;
    e.currentTarget.onerror = null;
  }

  return (
    <img
      className={`object-cover ${className}`}
      onError={handleError}
      style={{ backgroundImage: `url("imgPlaceholder.svg")` }}
      loading="lazy"
      {...otherProps}
    />
  );
}

export default Img;
