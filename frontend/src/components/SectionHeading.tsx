import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ title, subtitle, align = "left" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={align === "center" ? "text-center" : "text-left"}
    >
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle ? (
        <p
          className={`mt-3 max-w-2xl text-base text-text-muted sm:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
