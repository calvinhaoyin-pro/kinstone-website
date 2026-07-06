import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import PlaceholderImage from "../components/PlaceholderImage";
import { useLocale } from "../i18n/LocaleContext";

export default function AboutPage() {
  const { t } = useLocale();

  return (
    <div>
      <div className="container-page py-16 sm:py-20">
        <SectionHeading title={t.about.title} />

        <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-primary">{t.about.story.heading}</h2>
            <div className="mt-4 flex flex-col gap-4 text-text-muted">
              {t.about.story.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <PlaceholderImage className="aspect-[4/3] w-full" />
        </div>
      </div>

      <div className="border-y border-border bg-surface py-16 sm:py-20">
        <div className="container-page">
          <h2 className="text-2xl font-semibold text-primary">{t.about.timeline.heading}</h2>
          <ol className="mt-8 flex flex-col gap-8 border-l border-border pl-6">
            {t.about.timeline.items.map((item, index) => (
              <motion.li
                key={`${item.title}-${index}`}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="relative"
              >
                <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-accent" />
                <p className="label-mono text-accent">{item.year}</p>
                <h3 className="mt-1 text-lg font-semibold text-primary">{item.title}</h3>
                <p className="mt-1 text-sm text-text-muted">{item.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      <div className="container-page py-16 sm:py-20">
        <h2 className="text-2xl font-semibold text-primary">{t.about.values.heading}</h2>
        <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
          {t.about.values.items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-bg p-6"
            >
              <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
