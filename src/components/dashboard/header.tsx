/* eslint-disable @next/next/no-img-element */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-24 max-w-[1400px] items-center justify-between px-6 lg:px-8">
        {/* Left: Borusan Oto + Borusan Next logos */}
        <div className="flex items-center gap-5">
          <img
            src="/borusan-oto-logo.jpg"
            alt="Borusan Oto"
            className="h-12 object-contain"
          />
          <div className="h-10 w-px bg-gray-200" />
          <img
            src="/borusan-next.png"
            alt="Borusan Next"
            className="h-16 object-contain"
          />
        </div>

        {/* Right: Powered by Freya */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-400">powered by</span>
          <img
            src="/freya-logo.png"
            alt="Freya"
            className="h-7 object-contain"
          />
        </div>
      </div>
    </header>
  );
}
