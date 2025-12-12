import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);

  const routeNames = {
    projects: "Projects",
    blog: "Blog",
    home: "Home",
  };

  const breadcrumbItems = pathnames.map((item, index) => {
    const routeName = routeNames[item] || item; // keep slug as-is (or prettify if you want)

    return {
      name: routeName,
      link: "/" + pathnames.slice(0, index + 1).join("/"),
      isLast: index === pathnames.length - 1,
    };
  });

  return (
    <nav className="mb-6">
      <ol className="flex items-center space-x-0.5 text-sm font-semibold text-primary-300">
        <li>
          <Link to="/" className="hover:text-primary-100">
            Home
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex min-w-0 items-center">
            <span className="mx-2">/</span>

            <Link
              to={item.link}
              className={[
                "hover:text-primary-100",
                // only truncate on mobile AND only for the last crumb
                item.isLast ? "truncate max-w-[120px] md:max-w-none" : "",
              ].join(" ")}
              title={item.isLast ? item.name : undefined} // shows full on long-press/hover
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
