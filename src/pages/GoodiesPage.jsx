import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import CategoryFilter from "../features/goodies/components/CategoryFilter";
import GoodieCategoryBlock from "../features/goodies/components/GoodieCategoryBlock";
import useGoodiesQuery from "../features/goodies/useGoodiesQuery";
import { selectGoodies } from "../features/goodies/goodiesSlice";
import Breadcrumbs from "../ui/Breadcrumbs";
import SearchBar from "../ui/SearchBar";

function GoodiesPage() {
  const { data: goodiesData = [], isPending, isError, error } = useGoodiesQuery();
  const goodiesFromStore = useSelector(selectGoodies);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const goodies = goodiesFromStore.length ? goodiesFromStore : goodiesData;

  const categories = useMemo(() => {
    const unique = new Set(goodies.map((goodie) => goodie.category || "Other"));
    return ["All", ...Array.from(unique)];
  }, [goodies]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const normalizedQuery = searchTerm.trim().toLowerCase();

  const filteredGoodies = useMemo(() => {
    return goodies.filter((goodie) => {
      const matchesCategory =
        activeCategory === "All" ? true : goodie.category === activeCategory;
      const matchesQuery = normalizedQuery
        ? (goodie.name || "").toLowerCase().includes(normalizedQuery) ||
          (goodie.description || "").toLowerCase().includes(normalizedQuery)
        : true;

      return matchesCategory && matchesQuery;
    });
  }, [goodies, normalizedQuery, activeCategory]);

  const isFilteredView = normalizedQuery.length > 0 || activeCategory !== "All";

  const groupedGoodies = useMemo(() => {
    if (isFilteredView) {
      return filteredGoodies.length
        ? [{ title: "Results", goodies: filteredGoodies }]
        : [];
    }

    return categories
      .filter((category) => category !== "All")
      .map((category) => ({
        title: category,
        goodies: goodies.filter((goodie) => goodie.category === category),
      }))
      .filter((group) => group.goodies.length > 0);
  }, [categories, goodies, filteredGoodies, isFilteredView]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-6">
        <Breadcrumbs />
      </div>

      <div className="mb-10 space-y-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-100">Goodies</h1>

          <div className="w-full max-w-md">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700/40 bg-primary-900/50 p-4">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelect={(category) => setActiveCategory(category)}
          />
        </div>
      </div>

      {isPending ? (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="space-y-3">
              <div className="h-6 w-40 animate-pulse rounded bg-gray-700/50" />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((__, innerIdx) => (
                  <div
                    key={innerIdx}
                    className="h-36 animate-pulse rounded-2xl border border-slate-700/40 bg-gray-800/40"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-3xl border border-dashed border-slate-700/50 bg-primary-900/40 p-12 text-center text-gray-400">
          {error?.message || "Failed to load goodies. Please try again."}
        </div>
      ) : groupedGoodies.length ? (
        <div className="space-y-8 pb-10">
          {groupedGoodies.map((group) => (
            <GoodieCategoryBlock
              key={group.title}
              title={group.title}
              goodies={group.goodies}
              showCategoryLabel={isFilteredView}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-700/50 bg-primary-900/40 p-12 text-center text-gray-400">
          Nothing matched your search. Try another keyword or pick a different category.
        </div>
      )}
    </section>
  );
}

export default GoodiesPage;
