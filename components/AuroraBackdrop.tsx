/** Ambient drifting glow blobs (pure CSS, see .aurora-blob in skins/blue.css). */
export default function AuroraBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      <div className="aurora-blob aurora-blob--a w-[45vw] h-[45vw] max-w-[560px] max-h-[560px] -left-[10vw] top-[8%]" />
      <div className="aurora-blob aurora-blob--b w-[38vw] h-[38vw] max-w-[480px] max-h-[480px] right-[-8vw] top-[22%]" />
      <div className="aurora-blob aurora-blob--c w-[32vw] h-[32vw] max-w-[420px] max-h-[420px] left-[30%] bottom-[-10%]" />
    </div>
  );
}
