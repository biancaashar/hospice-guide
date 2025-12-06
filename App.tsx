
import React, { useState } from 'react';
import { Page } from './types';
import { MapSection } from './components/MapSection';
import { FAQS, GLOSSARY } from './constants';
import { generateConversationScript } from './services/geminiService';
import { 
  Heart, 
  Map as MapIcon, 
  BookOpen, 
  Phone, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  FileText,
  MessageCircle,
  Stethoscope,
  AlertTriangle,
  Check,
  Play,
  Activity,
  User,
  Leaf,
  Sun,
  Clock
} from 'lucide-react';

// --- Shared Components ---

const Button: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'outline'; 
  className?: string;
  disabled?: boolean;
}> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  disabled = false
}) => {
  const baseStyle = "px-8 py-3.5 font-sans font-medium tracking-wide text-sm transition-all duration-300 flex items-center gap-2 justify-center rounded-full shadow-sm";
  const variants = {
    primary: "bg-sage-600 text-white hover:bg-sage-700 hover:shadow-md hover:-translate-y-0.5 disabled:bg-sage-400",
    secondary: "bg-stone-200 text-stone-800 hover:bg-stone-300 disabled:bg-stone-100",
    outline: "bg-transparent border border-sage-600 text-sage-700 hover:bg-sage-50 disabled:opacity-50"
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-16 text-center max-w-3xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-serif text-sage-900 mb-4">{title}</h2>
    {subtitle && <p className="text-stone-500 text-lg md:text-xl font-light leading-relaxed">{subtitle}</p>}
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-lg transition-all duration-500 ${className}`}>
    {children}
  </div>
);

// --- Sub-components for specific pages ---

const Hero = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="relative min-h-[90vh] flex flex-col justify-center bg-soft-gradient overflow-hidden">
    {/* Decorative organic shapes */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sage-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-stone-100 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
    
    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-50 border border-sage-100 text-sage-700 text-sm font-medium mb-8">
        <Heart className="w-4 h-4 fill-sage-200" />
        <span>You don't have to navigate this alone</span>
      </div>
      
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-sage-900 leading-tight mb-8">
        Clarity, comfort, <br />
        <span className="text-sage-600 italic">and care.</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-stone-600 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
        A compassionate guide to understanding end-of-life care options, planning for the future, and finding support for your family.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button onClick={() => setPage(Page.OPTIONS)} variant="primary" className="text-base px-10 py-4">
          Understand Your Options
        </Button>
        <Button onClick={() => setPage(Page.FIND_HOSPICE)} variant="outline" className="text-base px-10 py-4">
          Find Hospice Near You
        </Button>
      </div>
    </div>

    <div className="relative z-10 mt-24 max-w-6xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
      <div className="text-center p-4">
        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-sage-600">
          <Heart className="w-6 h-6" />
        </div>
        <h3 className="text-sage-900 font-serif text-xl mb-2">Support</h3>
        <p className="text-stone-500">Immediate resources for families facing difficult decisions.</p>
      </div>
      <div className="text-center p-4">
        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-sage-600">
          <FileText className="w-6 h-6" />
        </div>
        <h3 className="text-sage-900 font-serif text-xl mb-2">Planning</h3>
        <p className="text-stone-500">Tools and templates to start the important conversations.</p>
      </div>
      <div className="text-center p-4">
        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-sage-600">
          <MapIcon className="w-6 h-6" />
        </div>
        <h3 className="text-sage-900 font-serif text-xl mb-2">Connection</h3>
        <p className="text-stone-500">Find trusted, accredited care providers in your community.</p>
      </div>
    </div>
  </div>
);

const EmergencyBar = () => (
  <div className="w-full bg-stone-100 border-b border-stone-200">
    <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
      <div className="flex items-center gap-2 text-stone-600">
        <AlertTriangle className="w-4 h-4 text-amber-500" />
        <span className="font-medium">Need immediate help?</span>
      </div>
      <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
        <a href="tel:988" className="text-stone-600 hover:text-sage-700 transition-colors flex items-center gap-2 font-medium">
          <span className="bg-white px-2 py-0.5 rounded shadow-sm border border-stone-200">988</span> Suicide & Crisis Lifeline
        </a>
        <a href="tel:18002723900" className="text-stone-600 hover:text-sage-700 transition-colors flex items-center gap-2 font-medium">
          <span className="bg-white px-2 py-0.5 rounded shadow-sm border border-stone-200">1-800-272-3900</span> Alzheimer’s Association
        </a>
      </div>
    </div>
  </div>
);

const OptionsPage = () => (
  <div className="max-w-6xl mx-auto px-6 py-20">
    <SectionHeader 
      title="Understanding Care Pathways" 
      subtitle="The difference between Palliative and Hospice care is often misunderstood. Let's clarify what each path offers."
    />

    <div className="grid lg:grid-cols-2 gap-8 mb-20">
      {/* Palliative Care */}
      <Card className="border-t-4 border-t-sage-300">
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 bg-sage-50 rounded-2xl text-sage-600">
             <Leaf className="w-8 h-8" />
          </div>
          <span className="bg-sage-100 text-sage-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Curative + Comfort</span>
        </div>
        <h3 className="text-3xl font-serif text-sage-900 mb-4">Palliative Care</h3>
        <p className="text-stone-600 mb-8 leading-relaxed text-lg">
          Specialized medical care for people living with a serious illness. It focuses on providing relief from the symptoms and stress of the illness, regardless of the diagnosis.
        </p>
        <ul className="space-y-4">
          <li className="flex gap-4">
            <Check className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
            <div>
              <strong className="block text-sage-900">Timing</strong>
              <span className="text-stone-500">Available at any stage of illness.</span>
            </div>
          </li>
          <li className="flex gap-4">
            <Check className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
            <div>
              <strong className="block text-sage-900">Approach</strong>
              <span className="text-stone-500">Can be received alongside curative treatment (chemo, dialysis, etc).</span>
            </div>
          </li>
        </ul>
      </Card>

      {/* Hospice Care */}
      <Card className="border-t-4 border-t-sage-600 bg-sage-50/50">
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 bg-white rounded-2xl text-sage-600 shadow-sm">
             <Heart className="w-8 h-8 fill-sage-100" />
          </div>
          <span className="bg-sage-200 text-sage-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Comfort Focused</span>
        </div>
        <h3 className="text-3xl font-serif text-sage-900 mb-4">Hospice Care</h3>
        <p className="text-stone-600 mb-8 leading-relaxed text-lg">
          Compassionate care for those in the last phases of incurable disease. The goal shifts from curing to ensuring the highest quality of life possible.
        </p>
        <ul className="space-y-4">
          <li className="flex gap-4">
            <Check className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
            <div>
              <strong className="block text-sage-900">Timing</strong>
              <span className="text-stone-500">Generally for prognosis &lt; 6 months.</span>
            </div>
          </li>
          <li className="flex gap-4">
            <Check className="w-5 h-5 text-sage-500 mt-1 flex-shrink-0" />
            <div>
              <strong className="block text-sage-900">Approach</strong>
              <span className="text-stone-500">Focus solely on comfort; curative treatments stop.</span>
            </div>
          </li>
        </ul>
      </Card>
    </div>

    <div className="bg-white rounded-3xl p-10 md:p-16 shadow-sm border border-stone-100">
      <h3 className="text-3xl font-serif text-sage-900 mb-8 text-center">Where does care happen?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { title: "Home", desc: "The most common setting. Nurses visit regularly, but family provides daily care." },
          { title: "Inpatient Facility", desc: "Short-term stays for symptom management that cannot be handled at home." },
          { title: "Nursing Home", desc: "Hospice teams visit the facility to supplement existing nursing staff." },
          { title: "Hospital", desc: "Many hospitals have designated palliative wings for acute needs." }
        ].map((item, idx) => (
          <div key={idx} className="space-y-3">
            <div className="w-10 h-1 rounded-full bg-sage-200" />
            <h4 className="font-bold text-sage-900 text-lg">{item.title}</h4>
            <p className="text-stone-500 leading-relaxed text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PlanningPage = () => {
  const [topic, setTopic] = useState('');
  const [relationship, setRelationship] = useState('');
  const [context, setContext] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic || !relationship) return;
    setLoading(true);
    const script = await generateConversationScript(topic, relationship, context);
    setGeneratedScript(script);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">
      <SectionHeader title="Planning Ahead" subtitle="Having a plan in place is one of the greatest gifts you can give your loved ones." />

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: FileText, title: "Advance Directives", desc: "Legal documents outlining your preferences for medical care if you cannot speak for yourself." },
          { icon: User, title: "Health Care Proxy", desc: "Designate a trusted person to make medical decisions on your behalf when you are incapacitated." },
          { icon: FileText, title: "POLST / MOLST", desc: "Medical orders for those with serious illness that travel with you across care settings." }
        ].map((item, i) => (
           <Card key={i} className="flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
             <div className="w-14 h-14 bg-sage-50 rounded-full flex items-center justify-center text-sage-600 mb-6">
               <item.icon className="w-7 h-7" />
             </div>
             <h3 className="text-xl font-bold font-serif text-sage-900 mb-3">{item.title}</h3>
             <p className="text-stone-500 text-sm mb-6 leading-relaxed flex-grow">{item.desc}</p>
             <button className="text-sage-600 font-medium text-sm hover:text-sage-800 flex items-center gap-1">
               Learn more <ArrowRight className="w-4 h-4" />
             </button>
           </Card>
        ))}
      </div>

      {/* AI Generator Section */}
      <div className="bg-sage-50 rounded-3xl p-8 md:p-12 border border-sage-100">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-sage-600">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif text-sage-900">Conversation Helper</h3>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Finding the right words can be incredibly difficult. Our AI tool helps you draft a compassionate, structured script for discussing sensitive topics with family or doctors.
            </p>
          </div>

          <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">Who are you speaking to?</label>
                <input 
                  type="text" 
                  placeholder="e.g. My elderly father, The Doctor"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-800 focus:border-sage-400 focus:ring-1 focus:ring-sage-400 outline-none transition-all placeholder:text-stone-400"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-2">What is the topic?</label>
                <input 
                  type="text" 
                  placeholder="e.g. Stopping dialysis, Entering hospice"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-800 focus:border-sage-400 focus:ring-1 focus:ring-sage-400 outline-none transition-all placeholder:text-stone-400"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-stone-600 mb-2">Any context?</label>
                 <textarea 
                  placeholder="e.g. He is confused and scared about going to the hospital again."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-800 focus:border-sage-400 focus:ring-1 focus:ring-sage-400 outline-none transition-all placeholder:text-stone-400 h-24 resize-none"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleGenerate} disabled={loading || !topic} className="w-full md:w-auto">
                {loading ? (
                  <>Drafting <span className="animate-pulse ml-1">...</span></>
                ) : (
                  <>Create Draft Script <Play className="w-4 h-4 ml-2 fill-current" /></>
                )}
              </Button>
            </div>

            {generatedScript && (
              <div className="mt-8 pt-8 border-t border-stone-100 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center justify-between mb-4">
                   <h4 className="text-sage-800 font-serif text-lg">Suggested Script</h4>
                   <button onClick={() => setGeneratedScript('')} className="text-stone-400 hover:text-stone-600"><X className="w-5 h-5" /></button>
                </div>
                <div className="bg-sage-50/50 p-6 rounded-xl border border-sage-100">
                  <div className="prose prose-stone prose-p:text-stone-600 max-w-none font-sans whitespace-pre-wrap leading-relaxed">
                    {generatedScript}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SupportPage = () => (
  <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">
    <SectionHeader title="Family Support" subtitle="Caregiving is a journey of love, but it is also a journey of endurance. Here is how to navigate the challenges." />

    <div className="grid lg:grid-cols-2 gap-12 items-start">
      <section>
        <div className="flex items-center gap-3 mb-8">
           <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center text-sage-600">
             <Stethoscope className="w-5 h-5" />
           </div>
           <h3 className="text-2xl font-serif text-sage-900">Understanding Changes</h3>
        </div>
        
        <div className="space-y-6">
          {[
            { title: "Appetite Changes", text: "As metabolism slows naturally, food intake decreases. This is normal. Forcing food may cause discomfort or nausea." },
            { title: "Breathing Patterns", text: "Breathing may become irregular, with long pauses (Cheyne-Stokes). While alarming to watch, this is a physiological response and typically not painful." },
            { title: "Withdrawal", text: "Your loved one may sleep more or seem distant. This is a natural part of detaching. Simple presence is often more comforting than conversation." }
          ].map((item, i) => (
            <Card key={i} className="p-6">
              <h4 className="text-sage-900 font-bold mb-2 text-lg">{item.title}</h4>
              <p className="text-stone-600 leading-relaxed">{item.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-sage-900 rounded-3xl p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sage-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Sun className="w-6 h-6 text-sage-300" />
            <h3 className="text-2xl font-serif">Caregiver Wellness</h3>
          </div>
          
          <p className="text-sage-100 mb-8 leading-relaxed text-lg">
            You cannot pour from an empty cup. Sustained caregiving without respite leads to burnout. Recognizing your own needs is essential for effective care.
          </p>
          
          <div className="space-y-4 mb-8">
             <div className="flex gap-4 items-start bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
               <AlertTriangle className="w-5 h-5 text-amber-300 mt-0.5 flex-shrink-0" />
               <div>
                 <span className="text-amber-200 font-bold text-sm uppercase tracking-wide block mb-1">Warning Sign</span>
                 <span className="text-sage-50">Feeling irritable, hopeless, or exhausted even after sleeping.</span>
               </div>
             </div>
             <div className="flex gap-4 items-start bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
               <Check className="w-5 h-5 text-sage-300 mt-0.5 flex-shrink-0" />
               <div>
                 <span className="text-sage-300 font-bold text-sm uppercase tracking-wide block mb-1">Action Step</span>
                 <span className="text-sage-50">Ask about the Medicare 5-day Respite Care benefit.</span>
               </div>
             </div>
          </div>

          <Button variant="secondary" className="w-full">
            Find Local Support Groups
          </Button>
        </div>
      </section>
    </div>
  </div>
);

const ResourcesPage = () => (
  <div className="max-w-5xl mx-auto px-6 py-20 space-y-20">
    <SectionHeader title="Knowledge Base" subtitle="Simple definitions and clear answers to common questions." />

    <div className="grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-7 space-y-4">
        <h3 className="text-sage-900 font-serif text-2xl mb-6">Frequently Asked Questions</h3>
        {FAQS.map((faq, idx) => (
          <details key={idx} className="group bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
            <summary className="flex justify-between items-center cursor-pointer p-6 font-medium text-sage-900 select-none hover:bg-sage-50 transition-colors">
              {faq.question}
              <ChevronDown className="w-5 h-5 text-sage-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-6 pb-6 text-stone-600 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>

      <div className="lg:col-span-5">
         <h3 className="text-sage-900 font-serif text-2xl mb-6">Key Terms</h3>
         <div className="space-y-4">
           {GLOSSARY.map((term, idx) => (
            <div key={idx} className="p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:border-sage-200 transition-colors">
              <h4 className="text-sage-700 font-bold mb-2 font-serif text-lg">{term.term}</h4>
              <p className="text-sm text-stone-600 leading-relaxed">{term.definition}</p>
            </div>
          ))}
         </div>
      </div>
    </div>

    <div className="pt-12 border-t border-stone-200">
      <h3 className="text-3xl font-serif text-sage-900 mb-8 text-center">Additional Resources</h3>
      <div className="bg-stone-50 border-2 border-dashed border-stone-200 rounded-3xl p-12 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm text-stone-400">
          <Clock className="w-8 h-8" />
        </div>
        <h4 className="text-xl font-bold text-stone-600 mb-2">Coming Soon</h4>
        <p className="text-stone-500 max-w-md mx-auto leading-relaxed">
          We are currently curating a list of trusted external organizations, books, and podcasts to further support your journey. Please check back later.
        </p>
      </div>
    </div>
  </div>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLink = ({ page, label }: { page: Page; label: string }) => (
    <button
      onClick={() => {
        setCurrentPage(page);
        setMobileMenuOpen(false);
      }}
      className={`text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full ${
        currentPage === page 
          ? 'bg-sage-100 text-sage-900' 
          : 'text-stone-500 hover:text-sage-700 hover:bg-stone-50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-cream text-stone-800 font-sans flex flex-col">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-cream/90 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentPage(Page.HOME)}>
            <span className="text-xl font-sans font-bold text-sage-900 tracking-widest hover:text-sage-700 transition-colors">THE HOSPICE GUIDE</span>
          </div>

          <nav className="hidden md:flex gap-2 items-center">
            <NavLink page={Page.HOME} label="Home" />
            <NavLink page={Page.OPTIONS} label="Care Options" />
            <NavLink page={Page.PLANNING} label="Planning" />
            <NavLink page={Page.SUPPORT} label="Support" />
            <NavLink page={Page.FIND_HOSPICE} label="Find Care" />
            <NavLink page={Page.RESOURCES} label="Resources" />
          </nav>

          <button className="md:hidden text-stone-600 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-cream border-t border-stone-100 absolute w-full px-6 py-8 flex flex-col gap-4 shadow-xl h-screen">
             <NavLink page={Page.HOME} label="Home" />
            <NavLink page={Page.OPTIONS} label="Care Options" />
            <NavLink page={Page.PLANNING} label="Planning" />
            <NavLink page={Page.SUPPORT} label="Support" />
            <NavLink page={Page.FIND_HOSPICE} label="Find Care" />
            <NavLink page={Page.RESOURCES} label="Resources" />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {currentPage === Page.HOME && (
          <>
            <EmergencyBar />
            <Hero setPage={setCurrentPage} />
          </>
        )}
        {currentPage === Page.OPTIONS && <OptionsPage />}
        {currentPage === Page.PLANNING && <PlanningPage />}
        {currentPage === Page.SUPPORT && <SupportPage />}
        {currentPage === Page.FIND_HOSPICE && <MapSection />}
        {currentPage === Page.RESOURCES && <ResourcesPage />}
      </main>

      {/* Footer */}
      <footer className="bg-sage-900 text-sage-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl font-sans font-bold tracking-widest text-white">THE HOSPICE GUIDE</span>
              </div>
              <p className="text-sage-300 text-lg max-w-sm leading-relaxed font-light">
                Democratizing access to end-of-life care information. <br/>
                Clear data. Compassionate guidance.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Navigation</h4>
              <ul className="space-y-3 text-sage-300">
                <li onClick={() => setCurrentPage(Page.OPTIONS)} className="cursor-pointer hover:text-white transition-colors">Care Analysis</li>
                <li onClick={() => setCurrentPage(Page.PLANNING)} className="cursor-pointer hover:text-white transition-colors">Legal Frameworks</li>
                <li onClick={() => setCurrentPage(Page.FIND_HOSPICE)} className="cursor-pointer hover:text-white transition-colors">Provider Map</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Crisis Lines</h4>
              <ul className="space-y-3 text-sage-300">
                <li className="hover:text-white transition-colors">988 Suicide & Crisis</li>
                <li className="hover:text-white transition-colors">1-800-272-3900 Alzheimer's</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-sage-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sage-400">
            <span>&copy; {new Date().getFullYear()} The Hospice Guide.</span>
            <span>INFORMATIONAL USE ONLY. NOT MEDICAL ADVICE.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
