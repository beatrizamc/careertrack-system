const vagas = [
  {
    id: 1,
    cargo: "Desenvolvedor Full-Stack",
    empresa: "Bradesco",
    area: "Tecnologia da Informação",
    tipo: "emprego",
    bolsa: "R$ 4.500,00",
    descricao: "Desenvolvimento de sistemas corporativos em Java e JavaScript. Participação em reuniões diárias e resolução de chamados."
  },
  {
    id: 2,
    cargo: "Engenheiro de Software",
    empresa: "Amazon",
    area: "Tecnologia da Informação",
    tipo: "emprego",
    bolsa: "R$ 6.800,00",
    descricao: "Construção de aplicações escaláveis em nuvem (AWS). Trabalho em equipe e boas práticas de código limpo."
  },
  {
    id: 3,
    cargo: "Analista de Dados",
    empresa: "XP",
    area: "Dados",
    tipo: "emprego",
    bolsa: "R$ 5.200,00",
    descricao: "Modelagem e análise de dados em Python e SQL para elaboração de relatórios gerenciais e dashboards."
  },

  {
    id: 4,
    cargo: "Estágio em Desenvolvimento Frontend",
    empresa: "Nubank",
    area: "Tecnologia da Informação",
    tipo: "estagio",
    bolsa: "Bolsa R$ 2.200,00",
    descricao: "Apoiar a criação de telas modernas e acessíveis em HTML5, CSS3 e JavaScript. Carga horária de 30 horas semanais."
  },
  {
    id: 5,
    cargo: "Estagiário em Ciência de Dados",
    empresa: "iFood",
    area: "Dados",
    tipo: "estagio",
    bolsa: "Bolsa R$ 2.000,00",
    descricao: "Auxílio na análise exploratória de dados e aprendizado prático de algoritmos em ambiente colaborativo."
  },
  {
    id: 6,
    cargo: "Estagiário de Testes e Qualidade (QA)",
    empresa: "Mercado Livre",
    area: "Tecnologia da Informação",
    tipo: "estagio",
    bolsa: "Bolsa R$ 1.950,00",
    descricao: "Elaboração de planos de teste e verificação de usabilidade e interface para sistemas web."
  }
];

let candidaturas = JSON.parse(localStorage.getItem('jobmatch_candidaturas')) || [
  {
    id: 1,
    nome: "Ana Paula",
    email: "ana.paula@sempreceub.com.br",
    idade: 20,
    curso: "Ciência da Computação",
    vagaId: 1,
    vagaCargo: "Desenvolvedor Full-Stack",
    vagaEmpresa: "Bradesco",
    status: "Candidato convocado para entrevista"
  },
  {
    id: 2,
    nome: "Pedro Henrique",
    email: "pedro.henrique@sempreceub.com.br",
    idade: 19,
    curso: "Ciência da Computação",
    vagaId: 3,
    vagaCargo: "Analista de Dados",
    vagaEmpresa: "XP",
    status: "Em análise"
  }
];

let contId = candidaturas.length > 0 ? Math.max(...candidaturas.map(c => c.id)) + 1 : 1;
let vagaSelecionada = null;
document.addEventListener('DOMContentLoaded', () => {
  renderizarVagas(vagas);
  renderizarCandidaturas();
  atualizarContadores();
  iniciarCarrossel();
  configurarFiltros();
  configurarAcessibilidade();
  configurarFormularios();
});

function renderizarVagas(lista) {
  const container = document.getElementById('grade-vagas');
  container.innerHTML = '';

  if (lista.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--cor-texto-suave);">Nenhuma vaga encontrada para esta pesquisa.</p>';
    return;
  }

  lista.forEach(vaga => {
    const card = document.createElement('div');
    card.className = 'cartao-vaga';

    card.innerHTML = `
      <div>
        <div class="cartao-vaga-topo">
          <span class="cartao-vaga-id">#${vaga.id}</span>
          <span class="tag-area">${vaga.area}</span>
        </div>
        <h3>${vaga.cargo}</h3>
        <p class="empresa">${vaga.empresa}</p>
        <p class="descricao">${vaga.descricao}</p>
      </div>
      <div class="cartao-vaga-rodape">
        <span class="bolsa">${vaga.bolsa}</span>
        <button class="btn btn-primario btn-pequeno" onclick="abrirModalCandidatura(${vaga.id})">
          Candidatar-se
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

function configurarFiltros() {
  const inputBusca = document.getElementById('input-busca');
  const botoesAba = document.querySelectorAll('.aba-btn');
  let filtroAtual = 'todos';

  function aplicarFiltro() {
    const termo = inputBusca.value.toLowerCase().trim();

    const resultado = vagas.filter(vaga => {
      const bateTexto = vaga.cargo.toLowerCase().includes(termo) ||
                        vaga.empresa.toLowerCase().includes(termo) ||
                        vaga.area.toLowerCase().includes(termo);

      let bateAba = true;
      if (filtroAtual === 'ti') {
        bateAba = vaga.area === 'Tecnologia da Informação';
      } else if (filtroAtual === 'dados') {
        bateAba = vaga.area === 'Dados';
      } else if (filtroAtual === 'estagio') {
        bateAba = vaga.tipo === 'estagio';
      }

      return bateTexto && bateAba;
    });

    renderizarVagas(resultado);
  }

  inputBusca.addEventListener('input', aplicarFiltro);

  botoesAba.forEach(botao => {
    botao.addEventListener('click', () => {
      botoesAba.forEach(b => b.classList.remove('ativo'));
      botao.classList.add('ativo');
      filtroAtual = botao.getAttribute('data-filtro');
      aplicarFiltro();
    });
  });
}
function abrirModalCandidatura(vagaId) {
  vagaSelecionada = vagas.find(v => v.id === vagaId);
  if (!vagaSelecionada) return;

  const modal = document.getElementById('modal-candidatura');
  const infoVaga = document.getElementById('modal-vaga-info');

  infoVaga.textContent = `Vaga selecionada: ${vagaSelecionada.cargo} na empresa ${vagaSelecionada.empresa} (${vagaSelecionada.area})`;
  modal.classList.add('ativo');
}

function fecharModalCandidatura() {
  const modal = document.getElementById('modal-candidatura');
  modal.classList.remove('ativo');
  document.getElementById('form-candidatura').reset();
}

function salvarCandidatura(event) {
  event.preventDefault();

  const nome = document.getElementById('cand-nome').value.trim();
  const email = document.getElementById('cand-email').value.trim();
  const idade = parseInt(document.getElementById('cand-idade').value);
  const curso = document.getElementById('cand-curso').value.trim();

  if (!nome || !email || isNaN(idade) || idade <= 0 || !curso || !email.includes('@')) {
    alert("Por favor, insira os dados necessários em todos os campos com valores válidos.");
    return;
  }

  const novaCandidatura = {
    id: contId,
    nome: nome,
    email: email,
    idade: idade,
    curso: curso,
    vagaId: vagaSelecionada.id,
    vagaCargo: vagaSelecionada.cargo,
    vagaEmpresa: vagaSelecionada.empresa,
    status: "Em análise"
  };

  candidaturas.push(novaCandidatura);
  contId++;

  salvarNoLocalStorage();
  fecharModalCandidatura();
  renderizarCandidaturas();
  atualizarContadores();

  alert(`Candidatura #${novaCandidatura.id} cadastrada com sucesso para a vaga ${vagaSelecionada.cargo}!`);
}

function renderizarCandidaturas() {
  const container = document.getElementById('lista-candidaturas');
  container.innerHTML = '';

  if (candidaturas.length === 0) {
    container.innerHTML = `
      <div class="sem-candidaturas">
        <p>Nenhuma candidatura encontrada.</p>
        <p style="font-size: 0.85rem; margin-top: 0.5rem;">Escolha uma vaga na seção acima e clique em "Candidatar-se" para começar!</p>
      </div>
    `;
    return;
  }

  candidaturas.forEach(cand => {
    const card = document.createElement('div');
    card.className = 'cartao-candidatura';

    let classeStatus = 'status-analise';
    if (cand.status === 'Candidato convocado para entrevista') classeStatus = 'status-convocado';
    if (cand.status === 'Aprovada') classeStatus = 'status-aprovada';
    if (cand.status === 'Negada') classeStatus = 'status-negada';

    card.innerHTML = `
      <div class="cand-info-vaga">
        <h4>${cand.vagaCargo}</h4>
        <p><strong>${cand.vagaEmpresa}</strong> • Protocolo: #${cand.id}</p>
      </div>
      <div class="cand-info-estudante">
        <strong>${cand.nome}</strong> (${cand.idade} anos)
        <span>${cand.curso} • ${cand.email}</span>
      </div>
      <div>
        <span class="status-pilula ${classeStatus}">${cand.status}</span>
      </div>
      <div class="cand-acoes">
        <button class="btn btn-secundario btn-pequeno" onclick="atualizarStatusCandidatura(${cand.id})" title="Alterar Status">
          Status
        </button>
        <button class="btn btn-perigo btn-pequeno" onclick="excluirCandidatura(${cand.id})" title="Excluir Candidatura">
          Excluir 
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

function atualizarStatusCandidatura(id) {
  const candidatura = candidaturas.find(c => c.id === id);
  if (!candidatura) {
    alert("Candidatura não encontrada.");
    return;
  }

  const opcoes = [
    "1- Em análise",
    "2- Candidato convocado para entrevista",
    "3- Aprovada",
    "4- Negada"
  ];

  const escolha = prompt(
    `Atualizar candidatura #${id} (${candidatura.vagaCargo}):\nEscolha o número do novo status:\n${opcoes.join('\n')}`
  );

  if (escolha === null) return;

  switch (escolha.trim()) {
    case '1':
      candidatura.status = "Em análise";
      break;
    case '2':
      candidatura.status = "Candidato convocado para entrevista";
      break;
    case '3':
      candidatura.status = "Aprovada";
      break;
    case '4':
      candidatura.status = "Negada";
      break;
    default:
      alert("Opção inválida.");
      return;
  }

  salvarNoLocalStorage();
  renderizarCandidaturas();
  alert("Candidatura atualizada com sucesso!");
}

function excluirCandidatura(id) {
  const confirmou = confirm(`Deseja realmente excluir a candidatura #${id}?`);
  if (!confirmou) return;

  const indice = candidaturas.findIndex(c => c.id === id);
  if (indice !== -1) {
    candidaturas.splice(indice, 1);
    salvarNoLocalStorage();
    renderizarCandidaturas();
    atualizarContadores();
    alert("Candidatura excluída com sucesso.");
  } else {
    alert("Candidatura não encontrada.");
  }
}
function salvarNoLocalStorage() {
  localStorage.setItem('jobmatch_candidaturas', JSON.stringify(candidaturas));
}
function atualizarContadores() {
  document.getElementById('total-vagas-count').textContent = vagas.length;
  document.getElementById('total-candidaturas-count').textContent = candidaturas.length;
}

let slideAtual = 0;
let carrosselTimer = null;

function iniciarCarrossel() {
  const slides = document.querySelectorAll('.slide');
  const pontos = document.querySelectorAll('.carrossel-indicadores .ponto');
  const btnAnterior = document.getElementById('carrossel-anterior');
  const btnProximo = document.getElementById('carrossel-proximo');

  function mostrarSlide(index) {
    slides.forEach(s => s.classList.remove('ativo'));
    pontos.forEach(p => p.classList.remove('ativo'));

    slideAtual = (index + slides.length) % slides.length;

    slides[slideAtual].classList.add('ativo');
    pontos[slideAtual].classList.add('ativo');
  }

  btnAnterior.addEventListener('click', () => {
    mostrarSlide(slideAtual - 1);
    reiniciarIntervalo();
  });

  btnProximo.addEventListener('click', () => {
    mostrarSlide(slideAtual + 1);
    reiniciarIntervalo();
  });

  pontos.forEach((ponto, i) => {
    ponto.addEventListener('click', () => {
      mostrarSlide(i);
      reiniciarIntervalo();
    });
  });

  function reiniciarIntervalo() {
    if (carrosselTimer) clearInterval(carrosselTimer);
    carrosselTimer = setInterval(() => {
      mostrarSlide(slideAtual + 1);
    }, 6000);
  }

  reiniciarIntervalo();
}
function configurarAcessibilidade() {
  const btnModoEscuro = document.getElementById('btn-modo-escuro');
  const btnAltoContraste = document.getElementById('btn-alto-contraste');
  const btnFonteAumentar = document.getElementById('btn-fonte-aumentar');
  const btnFonteDiminuir = document.getElementById('btn-fonte-diminuir');
  const btnFontePadrao = document.getElementById('btn-fonte-padrao');

  let tamanhoFonteAtual = 16;

  btnModoEscuro.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const estaEscuro = document.body.classList.contains('dark-mode');
    btnModoEscuro.textContent = estaEscuro ? 'Modo Claro' : 'Modo Escuro';
  });

  btnAltoContraste.addEventListener('click', () => {
    document.body.classList.toggle('alto-contraste');
  });

  btnFonteAumentar.addEventListener('click', () => {
    if (tamanhoFonteAtual < 22) {
      tamanhoFonteAtual += 2;
      document.documentElement.style.setProperty('--tamanho-fonte-base', `${tamanhoFonteAtual}px`);
    }
  });

  btnFonteDiminuir.addEventListener('click', () => {
    if (tamanhoFonteAtual > 12) {
      tamanhoFonteAtual -= 2;
      document.documentElement.style.setProperty('--tamanho-fonte-base', `${tamanhoFonteAtual}px`);
    }
  });

  btnFontePadrao.addEventListener('click', () => {
    tamanhoFonteAtual = 16;
    document.documentElement.style.setProperty('--tamanho-fonte-base', '16px');
  });
}

function configurarFormularios() {
  const formCandidatura = document.getElementById('form-candidatura');
  const btnFecharModal = document.getElementById('modal-fechar');
  const btnCancelarModal = document.getElementById('btn-cancelar-modal');

  formCandidatura.addEventListener('submit', salvarCandidatura);
  btnFecharModal.addEventListener('click', fecharModalCandidatura);
  btnCancelarModal.addEventListener('click', fecharModalCandidatura);

  window.addEventListener('click', (e) => {
    const modal = document.getElementById('modal-candidatura');
    if (e.target === modal) {
      fecharModalCandidatura();
    }
  });

  const formLogin = document.getElementById('form-login');
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    alert(`Login efetuado com sucesso como ${email}!`);
  });

  const formContato = document.getElementById('form-contato');
  const feedbackContato = document.getElementById('contato-feedback');

  formContato.addEventListener('submit', (e) => {
    e.preventDefault();
    feedbackContato.style.display = 'block';
    formContato.reset();

    setTimeout(() => {
      feedbackContato.style.display = 'none';
    }, 4500);
  });
}