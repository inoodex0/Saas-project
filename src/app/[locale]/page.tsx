import FeaturesBento from "@/components/FeaturesBento";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import MobileAppSection from "@/components/MobileAppSection";
import TrustedBrands from "@/components/TrustedBrands";
import { isLocale, routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

type Params = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Params) {
  const { locale } = await params;
  const active = isLocale(locale) ? locale : routing.defaultLocale;
  setRequestLocale(active);

  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <TrustedBrands/>
      <FeaturesBento/>
      <HowItWorks/>
      <MobileAppSection/>
      
    </main>
  );
}
