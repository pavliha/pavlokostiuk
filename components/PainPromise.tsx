const PainPromise = ({ promise, proof }: { promise: string; proof: string }) => (
  <div className="border-t border-rule pt-3 flex gap-3">
    <span
      aria-hidden="true"
      className="mt-[0.62em] h-px w-1.5 shrink-0 bg-primary dark:bg-brand-light"
    />
    <div>
      <p className="claim text-base text-ink mb-1">{promise}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{proof}</p>
    </div>
  </div>
)

export default PainPromise
