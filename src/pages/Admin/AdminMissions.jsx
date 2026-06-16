import { useState, useEffect } from 'react';
import { db, storage } from '../../services/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Trash2, PlusCircle, Loader } from 'lucide-react';

const AdminMissions = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMission, setNewMission] = useState({ title: '', desc: '', category: '' });
  const [imageFile, setImageFile] = useState(null);

  // Charger les missions depuis Firestore
  const fetchMissions = async () => {
    const querySnapshot = await getDocs(collection(db, "missions"));
    setMissions(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  // Ajouter une mission
  const handleAddMission = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      // Upload image si présente
      if (imageFile) {
        const storageRef = ref(storage, `missions/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Ajouter dans Firestore
      await addDoc(collection(db, "missions"), {
        ...newMission,
        imageUrl,
        date: new Date().toISOString()
      });

      // Reset
      setNewMission({ title: '', desc: '', category: '' });
      setImageFile(null);

      fetchMissions();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout");
    }

    setLoading(false);
  };

  // Supprimer une mission
  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cette mission ?")) {
      await deleteDoc(doc(db, "missions", id));
      fetchMissions();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Gérer les Missions</h2>

      {/* Formulaire d'ajout */}
      <form onSubmit={handleAddMission} className="bg-white p-6 rounded-lg shadow mb-8 grid gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Titre de la mission"
          value={newMission.title}
          onChange={(e) => setNewMission({ ...newMission, title: e.target.value })}
          required
        />

        <textarea
          className="border p-2 rounded"
          placeholder="Description"
          value={newMission.desc}
          onChange={(e) => setNewMission({ ...newMission, desc: e.target.value })}
        />

        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          accept="image/*"
        />

        <button
          disabled={loading}
          className="bg-forest-600 text-white py-2 rounded flex items-center justify-center gap-2"
        >
          {loading ? <Loader className="animate-spin" /> : <PlusCircle size={20} />}
          Ajouter la mission
        </button>
      </form>

      {/* Liste des missions */}
      <div className="grid md:grid-cols-2 gap-4">
        {missions.map(m => (
          <div key={m.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-bold">{m.title}</h3>
              <p className="text-sm text-gray-500">{m.category}</p>
            </div>

            <button
              onClick={() => handleDelete(m.id)}
              className="text-red-500 hover:bg-red-50 p-2 rounded"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMissions;
