import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/config/site-images";
import { getPrograms, getPublishedStories } from "@/lib/firebase/firestore";
import { ProgramCard } from "@/components/programs/ProgramCard";
import { StoryCard } from "@/components/news/StoryCard";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CallToAction } from "@/components/common/CallToAction";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  MotionCard,
  PulseBadge,
} from "@/components/motion/MotionWrapper";
import {
  Heart,
  BookOpen,
  Users,
  Sparkles,
  ArrowRight,
  Package,
  Shield,
  Church,
} from "lucide-react";

export const revalidate = 60; // revalidate every minute

export default async function HomePage() {
  const programs = await getPrograms();
  const stories = await getPublishedStories();
  const latestStories = stories.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* SECTION B: HERO SECTION */}
      <section className="relative bg-brand-forest text-white overflow-hidden py-24 lg:py-36 border-b border-brand-growth/20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={siteImages.hero.src}
            alt={siteImages.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-brand-forest/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-forest via-brand-forest/60 to-brand-forest/40" />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-growth/25 via-transparent to-transparent pointer-events-none z-1" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <FadeIn direction="down" delay={0.1}>
              <div className="flex justify-center">
                <PulseBadge className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-growth/25 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Established in 2022 &bull; Canada &amp; Ghana</span>
                </PulseBadge>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                {siteConfig.motto}
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <p className="text-xl text-white/95 font-serif italic max-w-2xl mx-auto leading-relaxed">
                Welcome to Faith Fountain Foundation. We put faith into action by
                supporting children, families, and communities in need.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <p className="text-base text-white/80 font-sans max-w-2xl mx-auto leading-relaxed">
                Established in 2022 with our head office in Canada and active
                branches in Ghana, we are dedicated to demonstrating God&apos;s
                love through practical support: equipping schools with books and
                uniforms, providing relief provisions to struggling families,
                caring for children in residential homes, assisting with urgent
                hospital bills, and proclaiming the Gospel.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.5}>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <PrimaryButton href="/donate" variant="growth" size="lg">
                  <Heart className="w-5 h-5 fill-current" />
                  Support Our Work
                </PrimaryButton>
                <SecondaryButton
                  href="/programs"
                  variant="outline-white"
                  size="lg"
                >
                  <BookOpen className="w-5 h-5" />
                  Explore Our Programs
                </SecondaryButton>
              </div>
            </FadeIn>

            {/* Trust Badges */}
            <FadeIn direction="up" delay={0.6}>
              <div className="pt-8 mt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-white/75 max-w-3xl mx-auto">
                <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <p className="font-bold text-white text-sm">Canada &bull; Ghana</p>
                  <p>International Outreach</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <p className="font-bold text-white text-sm">Christian Mission</p>
                  <p>Gospel in Action</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <p className="font-bold text-white text-sm">100% Dedicated</p>
                  <p>Compassionate Care</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SECTION C: INTRODUCTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <FadeIn direction="right">
                <div className="relative rounded-2xl overflow-hidden border border-brand-border aspect-[16/11] bg-brand-ivory shadow-card group">
                  <Image
                    src={siteImages.aboutStory.src}
                    alt={siteImages.aboutStory.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <FadeIn direction="left">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-growth-soft text-brand-growth border border-brand-growth/20">
                  Our Foundation Story
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest tracking-tight leading-tight mt-3">
                  A Foundation Built on Faith and Compassion
                </h2>
                <p className="text-base text-brand-charcoal-muted leading-relaxed font-sans mt-4">
                  Faith Fountain Foundation was established in 2022 with a desire to
                  serve others through Christian faith, compassion, and generosity.
                  We believe every person deserves dignity, care, and genuine
                  opportunities to thrive.
                </p>
                <p className="text-base text-brand-charcoal-muted leading-relaxed font-sans mt-3">
                  Our work responds to immediate tangible needs while preparing a
                  hopeful future where children can learn and families can build
                  sustainable livelihoods. With our head office in Canada and
                  branches in Ghana, we connect people who want to help with
                  communities that need support.
                </p>

                <div className="pt-4">
                  <PrimaryButton href="/about" variant="forest" size="md">
                    Read Our Full Story
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </PrimaryButton>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: OUR FIVE PROGRAMS */}
      <section className="py-20 bg-brand-ivory/50 border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <SectionHeading
              tagline="Core Initiatives"
              title="Our Dedicated Programs"
              subtitle="Explore our five core pathways of Christian service responding to practical needs in education, community relief, child welfare, healthcare, and gospel ministry."
              className="mb-14"
            />
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <StaggerItem key={program.id}>
                <ProgramCard program={program} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn direction="up" delay={0.2} className="mt-12 text-center">
            <SecondaryButton href="/programs" variant="outline-forest" size="lg">
              View All Program Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </SecondaryButton>
          </FadeIn>
        </div>
      </section>

      {/* SECTION E: OUR IMPACT SINCE 2022 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <SectionHeading
              tagline="Documented Activities Since 2022"
              title="Every Act of Kindness Matters"
              subtitle="Faith Fountain Foundation focuses on verified, transparent community activities. Here are our documented outreach milestones since our establishment."
              className="mb-14"
            />
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Impact 1: Happy Home Orphanage */}
            <StaggerItem>
              <MotionCard className="p-6 rounded-xl bg-brand-ivory/60 border border-brand-border space-y-3 h-full">
                <div className="w-12 h-12 rounded-lg bg-brand-forest text-white flex items-center justify-center">
                  <Users className="w-6 h-6 text-emerald-300" />
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-forest">
                  Happy Home Orphanage
                </h3>
                <p className="text-xs text-brand-charcoal-muted leading-relaxed">
                  Ongoing deliveries of food staples, hygiene supplies, and school
                  necessities supporting children and residential caregivers.
                </p>
              </MotionCard>
            </StaggerItem>

            {/* Impact 2: Community Items */}
            <StaggerItem>
              <MotionCard className="p-6 rounded-xl bg-brand-ivory/60 border border-brand-border space-y-3 h-full">
                <div className="w-12 h-12 rounded-lg bg-brand-growth text-white flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-forest">
                  Community Relief Packages
                </h3>
                <p className="text-xs text-brand-charcoal-muted leading-relaxed">
                  Direct distribution of essential household items, clothing, and
                  emergency groceries to vulnerable community members facing
                  hardship.
                </p>
              </MotionCard>
            </StaggerItem>

            {/* Impact 3: Learning Materials */}
            <StaggerItem>
              <MotionCard className="p-6 rounded-xl bg-brand-ivory/60 border border-brand-border space-y-3 h-full">
                <div className="w-12 h-12 rounded-lg bg-brand-forest text-white flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-emerald-300" />
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-forest">
                  School Learning Materials
                </h3>
                <p className="text-xs text-brand-charcoal-muted leading-relaxed">
                  Donations of books, school uniforms, sturdy school bags,
                  exercise books, and mathematical sets to schoolchildren.
                </p>
              </MotionCard>
            </StaggerItem>

            {/* Impact 4: Hospital Bills */}
            <StaggerItem>
              <MotionCard className="p-6 rounded-xl bg-brand-ivory/60 border border-brand-border space-y-3 h-full">
                <div className="w-12 h-12 rounded-lg bg-brand-growth text-white flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-forest">
                  Hospital Bill Relief
                </h3>
                <p className="text-xs text-brand-charcoal-muted leading-relaxed">
                  Financial assistance easing hospital bills and discharge fees
                  for low-income patients facing critical healthcare expenses.
                </p>
              </MotionCard>
            </StaggerItem>
          </StaggerContainer>

          <FadeIn direction="up" delay={0.2} className="mt-10 text-center">
            <SecondaryButton href="/impact" variant="outline-forest" size="md">
              View Detailed Impact &amp; Photo Gallery
              <ArrowRight className="w-4 h-4 ml-2" />
            </SecondaryButton>
          </FadeIn>
        </div>
      </section>

      {/* SECTION F: OUR FUTURE GOALS */}
      <section className="py-20 bg-brand-forest text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-growth/15 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn direction="up">
            <SectionHeading
              dark
              tagline="Our Vision for Tomorrow"
              title="Long-Term Goals for Sustainable Transformation"
              subtitle="While we serve immediate needs today, our heart is set on enduring investments that break cycles of poverty and proclaim everlasting hope."
              className="mb-14"
            />
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {siteConfig.futureGoals.map((goal, idx) => (
              <StaggerItem key={idx}>
                <MotionCard className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/30 transition-colors space-y-3 h-full">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-brand-growth text-white flex items-center justify-center text-xs font-bold">
                      0{idx + 1}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white">
                      {goal.title}
                    </h3>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed font-sans">
                    {goal.description}
                  </p>
                  <div className="pt-2 text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                    Planned Future Initiative
                  </div>
                </MotionCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION G: GET INVOLVED & REQUESTED SUPPLIES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <FadeIn direction="right">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-growth-soft text-brand-growth border border-brand-growth/20">
                  Ways to Participate
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest tracking-tight leading-tight mt-3">
                  How You Can Support Faith Fountain Foundation
                </h2>
                <p className="text-base text-brand-charcoal-muted leading-relaxed font-sans mt-3">
                  Every supporter brings unique resources and talents. We welcome
                  financial contributions, donations of essential educational
                  supplies, volunteer time, and organizational partnerships.
                </p>

                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-brand-growth mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-brand-forest">
                        Donate Securely via PayPal
                      </p>
                      <p className="text-xs text-brand-charcoal-muted">
                        Support education, orphanage care, hospital bill relief,
                        and gospel outreach.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-brand-growth mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-brand-forest">
                        Donate School Supplies &amp; Uniforms
                      </p>
                      <p className="text-xs text-brand-charcoal-muted">
                        Provide tangible learning materials directly to children.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-brand-growth mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-brand-forest">
                        Volunteer or Partner With Us
                      </p>
                      <p className="text-xs text-brand-charcoal-muted">
                        Collaborate with your church, school, or fellowship to
                        strengthen community work.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <PrimaryButton href="/get-involved" variant="growth" size="md">
                    Get Involved Today
                  </PrimaryButton>
                  <SecondaryButton
                    href="/donate"
                    variant="outline-forest"
                    size="md"
                  >
                    Donate Online
                  </SecondaryButton>
                </div>
              </FadeIn>
            </div>

            {/* Requested School Supplies Card */}
            <div className="lg:col-span-6">
              <FadeIn direction="left">
                <div className="p-8 rounded-2xl bg-brand-ivory border border-brand-border shadow-soft space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-growth text-white flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-brand-forest">
                        Requested School Supplies
                      </h3>
                      <p className="text-xs text-brand-charcoal-muted">
                        Items we actively collect for students in Ghana:
                      </p>
                    </div>
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-brand-charcoal">
                    {siteConfig.requestedSchoolSupplies.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-brand-border/60 hover:border-brand-growth/40 transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-brand-growth" />
                        <span className="font-medium text-xs sm:text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs text-brand-charcoal-muted leading-relaxed">
                    Have items to send or donate? Please connect with our team to
                    coordinate shipping and local drop-off in Canada or Ghana.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION H: NEWS AND STORIES */}
      <section className="py-20 bg-brand-ivory/40 border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-growth-soft text-brand-growth border border-brand-growth/20">
                  Latest Updates
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest mt-2">
                  News and Field Stories
                </h2>
                <p className="text-sm text-brand-charcoal-muted mt-2 max-w-xl">
                  Read verified updates from our outreach visits, distributions,
                  and ministry milestones in Ghana.
                </p>
              </div>
              <Link
                href="/news"
                className="inline-flex items-center text-sm font-semibold text-brand-growth hover:text-brand-growth-hover"
              >
                View All Stories <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestStories.map((story) => (
              <StaggerItem key={story.id}>
                <StoryCard story={story} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION I: FINAL CALL TO ACTION */}
      <CallToAction />
    </div>
  );
}