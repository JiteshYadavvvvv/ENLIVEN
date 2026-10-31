import { FiLock } from "react-icons/fi";

export default function PrizeAmount({ amount }: { amount: string | null }) {
  if (amount) return <span className="prize-amount">{amount}</span>;

  return (
    <span className="prize-amount" data-sealed>
      <FiLock aria-hidden />
      Sealed
      <small>To be announced</small>
    </span>
  );
}
