import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";

export type IconProps = React.SVGProps<SVGSVGElement> & {
  icon: IconDefinition;
  size?: number;
};

function Icon({
  icon,
  color = "currentColor",
  size = 24,
  ...props
}: IconProps) {
  const isValid =
    icon &&
    typeof icon === "object" &&
    "icon" in icon &&
    Array.isArray(icon.icon) &&
    icon.icon.length === 5;

  if (!isValid) {
    console.error(
      "Invalid icon definition provided to Icon component, the <Icon/> component supports icons from @fortawesome/free-solid-svg-icons.",
    );
    return null;
  }

  const [width, height, , , svgPathData] = icon.icon;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      fill={color}
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      {Array.isArray(svgPathData) ? (
        svgPathData.map((d, i) => <path key={i} d={d} />)
      ) : (
        <path d={svgPathData} />
      )}
    </svg>
  );
}

export { Icon };
