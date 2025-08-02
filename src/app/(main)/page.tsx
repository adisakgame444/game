import ContactFooter from "@/components/customer-page/home/contact";
import FeatureProducts from "@/components/customer-page/home/feature-products";
import Hero from "@/components/customer-page/home/hero";

const HomePage = async () => {
  return (
    <div className="flex flex-col gap-6 md:gap-12">
      <Hero/>
      <FeatureProducts/>
      <ContactFooter/>
    </div>
  );
};
export default HomePage;
