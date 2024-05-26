import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SubscribeProps = {
  className?: string;
};

function Subscribe({ className }: SubscribeProps) {
  return (
    <div
      className={`${className} custom-gradient-bg || m-4 mt-16 flex max-w-globalWidthContent flex-col items-center justify-center gap-8 rounded-lg p-6 text-center text-gray-100 sm:m-8 sm:p-8 md:m-8 xl:m-auto xl:flex-row xl:text-start`}
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

      <div className="rounded-md border border-white/50 bg-white/10 p-4 sm:p-8">
        <form className="flex flex-col gap-4 ">
          <Input
            type="text"
            className="rounded-md sm:w-96"
            placeholder="Your name"
          />
          <Input
            type="email"
            className="rounded-md sm:w-96"
            placeholder="Your Email"
          />
          <Button>Subscribe</Button>
        </form>
      </div>
    </div>
  );
}

export default Subscribe;
