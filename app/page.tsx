import { Hero } from "@/components/sections/Hero";
import { SocialProofBar } from "@/components/sections/SocialProofBar";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { About } from "@/components/sections/About";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Programs } from "@/components/sections/Programs";
import { WhatsIncluded } from "@/components/sections/WhatsIncluded";
import { Testimonials } from "@/components/sections/Testimonials";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Contact } from "@/components/sections/Contact";

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
