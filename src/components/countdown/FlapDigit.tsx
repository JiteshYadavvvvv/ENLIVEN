"use client";

import { useState } from "react";

export default function FlapDigit({ value }: { value: string }) {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState(value);

  if (value !== current) {
    setPrevious(current);
    setCurrent(value);
  }

  return (
    <span className="flap" aria-hidden>
      <span className="flap-half flap-upper">
        <span>{current}</span>
      </span>
      <span className="flap-half flap-lower">
        <span>{previous}</span>
      </span>
      {previous !== current && (
        <>
          <span
            key={`fall-${current}`}
            className="flap-half flap-upper flap-fall"
          >
            <span>{previous}</span>
          </span>
          <span
            key={`land-${current}`}
            className="flap-half flap-lower flap-land"
          >
            <span>{current}</span>
          </span>
        </>
      )}
    </span>
  );
}
