import { site } from "@/lib/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

export function SiteFooter() {
  const links = [
    site.social.linkedin
      ? { href: site.social.linkedin, label: "LinkedIn", icon: LinkedInIcon }
      : null,
    site.social.github
      ? { href: site.social.github, label: "GitHub", icon: GitHubIcon }
      : null,
    { href: site.social.email, label: "Email", icon: MailIcon },
  ].filter(Boolean) as { href: string; label: string; icon: typeof MailIcon }[];

  return (
    <footer className="relative flex flex-col items-center justify-center gap-4 border-t border-white/10 px-6 py-6 md:flex-row">
      <p className="text-xs text-white/40 md:absolute md:left-8">
        © {site.year} {site.name}
      </p>
      <div className="flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="flex items-center gap-2 text-sm text-muted-foreground transition hover:text-tech"
          >
            <link.icon className="size-4" />
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
