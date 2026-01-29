import HeroSection from "@/components/landing/HeroSection";
import FeaturedProperties from "@/components/landing/FeaturedProperties";
import BeforeAfterSection from "@/components/landing/BeforeAfterSection";
import ROIEstimator from "@/components/landing/ROIEstimator";
import TrustMarquee from "@/components/landing/TrustMarquee";
import CTASection from "@/components/landing/CTASection";
import PreviousWork from "@/components/landing/PreviousWork";
import AboutSection from "@/components/landing/AboutSection";
import { getLandingData } from "@/lib/landing-data";

export default async function HomePage() {
  const { hero, properties, beforeAfter, sections } = await getLandingData();

  return (
    <main className="min-h-screen">
      {sections.map((section) => {
        switch (section.sectionKey) {
          case "hero":
            return hero ? (
              <HeroSection key={section.id} content={hero} />
            ) : null;

          case "previousWork":
            return <PreviousWork key={section.id} />;

          case "about":
            return <AboutSection key={section.id} />;

          case "featured":
            return properties.length > 0 ? (
              <FeaturedProperties key={section.id} properties={properties} />
            ) : null;

          case "beforeAfter":
            return beforeAfter.length > 0 ? (
              <BeforeAfterSection key={section.id} data={beforeAfter} />
            ) : null;

          case "roiEstimator":
            return <ROIEstimator key={section.id} />;

          case "trust":
            return <TrustMarquee key={section.id} />;

          case "cta":
            return <CTASection key={section.id} />;

          default:
            return null;
        }
      })}
    </main>
  );
}
