"use client";

import Script from "next/script";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <div className="background">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
      </div>
      
      <Header />

      <div className="app-layout" style={{ marginTop: "2rem" }}>
          <nav className="tab-menu">
              <ul>
                  <li className="active" data-target="lunch-tab">🍱 점심</li>
                  <li data-target="quiz-tab">💡 상식</li>
                  <li data-target="ootd-tab">👕 OOTD</li>
                  <li data-target="shop-tab">🛍️ 쇼핑</li>
              </ul>
          </nav>

          <main id="lunch-tab" className="container tab-content active">
              <h1 className="title">오점무?</h1>
              <p className="subtitle">오늘 점심 뭐 먹을지 고민이라면!</p>
              <div className="slot-container">
                  <div id="slot-machine" className="slot-text">???</div>
              </div>
              <button id="draw-button" className="btn">메뉴 추천받기 😋</button>
          </main>

          <main id="quiz-tab" className="container tab-content">
              <div id="quiz-intro">
                  <h1 className="title">상식 퀴즈 테스트</h1>
                  <p className="subtitle">방대한 데이터 중 무작위 10제로 두뇌를 깨워봐요!</p>
                  <div className="score-display">10 문제</div>
                  <button id="start-quiz-btn" className="btn">도전 시작하기 🚀</button>
              </div>
              <div id="quiz-play" style={{ display: "none" }}>
                  <div className="quiz-header">
                      <span id="quiz-progress">1 / 10</span>
                  </div>
                  <h2 id="quiz-question" className="quiz-q">문제가 여기에 표시됩니다.</h2>
                  <div className="quiz-options" id="quiz-options"></div>
              </div>
              <div id="quiz-result" style={{ display: "none" }}>
                  <h1 className="title">결과 발표 🎉</h1>
                  <div className="final-score" id="final-score">10 / 10</div>
                  <p className="result-comment" id="result-comment">여기에 평가가 나타납니다.</p>
                  <button id="retry-quiz-btn" className="btn mt-4">다시 도전하기 🔄</button>
              </div>
          </main>

          <main id="ootd-tab" className="container tab-content">
              <div id="ootd-form-container">
                  <div className="step-indicator">
                      <span id="step-number">Step 1 / 6</span>
                  </div>
                  <div className="ootd-step-slider">
                      <div className="ootd-step active" data-step="1">
                          <h2 className="step-title">성별이 어떻게 되시나요?</h2>
                          <div className="option-grid">
                              <label className="custom-radio"><input type="radio" name="gender" value="여성" /><span>여성</span></label>
                              <label className="custom-radio"><input type="radio" name="gender" value="남성" /><span>남성</span></label>
                              <label className="custom-radio"><input type="radio" name="gender" value="유니섹스" /><span>상관없음(유니섹스)</span></label>
                          </div>
                      </div>
                      <div className="ootd-step" data-step="2">
                          <h2 className="step-title">어떤 자리에 가시나요?</h2>
                          <div className="option-grid">
                              <label className="custom-radio"><input type="radio" name="occasion" value="데이트" /><span>데이트 💘</span></label>
                              <label className="custom-radio"><input type="radio" name="occasion" value="나들이" /><span>가벼운 나들이 🌳</span></label>
                              <label className="custom-radio"><input type="radio" name="occasion" value="상견례/결혼식" /><span>상견례/결혼식 🥂</span></label>
                              <label className="custom-radio"><input type="radio" name="occasion" value="출장" /><span>비즈니스/출장 💼</span></label>
                              <label className="custom-radio"><input type="radio" name="occasion" value="편안한" /><span>집 앞 마실 ☕</span></label>
                          </div>
                      </div>
                      <div className="ootd-step" data-step="3">
                          <h2 className="step-title">평소 이미지는요? (다중선택)</h2>
                          <div className="option-grid">
                              <label className="custom-checkbox"><input type="checkbox" name="appearance" value="귀여운" /><span>귀여운 편</span></label>
                              <label className="custom-checkbox"><input type="checkbox" name="appearance" value="시크한" /><span>시크한 편</span></label>
                              <label className="custom-checkbox"><input type="checkbox" name="appearance" value="차가운" /><span>차가운 편</span></label>
                              <label className="custom-checkbox"><input type="checkbox" name="appearance" value="부드러운" /><span>부드러운 편</span></label>
                          </div>
                      </div>
                      <div className="ootd-step" data-step="4">
                          <h2 className="step-title">오늘의 추구미는? (다중선택)</h2>
                          <div className="option-grid">
                              <label className="custom-checkbox"><input type="checkbox" name="vibe" value="발랄" /><span>비타민 스마일 🍋</span></label>
                              <label className="custom-checkbox"><input type="checkbox" name="vibe" value="지적" /><span>지적인 뇌섹미 👓</span></label>
                              <label className="custom-checkbox"><input type="checkbox" name="vibe" value="섹시" /><span>섹시/도발적 🔥</span></label>
                              <label className="custom-checkbox"><input type="checkbox" name="vibe" value="꾸안꾸" /><span>편안한 꾸안꾸 👕</span></label>
                              <label className="custom-checkbox"><input type="checkbox" name="vibe" value="힙스터" /><span>스트릿 힙합 🛹</span></label>
                          </div>
                      </div>
                      <div className="ootd-step" data-step="5">
                          <h2 className="step-title">지금 계절은 언제인가요?</h2>
                          <div className="option-grid">
                              <label className="custom-radio"><input type="radio" name="season" value="봄" /><span>봄 🌸</span></label>
                              <label className="custom-radio"><input type="radio" name="season" value="여름" /><span>여름 ☀️</span></label>
                              <label className="custom-radio"><input type="radio" name="season" value="가을" /><span>가을 🍁</span></label>
                              <label className="custom-radio"><input type="radio" name="season" value="겨울" /><span>겨울 ❄️</span></label>
                          </div>
                      </div>
                      <div className="ootd-step" data-step="6">
                          <h2 className="step-title">오늘 비나 눈이 오나요?</h2>
                          <div className="option-grid">
                              <label className="custom-radio"><input type="radio" name="weather" value="yes" /><span>네 ☔</span></label>
                              <label className="custom-radio"><input type="radio" name="weather" value="no" /><span>아니오 ☀️</span></label>
                          </div>
                      </div>
                  </div>
                  <div className="step-controls mt-4">
                      <button className="btn btn-secondary" id="prev-step-btn" style={{ display: "none" }}>이전</button>
                      <button className="btn" id="next-step-btn">다음 ➡️</button>
                      <button className="btn" id="submit-ootd-btn" style={{ display: "none" }}>분석 시작하기 ✨</button>
                  </div>
              </div>
              <div id="ootd-result-container" style={{ display: "none" }}>
                  <h1 className="title" style={{ fontSize: "2rem" }}>스타일링 솔루션</h1>
                  <p className="subtitle" id="ootd-title">당신을 위한 맞춤 코디</p>
                  <div className="ootd-card">
                      <div className="ootd-item">
                          <span className="ootd-label">아우터</span>
                          <p id="res-outerwear" className="ootd-value">블랙 레더 자켓</p>
                      </div>
                      <div className="ootd-item">
                          <span className="ootd-label">탑 & 바텀</span>
                          <p id="res-topbottom" className="ootd-value">화이트 티셔츠 & 데님</p>
                      </div>
                      <div className="ootd-item">
                          <span className="ootd-label">슈즈 & 악세서리</span>
                          <p id="res-shoes" className="ootd-value">컨버스 & 백</p>
                      </div>
                  </div>
                  <p className="result-comment" id="res-comment" style={{ marginTop: "2rem" }}>코멘트가 여기에 표시됩니다.</p>
                  <button id="retry-ootd-btn" className="btn mt-4">다시 추천받기 🔄</button>
              </div>
          </main>

          <main id="shop-tab" className="shop-container tab-content">
              <header className="shop-header">
                  <h2>실시간 급상승 아이템 🔥</h2>
                  <p className="shop-subtitle">지금 제일 핫한 가을/겨울 신상 구경하기</p>
              </header>
              
              <div className="shop-grid" id="shop-grid-container">
              </div>

              <div className="pagination">
                  <button className="page-btn active" data-page="1">1</button>
                  <button className="page-btn" data-page="2">2</button>
                  <button className="page-btn" data-page="3">3</button>
              </div>
          </main>
      </div>

      <Script src="/shop-data.js" strategy="lazyOnload" />
      <Script src="/quiz-data.js" strategy="lazyOnload" />
      <Script src="/style-engine.js" strategy="lazyOnload" />
      <Script src="/script.js" strategy="lazyOnload" />
    </>
  );
}
