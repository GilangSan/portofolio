export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border-subtle)] bg-page">
      <div className="flex flex-col md:flex-row justify-between items-center py-12 px-8 md:px-12 max-w-[1440px] mx-auto gap-4">
        <div className="font-bold text-heading text-lg tracking-[0.2em] uppercase">LANG</div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-heading font-bold">
          © {new Date().getFullYear()} LANG. ARCHITECTURAL MINIMALISM.
        </div>
        <div className="flex gap-6">
          {["LinkedIn", "GitHub", "Archive"].map((link) => (
            <a key={link} href="#"
              className="text-[10px] uppercase tracking-[0.2em] text-body hover:underline underline-offset-4 hover:text-heading transition-all font-bold">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
