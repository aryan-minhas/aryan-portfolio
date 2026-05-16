import type { Metadata } from 'next';
import RevealText   from '@/components/ui/RevealText';
import ContactForm  from '@/components/contact/ContactForm';
import ContactInfo  from '@/components/contact/ContactInfo';

export const metadata: Metadata = {
  title: 'Contact',
  description: "Let's build something ruthlessly good. Get in touch with Aryan Ali Khan.",
};

export default function ContactPage() {
  return (
    <>
      {/* ── § 1: Hero ────────────────────────────────────────────────────────── */}
      <section
        className="flex items-end pt-32 pb-20"
        style={{ paddingInline: 'var(--section-pad-x)' }}
      >
        <RevealText
          as="h1"
          className="font-display text-[clamp(4rem,14vw,13rem)] leading-none tracking-widest text-ink"
        >
          SAY HELLO
        </RevealText>
      </section>

      {/* ── § 2: Form + Info ─────────────────────────────────────────────────── */}
      <section
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-24 md:py-32"
        style={{ paddingInline: 'var(--section-pad-x)' }}
      >
        <ContactForm />
        <ContactInfo />
      </section>
    </>
  );
}
