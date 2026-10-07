// Banco de dados interativo de dinossauros
const dinosaurs = [
    {
        id: 'trex',
        name: 'Tyrannosaurus Rex',
        species: 'T. Rex',
        category: 'carnivoro',
        danger: 'CRÍTICO',
        dangerClass: 'danger-critical',
        diet: 'Carnívoro',
        length: '12.3 metros',
        weight: '8.4 Toneladas',
        period: 'Cretáceo Superior',
        description: 'O maior predador do parque. Possui uma mordida com força superior a 5 toneladas e visão baseada no movimento.',
        svgColor: '#ef4444',
        svgIcon: 'fa-dragon'
    },
    {
        id: 'raptor',
        name: 'Velociraptor',
        species: 'V. Mongoliensis',
        category: 'carnivoro',
        danger: 'CRÍTICO',
        dangerClass: 'danger-critical',
        diet: 'Carnívoro',
        length: '3.5 metros',
        weight: '150 kg',
        period: 'Cretáceo Superior',
        description: 'Caçadores gregários extremamente inteligentes. Capazes de abrir portas e coordenar emboscadas em grupo.',
        svgColor: '#ef4444',
        svgIcon: 'fa-paw'
    },
    {
        id: 'triceratops',
        name: 'Triceratops',
        species: 'T. Horridus',
        category: 'herbivoro',
        danger: 'BAIXO',
        dangerClass: 'danger-low',
        diet: 'Herbívoro',
        length: '9.0 metros',
        weight: '6.0 Toneladas',
        period: 'Cretáceo',
        description: 'Possui um escudo ósseo maciço e três chifres frontais capazes de repelir ataques diretos dos grandes carnívoros.',
        svgColor: '#10b981',
        svgIcon: 'fa-shield'
    },
    {
        id: 'brachio',
        name: 'Brachiosaurus',
        species: 'B. Altithorax',
        category: 'herbivoro',
        danger: 'BAIXO',
        dangerClass: 'danger-low',
        diet: 'Herbívoro',
        length: '26.0 metros',
        weight: '55.0 Toneladas',
        period: 'Jurássico Superior',
        description: 'Um dos maiores animais a pisar na Terra. Seu pescoço longo permite alcançar a vegetação mais alta dos vales da ilha.',
        svgColor: '#10b981',
        svgIcon: 'fa-tree'
    },
    {
        id: 'spino',
        name: 'Spinosaurus',
        species: 'S. Aegyptiacus',
        category: 'carnivoro',
        danger: 'CRÍTICO',
        dangerClass: 'danger-critical',
        diet: 'Piscívoro/Carnívoro',
        length: '15.0 metros',
        weight: '7.5 Toneladas',
        period: 'Cretáceo',
        description: 'Superpredador semiaquático distinto pela vela dorsal e mandíbulas alongadas semelhantes às dos crocodilos modernos.',
        svgColor: '#ef4444',
        svgIcon: 'fa-fish'
    },
    {
        id: 'ptera',
        name: 'Pteranodon',
        species: 'P. Longiceps',
        category: 'ptero',
        danger: 'MÉDIO',
        dangerClass: 'danger-medium',
        diet: 'Piscívoro',
        length: '7.0 m (Envergadura)',
        weight: '45 kg',
        period: 'Cretáceo Superior',
        description: 'Réptil voador dominante do parque. Mantido sob o aviário de alta resistência devido à extrema agilidade de voo.',
        svgColor: '#f59e0b',
        svgIcon: 'fa-crow'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    renderDinoCards(dinosaurs);
    setupDinoFilters();
    initDnaCanvas();
    initMapEvents();
    initSecurityTerminal();
    setupMobileMenu();
    setupScrollEvents();
});

function initPreloader() {
    const fill = document.getElementById('loaderFill');
    const text = document.getElementById('loaderText');
    const preloader = document.getElementById('preloader');

    const steps = [
        "Iniciando subsistema de biossegurança...",
        "Checando contenção de cercas elétricas...",
        "Carregando sequenciador de DNA...",
        "Sincronizando monitores de satélite...",
        "Acesso autorizado ao Jurassic Island OS."
    ];

    let progress = 0;
    let stepIdx = 0;

    const interval = setInterval(() => {
        progress += 4;
        fill.style.width = `${progress}%`;

        if (progress % 20 === 0 && stepIdx < steps.length) {
            text.textContent = steps[stepIdx];
            stepIdx++;
        }

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500);
        }
    }, 60);
}

function renderDinoCards(dinos) {
    const grid = document.getElementById('dinoGrid');
    grid.innerHTML = '';

    dinos.forEach(dino => {
        const card = document.createElement('div');
        card.className = 'dino-card';
        card.innerHTML = `
            <div class="dino-img-container">
                <div class="danger-tag ${dino.dangerClass}">${dino.danger}</div>
                <div class="dino-svg-wrapper">
                    <i class="fa-solid ${dino.svgIcon}" style="font-size: 5rem; color: ${dino.svgColor};"></i>
                </div>
            </div>
            <div class="dino-body">
                <div>
                    <h3 class="dino-name">${dino.name}</h3>
                    <div class="dino-species">${dino.species}</div>
                </div>
                <div>
                    <div class="dino-stats">
                        <span><i class="fa-solid fa-utensils"></i> ${dino.diet}</span>
                        <span><i class="fa-solid fa-ruler-horizontal"></i> ${dino.length}</span>
                    </div>
                    <button class="btn btn-outline" style="width: 100%; justify-content: center;" onclick="openDinoModal('${dino.id}')">
                        <i class="fa-solid fa-file-medical"></i> Ficha Biológica
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function setupDinoFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            if (filter === 'all') {
                renderDinoCards(dinosaurs);
            } else {
                const filtered = dinosaurs.filter(d => d.category === filter);
                renderDinoCards(filtered);
            }
        });
    });
}

function openDinoModal(dinoId) {
    const dino = dinosaurs.find(d => d.id === dinoId);
    if (!dino) return;

    const modal = document.getElementById('dinoModal');
    const content = document.getElementById('modalContent');

    content.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <i class="fa-solid ${dino.svgIcon}" style="font-size: 4rem; color: ${dino.svgColor}; margin-bottom: 10px;"></i>
            <h2 style="color: var(--gold-amber); font-size: 2rem;">${dino.name}</h2>
            <div style="font-family: var(--tech-mono); color: var(--text-dim);">${dino.species} - ${dino.period}</div>
        </div>
        <div style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 8px; border: 1px solid var(--border-glow); margin-bottom: 20px;">
            <p style="color: var(--text-light);">${dino.description}</p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-family: var(--tech-mono); font-size: 0.9rem; margin-bottom: 20px;">
            <div><strong>DIETA:</strong> ${dino.diet}</div>
            <div><strong>COMPRIMENTO:</strong> ${dino.length}</div>
            <div><strong>PESO EST.:</strong> ${dino.weight}</div>
            <div><strong>NÍVEL AMEAÇA:</strong> <span style="color: ${dino.svgColor}">${dino.danger}</span></div>
        </div>
        <button class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="closeDinoModal()">
            Fechar Ficha Biológica
        </button>
    `;

    modal.classList.add('active');
    playBeepSound();
}

function closeDinoModal() {
    document.getElementById('dinoModal').classList.remove('active');
}

document.getElementById('modalCloseBtn').addEventListener('click', closeDinoModal);

// Sintetizador simples Web Audio para som de bip de interface
function playBeepSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    } catch(e) {}
}

function initDnaCanvas() {
    const canvas = document.getElementById('dnaCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let step = 0;

    function drawDNA() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        step += 0.03;

        for (let i = -10; i <= 10; i++) {
            const y = cy + i * 18;
            const x1 = cx + Math.sin(step + i * 0.3) * 60;
            const x2 = cx - Math.sin(step + i * 0.3) * 60;

            // Linha do par de bases
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Ponto Fita A
            ctx.beginPath();
            ctx.arc(x1, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#d4af37';
            ctx.fill();

            // Ponto Fita B
            ctx.beginPath();
            ctx.arc(x2, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#10b981';
            ctx.fill();
        }

        requestAnimationFrame(drawDNA);
    }
    drawDNA();

    // Botão Sintetizar
    document.getElementById('btnSynthesize').addEventListener('click', () => {
        const base = document.getElementById('geneBaseSelect').value;
        const splice = document.getElementById('geneSpliceSelect').value;
        const resBox = document.getElementById('labResult');

        resBox.style.display = 'block';
        resBox.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processando fusão genômica entre <strong>${base}</strong> e <strong>${splice}</strong>...`;

        setTimeout(() => {
            resBox.innerHTML = `<i class="fa-solid fa-check-circle" style="color: var(--primary-green);"></i> Híbrido Estável Criado! <br>Amostra Genética com 99.4% de viabilidade biológica. Reguladores de pH ativos.`;
        }, 1500);
    });
}

function initMapEvents() {
    const nodes = document.querySelectorAll('.map-node');
    const panelTitle = document.getElementById('mapPanelTitle');
    const panelStatus = document.getElementById('mapPanelStatus');

    nodes.forEach(node => {
        node.addEventListener('click', () => {
            const sector = node.getAttribute('data-sector');
            const status = node.getAttribute('data-status');
            const danger = node.getAttribute('data-danger');

            panelTitle.textContent = sector.toUpperCase();
            panelStatus.innerHTML = `
                Status: <strong>${status}</strong><br>
                Nível de Risco: <span style="color:${danger === 'CRÍTICO' ? '#ef4444' : '#10b981'}">${danger}</span>
            `;
            playBeepSound();
        });
    });
}

function initSecurityTerminal() {
    const termInput = document.getElementById('termInput');
    const termBody = document.getElementById('termBody');
    const termTime = document.getElementById('termTime');

    // Atualizador de Relógio
    setInterval(() => {
        const now = new Date();
        termTime.textContent = now.toTimeString().split(' ')[0] + " UTC";
    }, 1000);

    function printLine(text, color = 'var(--primary-green)') {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.style.color = color;
        line.innerHTML = text;
        termBody.appendChild(line);
        termBody.scrollTop = termBody.scrollHeight;
    }

    function processCommand(cmd) {
        const cleanCmd = cmd.trim().toLowerCase();
        printLine(`root@jurassic-island:~# ${cmd}`, '#ffffff');

        switch(cleanCmd) {
            case 'help':
                printLine("Comandos Disponíveis:");
                printLine(" - <strong>status</strong>: Exibe relatório de cercas e segurança.");
                printLine(" - <strong>clear</strong>: Limpa a tela do terminal.");
                printLine(" - <strong>alert</strong>: Ativa sirene de brecha de segurança.");
                printLine(" - <strong>restore</strong>: Restaura modo normal de segurança.");
                break;
            case 'status':
                printLine("[DIAG] Cercas Setor Norte: ONLINE (12.000 V)");
                printLine("[DIAG] Cercas Setor Sul: ONLINE (12.000 V)");
                printLine("[DIAG] Sensores Infrassônicos: OPERACIONAIS");
                break;
            case 'clear':
                termBody.innerHTML = '';
                break;
            case 'alert':
                triggerEmergency();
                break;
            case 'restore':
                restoreNormal();
                break;
            default:
                printLine(`Comando desconhecido: '${cmd}'. Digite 'help' para auxílio.`, '#ef4444');
        }
    }

    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            processCommand(termInput.value);
            termInput.value = '';
        }
    });

    document.getElementById('btnHelpCmd').addEventListener('click', () => processCommand('help'));
    document.getElementById('btnStatusCmd').addEventListener('click', () => processCommand('status'));
    document.getElementById('btnEmergencyTrigger').addEventListener('click', () => {
        if (document.body.classList.contains('emergency-mode')) {
            processCommand('restore');
        } else {
            processCommand('alert');
        }
    });
}

function triggerEmergency() {
    document.body.classList.add('emergency-mode');
    document.getElementById('statusDot').style.backgroundColor = '#ef4444';
    document.getElementById('statusDot').style.boxShadow = '0 0 10px #ef4444';
    document.getElementById('statusText').textContent = 'BRECHA DETECTADA';
    document.getElementById('statusText').style.color = '#ef4444';

    alert("⚠️ ALERTA VERMELHO! Brecha de segurança detectada no parque. Cercas energizadas comprometidas!");
}

function restoreNormal() {
    document.body.classList.remove('emergency-mode');
    document.getElementById('statusDot').style.backgroundColor = 'var(--primary-green)';
    document.getElementById('statusDot').style.boxShadow = '0 0 8px var(--primary-green)';
    document.getElementById('statusText').textContent = 'ONLINE';
    document.getElementById('statusText').style.color = 'var(--text-light)';
}

function setupMobileMenu() {
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

function setupScrollEvents() {
    const backToTop = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}