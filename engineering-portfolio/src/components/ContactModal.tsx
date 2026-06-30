import React, { useState, useEffect } from 'react';
import { X, Send, Terminal, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
}

export default function ContactModal({ onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSending, setIsSending] = useState(false);
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const executeTransmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please provide name, email, and transmission payload.');
      return;
    }

    setIsSending(true);
    setTransmissionLogs([]);

    const logSteps = [
      'Establishing secure handshake protocols...',
      `Resolving gateway endpoint node for ${formData.email}...`,
      'Payload metadata verification: OK',
      'Encrypting message using 256-bit AES cipher...',
      'Opening routing tunnel through systems core...',
      'Transmitting data packet [1/1] (Payload: ' + (formData.message.length + formData.name.length) + ' bytes)...',
      'Awaiting gateway acknowledgment packet...',
      'Transmission ACK received! Status: 202 ACCEPTED',
      'Closing transmission channel safely.'
    ];

    for (let i = 0; i < logSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 350));
      setTransmissionLogs(prev => [...prev, `[LOG ${new Date().toLocaleTimeString()}] ${logSteps[i]}`]);
    }

    setIsSending(false);
    setIsSuccess(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      id="contact-overlay"
    >
      <div 
        className="bg-[#09090B] border-2 border-white w-full max-w-lg flex flex-col relative animate-scaleUp"
        id="contact-modal-body"
      >
        {/* Header */}
        <div className="bg-[#18181B] border-b-2 border-white px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-white animate-pulse" />
            <h2 className="text-white text-xs font-bold tracking-widest uppercase">&gt; ESTABLISH_SECURE_COMMS</h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors"
            id="contact-close-btn"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh] flex flex-col gap-6">
          {!isSuccess ? (
            <form onSubmit={executeTransmission} className="flex flex-col gap-4">
              <p className="text-xs text-on-surface-variant font-mono">
                Initiate a high-priority transmission straight to Alex's central node. Fill out the operational parameters below.
              </p>

              {error && (
                <div className="border border-red-500/50 bg-red-950/20 px-3 py-2 text-xs text-red-400 font-mono flex items-center gap-2">
                  <span>[ERROR] : {error}</span>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-white text-xs font-bold tracking-wider uppercase font-mono">
                  [ IDENTIFIER_NAME ]
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Senior Architect Jane"
                  disabled={isSending}
                  className="bg-transparent border border-outline-variant text-white px-3 py-2 text-xs font-mono outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white text-xs font-bold tracking-wider uppercase font-mono">
                  [ RETURN_ADDRESS_EMAIL ]
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. jane@company.io"
                  disabled={isSending}
                  className="bg-transparent border border-outline-variant text-white px-3 py-2 text-xs font-mono outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white text-xs font-bold tracking-wider uppercase font-mono">
                  [ TRANSACTION_SUBJECT ]
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="e.g. Distributed Core Systems Consultation"
                  disabled={isSending}
                  className="bg-transparent border border-outline-variant text-white px-3 py-2 text-xs font-mono outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white text-xs font-bold tracking-wider uppercase font-mono">
                  [ TRANSMISSION_PAYLOAD ]
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Type message data..."
                  disabled={isSending}
                  className="bg-transparent border border-outline-variant text-white px-3 py-2 text-xs font-mono outline-none resize-none focus:border-white transition-colors"
                />
              </div>

              {isSending && (
                <div className="border border-white/20 bg-white/5 p-4 rounded-none">
                  <p className="text-xs text-white font-bold mb-2 font-mono uppercase tracking-widest animate-pulse flex items-center gap-2">
                    <Send className="h-3 w-3 animate-bounce" /> Sending transmission...
                  </p>
                  <div className="flex flex-col gap-1 max-h-36 overflow-y-auto">
                    {transmissionLogs.map((log, index) => (
                      <p key={index} className="text-[10px] font-mono text-green-400">
                        {log}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {!isSending && (
                <button
                  type="submit"
                  className="brutalist-btn text-xs py-3 font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Transmit Payload
                </button>
              )}
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center gap-4 font-mono animate-fadeIn">
              <CheckCircle2 className="h-16 w-16 text-green-400 animate-bounce" />
              <div>
                <h3 className="text-white text-md font-bold uppercase tracking-wider">TRANSMISSION EN ROUTE</h3>
                <p className="text-xs text-on-surface-variant mt-2 max-w-sm">
                  Your packet has successfully passed through our firewall gateways and has been logged on Alex's core systems server. Response priority code: HIGH.
                </p>
              </div>

              <div className="border border-green-500/30 bg-green-950/20 w-full p-4 text-left flex items-start gap-3 mt-4">
                <ShieldCheck className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1.5 text-[11px] text-green-400">
                  <span className="font-bold uppercase tracking-wide">CIPHER INTEGRITY VERIFIED</span>
                  <span>TRANSMISSION_HASH: 7a82bcf2e8aa192d11</span>
                  <span>ENVELOPE_STATUS: DELIVERED</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                  onClose();
                }}
                className="brutalist-btn text-xs px-6 py-2.5 mt-4 font-semibold uppercase tracking-wider"
              >
                Close Secure Overlay
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
