import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

function Button({
  children,
  disabled,
  to,
  targetBlank = true,
  type = "none",
  className,
  hover = true,
  callBack,
}) {
  const base = `inline-block flex items-center gap-2 py-[5px] px-4 rounded-md font-semibold transition-colors duration-300 focus:outline-none focus:ring-0 focus:ring-offset-0 text-sm sm:text-base `;

  const styles = {
    primary:
      base +
      ` bg-primary-500 text-primary-400 border border-transparent ${
        hover
          ? "hover:text-primary-400 hover:bg-transparent hover:border-primary-500"
          : ""
      }`,

    secondary:
      base +
      ` text-primary-300 border border-primary-500 ${
        hover ? "hover:bg-primary-500 hover:text-primary-400" : ""
      }`,

    tertiary:
      base +
      ` text-gray-200 bg-primary-400/70  border border-transparent ${
        hover ? "hover:bg-primary-500 hover:text-primary-400" : ""
      }`,

    plain:
      base +
      ` text-gray-50 font-semibold tracking-wide transition-colors duration-200 ${
        hover ? "hover:text-primary-300" : ""
      }`,
    // when button is used as wrapper
    none: {},
  };

  // Link version
  if (to)
    return (
      <Link
        to={to}
        target={targetBlank ? "_blank" : "_top"}
        className={twMerge(styles[type], className)}
      >
        {children}
      </Link>
    );

  // Button version
  return (
    <button
      disabled={disabled}
      className={twMerge(styles[type], className)}
      onClick={callBack}
    >
      {children}
    </button>
  );
}

// PropTypes for type checking
Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.oneOf(["primary", "secondary", "tertiary", "plain", "none"]).isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
};

export default Button;
