import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { Certificate } from '../types';

const Certificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const handleCertClick = (cert: Certificate) => {
    setSelectedCert(cert);
  };

  const closePopup = () => {
    setSelectedCert(null);
  };

  return (
    <section className="py-12 animate-in fade-in zoom-in duration-300 max-w-6xl mx-auto relative">
      <div className="mc-panel mb-8 text-center border-4 border-slate-700 bg-[#c6c6c6]">
        <h2 className="text-black text-4xl mb-2 drop-shadow-none [text-shadow:2px_2px_#9386A0]">Achievements Unlocked</h2>
        <p className="text-slate-700 text-xl">Certified Skills & Recognitions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {PORTFOLIO_DATA.certificates.map((cert) => (
          <div
            key={cert.id}
            onClick={() => handleCertClick(cert)}
            className="group relative bg-[#1a1a1a] border-4 border-[#5d4037] p-2 shadow-[8px_8px_0_rgba(0,0,0,0.5)] hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
          >
            {/* Frame Corner Decorations */}
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-[#8d6e63] border-t-2 border-l-2 border-[#bcaaa4]"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#8d6e63] border-t-2 border-r-2 border-[#bcaaa4]"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-[#8d6e63] border-b-2 border-l-2 border-[#bcaaa4]"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#8d6e63] border-b-2 border-r-2 border-[#bcaaa4]"></div>

            {/* Inner Content */}
            <div className="bg-[#2d2d2d] h-full flex flex-col items-center text-center p-4 border-2 border-[#3e3e3e]">

              {/* Image/Icon Area */}
              <div className="w-full aspect-video mb-4 overflow-hidden border-2 border-black bg-black relative group-hover:border-yellow-500 transition-colors">
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#3a3a3a]">
                    <span className="text-4xl">📜</span>
                  </div>
                )}

                {/* Shine Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>

              <h3 className="text-yellow-400 text-2xl mb-2 leading-tight min-h-[3rem] flex items-center justify-center">
                {cert.title}
              </h3>

              <div className="w-full h-0.5 bg-white/10 my-3"></div>

              <div className="space-y-1 w-full">
                <p className="text-slate-300 text-lg">
                  <span className="text-[#aaa]">Issuer:</span> {cert.issuer}
                </p>
                <p className="text-slate-400 text-base">
                  <span className="text-[#aaa]">Date:</span> {cert.date}
                </p>
              </div>

              <button className="mt-4 mc-button w-full text-center hover:text-yellow-300 text-sm">
                Inspect Achievement
              </button>
            </div>
          </div>
        ))}
      </div>

      {PORTFOLIO_DATA.certificates.length === 0 && (
        <div className="mc-dark-panel text-center p-12 opacity-70">
          <h3 className="text-slate-400">No Achievements Yet...</h3>
          <p className="text-slate-600">Explore more dungeons to unlock certificates!</p>
        </div>
      )}

      {/* Modal Popup */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={closePopup}>
          <div
            className="relative max-w-3xl w-full bg-[#c6c6c6] border-4 border-black shadow-[10px_10px_0_rgba(0,0,0,0.5)] p-2 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#8b8b8b] border-b-4 border-[#373737] p-2 flex justify-between items-center mb-2">
              <h3 className="text-white text-xl md:text-2xl drop-shadow-[2px_2px_#000] ml-2">
                Achievement Details
              </h3>
              <button
                onClick={closePopup}
                className="w-8 h-8 bg-[#ff5555] border-2 border-black text-white font-bold hover:bg-[#ff0000] active:translate-y-1 shadow-[2px_2px_0_#000]"
              >
                X
              </button>
            </div>

            {/* Modal Content */}
            <div className="bg-[#1a1a1a] border-4 border-[#373737] p-4 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">

              {/* Large Image */}
              <div className="w-full md:w-1/2 aspect-video border-4 border-black bg-black relative shadow-[4px_4px_0_#000]">
                {selectedCert.image ? (
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#3a3a3a]">
                    <span className="text-6xl">📜</span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="w-full md:w-1/2 flex flex-col h-full justify-between text-left">
                <div>
                  <h2 className="text-yellow-400 text-3xl md:text-4xl mb-4 leading-tight drop-shadow-[2px_2px_#000]">
                    {selectedCert.title}
                  </h2>

                  <div className="space-y-4 text-lg md:text-xl">
                    <div className="bg-[#2d2d2d] p-3 border-2 border-[#555]">
                      <span className="text-[#aaa] block text-sm uppercase tracking-wider mb-1">Issued By</span>
                      <span className="text-white">{selectedCert.issuer}</span>
                    </div>

                    <div className="bg-[#2d2d2d] p-3 border-2 border-[#555]">
                      <span className="text-[#aaa] block text-sm uppercase tracking-wider mb-1">Date Unlocked</span>
                      <span className="text-white">{selectedCert.date}</span>
                    </div>
                  </div>
                </div>

                {selectedCert.url && (
                  <a
                    href={selectedCert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 mc-button w-full text-center py-3 text-xl hover:text-yellow-300 hover:scale-[1.02] transition-transform"
                  >
                    View Official Credential ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;
