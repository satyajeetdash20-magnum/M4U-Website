import { Hero } from "@/components/sections/Hero";
import { SocialProofBar } from "@/components/sections/SocialProofBar";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import dynamic from "next/dynamic";

const About = dynamic(() =>
  import("@/components/sections/About").then((m) => m.About)
);
const HowItWorks = dynamic(() =>
  import("@/components/sections/HowItWorks").then((m) => m.HowItWorks)
);
const Programs = dynamic(() =>
  import("@/components/sections/Programs").then((m) => m.Programs)
);
const WhatsIncluded = dynamic(() =>
  import("@/components/sections/WhatsIncluded").then((m) => m.WhatsIncluded)
);
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((m) => m.Testimonials)
);
const LeadMagnet = dynamic(() =>
  import("@/components/sections/LeadMagnet").then((m) => m.LeadMagnet)
);
const FAQ = dynamic(() => import("@/components/sections/FAQ").then((m) => m.FAQ));
const FinalCTA = dynamic(() =>
  import("@/components/sections/FinalCTA").then((m) => m.FinalCTA)
);
const Contact = dynamic(() =>
  import("@/components/sections/Contact").then((m) => m.Contact)
);

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProofBar />
      <ProblemSolution />
      <About />
      <HowItWorks />
      <Programs />
      <WhatsIncluded />
      <Testimonials />
      <LeadMagnet />
      <FAQ />
      <FinalCTA />
      <Contact />
    </>
  );
}
