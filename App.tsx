import React, { useState, useMemo } from 'react';
import { Researcher } from './types';
import { ResearcherCard } from './components/ResearcherCard';
import { ResearcherForm } from './components/ResearcherForm';
import { Plus, GraduationCap, Globe2, Users, Atom, Microscope, FileText, ChevronRight, LayoutGrid } from 'lucide-react';

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

  // Derivar líneas de investigación únicas
  const researchLines = useMemo(() => {
    const lines = researchers.map(r => r.researchLine);
    return [...new Set(lines)];
  }, [researchers]);

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-2 rounded-lg shadow-lg shadow-blue-500/20">
              <Atom className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                Immersive Physics
              </h1>
              <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                Research Collaboration
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            {['Proyecto', 'Líneas', 'Equipo', 'Resultados'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
              >
                {item}
              </a>
            ))}
            <button className="ml-4 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-full hover:bg-slate-800 transition-colors">
              UDG x KSU
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* SECCIÓN 1: PROYECTO (Hero) */}
        <section id="proyecto" className="relative pt-20 pb-32 overflow-hidden bg-white">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-6">
              <Globe2 size={14} />
              Colaboración Internacional
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
              Aprendizaje Inmersivo <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                de Física
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
              Transformando la educación STEM a través de la realidad virtual y aumentada. Un puente de investigación entre México y Estados Unidos.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
               <div className="flex items-center space-x-3 px-6 py-4 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <GraduationCap className="text-udg-red w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-500 font-bold uppercase">México</p>
                    <p className="font-bold text-slate-900">Prepa 7 UDG</p>
                  </div>
               </div>
               
               <div className="hidden sm:block text-slate-300">
                 <ChevronRight size={24} />
               </div>

               <div className="flex items-center space-x-3 px-6 py-4 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Globe2 className="text-ksu-blue w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-500 font-bold uppercase">USA</p>
                    <p className="font-bold text-slate-900">Kent State University</p>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 2: LÍNEAS DE INVESTIGACIÓN */}
        <section id="líneas" className="py-24 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-3 bg-white rounded-xl shadow-sm mb-4">
                <Microscope className="text-indigo-600 w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Líneas de Investigación Activas</h2>
              <p className="text-slate-500 mt-2">Áreas de estudio que nuestro equipo está desarrollando actualmente</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {researchLines.length > 0 ? researchLines.map((line, index) => (
                <div key={index} className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100">
                  <div className="flex items-start justify-between">
                    <div className="p-3 bg-indigo-50 rounded-lg group-hover:bg-indigo-600 transition-colors duration-300">
                      <LayoutGrid className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      En curso
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">{line}</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Investigación enfocada en la mejora del aprendizaje mediante tecnologías emergentes.
                  </p>
                </div>
              )) : (
                <div className="col-span-3 text-center text-slate-400 italic">
                  No hay líneas de investigación registradas aún.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: EQUIPO (INVESTIGADORES) */}
        <section id="equipo" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-12">
               <div>
                 <div className="flex items-center gap-2 mb-2">
                   <Users className="text-indigo-600" size={20} />
                   <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Nuestro Capital Humano</span>
                 </div>
                 <h2 className="text-4xl font-bold text-slate-900">Investigadores</h2>
                 <p className="text-slate-500 mt-2 max-w-2xl">
                   Conoce a los académicos que hacen posible esta colaboración.
                 </p>
               </div>
               <button 
                 onClick={handleAddClick}
                 className="mt-6 md:mt-0 flex items-center space-x-2 bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3 rounded-full transition-all shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-1"
               >
                 <Plus className="w-5 h-5" />
                 <span className="font-medium">Nuevo Perfil</span>
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
              <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <Users className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                <p className="text-slate-500 text-lg font-medium">Aún no hay investigadores registrados.</p>
                <button onClick={handleAddClick} className="text-indigo-600 font-bold hover:underline mt-2">
                  Comienza agregando uno
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SECCIÓN 4: RESULTADOS (PUBLICACIONES) */}
        <section id="resultados" className="py-24 bg-slate-900 text-white relative overflow-hidden">
           {/* Decorative background elements */}
           <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-900/20 skew-x-12 transform origin-top-right"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wide mb-6 border border-indigo-500/30">
                    <FileText size={14} />
                    Producción Científica
                  </div>
                  <h2 className="text-4xl font-bold mb-6">Resultados y Publicaciones</h2>
                  <p className="text-slate-300 text-lg leading-relaxed mb-8">
                    El objetivo final de esta plataforma es difundir el conocimiento generado. Aquí se listarán papers, conferencias y recursos didácticos resultantes de la investigación conjunta entre UDG y KSU.
                  </p>
                  <div className="flex gap-4">
                    <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition-colors">
                      Ver Repositorio
                    </button>
                    <button className="px-6 py-3 bg-transparent border border-slate-700 hover:border-slate-500 hover:bg-slate-800 rounded-lg font-medium transition-colors">
                      Contactar Coordinación
                    </button>
                  </div>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700">
                   <h3 className="text-xl font-bold mb-6 border-b border-slate-700 pb-4">Próximos Hitos</h3>
                   <ul className="space-y-4">
                     {[
                       'Publicación de resultados preliminares (Q3 2024)',
                       'Intercambio de estudiantes investigadores (Q4 2024)',
                       'Simposio de Física Educativa Virtual (2025)'
                     ].map((item, i) => (
                       <li key={i} className="flex items-center space-x-3 text-slate-300">
                         <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                         <span>{item}</span>
                       </li>
                     ))}
                   </ul>
                </div>
              </div>
           </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
             <Atom className="text-slate-600" />
             <span className="text-slate-200 font-bold">Immersive Physics</span>
          </div>
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Proyecto de Investigación Colaborativa. <br className="md:hidden"/>
            Preparatoria 7 (Universidad de Guadalajara) & Kent State University.
          </p>
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