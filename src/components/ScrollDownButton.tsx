export function ScrollDownButton({ target }: { target: string }) {
  return (
    <div className="flex justify-center pb-8 pt-4 mt-auto">
      <a
        href={target}
        aria-label="Scroll to next section"
        className="animate-bounce-down text-body hover:text-heading transition-colors"
      >
        <span className="material-symbols-outlined text-[32px]">
          keyboard_arrow_down
        </span>
      </a>
    </div>
  );
}
