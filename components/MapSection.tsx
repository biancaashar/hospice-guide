import React, { useState, useMemo } from 'react';
import { MOCK_HOSPICE_DATA, US_STATES } from '../constants';
import { MapPin, Phone, Globe, Check, AlertCircle, Filter, Search } from 'lucide-react';

export const MapSection: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'All' | 'Non-profit' | 'For-profit' | 'Government'>('All');
  const [filterInpatient, setFilterInpatient] = useState(false);
  const [filterPediatric, setFilterPediatric] = useState(false);

  const filteredFacilities = useMemo(() => {
    return MOCK_HOSPICE_DATA.filter(facility => {
      const matchState = selectedState ? facility.state === selectedState : true;
      const matchType = filterType === 'All' ? true : facility.type === filterType;
      const matchInpatient = filterInpatient ? facility.services.includes("Inpatient Hospice") : true;
      const matchPediatric = filterPediatric ? facility.pediatric === true : true;
      return matchState && matchType && matchInpatient && matchPediatric;
    });
  }, [selectedState, filterType, filterInpatient, filterPediatric]);

  return (
    <div className="w-full min-h-screen bg-sage-50/50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-serif text-sage-900 mb-4">Find Care Near You</h2>
          <p className="text-stone-500 text-lg font-light leading-relaxed">
             Locate accredited hospice agencies in your area. We prioritize transparency so you can find the right fit for your family.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-8 h-fit sticky top-24 bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
            <div className="flex items-center gap-2 text-sage-900 font-bold">
               <Filter className="w-5 h-5" />
               FILTERS
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">State</label>
                <div className="relative">
                  <select
                    value={selectedState || ''}
                    onChange={(e) => setSelectedState(e.target.value || null)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-800 focus:border-sage-400 outline-none appearance-none cursor-pointer hover:bg-stone-100 transition-colors pr-10"
                  >
                    <option value="">All States</option>
                    {US_STATES.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-3.5 w-4 h-4 text-stone-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-600 mb-3">Ownership Type</label>
                <div className="space-y-3">
                  {['All', 'Non-profit', 'For-profit', 'Government'].map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${filterType === type ? 'border-sage-500 bg-sage-500' : 'border-stone-300 bg-white group-hover:border-sage-400'}`}>
                        {filterType === type && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <input 
                        type="radio" 
                        name="orgType" 
                        value={type} 
                        checked={filterType === type} 
                        onChange={() => setFilterType(type as any)} 
                        className="hidden" 
                      />
                      <span className={`text-sm ${filterType === type ? 'text-sage-900 font-medium' : 'text-stone-500 group-hover:text-stone-700'}`}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-stone-100 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filterInpatient ? 'border-sage-500 bg-sage-500' : 'border-stone-300 bg-white group-hover:border-sage-400'}`}>
                    {filterInpatient && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <input type="checkbox" checked={filterInpatient} onChange={e => setFilterInpatient(e.target.checked)} className="hidden" />
                  <span className={`text-sm ${filterInpatient ? 'text-sage-900 font-medium' : 'text-stone-500 group-hover:text-stone-700'}`}>Inpatient Facility</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                   <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filterPediatric ? 'border-sage-500 bg-sage-500' : 'border-stone-300 bg-white group-hover:border-sage-400'}`}>
                    {filterPediatric && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <input type="checkbox" checked={filterPediatric} onChange={e => setFilterPediatric(e.target.checked)} className="hidden" />
                  <span className={`text-sm ${filterPediatric ? 'text-sage-900 font-medium' : 'text-stone-500 group-hover:text-stone-700'}`}>Pediatric Program</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6 px-2">
               <span className="text-sm font-medium text-stone-500">{filteredFacilities.length} Providers Found</span>
               {selectedState && <span className="text-sm font-bold text-sage-600 bg-sage-100 px-3 py-1 rounded-full">Viewing {selectedState}</span>}
            </div>

            {filteredFacilities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-stone-200 rounded-3xl bg-white/50">
                <div className="bg-stone-100 p-4 rounded-full mb-4">
                    <Search className="w-8 h-8 text-stone-400" />
                </div>
                <h3 className="text-xl text-sage-900 font-serif mb-1">No providers found</h3>
                <p className="text-stone-500">Try adjusting your filters or selecting a different state.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredFacilities.map(facility => (
                  <div key={facility.id} className="group bg-white rounded-2xl p-8 shadow-sm border border-stone-100 hover:shadow-md hover:border-sage-200 transition-all">
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-sage-900 font-serif">{facility.name}</h3>
                          <span className={`text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-md ${
                            facility.type === 'Non-profit' ? 'bg-emerald-100 text-emerald-700' :
                            facility.type === 'Government' ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {facility.type}
                          </span>
                        </div>
                        <p className="text-stone-500 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-stone-400" /> {facility.address}
                        </p>
                      </div>
                      <div className="flex gap-2">
                         <a href={`tel:${facility.phone}`} className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-50 text-stone-600 hover:bg-sage-600 hover:text-white transition-colors" title="Call">
                           <Phone className="w-4 h-4" />
                         </a>
                         <a href={facility.website} target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-50 text-stone-600 hover:bg-sage-600 hover:text-white transition-colors" title="Website">
                           <Globe className="w-4 h-4" />
                         </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-stone-100">
                      <div>
                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Services</h4>
                        <div className="flex flex-wrap gap-2">
                          {facility.services.map(s => (
                            <span key={s} className="text-sm bg-stone-100 text-stone-600 px-3 py-1 rounded-full">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Key Features</h4>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600">
                           <span className={`flex items-center gap-2 ${facility.medicareCertified ? '' : 'text-stone-300'}`}>
                             <Check className={`w-4 h-4 ${facility.medicareCertified ? 'text-sage-500' : 'text-stone-300'}`} /> Medicare
                           </span>
                           <span className={`flex items-center gap-2 ${facility.acceptsMedicaid ? '' : 'text-stone-300'}`}>
                             <Check className={`w-4 h-4 ${facility.acceptsMedicaid ? 'text-sage-500' : 'text-stone-300'}`} /> Medicaid
                           </span>
                           <span className={`flex items-center gap-2 ${facility.nursing247 ? '' : 'text-stone-300'}`}>
                             <Check className={`w-4 h-4 ${facility.nursing247 ? 'text-sage-500' : 'text-stone-300'}`} /> 24/7 Nursing
                           </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
)
