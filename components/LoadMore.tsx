import type { Lang } from "./Header";
import { tUi } from "./i18n";

type Props = {
  onClick: () => void;
  label?: string;
  lang?: Lang;
};

export default function LoadMoreButton({
  onClick,
  label,
  lang = "en",
}: Props) {
  return (
    <button
      type="button"
      className="load-more-btn"
      onClick={onClick}
    >
      {label ?? tUi(lang, "loadMore")}
    </button>
  );
}
