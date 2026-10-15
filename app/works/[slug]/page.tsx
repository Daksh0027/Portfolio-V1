import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/case-studies";
import Link from "next/link";

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({
    slug: slug,
  }));
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = caseStudies[params.slug];

  if (!study) {
    notFound();
  }

  return (
    <div className="case-study-page bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="case-study-hero relative w-full h-[80svh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
        <img
          src={study.heroImage}
          alt={study.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-clamp(40px, 8vw, 100px)">
          <span className="label uppercase tracking-widest text-muted mb-4">{study.category} — {study.year}</span>
          <h1 className="text-clamp(4rem, 10vw, 12rem) font-black uppercase leading-none mb-8">
            {study.title}
          </h1>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-clamp(100px, 15vw, 200px) px-clamp(40px, 8vw, 100px) max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-tighter">The Challenge</h2>
            <p className="text-lg text-muted leading-relaxed">{study.problem}</p>
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-tighter">The Solution</h2>
            <p className="text-lg text-muted leading-relaxed">{study.solution}</p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-zinc-900/50">
        <div className="px-clamp(40px, 8vw, 100px) max-w-7xl mx-auto">
          <h2 className="text-clamp(3rem, 6vw, 8rem) font-black uppercase mb-16 text-center">Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {study.process.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <span className="text-accent font-mono text-xl">0{idx + 1}</span>
                <h3 className="text-xl font-bold uppercase">{item.step}</h3>
                <p className="text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery / Bento Grid */}
      <section className="py-24 px-clamp(40px, 8vw, 100px) max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {study.gallery.map((img, idx) => (
            <div
              key={idx}
              className={`relative group overflow-hidden bg-zinc-900 ${img.span === 'full' ? 'md:col-span-2' : ''}`}
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                <p className="text-sm font-medium uppercase tracking-wider">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="py-32 text-center">
        <Link
          href="/works"
          className="inline-block px-8 py-4 border border-white/20 hover:bg-white hover:text-black transition-colors duration-300 uppercase text-sm font-bold tracking-widest"
        >
          Back to all work
        </Link>
      </section>
    </div>
  );
}
