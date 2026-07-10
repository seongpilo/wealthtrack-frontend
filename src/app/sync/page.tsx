"use client";
import React from 'react';

export default function SyncPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-black text-[#191f28] tracking-tight">자산 연동 관리</h1>
        <p className="text-[#8b95a1] mt-2 text-sm font-medium">증권사 API 연결 상태를 관리하고 실시간 동기화를 제어합니다.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-8 flex flex-col gap-8">
        
        {/* 토스증권 연결 상태 카드 */}
        <div className="flex items-center justify-between border-b border-gray-50 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 font-black text-xl">
              T
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#191f28]">토스증권 (Toss Invest)</h3>
              <p className="text-sm text-gray-400 mt-1">계좌번호: 156-01-068099</p>
            </div>
          </div>
          <div className="text-right flex flex-col items-end gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              정상 연동 중
            </div>
            <p className="text-xs text-gray-400">마지막 동기화: 방금 전</p>
          </div>
        </div>

        {/* API 키 관리 섹션 */}
        <div>
          <h4 className="text-sm font-bold text-[#4e5968] mb-4">API 보안 키 설정</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">APP KEY</label>
              <input type="password" value="tsck_live_zlL7IePMYyrdfxyefjSNC3" readOnly className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm text-gray-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">APP SECRET</label>
              <input type="password" value="tssk_live_oFNfoMiafOssinjunFuOLRV6x2qehjOAr4UA3TzyTC3B" readOnly className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm text-gray-500 focus:outline-none" />
            </div>
          </div>
        </div>

        {/* 수동 동기화 제어 */}
        <div className="pt-4 flex gap-3">
          <button className="flex-1 bg-[#3182f6] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors shadow-sm">
            지금 동기화 (수동 갱신)
          </button>
          <button className="px-6 py-3.5 bg-red-50 text-red-500 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors">
            연동 해제
          </button>
        </div>

      </div>
    </div>
  );
}
