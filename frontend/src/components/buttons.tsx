type ButtonsProps = {
  content: string;
  onClick: () => void;
};

function Buttons({ content, onClick }: ButtonsProps) {
  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={onClick}
      style={{ margin: "10px" }}
    >
      {content}
    </button>
  );
}

export default Buttons;
