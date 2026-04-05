// ====== 공통 탭 변환 로직 (테마 관리 포함) ======
const tabItems = document.querySelectorAll('.tab-menu li');
const tabContents = document.querySelectorAll('.tab-content');

tabItems.forEach(tab => {
    tab.addEventListener('click', () => {
        tabItems.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        const targetId = tab.dataset.target;
        document.getElementById(targetId).classList.add('active');
        
        // 특별 처리: 쇼핑 탭일 경우 토스(Toss) 테마 바디 클래스 추가
        if (targetId === 'shop-tab') {
            document.body.classList.add('theme-toss');
            // 처음 진입 시 1페이지 렌더링
            renderShoppingGrid(1); 
        } else {
            document.body.classList.remove('theme-toss');
        }
    });
});

// ====== 1. 점심 추천 로직 ======
const menus = ["제육볶음", "돈까스", "순대국", "짜장면", "마라탕", "샐러드", "초밥", "햄버거", "냉면", "우동"];
const slotText = document.getElementById('slot-machine');
const drawButton = document.getElementById('draw-button');
let isSpinning = false;
drawButton.addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;
    slotText.classList.add('spinning');
    let spinCount = 0; 
    const spin = () => {
        slotText.textContent = menus[Math.floor(Math.random() * menus.length)];
        spinCount++;
        if (spinCount < 40) setTimeout(spin, 30 + (spinCount * 1.5));
        else {
            slotText.classList.remove('spinning');
            slotText.classList.add('result');
            isSpinning = false;
        }
    };
    spin();
});

// ====== 2. 상식 퀴즈 로직 ======
let currentQuizList = []; let currentQuestionIndex = 0; let score = 0;
const startQuiz = () => {
    const shuffled = [...quizData].sort(()=> Math.random() - 0.5);
    currentQuizList = shuffled.slice(0, 10);
    currentQuestionIndex = 0; score = 0;
    document.getElementById('quiz-intro').style.display='none'; 
    document.getElementById('quiz-result').style.display='none'; 
    document.getElementById('quiz-play').style.display='block';
    renderQuestion();
};
const renderQuestion = () => {
    const qData = currentQuizList[currentQuestionIndex];
    document.getElementById('quiz-progress').textContent = `${currentQuestionIndex + 1} / 10`;
    document.getElementById('quiz-question').textContent = qData.q;
    const qOpts = document.getElementById('quiz-options');
    qOpts.innerHTML = '';
    qData.options.forEach((opt, idx) => {
        const b = document.createElement('button'); b.className = 'option-btn'; b.textContent = opt;
        b.onclick = () => {
            b.classList.add(idx === qData.a ? 'correct' : 'wrong');
            if(idx === qData.a) score++;
            document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < 10) renderQuestion(); else showResult();
            }, 1000);
        };
        qOpts.appendChild(b);
    });
};
const showResult = () => {
    document.getElementById('quiz-play').style.display = 'none'; 
    document.getElementById('quiz-result').style.display = 'block';
    document.getElementById('final-score').textContent = `${score} / 10`;
};
document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
document.getElementById('retry-quiz-btn').addEventListener('click', startQuiz);

// ====== 3. OOTD 로직 ======
let currentStep = 1;
const ootdSteps = document.querySelectorAll('.ootd-step');
const ootdForm = document.getElementById('ootd-form-container');
const ootdRes = document.getElementById('ootd-result-container');

function updateOotd() {
    ootdSteps.forEach(s => s.classList.remove('active'));
    document.querySelector(`.ootd-step[data-step="${currentStep}"]`).classList.add('active');
    document.getElementById('step-number').textContent = `Step ${currentStep} / 6`;
    document.getElementById('prev-step-btn').style.display = currentStep > 1 ? 'block' : 'none';
    document.getElementById('next-step-btn').style.display = currentStep === 6 ? 'none' : 'block';
    document.getElementById('submit-ootd-btn').style.display = currentStep === 6 ? 'block' : 'none';
}
document.getElementById('next-step-btn').addEventListener('click', () => { currentStep++; updateOotd(); });
document.getElementById('prev-step-btn').addEventListener('click', () => { currentStep--; updateOotd(); });
document.getElementById('submit-ootd-btn').addEventListener('click', () => {
    const getR = (n) => document.querySelector(`input[name="${n}"]:checked`)?.value || '';
    const getC = (n) => Array.from(document.querySelectorAll(`input[name="${n}"]:checked`)).map(e=>e.value);
    const rec = recommendOOTD({ gender: getR('gender'), occasion: getR('occasion'), appearance: getC('appearance'), vibe: getC('vibe'), season: getR('season'), weather: getR('weather')});
    
    document.getElementById('ootd-title').textContent = rec.title;
    document.getElementById('res-outerwear').textContent = rec.outerwear;
    document.getElementById('res-topbottom').textContent = rec.topBottom;
    document.getElementById('res-shoes').textContent = rec.shoesAccessories;
    document.getElementById('res-comment').textContent = rec.comment;
    ootdForm.style.display = 'none'; ootdRes.style.display = 'block';
});
document.getElementById('retry-ootd-btn').addEventListener('click', () => { currentStep = 1; updateOotd(); ootdRes.style.display='none'; ootdForm.style.display='block'; });

// ====== 4. 토스 스타일 쇼핑 탭 로직 (Paging) ======
const ITEMS_PER_PAGE = 6;
const shopGrid = document.getElementById('shop-grid-container');
const pageBtns = document.querySelectorAll('.page-btn');

function renderShoppingGrid(page) {
    // 1페이지: idx 0~5 / 2페이지: idx 6~11 / 3페이지: idx 12~17
    const startIdx = (page - 1) * ITEMS_PER_PAGE;
    const endIdx = startIdx + ITEMS_PER_PAGE;
    const itemsToRender = shopData.slice(startIdx, endIdx);
    
    shopGrid.innerHTML = '';
    
    itemsToRender.forEach(item => {
        // 숫자 콤마 처리
        const priceStr = item.price.toLocaleString();
        
        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
            <div class="shop-img-box">
                ${item.tag ? `<span class="shop-tag">${item.tag}</span>` : ''}
                <img src="${item.image}" alt="item">
            </div>
            <div class="shop-info">
                <p class="shop-title">${item.name}</p>
                <div class="shop-price-row">
                    <span class="shop-discount">${item.discount}</span>
                    <span class="shop-price">${priceStr}원</span>
                </div>
            </div>
        `;
        shopGrid.appendChild(card);
    });

    // 버튼 활성화 스타일 연동
    pageBtns.forEach(btn => {
        btn.classList.remove('active');
        if(parseInt(btn.dataset.page) === parseInt(page)) {
            btn.classList.add('active');
        }
    });
}

// 페이징 버튼 이벤트 생성
pageBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const page = parseInt(e.target.dataset.page);
        renderShoppingGrid(page);
    });
});
