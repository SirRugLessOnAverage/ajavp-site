import type { InstagramMediaPost } from "@/lib/types/instagram";
import { GALLERY_PHOTOS } from "@/data/institucional";

interface InstagramFeedProps {
  posts: InstagramMediaPost[];
  updatedAt: string | null;
}

const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/ajavp.javip";

function isSafeMediaUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      (url.hostname.endsWith(".cdninstagram.com") ||
        url.hostname.endsWith(".fbcdn.net"))
    );
  } catch {
    return false;
  }
}

function getInstagramPermalink(value: string): string {
  try {
    const url = new URL(value);
    if (
      url.protocol === "https:" &&
      (url.hostname === "instagram.com" ||
        url.hostname === "www.instagram.com") &&
      /^\/(p|reel|tv)\/[A-Za-z0-9_-]+\/?$/.test(url.pathname)
    ) {
      return url.toString();
    }
  } catch {
    // Use the official profile link when a media permalink is invalid.
  }

  return INSTAGRAM_PROFILE_URL;
}

function formatDate(value: string): string | null {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function InstagramFeed({ posts, updatedAt }: InstagramFeedProps) {
  const validPosts = posts.filter((post) => isSafeMediaUrl(post.media_url));
  const formattedUpdateDate = updatedAt ? formatDate(updatedAt) : null;

  return (
    <section
      id="instagram-recente"
      aria-labelledby="instagram-recente-heading"
      className="mb-16 scroll-mt-24"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <span className="block text-xs font-bold uppercase tracking-widest text-pink-700 dark:text-pink-400 mb-2">
            Instagram Oficial • @ajavp.javip
          </span>
          <h2
            id="instagram-recente-heading"
            className="font-heading text-3xl sm:text-4xl font-black text-brand-navy dark:text-white"
          >
            Publicações Recentes
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Fotografias e momentos recentes partilhados pela AJAVP.
            {formattedUpdateDate && (
              <span className="block mt-1 text-xs text-slate-500 dark:text-slate-400">
                Feed atualizado em {formattedUpdateDate}
              </span>
            )}
          </p>
        </div>
        <a
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="motion-press inline-flex w-fit items-center gap-2 rounded-full bg-linear-to-r from-pink-600 via-red-600 to-amber-500 px-5 py-3 text-xs font-bold text-white shadow-lg"
        >
          📱 Seguir no Instagram ↗
        </a>
      </div>

      {validPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {validPosts.slice(0, 12).map((post) => (
            <a
              key={post.id}
              href={getInstagramPermalink(post.permalink)}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-card group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-colors hover:border-pink-300 dark:border-white/10 dark:bg-slate-950 dark:hover:border-pink-400/50"
              aria-label={`Abrir publicação no Instagram${post.caption ? `: ${post.caption.slice(0, 100)}` : ""}`}
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={post.media_url}
                  alt={post.caption ? post.caption.slice(0, 180) : "Publicação recente da AJAVP no Instagram"}
                  loading="lazy"
                  className="motion-photo-zoom h-full w-full object-cover"
                />
                <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold text-white">
                  Instagram ↗
                </span>
              </div>
              <div className="p-4">
                {formatDate(post.timestamp) && (
                  <time
                    dateTime={post.timestamp}
                    className="mb-2 block text-[11px] font-semibold text-pink-700 dark:text-pink-400"
                  >
                    {formatDate(post.timestamp)}
                  </time>
                )}
                <p className="line-clamp-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  {post.caption || "Ver publicação no Instagram."}
                </p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950">
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
            O feed automático será apresentado aqui quando a ligação segura ao
            Instagram estiver configurada. Enquanto isso, vê alguns destaques
            da nossa galeria.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {GALLERY_PHOTOS.slice(0, 4).map((photo) => (
              <a
                key={photo.id}
                href={photo.src}
                target="_blank"
                rel="noopener noreferrer"
                className="overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="aspect-square h-full w-full object-cover"
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
