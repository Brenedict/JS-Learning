interface Props {
  children: string;
  onClick: () => void;
}

const Button = ({ children, onClick }: Props) => {
  return (
    <button type="button" className="btn btn-warning" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
