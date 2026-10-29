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
  variant = "adaptive",
  className = "",
}: BreadcrumbsProps) {
  const baseText =
    variant === "dark"
      ? "text-slate-300"
      : "text-slate-600 dark:text-slate-300";
  const linkHover =
    variant === "dark"
      ? "hover:text-white"
      : "hover:text-brand-green dark:hover:text-emerald-400";
  const separatorColor =
    variant === "dark"
      ? "text-slate-500"
      : "text-slate-400 dark:text-slate-500";
  const activeColor =
    variant === "dark"
      ? "text-amber-300 font-bold"
      : "text-brand-green dark:text-amber-300 font-bold";

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
