import { FiLock } from "react-icons/fi";

const RUPEES = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export default function PrizeAmount({ amount }: { amount: number | null }) {
  if (amount === null) {
    return (
      <span className="prize-amount" data-sealed>
        <FiLock aria-hidden />
        Sealed
        <small>To be announced</small>
      </span>
    );
  }

  const parts = RUPEES.formatToParts(amount);
  const symbol = parts.find((part) => part.type === "currency")?.value;
  const figure = parts
    .filter((part) => part.type !== "currency" && part.type !== "literal")
    .map((part) => part.value)
    .join("");

  return (
    <span className="prize-amount">
      <span className="prize-currency">{symbol}</span>
      {figure}
    </span>
  );
}
