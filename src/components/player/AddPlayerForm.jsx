import { useState } from "react";
import Button from "../common/Button";

const AddPlayerForm = ({ onAdd, loading }) => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Player name required");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);

    if (photo) {
      formData.append("photo", photo);
    }

    await onAdd(formData);

    setName("");
    setPhoto(null);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow mb-4">

      <h2 className="text-xl font-bold text-center mb-4">
        Add Player
      </h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Player Name
        </label>

        <input
          type="text"
          placeholder="Player Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-xl mb-3 outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Photo Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Profile Photo
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="w-full border p-2 rounded-xl"
        />
      </div>

      {/* Preview */}
      {photo && (
        <div className="flex justify-center mb-4">
          <img
            src={URL.createObjectURL(photo)}
            alt="preview"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
        </div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Add Player"}
      </Button>
    </div>
  );
};

export default AddPlayerForm;