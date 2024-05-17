import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";
import SignUpTab from "@/features/authentication/SignUpTab";

export default function SignUpPage() {
  return (
    <PageContainer>
      <div className="flex min-h-dvh flex-col">
        <Header />

        <div className="m-auto px-2 py-8 capitalize sm:p-8">
          <SignUpTab />
        </div>

        <Footer className="mt-auto" />
      </div>
    </PageContainer>
  );
}
