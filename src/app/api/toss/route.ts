import { NextResponse } from 'next/server';
import { URLSearchParams } from 'url';

export async function GET() {
  try {
    const CLIENT_ID = "tsck_live_zlL7IePMYyrdfxyefjSNC3";
    const CLIENT_SECRET = "tssk_live_oFNfoMiafOssinjunFuOLRV6x2qehjOAr4UA3TzyTC3B";
    const ACCOUNT_SEQ = "1";

    // 1단계: 토스망 토큰 발급
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", CLIENT_ID);
    params.append("client_secret", CLIENT_SECRET);

    const tokenRes = await fetch("https://openapi.tossinvest.com/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });
    if (!tokenRes.ok) throw new Error("토스 토큰 발급 실패");
    const { access_token } = await tokenRes.json();

    const authHeaders = { "Authorization": `Bearer ${access_token}`, "X-Tossinvest-Account": ACCOUNT_SEQ };

    // 2단계: 다중 API 병렬 통신 (토스 잔고 3개 + 외부 실시간 환율 API 1개)
    const [holdingsRes, bpKrwRes, bpUsdRes, fxRes] = await Promise.all([
      fetch("https://openapi.tossinvest.com/api/v1/holdings", { headers: authHeaders }),
      fetch("https://openapi.tossinvest.com/api/v1/buying-power?currency=KRW", { headers: authHeaders }),
      fetch("https://openapi.tossinvest.com/api/v1/buying-power?currency=USD", { headers: authHeaders }),
      
      // [신규 아키텍처] 글로벌 오픈 환율 API (인증 불필요, 실시간 마켓 데이터)
      fetch("https://api.exchangerate-api.com/v4/latest/USD")
    ]);

    const holdingsData = await holdingsRes.json();
    const bpKrwData = bpKrwRes.ok ? await bpKrwRes.json() : { result: { cashBuyingPower: "0" } };
    const bpUsdData = bpUsdRes.ok ? await bpUsdRes.json() : { result: { cashBuyingPower: "0" } };
    
    // 3단계: 외부 환율 데이터 파싱
    let currentExchangeRate = 1380; // 통신 에러 시 최후의 안전망
    if (fxRes.ok) {
        const fxData = await fxRes.json();
        // 오픈 API에서 넘겨주는 KRW 환율 값을 정확히 매핑
        currentExchangeRate = fxData.rates.KRW; 
    }

    return NextResponse.json({
      holdings: holdingsData.result || {},
      buyingPower: {
        krw: bpKrwData.result?.cashBuyingPower || "0",
        usd: bpUsdData.result?.cashBuyingPower || "0"
      },
      exchangeRate: currentExchangeRate,
      fxSource: "Open Exchange Rate API"
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
