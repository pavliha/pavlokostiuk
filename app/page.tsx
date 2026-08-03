import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import CallToActionLink from "@/components/CallToActionLink"
import ExperienceCard from "@/components/ExperienceCard"
import ExternalIcon from "@/components/ExternalIcon"
import HeroBackdrop from "@/components/HeroBackdrop"
import PanelCard from "@/components/PanelCard"
import ScreenshotCard from "@/components/ScreenshotCard"
import SectionHeading from "@/components/SectionHeading"
import SiteFooter from "@/components/SiteFooter"
import SiteNav from "@/components/SiteNav"
import SkillCard from "@/components/SkillCard"
import SocialLinks from "@/components/SocialLinks"
import TagList from "@/components/TagList"
import { EXPERIENCE } from "@/content/experience"
import {
  AIRCAST_SCREENS,
  AIRCAST_TAGS,
  INTO_GE_BUILT,
  INTO_GE_SCREENS,
  INTO_GE_TAGS,
} from "@/content/projects"
import { AIRCAST, INTO_GE } from "@/content/site"
import { HACKATHONS, SKILLS } from "@/content/skills"

export const metadata: Metadata = {
  title: "Pavlo Kostiuk — Custom Software, Faster & Cheaper with AI",
  description:
    "I help business owners design, build, and launch custom software in weeks instead of months — AI-accelerated development that cuts cost without cutting quality.",
}

const NAV = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "E-Commerce", href: "/ecommerce", accent: true },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const

const STATS = [
  { value: "10+", label: "years shipping" },
  { value: "1.9M+", label: "users served" },
  { value: "Founder", label: "of Aircast" },
] as const

const Divider = () => <hr className="border-zinc-200 dark:border-zinc-800 max-w-5xl mx-auto" />

const HomePage = () => (
  <>
    <SiteNav brandHref="/" links={NAV} />

    <header className="min-h-screen flex items-center px-6 sm:px-10 py-28 relative overflow-hidden noise">
      <HeroBackdrop />
      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full text-xs font-medium bg-accent/10 text-indigo-700 dark:text-indigo-300 border border-accent/15">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for new projects
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-4">
            Pavlo Kostiuk — Full-Stack Engineer
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-zinc-900 dark:text-white mb-6">
            Custom software,
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              shipped faster &amp; cheaper
            </span>{" "}
            with AI.
          </h1>
          <p className="text-zinc-700 dark:text-zinc-300 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
            Most business owners wait months and overpay for software that ships late. I help you design, build, and
            launch yours in weeks — AI-accelerated development that cuts cost without cutting quality.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <span className="text-2xl font-bold text-zinc-900 dark:text-white">{value}</span>{" "}
                <span className="text-sm text-zinc-600 dark:text-zinc-400">{label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <CallToActionLink
              source="home-hero"
              label="Book a free call"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-accent text-white hover:bg-accent-strong transition-all shadow-lg shadow-indigo-500/25"
            />
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all"
            >
              See my work
            </a>
          </div>
          <SocialLinks />
        </div>
        <div className="shrink-0 mx-auto lg:mx-0 relative">
          <div className="absolute -inset-6 bg-gradient-to-tr from-indigo-500/30 via-purple-500/20 to-pink-500/30 blur-3xl rounded-full pointer-events-none" />
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <Image
              src="/pavlo.webp"
              alt="Pavlo Kostiuk"
              width={576}
              height={768}
              priority
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </header>

    <Divider />

    <section id="experience" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
      <SectionHeading eyebrow="Experience" title="Professional Work">
        <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mb-12">
          10 years of shipping products across e-commerce, fintech, drone tech, and enterprise SaaS.
        </p>
      </SectionHeading>
      <div className="flex flex-col gap-4">
        {EXPERIENCE.map((role) => (
          <ExperienceCard key={role.title} {...role} />
        ))}
      </div>
    </section>

    <Divider />

    <section id="projects" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
      <SectionHeading eyebrow="Projects" title="Aircast">
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mb-4">
          A drone connectivity platform I founded — streams live video and MAVLink telemetry over 4G/LTE from a
          Raspberry Pi payload to a browser anywhere in the world. The web console lets operators watch live
          RTSP/WebRTC/HLS feeds, manage the camera source, monitor the cellular link, and connect a ground station, with
          secure remote access over Tailscale.
        </p>
      </SectionHeading>
      <div className="flex items-center gap-3 mb-10 flex-wrap">
        <a
          href={AIRCAST}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent-strong transition-all"
        >
          <ExternalIcon />
          Visit Site
        </a>
        <TagList tags={AIRCAST_TAGS} />
      </div>
      <div className="flex flex-col gap-8">
        {AIRCAST_SCREENS.map((screen) => (
          <ScreenshotCard key={screen.src} {...screen} />
        ))}
      </div>
    </section>

    <Divider />

    <section className="py-20 px-6 max-w-5xl mx-auto">
      <SectionHeading title="Into.ge">
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mb-4">
          Full-stack e-commerce platform for a 3D printing store in Tbilisi, Georgia. Built from scratch as a solo
          developer — storefront, admin panel, inventory management, point of sale, checkout with bank integration, and
          three languages (English, Georgian, Russian). An AI assistant can operate the whole store over MCP.
        </p>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mb-4">
          I now offer this as a tailored platform for other small business owners —{" "}
          <Link href="/ecommerce" className="text-accent dark:text-accent-light hover:text-accent-strong dark:hover:text-white underline underline-offset-4">
            see the full functionality overview
          </Link>
          .
        </p>
      </SectionHeading>
      <div className="flex items-center gap-3 mb-10 flex-wrap">
        <a
          href={INTO_GE}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent-strong transition-all"
        >
          <ExternalIcon />
          Visit Site
        </a>
        <TagList tags={INTO_GE_TAGS} />
      </div>
      <div className="flex flex-col gap-8">
        {INTO_GE_SCREENS.map((screen) => (
          <ScreenshotCard key={screen.src} {...screen} />
        ))}
      </div>

      <PanelCard className="mt-10 p-6">
        <h3 className="text-lg font-semibold mb-4">What I Built</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {INTO_GE_BUILT.map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="text-indigo-700 dark:text-indigo-300 mt-0.5">-</span>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">{item}</p>
            </div>
          ))}
        </div>
      </PanelCard>
    </section>

    <Divider />

    <section id="skills" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
      <SectionHeading eyebrow="Skills" title="What I Work With">
        <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mb-12">Core technologies and areas of expertise.</p>
      </SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SKILLS.map((skill) => (
          <SkillCard key={skill.title} {...skill} />
        ))}
      </div>
    </section>

    <Divider />

    <section className="py-20 px-6 max-w-5xl mx-auto">
      <SectionHeading eyebrow="Background" title="Education & Awards" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
        <PanelCard className="p-6">
          <h3 className="text-indigo-700 dark:text-indigo-300 font-semibold mb-3">Education</h3>
          <div className="text-base font-medium">Computer Science, Master&apos;s Degree</div>
          <div className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
            Zaporizhzhia National Technical University
          </div>
        </PanelCard>
        <PanelCard className="p-6">
          <h3 className="text-indigo-700 dark:text-indigo-300 font-semibold mb-3">Hackathons</h3>
          <ul className="space-y-2">
            {HACKATHONS.map(({ place, date }) => (
              <li key={place + date} className="text-zinc-600 dark:text-zinc-400 text-sm flex justify-between gap-4">
                {place} <span className="text-zinc-600 dark:text-zinc-400 text-xs whitespace-nowrap">{date}</span>
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>
    </section>

    <Divider />

    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto text-center scroll-mt-20">
      <SectionHeading eyebrow="Contact" title="Let's build it faster">
        <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-8">
          Book a free 30-minute call. Tell me what you&apos;re building and I&apos;ll show you how AI-accelerated
          development gets it shipped sooner and for less.
        </p>
      </SectionHeading>
      <CallToActionLink
        source="home-contact"
        label="Book a free call"
        className="inline-flex items-center px-8 py-4 rounded-xl font-medium bg-accent text-white hover:bg-accent-strong transition-all mb-10"
      />
      <p className="text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-4">or reach me directly</p>
      <div className="flex justify-center">
        <SocialLinks />
      </div>
    </section>

    <SiteFooter />
  </>
)

export default HomePage
