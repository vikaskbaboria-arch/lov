export default function HomeSkeleton() {
  return (
    <div className="bg-neutral-950 min-h-screen">
      {/* NAVBAR */}
      <div className="h-[60px] border-b border-neutral-900 px-6 flex items-center">
        <div className="w-28 h-6 rounded bg-neutral-900 animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto flex gap-6 px-4 pr-32">
        
        {/* FEED */}
        <div className="flex-1 flex flex-col gap-6 max-w-xl mx-auto">

          {/* USER SUGGESTION */}
        <section className="mx-auto w-full max-w-xl">
  {/* HEADER */}
  <div className="flex items-center justify-between px-5 pt-4 pb-2.5">
    <div className="w-32 h-3 rounded bg-neutral-900 animate-pulse" />

    <div className="w-14 h-3 rounded bg-neutral-900 animate-pulse" />
  </div>

  {/* USERS */}
  <div className="flex gap-2.5 px-5 pb-4 overflow-x-auto border-b border-neutral-900">
    
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="relative flex-none w-[140px] bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 flex flex-col gap-2.5"
      >
        {/* ONLINE DOT */}
        <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-neutral-800 animate-pulse" />

        {/* AVATAR */}
        <div className="w-11 h-11 rounded-full bg-neutral-900 animate-pulse" />

        {/* INFO */}
        <div className="space-y-2">
          <div className="w-20 h-3 rounded bg-neutral-900 animate-pulse" />

          <div className="w-14 h-2 rounded bg-neutral-900 animate-pulse" />
        </div>

        {/* BUTTON */}
        <div className="w-full h-8 rounded-md bg-neutral-900 animate-pulse mt-1" />
      </div>
    ))}
  </div>
</section>

          {/* POSTS */}
          {[1,2,3].map((i) => (
            <div
              key={i}
              className="w-full border-b border-neutral-900 px-5 py-4"
            >
              {/* HEADER */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-neutral-900 animate-pulse" />

                <div className="flex flex-col gap-2">
                  <div className="w-24 h-3 rounded bg-neutral-900 animate-pulse" />
                  <div className="w-16 h-2 rounded bg-neutral-900 animate-pulse" />
                </div>
              </div>

              {/* IMAGE */}
              <div className="w-full aspect-square rounded-xl bg-neutral-900 animate-pulse mb-4" />

              {/* CAPTION */}
              <div className="space-y-2 mb-4">
                <div className="w-full h-3 rounded bg-neutral-900 animate-pulse" />
                <div className="w-3/4 h-3 rounded bg-neutral-900 animate-pulse" />
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4">
                <div className="w-12 h-4 rounded bg-neutral-900 animate-pulse" />
                <div className="w-10 h-4 rounded bg-neutral-900 animate-pulse" />
                <div className="w-10 h-4 rounded bg-neutral-900 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block fixed top-[70px] right-6 w-[300px]">
          <div className="p-5 flex flex-col gap-4">
            {[1,2,3,4,5].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-neutral-900 animate-pulse" />

                <div className="flex-1">
                  <div className="w-24 h-3 rounded bg-neutral-900 animate-pulse mb-2" />
                  <div className="w-32 h-2 rounded bg-neutral-900 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}