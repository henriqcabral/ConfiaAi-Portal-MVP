// ConfiaAI Seguros - Main JavaScript

// DOM Elements
const chatContainer = document.getElementById('chatContainer');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const startChatButton = document.getElementById('startChatButton');
const preliminaryComparison = document.getElementById('preliminaryComparison');
const detailedQuotation = document.getElementById('detailedQuotation');
const resultsComparison = document.getElementById('resultsComparison');
const comparisonContainer = document.getElementById('comparisonContainer');
const quotationForm = document.getElementById('quotationForm');
const resultsContainer = document.getElementById('resultsContainer');
const proceedToQuotationButton = document.getElementById('proceedToQuotationButton');
const getQuotationButton = document.getElementById('getQuotationButton');
const detailsModal = document.getElementById('detailsModal');
const closeModal = document.getElementById('closeModal');
const modalContent = document.getElementById('modalContent');

// User data object
const userData = {
    nome: '',
    idade: '',
    cidade: '',
    valoriza: []
};

// Chat flow state
let chatState = {
    currentQuestion: 'nome',
    questionsCompleted: false,
    selectedInsurers: []
};

// Chat questions sequence
const chatQuestions = {
    nome: {
        question: 'Qual é o seu nome?',
        next: 'idade',
        process: (answer) => {
            userData.nome = answer;
            return `Obrigado, ${answer}! Agora, qual é a sua idade?`;
        }
    },
    idade: {
        question: 'Qual é a sua idade?',
        next: 'cidade',
        process: (answer) => {
            const age = parseInt(answer);
            if (isNaN(age) || age < 18 || age > 100) {
                return 'Por favor, informe uma idade válida entre 18 e 100 anos.';
            }
            userData.idade = age;
            return 'Ótimo! E em qual cidade você mora?';
        },
        validate: (answer) => {
            const age = parseInt(answer);
            return !isNaN(age) && age >= 18 && age <= 100;
        }
    },
    cidade: {
        question: 'Em qual cidade você mora?',
        next: 'valoriza',
        process: (answer) => {
            userData.cidade = answer;
            return 'Perfeito! Agora, o que você mais valoriza em um seguro? Escolha até 3 opções:\n\n1. Preço acessível\n2. Atendimento eficiente\n3. Cobertura ampla\n4. Agilidade no sinistro\n5. Tradição da marca\n\nResponda com os números das opções (ex: 1, 3, 5)';
        }
    },
    valoriza: {
        question: 'O que você valoriza em um seguro?',
        next: 'finalizar',
        process: (answer) => {
            const options = {
                '1': 'Preço acessível',
                '2': 'Atendimento eficiente',
                '3': 'Cobertura ampla',
                '4': 'Agilidade no sinistro',
                '5': 'Tradição da marca'
            };
            
            const selectedOptions = answer.split(/[,\s]+/).filter(Boolean);
            
            if (selectedOptions.length > 3) {
                return 'Por favor, escolha no máximo 3 opções. Responda com os números das opções (ex: 1, 3, 5)';
            }
            
            userData.valoriza = selectedOptions.map(num => options[num]).filter(Boolean);
            
            if (userData.valoriza.length === 0) {
                return 'Não consegui identificar suas escolhas. Por favor, responda com os números das opções (ex: 1, 3, 5)';
            }
            
            return `Obrigado por compartilhar suas preferências! Você valoriza: ${userData.valoriza.join(', ')}.\n\nAgora vou analisar as melhores opções de seguro para você. Um momento...`;
        },
        validate: (answer) => {
            const selectedOptions = answer.split(/[,\s]+/).filter(Boolean);
            const validOptions = ['1', '2', '3', '4', '5'];
            const validSelections = selectedOptions.filter(opt => validOptions.includes(opt));
            return validSelections.length > 0 && validSelections.length <= 3;
        }
    },
    finalizar: {
        process: () => {
            chatState.questionsCompleted = true;
            setTimeout(showPreliminaryComparison, 2000);
            return 'Baseado nas suas informações, encontrei algumas opções de seguradoras que podem atender às suas necessidades. Vou mostrar uma comparação preliminar para você.';
        }
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', initApp);
sendButton.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});
startChatButton.addEventListener('click', focusChat);
proceedToQuotationButton.addEventListener('click', showDetailedQuotation);
getQuotationButton.addEventListener('click', showResults);
closeModal.addEventListener('click', () => {
    detailsModal.style.display = 'none';
});

// Initialize the application
function initApp() {
    // Focus on chat when page loads
    userInput.focus();
    
    // Hide the CTA button if chat is already visible
    startChatButton.style.display = 'none';
}

// Focus on chat and scroll to it
function focusChat() {
    chatContainer.scrollIntoView({ behavior: 'smooth' });
    userInput.focus();
    startChatButton.style.display = 'none';
}

// Handle user input in chat
function handleUserInput() {
    const message = userInput.value.trim();
    if (message === '') return;
    
    // Add user message to chat
    addMessage(message, 'user');
    userInput.value = '';
    
    // Process user input based on current question
    processUserInput(message);
}

// Add a message to the chat
function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`, 'fade-in');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Process user input based on current chat state
function processUserInput(message) {
    const currentQuestion = chatQuestions[chatState.currentQuestion];
    
    // Validate input if validation function exists
    if (currentQuestion.validate && !currentQuestion.validate(message)) {
        setTimeout(() => {
            addMessage(currentQuestion.question, 'bot');
        }, 500);
        return;
    }
    
    // Process the answer
    const response = currentQuestion.process(message);
    
    // Add bot response after a short delay
    setTimeout(() => {
        addMessage(response, 'bot');
        
        // Move to next question if not completed
        if (currentQuestion.next) {
            chatState.currentQuestion = currentQuestion.next;
        }
    }, 800);
}

// Show preliminary comparison section
function showPreliminaryComparison() {
    // Generate fake insurance data
    const insurers = [
        {
            id: 1,
            name: 'Seguradora Alfa',
            reputation: 4.7,
            commonComplaints: 'Demora no atendimento telefônico',
            profile: 'Custo-benefício',
            features: ['Cobertura completa', 'Assistência 24h', 'App intuitivo']
        },
        {
            id: 2,
            name: 'Seguradora Beta',
            reputation: 4.2,
            commonComplaints: 'Burocracia na aprovação de sinistros',
            profile: 'Reputação',
            features: ['Tradição no mercado', 'Rede credenciada ampla', 'Descontos progressivos']
        },
        {
            id: 3,
            name: 'Seguradora Gama',
            reputation: 4.5,
            commonComplaints: 'Dificuldade com cancelamentos',
            profile: 'Cobertura',
            features: ['Coberturas exclusivas', 'Carro reserva estendido', 'Proteção para acessórios']
        },
        {
            id: 4,
            name: 'Seguradora Delta',
            reputation: 3.9,
            commonComplaints: 'Reajustes acima da média',
            profile: 'Preço',
            features: ['Menor preço do mercado', 'Planos flexíveis', 'Pagamento em até 12x']
        },
        {
            id: 5,
            name: 'Seguradora Épsilon',
            reputation: 4.8,
            commonComplaints: 'Poucas oficinas credenciadas',
            profile: 'Atendimento',
            features: ['Atendimento premium', 'Resolução rápida', 'Benefícios exclusivos']
        }
    ];
    
    // Clear previous content
    comparisonContainer.innerHTML = '';
    
    // Create cards for each insurer
    insurers.forEach(insurer => {
        const card = document.createElement('div');
        card.classList.add('insurance-card');
        card.innerHTML = `
            <h3>${insurer.name}</h3>
            <div class="rating">
                <div class="rating-stars">
                    ${'★'.repeat(Math.floor(insurer.reputation))}${'☆'.repeat(5 - Math.floor(insurer.reputation))}
                </div>
                <div class="rating-number">${insurer.reputation}</div>
            </div>
            <p><strong>Perfil:</strong> ${insurer.profile}</p>
            <div class="insurance-features">
                ${insurer.features.map(feature => `
                    <div class="feature-item">
                        <i class="fas fa-check"></i>
                        <span>${feature}</span>
                    </div>
                `).join('')}
            </div>
            <p><strong>Reclamações comuns:</strong> ${insurer.commonComplaints}</p>
            <button class="select-button" data-id="${insurer.id}">Selecionar</button>
            <button class="details-button" data-id="${insurer.id}">Ver mais detalhes</button>
        `;
        comparisonContainer.appendChild(card);
    });
    
    // Add event listeners to select buttons
    document.querySelectorAll('.select-button').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            toggleInsurerSelection(id, this);
        });
    });
    
    // Add event listeners to details buttons
    document.querySelectorAll('.details-button').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            showInsurerDetails(insurers.find(ins => ins.id === id));
        });
    });
    
    // Show the comparison section
    preliminaryComparison.classList.remove('hidden');
    preliminaryComparison.scrollIntoView({ behavior: 'smooth' });
    
    // Add AI recommendation message
    setTimeout(() => {
        addMessage(`Com base no seu perfil e preferências, recomendo especialmente a ${getRecommendedInsurer(insurers, userData).name}. Ela se alinha bem com o que você valoriza em um seguro.`, 'bot');
    }, 1000);
}

// Get recommended insurer based on user preferences
function getRecommendedInsurer(insurers, userData) {
    // Simple recommendation logic based on user preferences
    if (userData.valoriza.includes('Preço acessível')) {
        return insurers.find(ins => ins.profile === 'Preço');
    } else if (userData.valoriza.includes('Cobertura ampla')) {
        return insurers.find(ins => ins.profile === 'Cobertura');
    } else if (userData.valoriza.includes('Atendimento eficiente')) {
        return insurers.find(ins => ins.profile === 'Atendimento');
    } else if (userData.valoriza.includes('Tradição da marca')) {
        return insurers.find(ins => ins.profile === 'Reputação');
    } else {
        return insurers.find(ins => ins.profile === 'Custo-benefício');
    }
}

// Toggle insurer selection
function toggleInsurerSelection(id, button) {
    if (button.classList.contains('selected')) {
        button.classList.remove('selected');
        button.textContent = 'Selecionar';
        chatState.selectedInsurers = chatState.selectedInsurers.filter(insId => insId !== id);
    } else {
        if (chatState.selectedInsurers.length >= 5) {
            alert('Você pode selecionar no máximo 5 seguradoras.');
            return;
        }
        button.classList.add('selected');
        button.textContent = 'Selecionado';
        chatState.selectedInsurers.push(id);
    }
    
    // Update proceed button state
    proceedToQuotationButton.disabled = chatState.selectedInsurers.length === 0;
}

// Show insurer details in modal
function showInsurerDetails(insurer) {
    modalContent.innerHTML = `
        <h2>${insurer.name}</h2>
        <div class="rating">
            <div class="rating-stars">
                ${'★'.repeat(Math.floor(insurer.reputation))}${'☆'.repeat(5 - Math.floor(insurer.reputation))}
            </div>
            <div class="rating-number">${insurer.reputation}</div>
        </div>
        <p><strong>Perfil:</strong> ${insurer.profile}</p>
        <div class="insurance-features mt-3">
            <h3>Características:</h3>
            ${insurer.features.map(feature => `
                <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>${feature}</span>
                </div>
            `).join('')}
        </div>
        <div class="mt-3">
            <h3>Análise da IA:</h3>
            <p>${getAIAnalysis(insurer, userData)}</p>
        </div>
        <div class="mt-3">
            <h3>Reclamações comuns:</h3>
            <p>${insurer.commonComplaints}</p>
        </div>
    `;
    detailsModal.style.display = 'flex';
}

// Generate AI analysis for insurer
function getAIAnalysis(insurer, userData) {
    const analyses = {
        'Custo-benefício': `Esta seguradora oferece um bom equilíbrio entre preço e cobertura. ${userData.valoriza.includes('Preço acessível') ? 'Isso se alinha com sua preferência por preço acessível.' : ''}`,
        'Reputação': `Esta seguradora tem forte tradição no mercado e é reconhecida pela confiabilidade. ${userData.valoriza.includes('Tradição da marca') ? 'Isso se alinha com sua valorização da tradição da marca.' : ''}`,
        'Cobertura': `Esta seguradora se destaca pela amplitude de coberturas oferecidas. ${userData.valoriza.includes('Cobertura ampla') ? 'Isso se alinha com sua preferência por cobertura ampla.' : ''}`,
        'Preço': `Esta seguradora oferece os planos mais acessíveis do mercado. ${userData.valoriza.includes('Preço acessível') ? 'Isso se alinha perfeitamente com sua prioridade por preço acessível.' : ''}`,
        'Atendimento': `Esta seguradora é conhecida pela excelência no atendimento ao cliente. ${userData.valoriza.includes('Atendimento eficiente') ? 'Isso se alinha com sua valorização de atendimento eficiente.' : ''}`
    };
    
    return analyses[insurer.profile] || 'Esta seguradora apresenta um perfil equilibrado que pode atender às suas necessidades.';
}

// Show detailed quotation form
function showDetailedQuotation() {
    if (chatState.selectedInsurers.length === 0) {
        alert('Por favor, selecione pelo menos uma seguradora para prosseguir.');
        return;
    }
    
    // Create the detailed quotation form
    quotationForm.innerHTML = `
        <div class="form-group">
            <label for="veiculo">Veículo:</label>
            <input type="text" id="veiculo" class="form-control" placeholder="Marca e modelo (ex: Honda Civic)" required>
        </div>
        <div class="form-group">
            <label for="anoVeiculo">Ano do Veículo:</label>
            <input type="number" id="anoVeiculo" class="form-control" placeholder="Ex: 2020" min="1990" max="2025" required>
        </div>
        <div class="form-group">
            <label for="tempoHabilitacao">Tempo de Habilitação (anos):</label>
            <input type="number" id="tempoHabilitacao" class="form-control" placeholder="Ex: 5" min="0" max="70" required>
        </div>
        <div class="form-group">
            <label>Uso Principal do Veículo:</label>
            <div class="options-container">
                <button type="button" class="option-button" data-value="lazer">Lazer</button>
                <button type="button" class="option-button" data-value="trabalho">Trabalho</button>
                <button type="button" class="option-button" data-value="ambos">Ambos</button>
            </div>
        </div>
        <div class="form-group">
            <label>Garagem na Residência:</label>
            <div class="options-container">
                <button type="button" class="option-button" data-value="sim">Sim</button>
                <button type="button" class="option-button" data-value="nao">Não</button>
            </div>
        </div>
        <div class="form-group">
            <label>Garagem no Trabalho:</label>
            <div class="options-container">
                <button type="button" class="option-button" data-value="sim">Sim</button>
                <button type="button" class="option-button" data-value="nao">Não</button>
                <button type="button" class="option-button" data-value="naoAplica">Não se aplica</button>
            </div>
        </div>
    `;
    
    // Add event listeners to option buttons
    quotationForm.querySelectorAll('.option-button').forEach(button => {
        button.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.querySelectorAll('.option-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });
    
    // Show the detailed quotation section
    detailedQuotation.classList.remove('hidden');
    detailedQuotation.scrollIntoView({ behavior: 'smooth' });
    
    // Add chat message
    setTimeout(() => {
        addMessage('Agora precisamos de algumas informações adicionais sobre seu veículo para finalizar a cotação. Por favor, preencha o formulário que aparece na tela.', 'bot');
    }, 1000);
}

// Show results comparison
function showResults() {
    // Validate form
    const veiculo = document.getElementById('veiculo').value;
    const anoVeiculo = document.getElementById('anoVeiculo').value;
    const tempoHabilitacao = document.getElementById('tempoHabilitacao').value;
    
    const usoOptions = quotationForm.querySelectorAll('.options-container')[0].querySelector('.selected');
    const garagemResidencia = quotationForm.querySelectorAll('.options-container')[1].querySelector('.selected');
    const garagemTrabalho = quotationForm.querySelectorAll('.options-container')[2].querySelector('.selected');
    
    if (!veiculo || !anoVeiculo || !tempoHabilitacao || !usoOptions || !garagemResidencia || !garagemTrabalho) {
        alert('Por favor, preencha todos os campos do formulário.');
        return;
    }
    
    // Generate fake results data
    const results = [
        {
            id: 1,
            name: 'Seguradora Alfa',
            price: 'R$ 1.850,00',
            mainCoverages: ['Colisão', 'Incêndio', 'Roubo/Furto'],
            additionalBenefits: ['Carro reserva por 15 dias', 'Assistência 24h', 'Guincho ilimitado'],
            reputation: 4.7,
            aiExplanation: 'Esta opção oferece cobertura completa com bom custo-benefício. O valor está na média do mercado, mas inclui benefícios adicionais como carro reserva estendido.'
        },
        {
            id: 2,
            name: 'Seguradora Beta',
            price: 'R$ 2.100,00',
            mainCoverages: ['Colisão', 'Incêndio', 'Roubo/Furto', 'Danos a terceiros'],
            additionalBenefits: ['Carro reserva por 30 dias', 'Assistência 24h premium', 'Cobertura de vidros'],
            reputation: 4.2,
            aiExplanation: 'Esta opção tem um preço mais elevado, mas oferece coberturas mais amplas e benefícios premium. Recomendada se você valoriza tranquilidade e serviços adicionais.'
        },
        {
            id: 3,
            name: 'Seguradora Gama',
            price: 'R$ 1.950,00',
            mainCoverages: ['Colisão', 'Incêndio', 'Roubo/Furto', 'Alagamento'],
            additionalBenefits: ['Carro reserva por 20 dias', 'Assistência 24h', 'Reparo rápido'],
            reputation: 4.5,
            aiExplanation: 'Esta opção se destaca pela cobertura de alagamento, que não é comum em planos básicos. Bom custo-benefício para quem mora em regiões com histórico de enchentes.'
        },
        {
            id: 4,
            name: 'Seguradora Delta',
            price: 'R$ 1.650,00',
            mainCoverages: ['Colisão', 'Incêndio', 'Roubo/Furto'],
            additionalBenefits: ['Assistência 24h básica', 'Guincho limitado a 100km'],
            reputation: 3.9,
            aiExplanation: 'Esta é a opção mais econômica, com coberturas essenciais mas benefícios limitados. Ideal para quem prioriza economia e não precisa de serviços adicionais.'
        },
        {
            id: 5,
            name: 'Seguradora Épsilon',
            price: 'R$ 2.250,00',
            mainCoverages: ['Colisão', 'Incêndio', 'Roubo/Furto', 'Danos a terceiros', 'Danos morais'],
            additionalBenefits: ['Carro reserva por 30 dias', 'Assistência 24h VIP', 'Cobertura de vidros, faróis e lanternas', 'App exclusivo'],
            reputation: 4.8,
            aiExplanation: 'Esta é a opção mais completa e premium. O preço é mais alto, mas oferece a maior tranquilidade com coberturas extensas e atendimento VIP.'
        }
    ];
    
    // Filter results based on selected insurers
    const filteredResults = results.filter(result => chatState.selectedInsurers.includes(result.id));
    
    // Clear previous content
    resultsContainer.innerHTML = '';
    
    // Create cards for each result
    filteredResults.forEach(result => {
        const card = document.createElement('div');
        card.classList.add('insurance-card');
        card.innerHTML = `
            <h3>${result.name}</h3>
            <div class="price">${result.price}</div>
            <div class="rating">
                <div class="rating-stars">
                    ${'★'.repeat(Math.floor(result.reputation))}${'☆'.repeat(5 - Math.floor(result.reputation))}
                </div>
                <div class="rating-number">${result.reputation}</div>
            </div>
            <h4 class="mt-3">Coberturas Principais:</h4>
            <div class="insurance-features">
                ${result.mainCoverages.map(coverage => `
                    <div class="feature-item">
                        <i class="fas fa-shield-alt"></i>
                        <span>${coverage}</span>
                    </div>
                `).join('')}
            </div>
            <h4 class="mt-3">Benefícios Adicionais:</h4>
            <div class="insurance-features">
                ${result.additionalBenefits.map(benefit => `
                    <div class="feature-item">
                        <i class="fas fa-plus-circle"></i>
                        <span>${benefit}</span>
                    </div>
                `).join('')}
            </div>
            <button class="cta-button mt-3 details-button" data-id="${result.id}">Ver mais detalhes</button>
        `;
        resultsContainer.appendChild(card);
    });
    
    // Add event listeners to details buttons
    document.querySelectorAll('.results-section .details-button').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            showResultDetails(filteredResults.find(res => res.id === id));
        });
    });
    
    // Show the results section
    resultsComparison.classList.remove('hidden');
    resultsComparison.scrollIntoView({ behavior: 'smooth' });
    
    // Add chat message
    setTimeout(() => {
        addMessage(`Pronto! Aqui estão as cotações detalhadas para o seu ${veiculo} ${anoVeiculo}. Você pode ver mais detalhes de cada opção clicando no botão "Ver mais detalhes".`, 'bot');
        
        // Add recommendation
        const recommended = getRecommendedResult(filteredResults, userData);
        setTimeout(() => {
            addMessage(`Com base no seu perfil e preferências, a ${recommended.name} parece ser a melhor opção para você. ${recommended.aiExplanation}`, 'bot');
        }, 1500);
    }, 1000);
}

// Show result details in modal
function showResultDetails(result) {
    modalContent.innerHTML = `
        <h2>${result.name}</h2>
        <div class="price">${result.price}</div>
        <div class="rating">
            <div class="rating-stars">
                ${'★'.repeat(Math.floor(result.reputation))}${'☆'.repeat(5 - Math.floor(result.reputation))}
            </div>
            <div class="rating-number">${result.reputation}</div>
        </div>
        <div class="mt-3">
            <h3>Coberturas Principais:</h3>
            <div class="insurance-features">
                ${result.mainCoverages.map(coverage => `
                    <div class="feature-item">
                        <i class="fas fa-shield-alt"></i>
                        <span>${coverage}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="mt-3">
            <h3>Benefícios Adicionais:</h3>
            <div class="insurance-features">
                ${result.additionalBenefits.map(benefit => `
                    <div class="feature-item">
                        <i class="fas fa-plus-circle"></i>
                        <span>${benefit}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="mt-3">
            <h3>Análise da IA:</h3>
            <p>${result.aiExplanation}</p>
        </div>
        <div class="mt-4 text-center">
            <button class="cta-button">Contratar este seguro</button>
        </div>
    `;
    detailsModal.style.display = 'flex';
}

// Get recommended result based on user preferences
function getRecommendedResult(results, userData) {
    // Simple recommendation logic based on user preferences
    if (userData.valoriza.includes('Preço acessível')) {
        // Sort by price (lowest first) and return first
        return results.sort((a, b) => {
            const priceA = parseFloat(a.price.replace('R$ ', '').replace('.', '').replace(',', '.'));
            const priceB = parseFloat(b.price.replace('R$ ', '').replace('.', '').replace(',', '.'));
            return priceA - priceB;
        })[0];
    } else if (userData.valoriza.includes('Cobertura ampla')) {
        // Return the one with most coverages
        return results.sort((a, b) => b.mainCoverages.length - a.mainCoverages.length)[0];
    } else if (userData.valoriza.includes('Atendimento eficiente')) {
        // Return the one with highest reputation
        return results.sort((a, b) => b.reputation - a.reputation)[0];
    } else {
        // Default to middle option for balanced recommendation
        return results[Math.floor(results.length / 2)];
    }
}

// Window click event to close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === detailsModal) {
        detailsModal.style.display = 'none';
    }
});
