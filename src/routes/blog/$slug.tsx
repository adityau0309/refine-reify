import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "../../lib/blog-posts";
import { SectionContainer, WhatsAppButton } from "../../components/recify";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
  head: (context) => {
    const post = blogPosts.find((p) => p.slug === context.params.slug);
    return {
      meta: post
        ? [
            { title: `${post.title} — Recify` },
            { name: "description", content: post.excerpt },
            { property: "og:title", content: `${post.title} — Recify` },
            { property: "og:description", content: post.excerpt },
            { property: "og:type", content: "article" },
            { name: "twitter:card", content: "summary_large_image" },
          ]
        : [{ title: "Blog — Recify" }],
    };
  },
  errorComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-foreground">Post not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The blog post you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/blog"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to blog
          </Link>
        </div>
      </div>
    </div>
  ),
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-foreground">Post not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The blog post you're looking for doesn't exist.
          </p>
          <div className="mt-6">
            <Link
              to="/blog"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Back to blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="section-padding pt-28 md:pt-36">
        <SectionContainer>
          <div className="max-w-3xl mx-auto">
            {/* Back button */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>

            {/* Post metadata */}
            <div className="mb-8">
              <span className="kicker text-primary">{post.category}</span>
              <h1 className="display-heading text-4xl md:text-5xl mt-4 mb-4">{post.title}</h1>
              <p className="text-sm text-muted-foreground">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Post content */}
            <article className="prose prose-sm md:prose-base max-w-none">
              <div
                className="text-foreground leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .split("\n\n")
                    .map((paragraph) => {
                      // Handle headings
                      if (paragraph.startsWith("## ")) {
                        const heading = paragraph.replace("## ", "");
                        return `<h2 class="font-display text-2xl font-bold mt-8 mb-4">${heading}</h2>`;
                      }
                      // Handle bullet points
                      if (paragraph.startsWith("- ")) {
                        const items = paragraph
                          .split("\n")
                          .map((item) => {
                            if (item.startsWith("- ")) {
                              return `<li class="ml-6">${item.replace("- ", "")}</li>`;
                            }
                            return "";
                          })
                          .filter(Boolean)
                          .join("");
                        return `<ul class="space-y-2 mt-4">${items}</ul>`;
                      }
                      // Handle horizontal rule
                      if (paragraph.trim() === "---") {
                        return '<hr class="my-8 border-border" />';
                      }
                      // Handle italic text with links
                      if (paragraph.includes("*") || paragraph.includes("[")) {
                        return `<p>${paragraph
                          .replace(/\*([^*]+)\*/g, "<em>$1</em>")
                          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="font-semibold text-primary hover:underline">$1</a>')}</p>`;
                      }
                      // Regular paragraphs
                      return `<p>${paragraph}</p>`;
                    })
                    .join(""),
                }}
              />
            </article>

            {/* Related posts section */}
            <div className="mt-16 pt-8 border-t border-border">
              <h3 className="font-display text-xl font-bold mb-6">More articles</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {blogPosts
                  .filter((p) => p.slug !== post.slug)
                  .slice(0, 2)
                  .map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      to="/blog/$slug"
                      params={{ slug: relatedPost.slug }}
                      className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-accent"
                    >
                      <span className="kicker text-primary text-xs">{relatedPost.category}</span>
                      <h4 className="font-display text-lg font-bold mt-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-2">{relatedPost.excerpt}</p>
                      <p className="text-xs text-muted-foreground mt-4">
                        {new Date(relatedPost.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>
      <WhatsAppButton />
    </>
  );
}
