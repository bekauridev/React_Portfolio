import { useEffect, useMemo, useState } from "react";

import { getGoodies, getCategories } from "../features/goodies/api";
import CategoryFilter from "../features/goodies/components/CategoryFilter";
import GoodieCategoryBlock from "../features/goodies/components/GoodieCategoryBlock";
import Breadcrumbs from "../ui/Breadcrumbs";
import SearchBar from "../ui/SearchBar";

function GoodiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const goodies = useMemo(() => getGoodies(), []);
  const categories = useMemo(() => ["All", ...getCategories()], []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const normalizedQuery = searchTerm.trim().toLowerCase();

  const filteredGoodies = useMemo(() => {
    return goodies.filter((goodie) => {
      const matchesCategory =
        activeCategory === "All" ? true : goodie.category === activeCategory;
      const matchesQuery = normalizedQuery
        ? goodie.name.toLowerCase().includes(normalizedQuery) ||
          goodie.description.toLowerCase().includes(normalizedQuery)
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

      {groupedGoodies.length ? (
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
