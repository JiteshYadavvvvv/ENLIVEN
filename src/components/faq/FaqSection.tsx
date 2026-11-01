import ScrollReveal from "@/components/ui/ScrollReveal";
import { FAQ_COPY } from "@/content/faq";

import FaqBoard from "./FaqBoard";
import ShardField from "./ShardField";
import "./faq.css";

export default function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="faq-hub">
      <ShardField />
      <div aria-hidden className="faq-veil" />
      <div className="faq-inner">
        <ScrollReveal className="faq-intro" repeat>
          <h2 id="faq-title" className="faq-title">
            {FAQ_COPY.title}
          </h2>
          <p className="faq-lede">{FAQ_COPY.intro}</p>
        </ScrollReveal>
        <FaqBoard />
      </div>
    </section>
  );
}
