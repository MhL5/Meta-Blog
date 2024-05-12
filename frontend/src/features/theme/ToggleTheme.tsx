import { ReactElement } from "react";

import { useDarkModeContext } from "./DarkModeContext";
import { MoonSvgIcon, SunSvgIcon } from "@/components/SvgIcons";
import { Button } from "@/components/ui/button";

function ToggleTheme(): ReactElement {
  const { isDarkMode, toggleDarkMode } = useDarkModeContext();

  return (
    <Button variant="ghost" type="button" onClick={toggleDarkMode}>
      {isDarkMode ? <SunSvgIcon /> : <MoonSvgIcon />}
    </Button>
  );
}

export default ToggleTheme;
