import GoodieCard from "./GoodieCard";

function GoodieCategoryBlock({ title, goodies, showCategoryLabel = false }) {
  if (!goodies.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-700/40 pb-3">
        <div>
          <h2 className="text-2xl font-semibold text-gray-100">{title}</h2>
          <p className="text-sm text-gray-400/90">
            {goodies.length} helpful tool{goodies.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {goodies.map((goodie) => (
          <GoodieCard key={goodie.id} goodie={goodie} showCategoryLabel={showCategoryLabel} />
        ))}
      </div>
    </section>
  );
}

export default GoodieCategoryBlock;
