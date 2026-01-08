let currentLang = navigator.language.startsWith('ko') ? 'ko' : 'en';
let manuallyDisabled = new Set();
let selectedUnits = new Set(); 
let isLobsterActive = false;

const uiTexts = {
    ko: { synergy: "활성 시너지", lobster: "가재", count: "인원", basic: "기본 용병", legendary: "전설 용병", myth: "신화 용병" },
    en: { synergy: "Active Synergy", lobster: "Crayfish", count: "Units", basic: "Basic", legendary: "Legendary", myth: "Mythic" }
};

function init() {
    renderAllGroups();
    
    const lobsterBtn = document.getElementById('lobster-button');
    if (lobsterBtn) {
        lobsterBtn.onclick = () => {
            isLobsterActive = !isLobsterActive;
            lobsterBtn.classList.toggle('active');
            updateStatus();
        };
    }
    updateStatus();
}

function renderAllGroups() {
    renderGroup('basic', 'basic-container');
    renderGroup('legendary', 'legendary-container');
    renderGroup('myth', 'mythic-container');
}

function renderGroup(tier, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = ''; 

    database[tier].forEach(unit => {
        const div = document.createElement('div');
        div.id = `unit-${unit.id}`; 
        div.className = `unit-card ${tier === 'basic' ? 'unlocked' : 'locked'}`;
        
        div.innerHTML = `
            <img src="images/${unit.image}" alt="${unit.id}" style="width:100%">
            <p>${unit.name[currentLang]}</p>
        `;
        
        div.onclick = () => toggleUnit(unit.id, tier);
        container.appendChild(div);
    });
}

function toggleUnit(unitId, tier) {
    if (selectedUnits.has(unitId)) {
        selectedUnits.delete(unitId);
        if (tier !== 'basic') {
            manuallyDisabled.add(unitId);
        }
    } else {
        if (tier === 'basic') {
            const currentBasicsCount = [...selectedUnits].filter(id => 
                database.basic.some(b => b.id === id)
            ).length;
            const maxCount = isLobsterActive ? 7 : 6;
            
            if (currentBasicsCount >= maxCount) {
                alert(currentLang === 'ko' ? `최대 ${maxCount}명까지 선택 가능합니다!` : `Max ${maxCount} units reached!`);
                return;
            }
        }
        selectedUnits.add(unitId);
        manuallyDisabled.delete(unitId);
    }
    
    // 데이터 변경 후 모든 카드의 시각적 상태와 숫자를 새로고침
    updateStatus();
}

function updateStatus() {
    // 1. 인원수 표시 업데이트
    const currentBasicsCount = [...selectedUnits].filter(id => 
        database.basic.some(b => b.id === id)
    ).length;
    const maxCount = isLobsterActive ? 7 : 6;
    const countEl = document.getElementById('count-display');
    if (countEl) {
        countEl.innerText = `${uiTexts[currentLang].count}: ${currentBasicsCount} / ${maxCount}`;
    }

    // 2. 모든 유닛(기본/전설/신화)의 카드 상태 일괄 업데이트
    for (const tier in database) {
        database[tier].forEach(unit => {
            const card = document.getElementById(`unit-${unit.id}`);
            if (!card) return;

            // [잠금/해제 상태 결정]
            if (tier === 'basic') {
                card.classList.add('unlocked');
            } else {
                const canUnlock = unit.requires.every(reqId => selectedUnits.has(reqId));
                if (canUnlock) {
                    card.classList.replace('locked', 'unlocked');
                    // 자동 활성화 로직: 해제됐는데 선택 안되어 있고, 수동으로 끈 게 아니라면
                    if (!selectedUnits.has(unit.id) && !manuallyDisabled.has(unit.id)) {
                        selectedUnits.add(unit.id);
                    }
                } else {
                    card.classList.replace('unlocked', 'locked');
                    selectedUnits.delete(unit.id);
                    manuallyDisabled.delete(unit.id);
                }
            }

            // [최종 시각적 활성화(테두리) 결정]
            // 데이터(selectedUnits)에 있으면 active를 붙이고, 없으면 뗍니다.
            if (selectedUnits.has(unit.id)) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    updateSynergies();
}

function changeLang(lang) {
    currentLang = lang;
    const synH = document.querySelector('#synergy-header h3');
    if (synH) synH.innerText = uiTexts[lang].synergy;
    const lobS = document.querySelector('#lobster-button span');
    if (lobS) lobS.innerText = uiTexts[lang].lobster;
    
    const headers = document.querySelectorAll('.unit-group h2');
    if (headers.length >= 3) {
        headers[0].innerText = uiTexts[lang].basic;
        headers[1].innerText = uiTexts[lang].legendary;
        headers[2].innerText = uiTexts[lang].myth;
    }
    renderAllGroups(); 
    updateStatus();
}

function updateSynergies() {
    const activeSynergies = {};
    selectedUnits.forEach(unitId => {
        let unitData = null;
        for (const tier in database) {
            unitData = database[tier].find(u => u.id === unitId);
            if (unitData) break;
        }
        if (unitData && unitData.synergies) {
            unitData.synergies.forEach(syn => {
                activeSynergies[syn] = (activeSynergies[syn] || 0) + 1;
            });
        }
    });
    renderSynergies(activeSynergies);
}

function renderSynergies(synergies) {
    const container = document.getElementById('active-synergies-list');
    if (!container) return;
    container.innerHTML = '';

    Object.entries(synergies)
        .sort((a, b) => b[1] - a[1])
        .forEach(([name, count]) => {
            const data = synergyData[name];
            if (!data) return;
            const item = document.createElement('div');
            item.className = 'synergy-item';
            if (count >= data.goals[1]) item.classList.add('gold');
            else if (count >= data.goals[0]) item.classList.add('silver');
            else item.classList.add('inactive');
            item.innerHTML = `<img src="images/${name}.png" alt="${name}" title="${name}: ${count}" class="synergy-img">`;
            container.appendChild(item);
        });
}

window.onload = init;



