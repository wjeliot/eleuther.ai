function getTextColor(word) {
  switch (word) {
    case "Large Language Models":
      return "var(--red)";
    case "Multimodal Modeling":
      return "var(--yellow)";
    case "AI Alignment and Interpretability":
      return "var(--green)";
    case "Biological ML":
      return "var(--blue)";
    case "AI-Assisted Design and Computational Creativity":
      return "var(--purple)";
    default:
      return "var(--black)";
  }
}

export default function Category({ word, clickFunction, active }) {
  function handleClick(word, active) {
    if (clickFunction) {
      clickFunction(word, active);
    }
  }

  return (
    <div onClick={() => handleClick(word, active)}>
      <span>{word}</span>
      <style jsx>{`
        span {
          color: ${active ? getTextColor(word) : "var(--gray)"};
          padding-bottom: 3px;
          border-bottom: medium solid
            ${active ? getTextColor(word) : "var(--gray)"};
          font-weight: 600;
          cursor: pointer;
          line-height: 2;
        }
      `}</style>
    </div>
  );
}
