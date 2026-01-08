let currentLang = navigator.language.startsWith('ko') ? 'ko' : 'en';
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
        
        if (selectedUnits.has(unit.id)) {
            div.classList.add('active');
        }

        div.innerHTML = `
            <img src="images/${unit.image}" alt="${unit.id}" style="width:100%">
            <p>${unit.name[currentLang]}</p>
        `;
        
        div.onclick = () => toggleUnit(unit.id, tier);
        container.appendChild(div);
    });
}

function toggleUnit(unitId, tier) {
    const card = document.getElementById(`unit-${unitId}`);
    
    if (selectedUnits.has(unitId)) {
        selectedUnits.delete(unitId);
        manuallyDisabled.add(unitId);
        if (card) card.classList.remove('active');
    } else {
        if (tier === 'basic') {
            const currentBasics = [...selectedUnits].filter(id => 
                database.basic.some(b => b.id === id)
            ).length;
            const maxCount = isLobsterActive ? 7 : 6;
            
            if (currentBasics >= maxCount) {
                alert(currentLang === 'ko' ? "최대 인원에 도달했습니다!" : "Max units reached!");
                return;
            }
        }
        selectedUnits.add(unitId);
        manuallyDisabled.delete(unitId);
        if (card) card.classList.add('active');
    }
    updateStatus();
}

function updateStatus() {
    const currentBasics = [...selectedUnits].filter(id => 
        database.basic.some(b => b.id === id)
    ).length;
    
    const maxCount = isLobsterActive ? 7 : 6;
    const label = uiTexts[currentLang].count;
    const countEl = document.getElementById('count-display');
    if (countEl) countEl.innerText = `${label}: ${currentBasics} / ${maxCount}`;

    // 전설/신화 용병의 잠금 해제 및 자동 활성화 체크
    ['legendary', 'myth'].forEach(tier => {
        database[tier].forEach(unit => {
            const canUnlock = unit.requires ? unit.requires.every(reqId => selectedUnits.has(reqId)) : true;
            const card = document.getElementById(`unit-${unit.id}`);
            
            if (card) {
                if (canUnlock) {
                    card.classList.replace('locked', 'unlocked');
                    if(!selectedUnits.has(unit.idf) && !manuallyDisabled.has(unit.id)){
                        selectedUnits.add(unit.id);
                        card.classList.add('active');
                    }
                } else {
                    card.classList.replace('unlocked', 'locked');
                    selectedUnits.delete(unit.id);
                    manuallyDisabled.delete(unit.id);
                    card.classList.remove('active');
                }
            }
        });
    });

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

