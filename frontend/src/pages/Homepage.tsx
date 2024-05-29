import FeaturedPosts from "@/components/FeaturedPosts";
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

      <FeaturedPosts />
      <NewsLetterSubscription />
      <Footer />
    </PageContainer>
  );
}
