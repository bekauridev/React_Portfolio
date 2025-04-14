import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();

  // Split the current path to create breadcrumb items
  const pathnames = location.pathname.split("/").filter((x) => x);
  // Dynamically generate breadcrumb names based on the route
  const breadcrumbItems = pathnames.map((item, index) => {
    // You can map routes to their human-friendly names
    const routeNames = {
      projects: "Projects",
      home: "Home",
      // Add more route mappings as needed
    };

    // If the route doesn't match routeNames, capitalize the first letter and remove the first character
    const routeName = routeNames[item] || item.charAt(0).toUpperCase() + item.slice(1);

    return {
      name: routeName,
      link: "/" + pathnames.slice(0, index + 1).join("/"),
    };
  });

  return (
    <nav className="mb-6">
      <ol className="flex items-center space-x-2 text-sm font-semibold text-primary-300">
        <li>
          <Link to="/" className="hover:text-primary-100">
            Home
          </Link>
        </li>
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            <span> / </span>

            <Link to={item.link} className="ml-2 hover:text-primary-100">
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
