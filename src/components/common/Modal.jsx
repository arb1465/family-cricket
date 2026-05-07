const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-4 w-[90%] max-w-md">
        {children}
      </div>
    </div>
  );
};

export default Modal;