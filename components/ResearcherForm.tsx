import React, { useState, useEffect } from 'react';
import { Researcher, Institution } from '../types';
import { X, Sparkles, Upload, Loader2 } from 'lucide-react';
import { refineBiography } from '../services/geminiService';

interface ResearcherFormProps {
  initialData?: Researcher | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Researcher) => void;
}

export const ResearcherForm: React.FC<ResearcherFormProps> = ({ initialData, isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState<Institution>('UDG');
  const [researchLine, setResearchLine] = useState('');
  const [biography, setBiography] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setInstitution(initialData.institution);
      setResearchLine(initialData.researchLine);
      setBiography(initialData.biography);
      setPhotoUrl(initialData.photoUrl);
    } else {
      resetForm();
    }
  }, [initialData, isOpen]);

  const resetForm = () => {
    setName('');
    setInstitution('UDG');
    setResearchLine('');
    setBiography('');
    setPhotoUrl('https://picsum.photos/400/400');
  };

  const handleEnhanceBio = async () => {
    if (!biography.trim()) return;
    setIsEnhancing(true);
    const enhanced = await refineBiography(biography);
    setBiography(enhanced);
    setIsEnhancing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: initialData ? initialData.id : crypto.randomUUID(),
      name,
      institution,
      researchLine,
      biography,
      photoUrl
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">
            {initialData ? 'Editar Investigador' : 'Agregar Nuevo Investigador'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Dr. Juan Pérez"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institución</label>
                <select
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value as Institution)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="UDG">Preparatoria 7 (UDG)</option>
                  <option value="KSU">Kent State University (KSU)</option>
                  <option value="Other">Otro Colaborador</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Línea de Investigación</label>
                <input
                  type="text"
                  required
                  value={researchLine}
                  onChange={(e) => setResearchLine(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ej. Realidad Virtual en Física Óptica"
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4">
              <label className="block text-sm font-medium text-gray-700 w-full">Foto de Perfil</label>
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-inner group cursor-pointer bg-gray-50">
                <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs text-center px-2">Pegar URL abajo</span>
                </div>
              </div>
              <div className="w-full">
                 <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="https://example.com/photo.jpg"
                />
                <p className="text-xs text-gray-400 mt-1">Usa una URL de imagen directa.</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Bibliografía / Semblanza</label>
              <button
                type="button"
                onClick={handleEnhanceBio}
                disabled={isEnhancing || !biography}
                className={`flex items-center text-xs px-3 py-1 rounded-full transition-all ${
                  isEnhancing 
                    ? 'bg-purple-100 text-purple-400 cursor-not-allowed' 
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                {isEnhancing ? <Loader2 size={12} className="animate-spin mr-1"/> : <Sparkles size={12} className="mr-1"/>}
                {isEnhancing ? 'Mejorando...' : 'Mejorar con IA'}
              </button>
            </div>
            <textarea
              required
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              rows={5}
              maxLength={1000}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Escribe una breve descripción del investigador (máx. 150 palabras)..."
            ></textarea>
            <div className="flex justify-between mt-1">
               <p className="text-xs text-gray-500">
                Palabras aprox: {biography.split(/\s+/).filter(w => w.length > 0).length} / 150
              </p>
              {isEnhancing && <span className="text-xs text-purple-600 animate-pulse">Gemini está optimizando el texto...</span>}
            </div>
           
          </div>

          <div className="flex justify-end pt-4 space-x-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-200 transition-all transform hover:scale-105"
            >
              Guardar Perfil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};