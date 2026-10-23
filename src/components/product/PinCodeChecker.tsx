import React, { useState } from 'react';
import { MapPin, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import { getEstimatedDeliveryDate } from '../../utils/formatters';

export const PinCodeChecker: React.FC = () => {
  const [pin, setPin] = useState('560038');
  const [status, setStatus] = useState<{
    checked: boolean;
    valid: boolean;
    message: string;
    date?: string;
  }>({
    checked: true,
    valid: true,
    message: 'Express delivery available',
    date: getEstimatedDeliveryDate(2),
  });

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pin.trim();

    if (/^[1-9][0-9]{5}$/.test(clean)) {
      setStatus({
        checked: true,
        valid: true,
        message: 'FREE Express Delivery',
        date: getEstimatedDeliveryDate(2),
      });
    } else {
      setStatus({
        checked: true,
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN code',
      });
    }
  };

  return (
    <div className="bg-[#F7F5EF] p-4 rounded-2xl border border-[#E6E1D8] space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-[#292929]">
        <MapPin className="w-4 h-4 text-[#A94F55]" />
        <span>Check Delivery Estimate & Cod</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          value={pin}
          onChange={(e) => {
            setPin(e.target.value);
            if (status.checked) {
              setStatus((prev) => ({ ...prev, checked: false }));
            }
          }}
          placeholder="Enter 6-digit PIN code"
          className="flex-1 bg-white text-xs px-3.5 py-2 rounded-xl border border-[#E6E1D8] focus:outline-none focus:border-[#A94F55] font-medium"
        />
        <button
          type="submit"
          className="bg-[#292929] hover:bg-[#A94F55] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0"
        >
          Check
        </button>
      </form>

      {status.checked && (
        <div
          className={`text-xs flex items-start gap-2 pt-1 ${
            status.valid ? 'text-[#2E7D32]' : 'text-[#C62828]'
          }`}
        >
          {status.valid ? (
            <>
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">
                  {status.message} by <span className="underline">{status.date}</span>
                </p>
                <p className="text-[11px] text-[#706B65] mt-0.5">
                  Cash on Delivery available &bull; Order within 4 hrs
                </p>
              </div>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="font-semibold">{status.message}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
