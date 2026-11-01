"use client";

import { useId, useState } from "react";
import { FiClock } from "react-icons/fi";

import {
  FAQ_CATEGORIES,
  FAQ_ENTRIES,
  FAQ_PENDING,
  type FaqCategoryId,
  type FaqEntry,
} from "@/content/faq";

function entriesFor(category: FaqCategoryId) {
  return FAQ_ENTRIES.filter((entry) => entry.category === category);
}

function AnswerBody({ answer }: { answer: FaqEntry["answer"] }) {
  if (answer === null) {
    return (
      <p className="faq-pending">
        <FiClock aria-hidden />
        {FAQ_PENDING}
      </p>
    );
  }
  const paragraphs = Array.isArray(answer) ? answer : [answer];
  return paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>);
}

export default function FaqBoard() {
  const categories = FAQ_CATEGORIES.filter(
    (category) => entriesFor(category.id).length > 0,
  );
  const [channel, setChannel] = useState<FaqCategoryId>(
    categories[0]?.id ?? "general",
  );
  const [openId, setOpenId] = useState<string | null>(
    entriesFor(channel)[0]?.id ?? null,
  );
  const boardId = useId();
  const entries = entriesFor(channel);

  const switchChannel = (next: FaqCategoryId) => {
    setChannel(next);
    setOpenId(entriesFor(next)[0]?.id ?? null);
  };

  return (
    <div className="faq-board">
      <fieldset className="faq-channels">
        <legend className="sr-only">FAQ categories</legend>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className="faq-channel"
            aria-pressed={channel === category.id}
            onClick={() => switchChannel(category.id)}
          >
            {category.label}
            <span className="faq-channel-count">
              {entriesFor(category.id).length}
            </span>
          </button>
        ))}
      </fieldset>

      <ol key={channel} className="faq-list">
        {entries.map((entry, index) => {
          const open = openId === entry.id;
          const questionId = `${boardId}-${entry.id}-q`;
          const answerId = `${boardId}-${entry.id}-a`;
          return (
            <li
              key={entry.id}
              className="faq-item"
              data-open={open || undefined}
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <h3>
                <button
                  id={questionId}
                  type="button"
                  className="faq-question"
                  aria-expanded={open}
                  aria-controls={answerId}
                  onClick={() => setOpenId(open ? null : entry.id)}
                >
                  <span aria-hidden className="faq-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="faq-question-text">{entry.question}</span>
                  <span aria-hidden className="faq-toggle" />
                </button>
              </h3>
              <section
                id={answerId}
                aria-labelledby={questionId}
                className="faq-answer"
                inert={!open}
              >
                <div className="faq-answer-inner">
                  <AnswerBody answer={entry.answer} />
                </div>
              </section>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
