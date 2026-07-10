"use client";
import React, { useState, useEffect, useRef } from 'react';

// 가상 체결 데이터
const apiTrades = [
  { id: 1, datetime: '2026. 07. 05 14:32:15', symbol: 'NVDA', name: '엔비디아', type: 'BUY', price: '$120.50', qty: 0.05, total: '$6.02' },
  { id: 2, datetime: '2026. 06. 28 22:45:10', symbol: 'RKLB', name: '로켓 랩', type: 'SELL', price: '$90.00', qty: 10, total: '$900.00' },
  { id: 3, datetime: '2026. 06. 15 09:10:05', symbol: 'WOLF', name: '울프스피드', type: 'BUY', price: '$73.50', qty: 29, total: '$2,131.50' },
];

export default function JournalPage() {
  // 메모와 이미지를 함께 저장하는 상태 구조
  const [journalData, setJournalData] = useState<Record<number, { text: string; image: string | null }>>({});
  const [saveStatus, setSaveStatus] = useState<Record<number, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem('wealthtrack_journal_v2');
    if (saved) setJournalData(JSON.parse(saved));
  }, []);

  // 1. 자동 저장 로직 (입력 후 바깥 클릭 시 실행)
  const autoSave = (id: number, newText: string, newImage: string | null = null) => {
    const updated = { 
      ...journalData, 
      [id]: { 
        text: newText, 
        image: newImage !== null ? newImage : (journalData[id]?.image || null) 
      } 
    };
    setJournalData(updated);
    
    try {
      localStorage.setItem('wealthtrack_journal_v2', JSON.stringify(updated));
      showSavedFeedback(id);
    } catch (e) {
      alert("이미지 용량이 너무 큽니다. 다른 사진을 첨부해주세요.");
    }
  };

  // 2. 피드백 UI (저장됨 표시)
  const showSavedFeedback = (id: number) => {
    setSaveStatus(prev => ({ ...prev, [id]: "✓ 자동 저장됨" }));
    setTimeout(() => {
      setSaveStatus(prev => ({ ...prev, [id]: "" }));
    }, 2000);
  };

  // 3. 사진 첨부 로직 (Base64 변환)
  const handleImageUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      autoSave(id, journalData[id]?.text || "", base64String);
    };
    reader.readAsDataURL(file);
  };

  // 4. 사진 삭제 로직
  const handleRemoveImage = (id: number) => {
    autoSave(id, journalData[id]?.text || "", null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* 헤더 섹션 */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-black text-[#191f28] tracking-tight">투자 복기 일지</h1>
        <p className="text-[#8b95a1] mt-2 text-sm font-medium">자동 동기화된 체결 내역에 나만의 매매 근거와 차트를 기록하세요.</p>
      </div>

      {/* 타임라인 피드 섹션 */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
        {apiTrades.map(trade => {
          const currentData = journalData[trade.id] || { text: "", image: null };
          
          return (
            <div key={trade.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* 타임라인 중앙 점 */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 text-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute md:relative left-0 md:left-1/2 -translate-x-1/2 transform z-10">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
              </div>

              {/* 기록 카드 */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                
                {/* 1. 체결 정보 헤더 */}
                <div className="p-4 bg-[#f9fafb] border-b border-gray-100 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${trade.type === 'BUY' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                        {trade.type === 'BUY' ? '매수' : '매도'}
                      </span>
                      <span className="font-bold text-[#191f28]">{trade.symbol} <span className="text-gray-500 font-normal text-xs">{trade.name}</span></span>
                    </div>
                    <div className="text-xs text-gray-500 font-medium">{trade.datetime}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#191f28]">{trade.total}</div>
                    <div className="text-xs text-gray-400">{trade.price} x {trade.qty}주</div>
                  </div>
                </div>

                {/* 2. 에디터 영역 (Frictionless UX) */}
                <div className="p-4 relative">
                  <textarea 
                    className="w-full text-sm text-[#333] placeholder-gray-400 bg-transparent resize-none focus:outline-none min-h-[60px]"
                    placeholder="매매 근거를 자유롭게 기록하세요..."
                    defaultValue={currentData.text}
                    onBlur={(e) => autoSave(trade.id, e.target.value)}
                  />

                  {/* 첨부된 이미지 렌더링 */}
                  {currentData.image && (
                    <div className="relative mt-3 group/img inline-block">
                      <img src={currentData.image} alt="첨부 이미지" className="max-h-48 rounded-lg border border-gray-200 object-cover" />
                      <button 
                        onClick={() => handleRemoveImage(trade.id)}
                        className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 opacity-0 group-hover/img:opacity-100 transition-opacity"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                    </div>
                  )}

                  {/* 하단 툴바 (사진 첨부 및 저장 상태) */}
                  <div className="mt-2 flex justify-between items-center border-t border-gray-50 pt-3">
                    <div>
                      <label className="cursor-pointer text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-1.5 text-xs font-semibold">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        사진 첨부
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(trade.id, e)} />
                      </label>
                    </div>
                    
                    <span className="text-xs font-bold text-green-500 transition-opacity duration-300">
                      {saveStatus[trade.id]}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
