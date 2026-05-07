import Button from "../common/Button";

const UndoButton = ({ onUndo }) => {
  return (
    <div className="mt-2">
      <Button className="bg-gray-700" onClick={onUndo}>
        Undo Last Ball
      </Button>
    </div>
  );
};

export default UndoButton;