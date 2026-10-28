import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: "dark" | "adaptive";
  className?: string;
}

export function Breadcrumbs({
  items,
  variant = "dark",
  className = "",
}: BreadcrumbsProps) {
  const baseText =
    variant === "adaptive"
      ? "text-slate-500 dark:text-slate-400"
      : "text-gray-400";
  const linkHover =
    variant === "adaptive"
      ? "hover:text-brand-green dark:hover:text-white"
      : "hover:text-white";
  const separatorColor =
    variant === "adaptive"
      ? "text-slate-400 dark:text-slate-600"
      : "text-gray-600";
  const activeColor =
    variant === "adaptive"
      ? "text-brand-green dark:text-amber-400 font-bold"
      : "text-ajavp-gold font-bold";

  return (
    <nav
      aria-label="Caminho de navegação"
      className={`flex flex-wrap items-center gap-1.5 text-xs font-medium ${baseText} ${className}`}
    >
      <Link
        href="/"
        className={`inline-flex items-center gap-1 transition-colors ${linkHover}`}
      >
        <Home className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Início</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={idx} className="inline-flex items-center gap-1.5">
            <ChevronRight
              className={`w-3.5 h-3.5 ${separatorColor}`}
              aria-hidden="true"
            />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className={`transition-colors ${linkHover}`}
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? "page" : undefined}
                className={activeColor}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

