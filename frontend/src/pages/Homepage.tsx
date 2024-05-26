import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import HomePageHeroHeader from "@/components/layout/HomePageHeroHeader";
import PageContainer from "@/components/layout/PageContainer";
import NewsLetterSubscription from "@/features/newsLetterSubscription/NewsLetterSubscription";

export default function Homepage() {
  return (
    <PageContainer>
      <Header />
      <HomePageHeroHeader />

      <NewsLetterSubscription />
      <Footer />
    </PageContainer>
  );
}
