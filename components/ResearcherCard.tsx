import React from 'react';
import { Researcher } from '../types';
import { Edit2, Trash2, MapPin, BookOpen } from 'lucide-react';

interface ResearcherCardProps {
  researcher: Researcher;
  onEdit: (researcher: Researcher) => void;
  onDelete: (id: string) => void;
}

export const ResearcherCard: React.FC<ResearcherCardProps> = ({ researcher, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img 
          src={researcher.photoUrl} 
          alt={researcher.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(researcher.name)}&background=random&size=256`;
          }}
        />
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(researcher)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-blue-600 hover:text-blue-700 hover:bg-white transition-colors shadow-sm"
            title="Editar Investigador"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => onDelete(researcher.id)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-600 hover:text-red-700 hover:bg-white transition-colors shadow-sm"
            title="Eliminar Investigador"
          >
            <Trash2 size={16} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-md mb-1 ${
            researcher.institution === 'UDG' ? 'bg-red-600 text-white' : 
            researcher.institution === 'KSU' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'
          }`}>
            {researcher.institution === 'UDG' ? 'Prepa 7 UDG' : researcher.institution === 'KSU' ? 'Kent State' : 'Colaborador'}
          </span>
          <h3 className="text-white text-xl font-bold truncate shadow-sm">{researcher.name}</h3>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <BookOpen size={16} className="mr-2 text-indigo-500" />
          <span className="font-medium text-indigo-900">{researcher.researchLine}</span>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed flex-grow text-justify">
          {researcher.biography}
        </p>
      </div>
    </div>
  );
};