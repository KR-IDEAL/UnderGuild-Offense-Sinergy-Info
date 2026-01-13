let currentLang = navigator.language.startsWith('ko') ? 'ko' : 
                  navigator.language.startsWith('zh') ? 'zh' : 'en';
let manuallyDisabled = new Set();
let selectedUnits = new Set(); 
let isLobsterActive = false;
let isHat1Active = false;
let isHat2Active = false;
let itemUnits = { 1: null, 2: null};

const uiTexts = {
    ko: { synergy: "활성 시너지", lobster: "가재", count: "인원", basic: "기본 용병", legendary: "전설 용병", myth: "신화 용병", slimehat: "슬라임 모자", knighthat: "삼각 기사 투구" },
    en: { synergy: "Active Synergy", lobster: "Crayfish", count: "Units", basic: "Basic", legendary: "Legendary", myth: "Mythic", slimehat: "Slime Hat", knighthat: "Tri-Knight Helmet" },
    zh: { synergy: "积极协同作用", lobster: "小龙虾", count: "人数", basic: "普通", legendary: "传说", myth: "神话", slimehat: "史莱姆帽子", knighthat: "三角骑士头盔" }
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

    const hatBtn1 = document.getElementById('hat-btn-1');
    if (hatBtn1) {
        hatBtn1.onclick = () => {
            isHat1Active = !isHat1Active;
            hatBtn1.classList.toggle('active');
            if (isHat1Active) selectedUnits.add('Slime');
            else selectedUnits.delete('Slime');
            updateStatus();
        };
    }

    const hatBtn2 = document.getElementById('hat-btn-2');
    if (hatBtn2) {
        hatBtn2.onclick = () => {
            isHat2Active = !isHat2Active;
            hatBtn2.classList.toggle('active');
            if (isHat2Active) selectedUnits.add('Knight');
            else selectedUnits.delete('Knight');
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

function getMaxCount() {
    let extra = (isLobsterActive ? 1 : 0) + (isHat1Active ? 1 : 0) + (isHat2Active ? 1 : 0);
    return 6 + extra;
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
            const maxCount = getMaxCount();;
            
            if (currentBasicsCount >= maxCount) {
                alert(currentLang === 'ko' ? `최대 ${maxCount}명까지 선택 가능합니다!` : `Max ${maxCount} units reached!`);
                return;
            }
        }
        selectedUnits.add(unitId);
        manuallyDisabled.delete(unitId);
    }
    
    updateStatus();
}

function updateStatus() {
    const currentBasicsCount = [...selectedUnits].filter(id => 
        database.basic.some(b => b.id === id)
    ).length;
    const maxCount = getMaxCount();
    const countEl = document.getElementById('count-display');
    if (countEl) {
        countEl.innerText = `${uiTexts[currentLang].count}: ${currentBasicsCount} / ${maxCount}`;
    }

    for (const tier in database) {
        database[tier].forEach(unit => {
            const card = document.getElementById(`unit-${unit.id}`);
            if (!card) return;

            if (tier === 'basic') {
                card.classList.add('unlocked');
            } else {
                const canUnlock = unit.requires.every(reqId => selectedUnits.has(reqId));
                if (canUnlock) {
                    card.classList.replace('locked', 'unlocked');
                    if (!selectedUnits.has(unit.id) && !manuallyDisabled.has(unit.id)) {
                        selectedUnits.add(unit.id);
                    }
                } else {
                    card.classList.replace('unlocked', 'locked');
                    selectedUnits.delete(unit.id);
                    manuallyDisabled.delete(unit.id);
                }
            }

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
    const hat1S = document.getElementById('hat-1-name');
    if (hat1S) hat1S.innerText = uiTexts[lang].slimehat;
    const hat2S = document.getElementById('hat-2-name');
    if (hat2S) hat2S.innerText = uiTexts[lang].knighthat;
    
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


