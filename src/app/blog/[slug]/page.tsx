import { Metadata } from "next"
import Link from "next/link"
import { blogPosts } from "@/data/blog-posts"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}

  return {
    title: `${post.title} | Sorci Digit`,
    description: post.description,
    keywords: post.keywords.join(", "),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://www.sorcidigit.com/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updatedDate || post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.coverAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
    alternates: {
      canonical: `https://www.sorcidigit.com/blog/${post.slug}`,
    },
  }
}

function renderContent(content: string[]) {
  return content.map((paragraph, i) => {
    if (paragraph.startsWith("## ")) {
      return (
        <h2 key={i} className="text-2xl md:text-3xl font-bold text-black mt-12 mb-4 tracking-tight">
          {paragraph.replace("## ", "")}
        </h2>
      )
    }
    if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
      return (
        <p key={i} className="text-gray-600 text-lg leading-relaxed mb-6 grotesk font-bold text-black">
          {paragraph.replace(/\*\*/g, "")}
        </p>
      )
    }
    // Handle inline **bold** in paragraphs
    const parts = paragraph.split(/(\*\*[^*]+\*\*)/g)
    if (parts.length > 1) {
      return (
        <p key={i} className="text-gray-600 text-lg leading-relaxed mb-6 grotesk">
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j} className="text-black">{part.replace(/\*\*/g, "")}</strong>
            ) : (
              <span key={j}>{part}</span>
            )
          )}
        </p>
      )
    }
    return (
      <p key={i} className="text-gray-600 text-lg leading-relaxed mb-6 grotesk">
        {paragraph}
      </p>
    )
  })
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-[#fafafa] text-black pt-32 pb-24 px-4">
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <nav className="mb-8 grotesk text-sm text-gray-400">
          <Link href="/" className="hover:text-black transition-colors">Accueil</Link>
          <span className="mx-2">›</span>
          <Link href="/blog" className="hover:text-black transition-colors">Blog</Link>
          <span className="mx-2">›</span>
          <span className="text-black">{post.category}</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full grotesk">
              {post.category}
            </span>
            <span className="text-xs text-gray-400 grotesk">{post.readTime} de lecture</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-black tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold grotesk">
              {post.author.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-black grotesk">{post.author}</div>
              <div className="text-sm text-gray-400 grotesk">{post.authorRole}</div>
            </div>
            <span className="ml-auto text-sm text-gray-400 grotesk">
              {new Date(post.date).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* Content */}
        <article className="mb-16">
          {renderContent(post.content)}
        </article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-16">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-white border border-gray-100 rounded-full text-xs font-bold text-gray-500 grotesk"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Author CTA */}
        <div className="bg-black text-white rounded-[3rem] p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gray-800 rounded-full blur-[100px] opacity-50" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-medium mb-4 serif italic">
              Vous avez un projet digital ?
            </h3>
            <p className="text-gray-400 grotesk mb-6 max-w-lg">
              Nous aidons les entreprises au Niger à développer leur présence en ligne. Parlons de votre projet.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full text-base font-bold grotesk hover:bg-gray-100 transition-all"
            >
              Nous contacter →
            </Link>
          </div>
        </div>

        {/* Other posts */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-8 tracking-tight">
            Articles similaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherPosts.map((other) => (
              <Link
                key={other.slug}
                href={`/blog/${other.slug}`}
                className="group bg-white rounded-[2rem] p-6 border border-gray-100 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest grotesk block mb-3">
                  {other.category}
                </span>
                <h3 className="text-lg font-bold text-black leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                  {other.title}
                </h3>
                <span className="text-xs text-gray-400 grotesk">{other.readTime}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
