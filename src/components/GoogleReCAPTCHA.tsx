import ReCAPTCHA from "react-google-recaptcha";
import { Skeleton } from "./ui/skeletion";
import { useState } from "react";

type GoogleReCAPTCHAProps = {
  onChange: (val: string | null) => void;
};

export default function GoogleReCAPTCHA({ onChange }: GoogleReCAPTCHAProps) {
  const [loading, setLoading] = useState(true);

  const clientKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!clientKey) throw new Error("RECAPTCHA_SITE_KEY is not defined");

  function handleTest() {
    setLoading(false);
  }

  return (
    <div className="my-4">
      {clientKey ? (
        <>
          <ReCAPTCHA
            sitekey={clientKey!}
            onChange={onChange}
            asyncScriptOnLoad={handleTest}
          />
          {loading ? (
            <Skeleton className="w-[304px] h-[74px] rounded-sm flex">
              <span className="inline-block m-auto">
                Loading Google Recaptcha ...
              </span>
            </Skeleton>
          ) : null}
        </>
      ) : (
        "Warning!"
      )}
    </div>
  );
}
