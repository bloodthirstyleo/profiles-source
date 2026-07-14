export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#08080a]/80 backdrop-blur-md">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Glow outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-500/10 border-t-blue-500 animate-spin" />
        {/* Subtle inner pulse circle */}
        <div className="w-8 h-8 rounded-full bg-indigo-500/20 animate-pulse" />
      </div>
    </div>
  );
}
