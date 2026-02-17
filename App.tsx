import React, { useState } from 'react';
import { Researcher } from './types';
import { ResearcherCard } from './components/ResearcherCard';
import { ResearcherForm } from './components/ResearcherForm';
import { Plus, GraduationCap, Globe2, Users, Atom } from 'lucide-react';

const INITIAL_RESEARCHERS: Researcher[] = [
  {
    id: '1',
    name: 'Dr. Alejandro García',
    institution: 'UDG',
    photoUrl: 'https://picsum.photos/id/1025/400/400',
    researchLine: 'Simulaciones Inmersivas',
    biography: 'Profesor titular en la Preparatoria 7 de la UDG. Especialista en el desarrollo de entornos virtuales para la enseñanza de la mecánica clásica. Ha publicado diversos artículos sobre el impacto cognitivo de la realidad virtual en estudiantes de bachillerato.'
  },
  {
    id: '2',
    name: 'Dr. Sarah Smith',
    institution: 'KSU',
    photoUrl: 'https://picsum.photos/id/1011/400/400',
    researchLine: 'Física Computacional',
    biography: 'Investigadora principal en el Departamento de Física de Kent State University. Colabora internacionalmente en proyectos de educación STEM. Su enfoque actual es la visualización de datos complejos mediante herramientas de realidad aumentada.'
  },
  {
    id: '3',
    name: 'Mtra. Elena Torres',
    institution: 'UDG',
    photoUrl: 'https://picsum.photos/id/338/400/400',
    researchLine: 'Pedagogía Digital',
    biography: 'Experta en diseño instruccional para plataformas e-learning. Trabaja en la integración curricular de herramientas inmersivas en el programa de física de la Universidad de Guadalajara.'
  }
];

export default function App() {
  const [researchers, setResearchers] = useState<Researcher[]>(INITIAL_RESEARCHERS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingResearcher, setEditingResearcher] = useState<Researcher | null>(null);

  const handleAddClick = () => {
    setEditingResearcher(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (researcher: Researcher) => {
    setEditingResearcher(researcher);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este investigador?')) {
      setResearchers(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleSave = (data: Researcher) => {
    if (editingResearcher) {
      setResearchers(prev => prev.map(r => r.id === data.id ? data : r));
    } else {
      setResearchers(prev => [...prev, data]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Atom className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-600">
                Aprendizaje Inmersivo de Física
              </h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide">
                UDG PREPA 7 <span className="mx-1">•</span> KENT STATE UNIVERSITY
              </p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
            <a href="#investigadores" className="hover:text-indigo-600 transition-colors">Investigadores</a>
            <a href="#proyecto" className="hover:text-indigo-600 transition-colors">Proyecto</a>
            <a href="#publicaciones" className="hover:text-indigo-600 transition-colors">Publicaciones</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        
        {/* Intro Section */}
        <section id="proyecto" className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Innovando la enseñanza de la física a través de la tecnología
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Un esfuerzo colaborativo internacional para transformar cómo los estudiantes perciben y aprenden los fenómenos físicos mediante entornos virtuales e inmersivos.
          </p>
          <div className="flex justify-center gap-4 pt-4">
             <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                <GraduationCap className="text-red-600 w-5 h-5" />
                <span className="font-semibold text-gray-700">Universidad de Guadalajara</span>
             </div>
             <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                <Globe2 className="text-blue-600 w-5 h-5" />
                <span className="font-semibold text-gray-700">Kent State University</span>
             </div>
          </div>
        </section>

        {/* Researchers Section */}
        <section id="investigadores" className="relative scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 pb-4 border-b border-gray-200">
             <div>
               <div className="flex items-center gap-2 mb-2">
                 <Users className="text-indigo-600" />
                 <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Nuestro Equipo</span>
               </div>
               <h3 className="text-3xl font-bold text-slate-900">Investigadores del Proyecto</h3>
               <p className="text-slate-500 mt-2 max-w-2xl">
                 Conoce a los expertos de UDG y KSU que lideran esta iniciativa de investigación educativa.
               </p>
             </div>
             <button 
               onClick={handleAddClick}
               className="mt-4 md:mt-0 group flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg transition-all shadow-md shadow-indigo-200 hover:shadow-lg"
             >
               <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
               <span className="font-medium">Agregar Investigador</span>
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchers.map(researcher => (
              <ResearcherCard 
                key={researcher.id} 
                researcher={researcher} 
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>

          {researchers.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-400 text-lg">No hay investigadores registrados.</p>
              <button onClick={handleAddClick} className="text-indigo-600 font-medium hover:underline mt-2">
                Agrega el primero aquí
              </button>
            </div>
          )}
        </section>

        {/* Placeholder for future sections */}
        <section id="publicaciones" className="bg-indigo-900 rounded-3xl p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cube-coat.png')]"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
             <h3 className="text-2xl font-bold mb-4">Resultados y Publicaciones</h3>
             <p className="text-indigo-200 mb-8">
               Próximamente se listarán aquí los artículos científicos y hallazgos resultantes de esta colaboración internacional.
             </p>
             <button className="px-6 py-2 border border-indigo-400 rounded-lg hover:bg-indigo-800 transition-colors">
               Ver Repositorio (Próximamente)
             </button>
          </div>
        </section>

      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Proyecto de Aprendizaje Inmersivo de Física. UDG Prepa 7 & KSU.</p>
        </div>
      </footer>

      <ResearcherForm 
        isOpen={isFormOpen}
        initialData={editingResearcher}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}