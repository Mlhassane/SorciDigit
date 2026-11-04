import { Metadata } from "next"
import Link from "next/link"
import { blogPosts } from "@/data/blog-posts"

export const metadata: Metadata = {
  title: "Blog | Stratégies Digitales pour le Niger - Sorci Digit",
  description:
    "Conseils marketing digital, SEO et développement web pour les entreprises au Niger. Guides pratiques pour développer votre présence en ligne en Afrique de l'Ouest.",
  openGraph: {
    title: "Blog | Sorci Digit",
    description:
      "Conseils marketing digital et SEO pour les entreprises au Niger et en Afrique de l'Ouest.",
    type: "website",
    url: "https://www.sorcidigit.com/blog",
    images: [
      {
        url: "/1.png",
        width: 1200,
        height: 630,
        alt: "Sorci Digit - Blog",
      },
    ],
  },
  alternates: {
    canonical: "https://www.sorcidigit.com/blog",
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-black pt-32 pb-24 px-4 overflow-hidden">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] min-w-[500px] min-h-[500px] bg-gray-200/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[10px] md:text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-6 grotesk">
            Blog & Conseils
          </span>
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-[6rem] font-medium mb-6 text-black tracking-tight serif italic leading-[1.1] md:leading-[1]">
            Le <span className="not-italic font-bold">Blog.</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-2xl max-w-2xl mx-auto grotesk leading-relaxed">
            Stratégies, guides et conseils pratiques pour réussir en ligne au Niger et en Afrique de l'Ouest.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-[2rem] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                <img
                  src={post.coverImage}
                  alt={post.coverAlt}
                  className="w-20 h-20 object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full grotesk">
                  {post.category}
                </span>
                <span className="absolute top-4 right-4 px-3 py-1 bg-white/80 backdrop-blur text-gray-500 text-[10px] font-bold rounded-full grotesk">
                  {post.readTime}
                </span>
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-black tracking-tight leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm grotesk leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-xs text-gray-400 grotesk">
                    {new Date(post.date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-xs font-bold text-black grotesk group-hover:translate-x-1 transition-transform">
                    Lire →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-32 max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-[3rem] p-12 py-20 border border-gray-100 shadow-[0_4px_40px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-100/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-4xl md:text-5xl font-medium mb-6 text-black serif italic relative z-10">
              Prêt à passer au niveau supérieur ?
            </h2>
            <p className="text-gray-500 mb-10 text-lg grotesk max-w-lg mx-auto relative z-10">
              Nous transformons vos idées en projets digitaux qui convertissent. Parlons-en.
            </p>
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-black text-white rounded-full text-lg font-bold overflow-hidden transition-all hover:scale-[1.02] shadow-[0_10px_40px_rgba(0,0,0,0.1)] grotesk z-10"
            >
              <span className="relative z-10">Démarrer un projet</span>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
              <div className="absolute inset-0 bg-gray-800 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
