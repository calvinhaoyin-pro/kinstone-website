import SectionHeading from "../components/SectionHeading";
import ContactForm from "../components/ContactForm";
import PlaceholderImage from "../components/PlaceholderImage";
import { useLocale } from "../i18n/LocaleContext";

export default function ContactPage() {
  const { t } = useLocale();

  return (
    <div className="container-page py-16 sm:py-20">
      <SectionHeading title={t.contact.title} subtitle={t.contact.subtitle} />

      <div className="mt-10 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-primary">{t.contact.info.heading}</h2>
          <dl className="mt-4 flex flex-col gap-4 text-sm">
            <div>
              <dt className="font-semibold text-text-muted">{t.contact.info.addressLabel}</dt>
              <dd className="mt-0.5 text-text">{t.contact.info.address}</dd>
            </div>
            <div>
              <dt className="font-semibold text-text-muted">{t.contact.info.phoneLabel}</dt>
              <dd className="mt-0.5 text-text">{t.contact.info.phone}</dd>
            </div>
            <div>
              <dt className="font-semibold text-text-muted">{t.contact.info.emailLabel}</dt>
              <dd className="mt-0.5 text-text">{t.contact.info.email}</dd>
            </div>
            <div>
              <dt className="font-semibold text-text-muted">{t.contact.info.hoursLabel}</dt>
              <dd className="mt-0.5 text-text">{t.contact.info.hours}</dd>
            </div>
          </dl>

          <PlaceholderImage
            className="mt-6 aspect-[4/3] w-full rounded-xl"
            label={t.contact.info.mapPlaceholder}
          />
        </div>
      </div>
    </div>
  );
}
