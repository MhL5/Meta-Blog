import { ReactElement } from "react";
import Button from "../elements/button/Button";

type EmailSubscribeProps = { className?: string };

function EmailSubscribe({ className }: EmailSubscribeProps): ReactElement {
  return (
    <form
      className={`relative hidden h-16 w-[32rem] rounded-full sm:block ${className}`}
    >
      <div className="z-1 absolute left-1/2 top-1/2 h-[3.8rem] -translate-x-1/2 -translate-y-1/2 rounded-full [background:var(--gradient-primary)] [width:32.2rem]"></div>
      <input
        placeholder="Your Email Address"
        type="email"
        className="absolute left-1/2 top-1/2 h-14 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-bodyBackgroundColor p-4 text-base "
      />
      <Button
        el="button"
        variant="primary"
        className="absolute right-2 top-1/2 -translate-y-1/2 py-2 text-base hover:translate-y-[-24px!important] "
      >
        Subscribe
      </Button>
    </form>
  );
}

export default EmailSubscribe;
