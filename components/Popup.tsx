"use client";

import { useTunisContext } from "@/contexts/TunisContext";

/** Modal popup triggered by the portfolio / blog items. */
export default function Popup() {
  const { popup, popupToggle } = useTunisContext();

  if (!popup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
      <div className="relative w-full max-w-900 max-h-full overflow-y-auto bg-black-3 rounded-5 p-6">
        <button
          onClick={() => popupToggle(null)}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white rounded-full bg-accent hover:opacity-80 transition"
          aria-label="Close popup"
        >
          <i className="fa fa-close text-fs-15" />
        </button>
        <div dangerouslySetInnerHTML={{ __html: popup }} />
      </div>
    </div>
  );
}
