// AuthImagePattern.jsx
// --------------------------------------------------
// A dark “promo” panel with a 3×3 grid of softly-pulsing squares
// and a heading / sub-heading underneath.
//

const AuthImagePattern = ({
  title = "Join our community",
  subtitle = "Connect with friends, share moments, and stay in touch with your loved ones.",
}) => {
  return (
    <section className="hidden lg:flex min-h-screen items-center justify-center bg-neutral-950 px-12">
      <div className="w-full max-w-md text-center">
        {/* animated 3×3 grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {Array.from({ length: 9 }).map((_, idx) => (
            <div
              key={idx}
              className={`
                  aspect-square rounded-2xl
                  bg-indigo-300/10                /* subtle square tint   */
                  ${
                    idx % 2 === 0 ? "animate-pulse" : "opacity-60"
                  } /* pulse every second square */
                `}
            />
          ))}
        </div>

        {/* copy */}
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
        <p className="text-zinc-400">{subtitle}</p>
      </div>
    </section>
  );
};

export default AuthImagePattern;
