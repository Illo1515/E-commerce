// OOTD 전용 추천 알고리즘 엔진
const recommendOOTD = (answers) => {
    // answers = { gender, occasion, appearance[], vibe[], season, weather }
    
    let outerwear = "";
    let top = "";
    let bottom = "";
    let shoes = "";
    let acc = "";
    
    const isCold = (answers.season === '겨울');
    const isHot = (answers.season === '여름');
    const isRaining = (answers.weather === 'yes');
    
    // 1. 오케이션 (드레스 코드) & 성별 베이스 라인 구축
    if (answers.occasion === '데이트') {
        if(answers.gender === '남성') {
            top = "깔끔한 화이트 옥스포드 셔츠(또는 얇은 니트)";
            bottom = "슬림핏 크림 진 또는 세미와이드 슬랙스";
            shoes = "깔끔한 더비 슈즈 또는 무지 화이트 스니커즈";
        } else if (answers.gender === '여성') {
            top = "부드러운 블라우스 또는 파스텔톤 니트";
            bottom = "플리츠 스커트 또는 부츠컷 와이드 팬츠";
            shoes = "메리제인 펌프스 또는 깔끔한 로퍼";
        } else {
            top = "단정한 오버핏 니트";
            bottom = "스트레이트 핏 데님";
            shoes = "클린 화이트 스니커즈";
        }
    } else if (answers.occasion === '상견례/결혼식' || answers.occasion === '출장') {
        top = "기본 화이트 셔츠/블라우스";
        bottom = "차콜/베이지 톤의 포멀 슬랙스/단정한 미디 스커트";
        outerwear = isHot ? "얇은 리넨 자켓" : "테일러드 블레이저 셋업류";
        shoes = "클래식 옥스포드화/블랙 펌프스";
        acc = "메탈 시계, 심플한 가죽 토트백";
    } else { // 나들이, 편안한
        top = isHot ? "오버핏 그래픽 반팔 티셔츠" : "편안한 스웻셔츠(맨투맨)/후디";
        bottom = "벌룬핏 팬츠 또는 조거 팬츠";
        shoes = "트렌디한 뉴발란스나 나이키 런닝화";
    }
    
    // 2. 계절 (Season) 반영
    if (answers.season === '봄' || answers.season === '가을') {
        outerwear = outerwear || "캐주얼 트렌치코트 혹은 블루종/가디건";
    } else if (isCold) {
        outerwear = "보온성 훌륭한 블랙/캐멀 롱코트 혹은 미니멀 숏패딩";
        top = "모크넥/터틀넥 니트 " + (top.includes('셔츠') ? '레이어드' : '');
    } else if (isHot) {
        outerwear = "필요 없음 (실내 냉방 대비 가벼운 셔츠 정도만 챙기세요!)";
    }
    
    // 3. 눈/비 (Weather) 반영
    if (isRaining) {
        outerwear += " (물에 강한 방수 소재 추천)";
        bottom += " (비에 젖지 않는 기장의 크롭 팬츠/반바지)";
        shoes = "스웨이드/캔버스 소재 절대 금지! 첼시 레인부츠 혹은 어두운 색상의 레더 스니커즈";
        acc += (acc ? ", " : "") + "튼튼하고 포인트가 되는 장우산 ☂️";
    }
    
    // 4. 추구미 (Vibe) 반영 (명사 및 형용사 교체)
    const vibeStr = answers.vibe.join(',');
    if (vibeStr.includes('섹시') || vibeStr.includes('시크한')) {
        if(outerwear && !outerwear.includes('도 없음')) outerwear = "시크한 블랙 레더 자켓/코트";
        top = top.replace('블라우스', '시스루 또는 슬릭 핏 셔츠').replace('스웻셔츠', '타이트한 골지 니트');
        bottom = bottom.replace('플리츠 스커트', '슬릿 디테일 롱 스커트').replace('조거 팬츠', '스트릿 무드 파라슈트 팬츠');
    }
    if (vibeStr.includes('지적')) {
        acc += (acc ? ", " : "") + "지적인 무드를 더할 수 있는 메탈 안경테 👓";
        top = top.replace('그래픽 반팔', '단색 카라 반팔 니트');
    }
    if (vibeStr.includes('힙스터')) {
        outerwear = "빈티지 느낌 가득한 바시티 자켓 또는 그런지 가디건";
        bottom = "리얼 와이드 핏 카고 팬츠";
        acc += (acc ? ", " : "") + "볼캡 또는 비니, 체인 목걸이";
    }

    // 5. 외모 (Appearance) 반영 (가벼운 터치)
    const appStr = answers.appearance.join(',');
    if (appStr.includes('귀여운')) {
        outerwear = outerwear.replace('트렌치코트', '귀여운 크롭핏 가디건');
        shoes = shoes.replace('옥스포드화', '둥근 코를 가진 더비 슈즈/메리제인');
    }

    // 결과 조립
    const title = `${answers.season}날 ${answers.occasion} 약속을 위한 맞춤 코디`;
    let combinedTopBottom = `${top} & ${bottom}`;
    
    const weatherText = isRaining ? '비/눈 소식' : '맑은 날씨';
    const vibeText = answers.vibe.length > 0 ? answers.vibe.join(', ') : '단정한';
    
    const comment = `오늘의 ${weatherText}와 당신이 원하시는 "${vibeText}" 무드를 전체적으로 반영한 코디입니다. 추천해 드린 아이템들과 함께면 오늘 하루 완벽한 OOTD가 될 거예요!`;
    
    return {
        title,
        outerwear: outerwear || '없음',
        topBottom: combinedTopBottom,
        shoesAccessories: `${shoes} ${acc ? '& ' + acc : ''}`,
        comment
    };
};
