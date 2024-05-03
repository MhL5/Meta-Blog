import { ReactElement } from "react";
import Button from "../elements/button/Button";

type SubscribeProps = {
  className?: string;
};

function Subscribe({ className }: SubscribeProps): ReactElement {
  return (
    <div
      className={`${className} custom-gradient-bg || m-4 mt-16 flex max-w-globalWidthContent flex-col items-center justify-center gap-8 rounded-xl p-6 text-center text-gray-100 sm:m-8 sm:p-8 md:m-8 xl:m-auto xl:flex-row xl:text-start`}
    >
      <div className="">
        <h3 className="mb-6 text-4xl font-bold xl:w-[25ch]">
          Subscribe to Porto newsletter and stay updated.
        </h3>
        <p className="text-xl xl:w-[45ch]">
          Don't miss anything. Get all the latest posts delivered straight to{" "}
          your inbox. It's free!
        </p>
      </div>

      <div className="rounded-2xl border border-white/50 bg-white/20 p-4 sm:p-8">
        <form className="flex flex-col gap-4 ">
          <input
            type="text"
            className=" rounded-2xl px-4 py-2 text-black sm:w-96"
            placeholder="Your name"
          />
          <input
            type="email"
            className=" rounded-2xl px-4 py-2 text-black sm:w-96"
            placeholder="Your Email"
          />
          <Button variant="secondary" el="button">
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Subscribe;
