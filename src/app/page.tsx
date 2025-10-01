// src/app/page.tsx
import Image from 'next/image';

export default function Landing() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* Hero */}
      <section className="text-center">
        <Image
          src="/sdsu-growluv-logo.png"
          alt="SDSU GrowLuv"
          width={800}
          height={300}
          className="mx-auto h-16 w-auto md:h-24"
          priority
        />
        <h1 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight">
          Educate. Eradicate. Empower.
        </h1>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
          SDSU GrowLuv is a student organization committed to service, growth, and community.
        </p>

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/members"
            className="rounded-lg px-5 py-3 bg-slate-900 text-white hover:bg-slate-800"
          >
            View Members & Points
          </a>
          <a
            href="#about"
            className="rounded-lg px-5 py-3 border border-slate-300 hover:bg-slate-50"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Simple sections you can expand later */}
      <section id="about" className="mt-16 grid gap-8 md:grid-cols-3">
        <div className="rounded-xl border p-6">
          <h3 className="font-semibold text-lg">Our Mission</h3>
          <p className="mt-2 text-slate-600">
            We’re building leadership and service opportunities for SDSU students. Our goal is to create a movement to educate and eradicate human abuse while inspiring love and kindness globally. We believe that every life is precious, and that humanity is worth protecting and saving.
          </p>
        </div>
        <div className="rounded-xl border p-6">
          <h3 className="font-semibold text-lg">Activities</h3>
          <p className="mt-2 text-slate-600">
            Workshops, volunteering, campus events, and peer mentorship.
          </p>
        </div>
        <div className="rounded-xl border p-6">
          <h3 className="font-semibold text-lg">Join Us</h3>
          <p className="mt-2 text-slate-600">
            Attend a meeting, earn points, and grow with the community.
          </p>
        </div>
      </section>
    </main>
  );
}
