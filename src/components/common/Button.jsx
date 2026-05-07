const Button = ({ children, onClick, className = "", disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 rounded-xl font-semibold text-white transition active:scale-95 
      ${disabled ? "bg-gray-400" : "bg-blue-600"} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;