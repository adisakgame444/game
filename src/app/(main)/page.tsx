import AllProducts from "@/components/customer-page/home/allProducts";
import ContactFooter from "@/components/customer-page/home/contact";
import FeatureProducts from "@/components/customer-page/home/feature-products";
import Hero from "@/components/customer-page/home/hero";
import RecommendedBanner from "@/components/customer-page/home/recommendedBanner";

const HomePage = async () => {
  // gap-6 md:gap-12
  return (
    <div className="flex flex-col">
      <Hero />
      <RecommendedBanner />
      <FeatureProducts />
      <AllProducts />
      <ContactFooter />
    </div>
  );
};
export default HomePage;
