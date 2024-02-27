import { ReactElement, useState } from "react";

const hamburgerMenuStyles = {
  button:
    "flex flex-col items-center justify-between h-8 w-8 transition p-1 relative z-50",
  hamburgers: "h-[3px] w-8 rounded-md bg-textColorMain transition duration-300",
};

function HamburgerMenu(): ReactElement {
  const [open, setOpen] = useState(false);

  const buttonStyles = open ? " " : "";
  const hamburgerTopStyles = open ? "rotate-45 translate-y-[9px]" : "";
  const hamburgerMiddleStyles = open ? "hidden" : "rotate-0";
  const hamburgerBottomStyles = open ? "-rotate-45 -translate-y-[11px]" : "";

  function handleClick() {
    setOpen((o) => !o);
  }

  return (
    <button
      type="button"
      className={`${hamburgerMenuStyles.button} ${buttonStyles}`}
      onClick={handleClick}
    >
      <span
        className={`${hamburgerMenuStyles.hamburgers} ${hamburgerTopStyles}`}
      ></span>
      <span
        className={`${hamburgerMenuStyles.hamburgers} ${hamburgerMiddleStyles}`}
      ></span>
      <span
        className={`${hamburgerMenuStyles.hamburgers} ${hamburgerBottomStyles}`}
      ></span>
    </button>
  );
}

export default HamburgerMenu;
