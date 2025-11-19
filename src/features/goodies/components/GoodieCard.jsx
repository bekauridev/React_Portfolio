import { HiOutlineArrowSmRight } from "react-icons/hi";

function GoodieCard({ goodie, showCategoryLabel = false }) {
  const { name, description, logo, url, category } = goodie;

  const Wrapper = url ? "a" : "div";
  const wrapperProps = url
    ? { href: url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/70"
    >
      <div className="shadow-primary-950/10 flex h-full flex-col rounded-2xl border border-slate-700/40 bg-primary-900/40 p-4 shadow-lg transition-colors duration-200 group-hover:border-primary-400/50 group-hover:bg-primary-900/60">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-800/70 ring-1 ring-white/5">
            {logo ? (
              <img
                src={logo}
                alt={`${name} logo`}
                className="h-8 w-8 object-contain"
                loading="lazy"
              />
            ) : (
              <span className="text-lg font-semibold text-gray-200">
                {name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-100">{name}</h3>
            {showCategoryLabel && (
              <p className="text-xs font-medium uppercase tracking-wide text-primary-200/80">
                {category}
              </p>
            )}
          </div>
        </div>

        <p className="mt-3 flex-1 text-sm text-gray-300/90">{description}</p>

        <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary-200">
          Explore tool
          <HiOutlineArrowSmRight className="text-lg" />
        </span>
      </div>
    </Wrapper>
  );
}

export default GoodieCard;
