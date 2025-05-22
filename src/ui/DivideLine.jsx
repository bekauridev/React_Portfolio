import { twJoin } from "tailwind-merge";

function DivideLine({ className, type }) {
  const base = " border-t  rounded-xl ";

  const styles = {
    primary: base + "border-border-secondary border-t-2 w-48",
    secondary: base + "border-gray-700 w-48 ",
    forIcon: base + "border-border-secondary border-t-2 w-6",
  };
  return <div className={twJoin(styles[type], className)}></div>;
}

export default DivideLine;

DivideLine.prototype = {
  className: String,
  type: "primary | secondary | forIcon",
};
