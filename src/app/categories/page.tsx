import NewsLetterSubscription from "@/features/newsLetterSubscription/NewsLetterSubscription";
import CategoriesSection from "./CategoriesSection";

export default function Page() {
  return (
    <div className="mx-auto w-full py-8 md:px-6">
      <CategoriesSection />

      <div className="pt-24">
        <NewsLetterSubscription />
      </div>
    </div>
  );
}
