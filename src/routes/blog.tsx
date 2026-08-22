import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionContainer, SectionHeader, ButtonPrimary, WhatsAppButton } from "../components/recify";
import { blogPosts } from "../lib/blog-posts";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog — Recify" },
      { name: "description", content: "Notes on accounts receivable operations, dispute resolution and cash flow from the Recify team." },
      { property: "og:title", content: "Blog — Recify" },
      { property: "og:description", content: "Notes on accounts receivable operations, dispute resolution and cash flow." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function BlogPage() {
  return (
    <>
      <section className="section-padding pt-28 md:pt-36">
        <SectionContainer>
          <SectionHeader
            kicker="Blog"
            title="Notes on getting"
            highlight="paid."
            subtitle="Writing on accounts receivable operations, payment blockers and cash flow. First articles coming soon."
            align="center"
          />
          
          {blogPosts.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group rounded-3xl border border-border bg-card p-6 md:p-8 transition-all hover:border-primary hover:shadow-lg"
                >
                  <span className="kicker text-primary text-xs font-semibold">{post.category}</span>
                  <h3 className="font-display text-xl font-bold mt-4 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <time className="text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-3xl border border-border bg-card p-8 text-center md:p-12">
              <p className="text-sm text-muted-foreground">Articles in preparation.</p>
            </div>
          )}

          <div className="mt-12 flex flex-col items-center gap-4">
            <ButtonPrimary to="/start">Get your free AR health check</ButtonPrimary>
            <Link to="/" className="kicker hover:text-primary">
              Back to home
            </Link>
          </div>
        </SectionContainer>
      </section>
      <WhatsAppButton />
    </>
  );
}
