import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";
import Article from "@/features/articles/Article";

export default function ArticlePage() {
  return (
    <PageContainer>
      <div className="flex min-h-dvh flex-col">
        <Header />

        <div className="mx-auto">
          <Article />
        </div>

        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </PageContainer>
  );
}
