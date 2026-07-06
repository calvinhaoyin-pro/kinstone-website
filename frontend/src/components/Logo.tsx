const LOGO_DARK = "/images/company/kinstone_logo_sharp.svg"; // dark wordmark, for light bg
const LOGO_LIGHT = "/images/company/kinstone_logo_sharp_light.svg"; // light wordmark, for dark bg

interface LogoProps {
  className?: string;
  /** "onDark" (default) uses the light wordmark for dark backgrounds. */
  variant?: "onDark" | "onLight";
}

export default function Logo({ className = "h-8", variant = "onDark" }: LogoProps) {
  return (
    <img
      src={variant === "onDark" ? LOGO_LIGHT : LOGO_DARK}
      alt="Kingstone"
      className={`${className} w-auto object-contain`}
    />
  );
}
