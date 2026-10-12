/* =========================================================
   ESTADO DO APP
   Tudo que a tela mostra vem daqui. Quando algo muda,
   alteramos o estado e mandamos a tela se redesenhar.
   ========================================================= */
const estado = {
  atendentes: [],
  contatos: [],
  conversas: [],
  atendenteLogadoId: "at1", // por enquanto fixo; o login de verdade vem depois
  conversaAbertaId: null,
  busca: "", // texto digitado na busca
  filtro: "todas", // "todas" | "nao-lidas" | "grupos"
  buscaContatos: "", // texto digitado na busca da aba de contatos
  vendoArquivadas: false, // a lista mostra as arquivadas em vez das normais?
  menuContextoId: null, // conversa em que o botão direito foi clicado
  exclusaoPendenteId: null, // conversa esperando confirmação para excluir
  respostasRapidas: [], // atalhos "/boleto", "/placa"... (vêm do dados.json)
  sugestoesVisiveis: [], // respostas rápidas que combinam com o que foi digitado
  sugestaoAtiva: 0, // qual sugestão está destacada (setas ↑ ↓)
  respondendoA: null, // id da mensagem que está sendo citada
  rascunhos: {}, // texto não enviado de cada conversa: { c1: "Olá...", c3: "..." }
  modoNota: false, // true = o campo escreve nota interna em vez de mensagem
  etiquetas: [], // etiquetas da empresa (vêm do dados.json)
  filtroEtiqueta: "", // id da etiqueta escolhida no seletor ("" = todas)
  etiquetasConversaId: null, // conversa cujas etiquetas estão sendo editadas
  editandoEtiquetaId: null, // etiqueta personalizável sendo renomeada agora
  menuMensagemId: null, // mensagem em que o botão direito foi clicado
  editandoMensagemId: null, // mensagem sendo editada no campo de envio
  textoAntesDaEdicao: "", // o que estava no campo antes de começar a editar
  apagandoMensagemId: null, // mensagem esperando confirmação para apagar
};

/* =========================================================
   ELEMENTOS DA TELA (buscados uma vez só)
   ========================================================= */
const elListaConversas = document.getElementById("lista-conversas");
const elContadorTotal = document.getElementById("contador-total");
const elAviso = document.getElementById("aviso");

const elApp = document.querySelector(".app");
const elChat = document.getElementById("chat");
const elVazioResumo = document.getElementById("vazio-resumo");
const elChatVazio = document.getElementById("chat-vazio");
const elChatAberto = document.getElementById("chat-aberto");
const elChatAvatar = document.getElementById("chat-avatar");
const elChatNome = document.getElementById("chat-nome");
const elChatDetalhe = document.getElementById("chat-detalhe");
const elChatMensagens = document.getElementById("chat-mensagens");
const elBotaoVoltar = document.getElementById("botao-voltar");

const elCampoBusca = document.getElementById("campo-busca");
const elFiltros = document.querySelector(".filtros");

const elPainelConversas = document.getElementById("painel-conversas");
const elPainelContatos = document.getElementById("painel-contatos");
const elBotaoAbrirContatos = document.getElementById("botao-abrir-contatos");
const elBotaoFecharContatos = document.getElementById("botao-fechar-contatos");
const elCampoBuscaContatos = document.getElementById("campo-busca-contatos");
const elListaContatos = document.getElementById("lista-contatos");
const elCampoMensagem = document.getElementById("campo-mensagem");

const elBotaoMenu = document.getElementById("botao-menu");
const elMenuLista = document.getElementById("menu-lista");
const elOpcaoDados = document.getElementById("opcao-dados");
const elOpcaoFixar = document.getElementById("opcao-fixar");
const elOpcaoNaoLida = document.getElementById("opcao-nao-lida");
const elOpcaoArquivar = document.getElementById("opcao-arquivar");
const elOpcaoExcluir = document.getElementById("opcao-excluir");
const elPainelDados = document.getElementById("painel-dados");
const elPainelDadosTitulo = document.querySelector(".painel-dados__topo h2");
const elPainelDadosConteudo = document.getElementById("painel-dados-conteudo");
const elBotaoFecharDados = document.getElementById("botao-fechar-dados");

const elMenuContexto = document.getElementById("menu-contexto");
const elCtxFixar = document.getElementById("ctx-fixar");
const elCtxLida = document.getElementById("ctx-lida");
const elCtxArquivar = document.getElementById("ctx-arquivar");
const elCtxExcluir = document.getElementById("ctx-excluir");
const elDialogoExcluir = document.getElementById("dialogo-excluir");
const elDialogoExcluirTexto = document.getElementById("dialogo-excluir-texto");

const elFormEnvio = document.getElementById("form-envio");
const elBotaoAudio = document.getElementById("botao-audio");
const elBotaoEnviar = document.getElementById("botao-enviar");
const elSugestoes = document.getElementById("sugestoes");
const elCitacaoEnvio = document.getElementById("citacao-envio");
const elCitacaoEnvioAutor = document.getElementById("citacao-envio-autor");
const elCitacaoEnvioTexto = document.getElementById("citacao-envio-texto");
const elBotaoCancelarCitacao = document.getElementById("botao-cancelar-citacao");

const elBotaoAtendente = document.getElementById("botao-atendente");
const elMenuAtendente = document.getElementById("menu-atendente");
const elAtendenteNome = document.getElementById("atendente-nome");
const elAtendenteAvatar = document.getElementById("atendente-avatar");
const elOpcaoAssumir = document.getElementById("opcao-assumir");
const elOpcaoTransferir = document.getElementById("opcao-transferir");
const elFaixa = document.getElementById("faixa-atendimento");
const elFaixaTexto = document.getElementById("faixa-texto");
const elBotaoFaixaAssumir = document.getElementById("botao-faixa-assumir");
const elBotaoNota = document.getElementById("botao-nota");
const elDialogoTransferir = document.getElementById("dialogo-transferir");
const elListaTransferir = document.getElementById("lista-transferir");

const elFiltroEtiqueta = document.getElementById("filtro-etiqueta");
const elChatEtiquetas = document.getElementById("chat-etiquetas");
const elOpcaoResolver = document.getElementById("opcao-resolver");
const elOpcaoEtiquetas = document.getElementById("opcao-etiquetas");
const elOpcaoSimular = document.getElementById("opcao-simular");
const elCtxResolver = document.getElementById("ctx-resolver");
const elCtxEtiquetas = document.getElementById("ctx-etiquetas");
const elDialogoEtiquetas = document.getElementById("dialogo-etiquetas");
const elDialogoEtiquetasTexto = document.getElementById("dialogo-etiquetas-texto");
const elListaEtiquetas = document.getElementById("lista-etiquetas");

const elMenuMensagem = document.getElementById("menu-mensagem");
const elMsgResponder = document.getElementById("msg-responder");
const elMsgCopiar = document.getElementById("msg-copiar");
const elMsgEditar = document.getElementById("msg-editar");
const elMsgApagar = document.getElementById("msg-apagar");
const elEdicaoEnvio = document.getElementById("edicao-envio");
const elEdicaoEnvioTexto = document.getElementById("edicao-envio-texto");
const elBotaoCancelarEdicao = document.getElementById("botao-cancelar-edicao");
const elDialogoApagar = document.getElementById("dialogo-apagar");
const elDialogoApagarTexto = document.getElementById("dialogo-apagar-texto");

const LIMITE_FIXADAS = 3; // em MAIÚSCULAS: convenção para valores que nunca mudam

/* =========================================================
   FUNÇÕES AUXILIARES (pequenas e reutilizáveis)
   ========================================================= */

// Cria um elemento com classe e texto em uma linha só
function criarElemento(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto !== undefined) el.textContent = texto; // textContent: seguro contra código malicioso
  return el;
}

/* ---------- Ícones (SVG) ----------
   Um único lugar com todos os desenhos. Cada valor é o "miolo" de um SVG
   24x24. stroke="currentColor": o ícone usa a cor do texto em volta,
   então muda sozinho com o tema. */
const ICONES = {
  logo: '<path d="M20.5 11.6a8.4 8.4 0 0 1-12.2 7.5L3.5 20.5l1.4-4.6A8.4 8.4 0 1 1 20.5 11.6z"/>',
  mensagem: '<path d="M20.5 11.6a8.4 8.4 0 0 1-12.2 7.5L3.5 20.5l1.4-4.6A8.4 8.4 0 1 1 20.5 11.6z"/><path d="M8.5 10h7M8.5 13.5h4.5"/>',
  contatos: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M21.5 20a6.5 6.5 0 0 0-3.8-5.9"/>',
  buscar: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.4-4.4"/>',
  voltar: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
  fechar: '<path d="M18 6 6 18M6 6l12 12"/>',
  mais: '<circle cx="12" cy="5" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="19" r="1.4" fill="currentColor"/>',
  nota: '<path d="M5 3.5h14a1.5 1.5 0 0 1 1.5 1.5v9.5l-6 6H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5z"/><path d="M14.5 20.5V16a1.5 1.5 0 0 1 1.5-1.5h4.5M7.5 8.5h9M7.5 12h5"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
  enviar: '<path d="M21 3 10 14"/><path d="M21 3 14.5 21 10 14 3 9.5z"/>',
  responder: '<path d="M9.5 14.5 4.5 9.5l5-5"/><path d="M4.5 9.5h10a5 5 0 0 1 5 5v5"/>',
  tocar: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
  pausar: '<rect x="7" y="5.5" width="3.2" height="13" rx="1" fill="currentColor"/><rect x="13.8" y="5.5" width="3.2" height="13" rx="1" fill="currentColor"/>',
  pino: '<path d="M12 16.5V21M8.5 3.5h7l-1 6 3.5 3.5v2h-12v-2L9.5 9.5z"/>',
  arquivo: '<rect x="3" y="4" width="18" height="4.5" rx="1"/><path d="M5 8.5V19a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19V8.5M10 12.5h4"/>',
  lapis: '<path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-4-4L4 16z"/><path d="m14 6 4 4"/>',
  sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/>',
  lua: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
};

/* Cria um <span> com o ícone dentro.
   innerHTML aqui é seguro porque o conteúdo vem do NOSSO código (ICONES),
   nunca de algo que o usuário digitou */
function icone(nome, classe = "") {
  const el = criarElemento("span", `icone ${classe}`.trim());
  el.setAttribute("aria-hidden", "true"); // decorativo: o botão já tem aria-label
  el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONES[nome]}</svg>`;
  return el;
}

// No HTML, os lugares dos ícones estão marcados com data-icone="nome"
function preencherIcones() {
  document.querySelectorAll("[data-icone]").forEach((lugar) => {
    lugar.replaceWith(icone(lugar.dataset.icone));
  });
}

preencherIcones();

function buscarContato(id) {
  return estado.contatos.find((contato) => contato.id === id);
}

function buscarAtendente(id) {
  return estado.atendentes.find((atendente) => atendente.id === id);
}

// Grupo tem nome próprio; contato pega o nome da lista de contatos
function nomeDaConversa(conversa) {
  if (conversa.tipo === "grupo") return conversa.nome;
  const contato = buscarContato(conversa.contatoId);
  return contato ? contato.nome : "Contato desconhecido";
}

// "Mariana Souza" -> "MS"
function iniciais(nome) {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join("");
}

// 14 -> "0:14" | 75 -> "1:15"
function formatarDuracao(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = String(segundos % 60).padStart(2, "0");
  return `${min}:${seg}`;
}

/* A última mensagem "de verdade" (a mais recente do array).
   Eventos do sistema ("Carla assumiu...") são pulados: eles não
   devem mudar a prévia nem a ordem da lista */
function ultimaMensagem(conversa) {
  for (let i = conversa.mensagens.length - 1; i >= 0; i--) {
    if (conversa.mensagens[i].tipo !== "sistema") return conversa.mensagens[i];
  }
  return null;
}

/* ---------- O coração do contador ----------
   Não existe um número guardado em lugar nenhum.
   Sempre contamos na hora: mensagens RECEBIDAS e NÃO LIDAS. */
function contarNaoLidas(conversa) {
  return conversa.mensagens.filter(
    (msg) => msg.direcao === "recebida" && !msg.lida
  ).length;
}

// Conversas arquivadas NÃO entram no contador total (igual ao WhatsApp)
function contarTotalNaoLidas() {
  return estado.conversas
    .filter((conversa) => !conversa.arquivada)
    .reduce(
    (total, conversa) => total + contarNaoLidas(conversa),
    0
  );
}

/* ---------- Datas ----------
   Hoje -> "14:20" | Ontem -> "Ontem" | Antes -> "08/10/2026" */
function mesmoDia(dataA, dataB) {
  return dataA.toDateString() === dataB.toDateString();
}

function formatarHoraLista(iso) {
  const data = new Date(iso);
  const hoje = new Date();
  const ontem = new Date();
  ontem.setDate(hoje.getDate() - 1);

  if (mesmoDia(data, hoje)) {
    return data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  }
  if (mesmoDia(data, ontem)) return "Ontem";
  return data.toLocaleDateString("pt-BR");
}

/* ---------- Prévia da última mensagem ----------
   Texto -> o próprio texto | Áudio -> "🎤 Áudio (0:14)"
   Em grupo, mostra quem falou. Se a equipe enviou, mostra quem respondeu. */
function textoPrevia(conversa) {
  const msg = ultimaMensagem(conversa);
  if (!msg) return "";

  if (msg.apagada) return "🚫 Mensagem apagada";

  // Nota interna: "📝 Rodrigo: ..." (só a equipe vê, então pode aparecer na lista)
  if (msg.tipo === "nota") {
    const quem =
      msg.autor === estado.atendenteLogadoId ? "Você" : buscarAtendente(msg.autor)?.nome || "Equipe";
    return `📝 ${quem}: ${msg.texto}`;
  }

  const conteudo =
    msg.tipo === "audio" ? `🎤 Áudio (${formatarDuracao(msg.duracao)})` : msg.texto;

  if (msg.direcao === "enviada") {
    const atendente = buscarAtendente(msg.autor);
    const quem =
      msg.autor === estado.atendenteLogadoId ? "Você" : atendente?.nome || "Equipe";
    return `${quem}: ${conteudo}`;
  }

  if (conversa.tipo === "grupo" && msg.autor) {
    const primeiroNome = msg.autor.split(" ")[0];
    return `${primeiroNome}: ${conteudo}`;
  }

  return conteudo;
}

/* =========================================================
   ORDENAÇÃO
   1º as fixadas (a fixada mais recentemente primeiro)
   2º as demais (a última mensagem mais recente primeiro)
   ========================================================= */
function ordenarConversas(conversas) {
  // [...conversas] cria uma cópia: sort() não bagunça o array original
  return [...conversas].sort((a, b) => {
    const aFixada = a.fixadaEm !== null;
    const bFixada = b.fixadaEm !== null;

    // Uma fixada e a outra não: a fixada vem antes
    if (aFixada && !bFixada) return -1;
    if (!aFixada && bFixada) return 1;

    // As duas fixadas: compara o momento em que foram fixadas
    if (aFixada && bFixada) {
      return new Date(b.fixadaEm) - new Date(a.fixadaEm);
    }

    // Nenhuma fixada: compara o horário da última mensagem.
    // Conversa nova, ainda sem mensagens, conta como "agora" (vai para o topo)
    const horaA = ultimaMensagem(a)?.horario || Date.now();
    const horaB = ultimaMensagem(b)?.horario || Date.now();
    return new Date(horaB) - new Date(horaA);
  });
}

/* =========================================================
   PARTE 3 — BUSCA E FILTROS
   ========================================================= */

/* Deixa o texto "comparável":
   "Lúcia" -> "lucia" | "JOÃO" -> "joao"
   normalize("NFD") separa a letra do acento ("ú" vira "u" + "´"),
   e o replace apaga os acentos soltos. */
function normalizar(texto) {
  return (texto || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

// "+55 21 98811-0001" -> "5521988110001" (para buscar número de qualquer jeito)
function somenteDigitos(texto) {
  return (texto || "").replace(/\D/g, "");
}

/* Procura uma mensagem de TEXTO que contenha o termo.
   Pega a mais recente (por isso o laço vai de trás para frente). */
function mensagemEncontrada(conversa, termo) {
  for (let i = conversa.mensagens.length - 1; i >= 0; i--) {
    const msg = conversa.mensagens[i];
    const temTexto = msg.tipo === "texto" || msg.tipo === "nota"; // a busca acha notas também
    // Mensagem apagada não pode ser achada pela busca: o texto dela "não existe mais"
    if (temTexto && !msg.apagada && normalizar(msg.texto).includes(termo)) return msg;
  }
  return null;
}

/* A conversa combina com a busca? Procura em:
   nome, número, participantes do grupo e texto das mensagens */
function combinaComBusca(conversa) {
  const termo = normalizar(estado.busca);
  if (!termo) return true; // busca vazia: tudo combina

  // Nome da conversa
  if (normalizar(nomeDaConversa(conversa)).includes(termo)) return true;

  // Número: só compara se a pessoa digitou algum número
  const digitosBusca = somenteDigitos(termo);
  if (digitosBusca && conversa.tipo === "contato") {
    const contato = buscarContato(conversa.contatoId);
    if (somenteDigitos(contato?.numero).includes(digitosBusca)) return true;
  }

  // Participantes do grupo
  if (conversa.tipo === "grupo") {
    const achouParticipante = conversa.participantes.some((p) =>
      normalizar(p).includes(termo)
    );
    if (achouParticipante) return true;
  }

  // Nome das etiquetas ("orcamento" acha conversas com a etiqueta Orçamento)
  const achouEtiqueta = (conversa.etiquetas || []).some((id) =>
    normalizar(buscarEtiqueta(id)?.nome).includes(termo)
  );
  if (achouEtiqueta) return true;

  // Conteúdo das mensagens
  return mensagemEncontrada(conversa, termo) !== null;
}

// Seletor de etiqueta: "" deixa passar tudo
function combinaComEtiqueta(conversa) {
  if (!estado.filtroEtiqueta) return true;
  return (conversa.etiquetas || []).includes(estado.filtroEtiqueta);
}

function combinaComFiltro(conversa) {
  if (estado.filtro === "grupos") return conversa.tipo === "grupo";

  // A conversa aberta continua visível nos filtros abaixo, mesmo que deixe
  // de combinar (ex.: você transferiu a conversa estando em "Minhas")
  const estaAberta = conversa.id === estado.conversaAbertaId;
  const resolvida = estaResolvida(conversa);

  // "Minhas" e "Na fila" são listas de TRABALHO: conversa resolvida não aparece nelas
  if (estado.filtro === "minhas") {
    return (conversa.atendenteId === estado.atendenteLogadoId && !resolvida) || estaAberta;
  }
  if (estado.filtro === "fila") return (!conversa.atendenteId && !resolvida) || estaAberta;
  if (estado.filtro === "resolvidas") return resolvida || estaAberta;

  if (estado.filtro === "nao-lidas") {
    return (
      contarNaoLidas(conversa) > 0 ||
      conversa.marcadaNaoLida ||
      // A conversa aberta continua na lista, mesmo depois de lida.
      // Sem isso, ela sumiria no momento em que você clica nela.
      conversa.id === estado.conversaAbertaId
    );
  }

  return true; // "todas"
}

/* Se a busca encontrou o termo dentro de uma mensagem (e não no nome),
   a prévia mostra ESSA mensagem, para você ver por que a conversa apareceu */
function previaParaLista(conversa) {
  const termo = normalizar(estado.busca);
  if (termo && !normalizar(nomeDaConversa(conversa)).includes(termo)) {
    const msg = mensagemEncontrada(conversa, termo);
    if (msg) return `🔍 ${msg.texto}`;
  }
  return textoPrevia(conversa);
}

/* =========================================================
   DESENHAR A LISTA
   ========================================================= */
function criarItemConversa(conversa) {
  const nome = nomeDaConversa(conversa);
  const naoLidas = contarNaoLidas(conversa);
  const msg = ultimaMensagem(conversa);

  // <li> principal
  const li = criarElemento("li", "conversa");
  li.dataset.id = conversa.id; // vira data-id="c1" no HTML: o clique (parte 2) usa isso
  li.tabIndex = 0; // permite chegar no item com a tecla Tab
  // Mensagem nova de verdade -> destaque verde
  // Só marcada manualmente (sem mensagens novas) -> destaque azul
  if (naoLidas > 0) {
    li.classList.add("conversa--nao-lida");
  } else if (conversa.marcadaNaoLida) {
    li.classList.add("conversa--marcada");
  }
  if (conversa.id === estado.conversaAbertaId) li.classList.add("conversa--ativa");

  // Avatar (quadrado para grupo, redondo para contato)
  const avatar = criarElemento("span", "avatar", iniciais(nome));
  if (conversa.tipo === "grupo") avatar.classList.add("avatar--grupo");
  avatar.setAttribute("aria-hidden", "true");

  // Nome e prévia
  const info = criarElemento("div", "conversa__info");
  info.append(
    criarElemento("div", "conversa__nome", nome),
    criarElemento("div", "conversa__previa", previaParaLista(conversa))
  );

  /* Linha de selos: primeiro o STATUS (resolvida / sem atendente),
     depois até 2 etiquetas, e o resto resumido em "+1", "+2"...
     Antes o status ficava no lado direito e apertava a hora e o badge */
  const linha = criarElemento("div", "conversa__etiquetas");
  if (estaResolvida(conversa)) {
    linha.append(criarElemento("span", "selo selo--resolvida", "✓ Resolvida"));
  } else if (!conversa.atendenteId) {
    // Conversa resolvida não está "na fila", então o selo só aparece nas abertas
    linha.append(criarElemento("span", "selo", "Sem atendente"));
  }
  // Com um selo de status na linha, sobra espaço para só 1 etiqueta
  const ids = conversa.etiquetas || [];
  const cabem = linha.children.length > 0 ? 1 : 2;
  ids.slice(0, cabem).forEach((id) => {
    const etiqueta = buscarEtiqueta(id);
    if (etiqueta) linha.append(criarChipEtiqueta(etiqueta));
  });
  if (ids.length > cabem) linha.append(criarElemento("span", "selo selo--mais", `+${ids.length - cabem}`));
  if (linha.children.length > 0) info.append(linha);

  if (estaResolvida(conversa)) li.classList.add("conversa--resolvida");

  // Lado direito: hora + indicadores
  const lado = criarElemento("div", "conversa__lado");
  lado.append(criarElemento("span", "conversa__hora", msg ? formatarHoraLista(msg.horario) : ""));

  // Lado direito, agora só com o essencial: pino e contador
  const indicadores = criarElemento("div", "conversa__indicadores");

  if (conversa.fixadaEm) {
    const pino = icone("pino", "conversa__fixada");
    pino.title = "Conversa fixada";
    indicadores.append(pino);
  }
  if (naoLidas > 0) {
    const badge = criarElemento("span", "conversa__badge", naoLidas);
    badge.setAttribute("aria-label", `${naoLidas} mensagens não lidas`);
    indicadores.append(badge);
  } else if (conversa.marcadaNaoLida) {
    const ponto = criarElemento("span", "conversa__ponto");
    ponto.setAttribute("aria-label", "Marcada como não lida");
    indicadores.append(ponto);
  }

  lado.append(indicadores);
  li.append(avatar, info, lado);
  return li;
}

/* Linha "🗄️ Arquivadas" no topo da lista normal.
   data-acao diz ao clique o que fazer (ver as arquivadas) */
function criarAtalhoArquivadas(arquivadas) {
  const li = criarElemento("li", "arquivadas");
  li.dataset.acao = "ver-arquivadas";
  li.tabIndex = 0;

  const naoLidas = arquivadas.reduce((total, c) => total + contarNaoLidas(c), 0);
  const total = criarElemento(
    "span",
    "arquivadas__total",
    naoLidas > 0 ? `${naoLidas} não lidas` : arquivadas.length
  );
  if (naoLidas > 0) total.classList.add("arquivadas__total--destaque");

  li.append(
    icone("arquivo", "arquivadas__icone"),
    criarElemento("span", "", "Arquivadas"),
    total
  );
  return li;
}

// Cabeçalho mostrado quando você está DENTRO das arquivadas
function criarCabecalhoArquivadas() {
  const li = criarElemento("li", "arquivadas arquivadas--cabecalho");
  li.dataset.acao = "sair-arquivadas";
  li.tabIndex = 0;
  li.append(
    icone("voltar", "arquivadas__icone"),
    criarElemento("span", "", "Arquivadas"),
    criarElemento("span", "arquivadas__dica", "Não entram no contador")
  );
  return li;
}

function renderizarLista() {
  elListaConversas.innerHTML = ""; // limpa a lista antiga

  // Topo da lista: atalho para as arquivadas, ou o cabeçalho de quem está nelas
  const arquivadas = estado.conversas.filter((c) => c.arquivada && c.mensagens.length > 0);
  if (estado.vendoArquivadas) {
    elListaConversas.append(criarCabecalhoArquivadas());
  } else if (arquivadas.length > 0 && !estado.busca) {
    elListaConversas.append(criarAtalhoArquivadas(arquivadas));
  }

  // 1º filtra (área + busca + filtro), 2º ordena
  const visiveis = estado.conversas.filter(
    (conversa) =>
      // Lista normal mostra as não arquivadas; dentro das arquivadas, só elas
      Boolean(conversa.arquivada) === estado.vendoArquivadas &&
      // Conversa sem nenhuma mensagem só aparece enquanto está aberta
      (conversa.mensagens.length > 0 || conversa.id === estado.conversaAbertaId) &&
      combinaComBusca(conversa) &&
      combinaComFiltro(conversa) &&
      combinaComEtiqueta(conversa)
  );

  if (visiveis.length === 0) {
    let mensagem = "Nenhuma conversa aqui";
    if (estado.busca) mensagem = `Nenhuma conversa encontrada para "${estado.busca}"`;
    else if (estado.vendoArquivadas) mensagem = "Nenhuma conversa arquivada";
    elListaConversas.append(criarElemento("li", "lista-vazia", mensagem));
    return;
  }

  ordenarConversas(visiveis).forEach((conversa) => {
    elListaConversas.append(criarItemConversa(conversa));
  });
}

/* =========================================================
   CONTADOR TOTAL E TÍTULO DA PÁGINA
   ========================================================= */
function atualizarContadores() {
  const total = contarTotalNaoLidas();

  elContadorTotal.textContent = total;
  elContadorTotal.hidden = total === 0; // some quando não há nada para ler

  // Igual ao WhatsApp Web: "(5) Espelho"
  document.title = total > 0 ? `(${total}) Espelho` : "Espelho";

  atualizarResumoVazio(total);
}

/* Resumo da tela "Nenhuma conversa aberta":
   o que está pendente, para você saber por onde começar */
function atualizarResumoVazio(totalNaoLidas) {
  const naFila = estado.conversas.filter(
    (c) => !c.atendenteId && !estaResolvida(c) && !c.arquivada && c.mensagens.length > 0
  ).length;

  const partes = [];
  if (totalNaoLidas > 0) {
    partes.push(`${totalNaoLidas} ${totalNaoLidas === 1 ? "mensagem não lida" : "mensagens não lidas"}`);
  }
  if (naFila > 0) {
    partes.push(`${naFila} ${naFila === 1 ? "conversa na fila" : "conversas na fila"}`);
  }

  elVazioResumo.textContent = partes.length > 0 ? partes.join(" · ") : "Tudo em dia por aqui ✓";
}

// Uma função só para redesenhar tudo que depende do estado
function atualizarTela() {
  renderizarLista();
  atualizarContadores();
}

/* =========================================================
   AVISO FLUTUANTE
   ========================================================= */
let temporizadorAviso;

function mostrarAviso(texto) {
  elAviso.textContent = texto;
  elAviso.hidden = false;
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => (elAviso.hidden = true), 3000);
}

/* =========================================================
   PARTE 2 — ABRIR CONVERSA E MARCAR COMO LIDA
   ========================================================= */
function buscarConversa(id) {
  return estado.conversas.find((conversa) => conversa.id === id);
}

/* Aqui está a correção do bug da ferramenta do trabalho:
   abrir a conversa muda o ESTADO das mensagens (lida = true).
   Como o contador é calculado a partir delas, ele cai sozinho. */
function marcarComoLida(conversa) {
  conversa.mensagens.forEach((msg) => {
    if (msg.direcao === "recebida") msg.lida = true;
  });
  conversa.marcadaNaoLida = false; // abrir também tira a bolinha azul
}

/* Guarda o texto não enviado da conversa atual e limpa o campo.
   Assim uma mensagem pela metade nunca vai parar na conversa errada */
function guardarRascunho() {
  // Trocou de conversa: cancela uma gravação em andamento e para o áudio tocando
  cancelarGravacao();
  pararAudio();
  // Se estava editando, desiste da edição primeiro: o campo volta ao rascunho
  // de antes, e é ESSE rascunho que fica guardado
  cancelarEdicaoMensagem();
  if (estado.conversaAbertaId) {
    estado.rascunhos[estado.conversaAbertaId] = elCampoMensagem.value;
  }
  elCampoMensagem.value = "";
  cancelarCitacao();
  fecharSugestoes();
  definirModoNota(false); // trocou de conversa: volta para mensagem normal, por segurança
}

function abrirConversa(id) {
  const conversa = buscarConversa(id);
  if (!conversa) return;

  if (id !== estado.conversaAbertaId) {
    guardarRascunho();
    elCampoMensagem.value = estado.rascunhos[id] || ""; // devolve o rascunho desta conversa
    atualizarBotaoEnvio();
  }

  estado.conversaAbertaId = id;
  marcarComoLida(conversa);

  elChatVazio.hidden = true;
  elChatAberto.hidden = false;
  elApp.classList.add("app--chat-aberto"); // no celular, troca a lista pelo chat

  renderizarChat(conversa);
  fecharMenu();
  // Se o painel de dados estiver aberto, ele passa a mostrar a nova conversa
  if (!elPainelDados.hidden) renderizarPainelDados(conversa);
  atualizarTela(); // lista e contador se ajustam ao novo estado
}

function fecharConversa() {
  guardarRascunho();
  estado.conversaAbertaId = null;
  fecharMenu();
  elPainelDados.hidden = true;
  elChatAberto.hidden = true;
  elChatVazio.hidden = false;
  elApp.classList.remove("app--chat-aberto");
  atualizarTela();
}

/* ---------- Topo do chat ----------
   Contato: número + atendente responsável
   Grupo: lista de participantes */
function renderizarTopoChat(conversa) {
  const nome = nomeDaConversa(conversa);

  elChatAvatar.textContent = iniciais(nome);
  elChatAvatar.classList.toggle("avatar--grupo", conversa.tipo === "grupo");
  elChatNome.textContent = nome;

  const atendente = buscarAtendente(conversa.atendenteId);
  const responsavel = atendente ? `Atendente: ${atendente.nome}` : "Sem atendente";

  if (conversa.tipo === "grupo") {
    elChatDetalhe.textContent = `${conversa.participantes.join(", ")} · ${responsavel}`;
  } else {
    const contato = buscarContato(conversa.contatoId);
    elChatDetalhe.textContent = `${contato?.numero || ""} · ${responsavel}`;
  }

  // Etiquetas embaixo do nome (o CSS esconde a linha quando está vazia)
  elChatEtiquetas.innerHTML = "";
  (conversa.etiquetas || []).forEach((id) => {
    const etiqueta = buscarEtiqueta(id);
    if (etiqueta) elChatEtiquetas.append(criarChipEtiqueta(etiqueta));
  });
}

/* ---------- Separador de dia ----------
   "Hoje", "Ontem" ou a data por extenso */
function formatarDia(iso) {
  const data = new Date(iso);
  const hoje = new Date();
  const ontem = new Date();
  ontem.setDate(hoje.getDate() - 1);

  if (mesmoDia(data, hoje)) return "Hoje";
  if (mesmoDia(data, ontem)) return "Ontem";
  return data.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}

function formatarHoraMensagem(iso) {
  return new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

/* ---------- Balão de áudio ----------
   Por enquanto só a aparência; tocar de verdade fica para a parte 6 */
function criarConteudoAudio(msg) {
  const audio = criarElemento("div", "audio");

  // O chat é redesenhado o tempo todo; se ESTE áudio estiver tocando,
  // o balão novo já nasce com ⏸ e a barra no ponto certo
  const ehOAtual = msg.id === player.tocandoId;
  const tocando = ehOAtual && !player.elemento.paused;

  const play = criarElemento("button", "audio__play");
  play.type = "button";
  play.append(icone(tocando ? "pausar" : "tocar"));
  play.setAttribute("aria-label", tocando ? "Pausar áudio" : "Reproduzir áudio");

  const barra = criarElemento("div", "audio__barra");
  barra.title = "Clique para avançar ou voltar";
  const progresso = criarElemento("div", "audio__progresso");
  if (ehOAtual) progresso.style.width = `${porcentagemTocada(msg)}%`;
  barra.append(progresso);

  const tempo = ehOAtual ? player.elemento.currentTime : msg.duracao;
  audio.append(play, barra, criarElemento("span", "audio__duracao", formatarDuracao(Math.floor(tempo))));
  return audio;
}

/* ---------- Um balão de mensagem ---------- */
function criarMensagem(msg, conversa) {
  const balao = criarElemento("div", `mensagem mensagem--${msg.direcao}`);
  balao.dataset.id = msg.id; // usado para achar a mensagem ao clicar numa citação

  /* Mensagem apagada (soft delete): o registro continua existindo,
     mas a tela mostra só QUEM apagou. Sem ↩, sem citação, sem ✓✓ */
  if (msg.apagada) {
    balao.classList.add("mensagem--apagada");
    if (msg.tipo === "nota") balao.classList.add("mensagem--nota");
    const quem =
      msg.apagadaPor === estado.atendenteLogadoId
        ? "Você apagou esta mensagem"
        : `Mensagem apagada por ${buscarAtendente(msg.apagadaPor)?.nome || "Equipe"}`;
    balao.append(criarElemento("div", "mensagem__texto", `🚫 ${quem}`));
    const rodapeApagada = criarElemento("div", "mensagem__rodape");
    rodapeApagada.append(criarElemento("span", "mensagem__hora", formatarHoraMensagem(msg.horario)));
    balao.append(rodapeApagada);
    return balao;
  }

  if (msg.tipo === "nota") {
    // Nota interna: amarela, com o autor, sem ↩ e sem ✓✓ (o cliente nunca vê)
    balao.classList.add("mensagem--nota");
    const autor = msg.autor === estado.atendenteLogadoId ? "Você" : buscarAtendente(msg.autor)?.nome || "Equipe";
    balao.append(
      criarElemento("div", "mensagem__autor", `📝 Nota interna · ${autor}`),
      criarElemento("div", "mensagem__texto", msg.texto)
    );
    const rodapeNota = criarElemento("div", "mensagem__rodape");
    if (msg.editadaEm) rodapeNota.append(criarMarcaEditada(msg));
    rodapeNota.append(criarElemento("span", "mensagem__hora", formatarHoraMensagem(msg.horario)));
    balao.append(rodapeNota);
    return balao;
  }

  // Botão ↩ (aparece ao passar o mouse)
  const responder = criarElemento("button", "mensagem__responder");
  responder.append(icone("responder"));
  responder.type = "button";
  responder.dataset.responder = msg.id;
  responder.setAttribute("aria-label", "Responder esta mensagem");
  balao.append(responder);

  // Quem falou:
  // - em grupo, mostra o nome do participante
  // - mensagem enviada por OUTRO atendente, mostra o nome dele (útil com vários logins)
  if (msg.direcao === "recebida" && conversa.tipo === "grupo" && msg.autor) {
    balao.append(criarElemento("div", "mensagem__autor", msg.autor));
  }
  if (msg.direcao === "enviada" && msg.autor !== estado.atendenteLogadoId) {
    const atendente = buscarAtendente(msg.autor);
    balao.append(criarElemento("div", "mensagem__autor", atendente?.nome || "Equipe"));
  }

  // Citação: a mensagem que esta está respondendo
  if (msg.respostaA) {
    const original = conversa.mensagens.find((m) => m.id === msg.respostaA);
    if (original) balao.append(criarCitacao(original, conversa));
  }

  // Conteúdo: texto ou áudio
  if (msg.tipo === "audio") {
    balao.append(criarConteudoAudio(msg));
  } else {
    balao.append(criarElemento("div", "mensagem__texto", msg.texto));
  }

  // Rodapé: "editada" + hora + tracinhos (só nas enviadas)
  const rodape = criarElemento("div", "mensagem__rodape");
  if (msg.editadaEm) rodape.append(criarMarcaEditada(msg));
  rodape.append(criarElemento("span", "mensagem__hora", formatarHoraMensagem(msg.horario)));

  if (msg.direcao === "enviada") {
    const status = criarElemento("span", "mensagem__status", "✓✓");
    if (msg.lida) status.classList.add("mensagem__status--lida");
    status.setAttribute("aria-label", msg.lida ? "Lida" : "Entregue");
    rodape.append(status);
  }

  balao.append(rodape);
  return balao;
}

/* ---------- Todas as mensagens, com separador quando o dia muda ---------- */
function renderizarMensagens(conversa) {
  elChatMensagens.innerHTML = "";
  let diaAnterior = null;

  // Conversa nova: em vez de uma tela vazia, uma dica simples
  if (conversa.mensagens.length === 0) {
    elChatMensagens.append(
      criarElemento("div", "dia", "Nenhuma mensagem ainda. Escreva abaixo para começar 👋")
    );
    return;
  }

  conversa.mensagens.forEach((msg) => {
    const dia = new Date(msg.horario).toDateString();

    // Mudou o dia em relação à mensagem anterior? Coloca o separador
    if (dia !== diaAnterior) {
      elChatMensagens.append(criarElemento("div", "dia", formatarDia(msg.horario)));
      diaAnterior = dia;
    }

    // Evento do sistema vira uma linha discreta; o resto vira balão
    const elemento =
      msg.tipo === "sistema"
        ? criarElemento("div", "evento", msg.texto)
        : criarMensagem(msg, conversa);
    elChatMensagens.append(elemento);
  });

  // Rola até a última mensagem, como no WhatsApp
  elChatMensagens.scrollTop = elChatMensagens.scrollHeight;
}

function renderizarChat(conversa) {
  renderizarTopoChat(conversa);
  renderizarMensagens(conversa);
  renderizarFaixa(conversa);
}

/* ---------- Cliques ----------
   Em vez de um "ouvinte" em cada <li>, colocamos UM na lista inteira.
   Isso se chama delegação de eventos: funciona mesmo com os itens
   sendo apagados e recriados a cada atualização. */
// Decide o que fazer com o item clicado: entrar/sair das arquivadas ou abrir a conversa
function ativarItemLista(alvo) {
  const atalho = alvo.closest("[data-acao]");
  if (atalho) {
    estado.vendoArquivadas = atalho.dataset.acao === "ver-arquivadas";
    renderizarLista();
    elListaConversas.querySelector("[data-acao]")?.focus(); // mantém o foco do teclado
    return true;
  }

  const item = alvo.closest(".conversa");
  if (item) {
    abrirConversa(item.dataset.id);
    return true;
  }
  return false;
}

elListaConversas.addEventListener("click", (evento) => {
  ativarItemLista(evento.target);
});

// Teclado: Enter ou Espaço no item também abre
elListaConversas.addEventListener("keydown", (evento) => {
  if (evento.key !== "Enter" && evento.key !== " ") return;
  if (ativarItemLista(evento.target)) evento.preventDefault(); // impede o Espaço de rolar a página
});

elBotaoVoltar.addEventListener("click", fecharConversa);

/* ---------- Busca ----------
   "input" dispara a cada letra digitada (e também ao clicar no X do campo) */
elCampoBusca.addEventListener("input", () => {
  estado.busca = elCampoBusca.value;
  renderizarLista(); // só a lista muda; o contador total não depende da busca
});

// Esc limpa a busca
elCampoBusca.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") {
    elCampoBusca.value = "";
    estado.busca = "";
    renderizarLista();
  }
});

/* ---------- Filtros ----------
   De novo, delegação: um ouvinte só para os três botões */
elFiltros.addEventListener("click", (evento) => {
  // [data-filtro]: só os botões (o seletor de etiqueta tem a mesma aparência,
  // mas funciona pelo evento "change", lá na parte 7)
  const botao = evento.target.closest("[data-filtro]");
  if (!botao) return;

  estado.filtro = botao.dataset.filtro;

  // Só o botão clicado fica "ativo"
  elFiltros.querySelectorAll("[data-filtro]").forEach((b) => {
    const ativo = b === botao;
    b.classList.toggle("ativo", ativo);
    b.setAttribute("aria-pressed", ativo); // leitor de tela sabe qual está ligado
  });

  renderizarLista();
});

/* =========================================================
   PARTE 4 — MENU DOS 3 PONTOS
   ========================================================= */
function conversaAberta() {
  return buscarConversa(estado.conversaAbertaId);
}

/* ---------- Abrir e fechar o menu ---------- */
function abrirMenu() {
  const conversa = conversaAberta();
  if (!conversa) return;

  // Os textos mudam conforme a situação da conversa
  elOpcaoFixar.textContent = conversa.fixadaEm ? "Desafixar conversa" : "Fixar conversa";
  elOpcaoDados.textContent = conversa.tipo === "grupo" ? "Dados do grupo" : "Dados do contato";
  elOpcaoArquivar.textContent = conversa.arquivada ? "Desarquivar conversa" : "Arquivar conversa";
  // "Assumir" some se a conversa já é sua
  elOpcaoAssumir.parentElement.hidden = conversa.atendenteId === estado.atendenteLogadoId;
  elOpcaoResolver.textContent = estaResolvida(conversa) ? "Reabrir conversa" : "Marcar como resolvida";
  elOpcaoFixar.parentElement.hidden = Boolean(conversa.arquivada); // arquivada não pode ser fixada

  elMenuLista.hidden = false;
  elBotaoMenu.setAttribute("aria-expanded", "true");
  elMenuLista.querySelector("button").focus(); // teclado já cai na 1ª opção
}

function fecharMenu() {
  elMenuLista.hidden = true;
  elBotaoMenu.setAttribute("aria-expanded", "false");
}

/* ---------- Fixar / desafixar (limite de 3) ----------
   Os dados guardam o ESTADO (fixadaEm); a REGRA do limite fica aqui no código */
function alternarFixada(conversa) {
  if (conversa.fixadaEm) {
    conversa.fixadaEm = null;
    mostrarAviso("Conversa desafixada");
  } else {
    const totalFixadas = estado.conversas.filter((c) => c.fixadaEm).length;

    if (totalFixadas >= LIMITE_FIXADAS) {
      mostrarAviso(`Você só pode fixar até ${LIMITE_FIXADAS} conversas`);
      return; // para aqui: não fixa
    }

    conversa.fixadaEm = new Date().toISOString(); // o "agora" no mesmo formato do JSON
    mostrarAviso("Conversa fixada");
  }
  atualizarTela();
}

/* ---------- Marcar como não lida ----------
   Se for a conversa aberta, ela é fechada: se ficasse aberta,
   continuaria "sendo lida" e a marcação não faria sentido */
function marcarComoNaoLida(conversa) {
  conversa.marcadaNaoLida = true;
  if (conversa.id === estado.conversaAbertaId) fecharConversa();
  else atualizarTela();
  mostrarAviso("Conversa marcada como não lida");
}

/* ---------- Painel de dados ---------- */
// Uma linha do painel: rótulo pequeno em cima, valor embaixo
function criarDado(rotulo, valor) {
  const bloco = criarElemento("div", "dado");
  bloco.append(
    criarElemento("div", "dado__rotulo", rotulo),
    criarElemento("div", "dado__valor", valor)
  );
  return bloco;
}

function renderizarPainelDados(conversa) {
  elPainelDadosConteudo.innerHTML = "";
  const nome = nomeDaConversa(conversa);
  const atendente = buscarAtendente(conversa.atendenteId);

  elPainelDadosTitulo.textContent = conversa.tipo === "grupo" ? "Dados do grupo" : "Dados do contato";

  // Cabeçalho: avatar grande + nome
  const avatar = criarElemento("span", "avatar", iniciais(nome));
  if (conversa.tipo === "grupo") avatar.classList.add("avatar--grupo");
  avatar.setAttribute("aria-hidden", "true");
  elPainelDadosConteudo.append(avatar, criarElemento("h3", "painel-dados__nome", nome));

  if (conversa.tipo === "grupo") {
    // Lista de participantes
    const bloco = criarElemento("div", "dado");
    bloco.append(
      criarElemento("div", "dado__rotulo", `${conversa.participantes.length} participantes`)
    );
    const lista = criarElemento("ul", "dado__lista");
    conversa.participantes.forEach((p) => lista.append(criarElemento("li", "", p)));
    bloco.append(lista);
    elPainelDadosConteudo.append(bloco);
  } else {
    const contato = buscarContato(conversa.contatoId);
    if (contato) {
      elPainelDadosConteudo.append(criarDado("Número", contato.numero));
      // Só mostra o que estiver preenchido: nada de campos vazios na tela
      if (contato.email) elPainelDadosConteudo.append(criarDado("E-mail", contato.email));
      if (contato.empresa) elPainelDadosConteudo.append(criarDado("Empresa", contato.empresa));
      if (contato.observacao) elPainelDadosConteudo.append(criarDado("Observação", contato.observacao));
      if (contato.salvo === false) {
        elPainelDadosConteudo.append(criarDado("Situação", "Número não salvo nos contatos"));
      }
    }
  }

  elPainelDadosConteudo.append(
    criarDado("Atendente responsável", atendente ? atendente.nome : "Sem atendente")
  );
}

function abrirPainelDados() {
  const conversa = conversaAberta();
  if (!conversa) return;
  renderizarPainelDados(conversa);
  elPainelDados.hidden = false;
  elBotaoFecharDados.focus();
}

function fecharPainelDados() {
  elPainelDados.hidden = true;
}

/* ---------- Eventos do menu ---------- */
elBotaoMenu.addEventListener("click", () => {
  if (elMenuLista.hidden) abrirMenu();
  else fecharMenu();
});

elOpcaoFixar.addEventListener("click", () => {
  fecharMenu();
  alternarFixada(conversaAberta());
});

elOpcaoNaoLida.addEventListener("click", () => {
  fecharMenu();
  marcarComoNaoLida(conversaAberta());
});

elOpcaoDados.addEventListener("click", () => {
  fecharMenu();
  abrirPainelDados();
});

// Arquivar e excluir: as MESMAS funções do menu do botão direito
elOpcaoArquivar.addEventListener("click", () => {
  fecharMenu();
  alternarArquivada(conversaAberta());
});

elOpcaoExcluir.addEventListener("click", () => {
  fecharMenu();
  pedirExclusao(conversaAberta());
});

elBotaoFecharDados.addEventListener("click", fecharPainelDados);

// Clicou fora do menu? Fecha
document.addEventListener("click", (evento) => {
  if (!elMenuLista.hidden && !evento.target.closest(".menu")) fecharMenu();
});

// Esc fecha o menu (e devolve o foco ao botão ⋮) ou o painel de dados
document.addEventListener("keydown", (evento) => {
  if (evento.key !== "Escape") return;

  // Com uma janela (dialog) aberta, o Esc é dela: fecha só a janela
  if (document.querySelector("dialog[open]")) return;

  // Gravando áudio? O Esc cancela a gravação (e só isso)
  if (estaGravando()) {
    cancelarGravacao();
    mostrarAviso("Gravação cancelada");
    return;
  }

  /* Ordem de prioridade: fecha primeiro o que está "por cima".
     Cada Esc faz UMA coisa só (por isso tudo é if / else if) */
  if (!elMenuMensagem.hidden) {
    fecharMenuMensagem();
  } else if (!elMenuAtendente.hidden) {
    fecharMenuAtendente();
    elBotaoAtendente.focus();
  } else if (!elMenuContexto.hidden) {
    fecharMenuContexto();
  } else if (!elMenuLista.hidden) {
    fecharMenu();
    elBotaoMenu.focus();
  } else if (!elPainelDados.hidden) {
    fecharPainelDados();
  } else if (estado.conversaAbertaId && podeFecharComEsc()) {
    // Nada mais aberto por cima: fecha a conversa
    const id = estado.conversaAbertaId;
    fecharConversa();
    // Devolve o foco ao item da lista, para quem navega pelo teclado não se perder
    elListaConversas.querySelector(`.conversa[data-id="${id}"]`)?.focus();
  }
});

/* O Esc fecha a conversa de qualquer lugar (inclusive logo depois de
   clicar nela na lista), MENOS quando você está digitando num campo
   fora do chat, como a busca: ali o Esc é do campo (limpar o texto) */
function podeFecharComEsc() {
  const ativo = document.activeElement;
  const digitandoEmCampo = ativo?.matches("input, textarea, select");
  return !(digitandoEmCampo && !elChat.contains(ativo));
}

/* =========================================================
   MENU DO BOTÃO DIREITO NA LISTA (arquivar, excluir...)
   ========================================================= */
function temAlgoNaoLido(conversa) {
  return contarNaoLidas(conversa) > 0 || conversa.marcadaNaoLida;
}

function abrirMenuContexto(conversa, x, y) {
  estado.menuContextoId = conversa.id;
  fecharMenu(); // não deixa dois menus abertos ao mesmo tempo

  // Textos conforme a situação da conversa
  elCtxFixar.textContent = conversa.fixadaEm ? "Desafixar conversa" : "Fixar conversa";
  elCtxFixar.parentElement.hidden = Boolean(conversa.arquivada); // arquivada não pode ser fixada
  elCtxLida.textContent = temAlgoNaoLido(conversa) ? "Marcar como lida" : "Marcar como não lida";
  elCtxArquivar.textContent = conversa.arquivada ? "Desarquivar conversa" : "Arquivar conversa";
  elCtxResolver.textContent = estaResolvida(conversa) ? "Reabrir conversa" : "Marcar como resolvida";

  // Mostra primeiro, para conseguir medir o tamanho do menu
  elMenuContexto.hidden = false;

  // Se o menu fosse sair da tela (perto da borda), empurra para dentro
  const largura = elMenuContexto.offsetWidth;
  const altura = elMenuContexto.offsetHeight;
  const posX = Math.min(x, window.innerWidth - largura - 8);
  const posY = Math.min(y, window.innerHeight - altura - 8);

  elMenuContexto.style.left = `${posX}px`;
  elMenuContexto.style.top = `${posY}px`;

  elMenuContexto.querySelector("li:not([hidden]) button").focus();
}

function fecharMenuContexto() {
  elMenuContexto.hidden = true;
  estado.menuContextoId = null;
}

/* ---------- Ações ---------- */
function alternarLida(conversa) {
  if (temAlgoNaoLido(conversa)) {
    marcarComoLida(conversa); // a mesma função de quando você abre a conversa
    atualizarTela();
  } else {
    marcarComoNaoLida(conversa);
  }
}

/* Arquivar tira a conversa da lista principal e do contador.
   Também desafixa (no WhatsApp é igual: arquivada não fica fixada) */
function alternarArquivada(conversa) {
  if (conversa.arquivada) {
    conversa.arquivada = false;
    mostrarAviso("Conversa desarquivada");
  } else {
    conversa.arquivada = true;
    conversa.fixadaEm = null;
    if (conversa.id === estado.conversaAbertaId) fecharConversa();
    mostrarAviso("Conversa arquivada");
  }
  atualizarTela();
}

function pedirExclusao(conversa) {
  estado.exclusaoPendenteId = conversa.id;
  elDialogoExcluirTexto.textContent =
    `A conversa com ${nomeDaConversa(conversa)} e todas as mensagens serão apagadas. ` +
    "Isso não pode ser desfeito.";
  elDialogoExcluir.showModal(); // abre a janela e bloqueia o resto da tela
}

function excluirConversa(id) {
  if (id === estado.conversaAbertaId) fecharConversa();
  // filter devolve um array novo SEM a conversa excluída
  estado.conversas = estado.conversas.filter((c) => c.id !== id);
  atualizarTela();
  mostrarAviso("Conversa excluída");
}

/* ---------- Eventos ----------
   "contextmenu" é o evento do botão direito.
   preventDefault() impede o menu padrão do navegador de aparecer */
elListaConversas.addEventListener("contextmenu", (evento) => {
  const item = evento.target.closest(".conversa");
  if (!item) return;
  evento.preventDefault();

  let x = evento.clientX;
  let y = evento.clientY;

  // Aberto pelo teclado (tecla Menu ou Shift+F10): não há mouse, usa a posição do item
  if (x === 0 && y === 0) {
    const caixa = item.getBoundingClientRect();
    x = caixa.left + 40;
    y = caixa.bottom;
  }

  abrirMenuContexto(buscarConversa(item.dataset.id), x, y);
});

// Cada opção: pega a conversa, fecha o menu e executa a ação
function aoEscolherNoMenuContexto(acao) {
  return () => {
    const conversa = buscarConversa(estado.menuContextoId);
    fecharMenuContexto();
    if (conversa) acao(conversa);
  };
}

elCtxFixar.addEventListener("click", aoEscolherNoMenuContexto(alternarFixada));
elCtxLida.addEventListener("click", aoEscolherNoMenuContexto(alternarLida));
elCtxArquivar.addEventListener("click", aoEscolherNoMenuContexto(alternarArquivada));
elCtxExcluir.addEventListener("click", aoEscolherNoMenuContexto(pedirExclusao));

// Clicou fora, rolou a lista ou redimensionou a janela? Fecha o mini menu
document.addEventListener("click", (evento) => {
  if (!elMenuContexto.hidden && !evento.target.closest("#menu-contexto")) fecharMenuContexto();
});
elListaConversas.addEventListener("scroll", fecharMenuContexto);
window.addEventListener("resize", fecharMenuContexto);

// A janela de confirmação fechou: returnValue diz qual botão foi clicado
// (Esc fecha sem valor, então conta como cancelar)
elDialogoExcluir.addEventListener("close", () => {
  if (elDialogoExcluir.returnValue === "excluir" && estado.exclusaoPendenteId) {
    excluirConversa(estado.exclusaoPendenteId);
  }
  estado.exclusaoPendenteId = null;
  elDialogoExcluir.returnValue = ""; // limpa para a próxima vez
});

/* =========================================================
   ABA DE CONTATOS E NOVA CONVERSA
   Regra: nada de formulário. Clicou no contato, a conversa abre.
   ========================================================= */

/* "5521988110001" -> "+55 21 98811-0001"
   Números de 10 ou 11 dígitos (DDD + número) ganham o 55 do Brasil */
function formatarNumero(digitos) {
  if (digitos.length === 10 || digitos.length === 11) digitos = "55" + digitos;

  if (digitos.length === 13) {
    return `+${digitos.slice(0, 2)} ${digitos.slice(2, 4)} ${digitos.slice(4, 9)}-${digitos.slice(9)}`;
  }
  if (digitos.length === 12) {
    return `+${digitos.slice(0, 2)} ${digitos.slice(2, 4)} ${digitos.slice(4, 8)}-${digitos.slice(8)}`;
  }
  return `+${digitos}`;
}

function abrirPainelContatos() {
  elPainelConversas.hidden = true;
  elPainelContatos.hidden = false;
  elCampoBuscaContatos.value = "";
  estado.buscaContatos = "";
  renderizarContatos();
  elCampoBuscaContatos.focus(); // já pode digitar
}

function fecharPainelContatos() {
  elPainelContatos.hidden = true;
  elPainelConversas.hidden = false;
}

function criarItemContato({ id, nome, detalhe, novoNumero }) {
  const li = criarElemento("li", "contato");
  li.tabIndex = 0;

  if (novoNumero) {
    li.dataset.novoNumero = novoNumero;
    li.classList.add("contato--novo");
  } else {
    li.dataset.contatoId = id;
  }

  const avatar = criarElemento("span", "avatar", novoNumero ? "+" : iniciais(nome));
  avatar.setAttribute("aria-hidden", "true");

  const info = criarElemento("div", "contato__info");
  info.append(
    criarElemento("div", "contato__nome", nome),
    criarElemento("div", "contato__numero", detalhe)
  );

  li.append(avatar, info);
  return li;
}

function renderizarContatos() {
  elListaContatos.innerHTML = "";

  const termo = normalizar(estado.buscaContatos);
  const digitosBusca = somenteDigitos(estado.buscaContatos);

  // Só os contatos salvos, filtrados pela busca, em ordem alfabética
  const encontrados = estado.contatos
    .filter((c) => c.salvo !== false)
    .filter(
      (c) =>
        !termo ||
        normalizar(c.nome).includes(termo) ||
        (digitosBusca && somenteDigitos(c.numero).includes(digitosBusca))
    )
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

  /* Digitou um número completo (DDD + número) que ninguém tem?
     Oferece conversar com ele, no topo da lista */
  if (digitosBusca.length >= 10) {
    const numeroCompleto = somenteDigitos(formatarNumero(digitosBusca));
    const jaExiste = estado.contatos.some((c) => somenteDigitos(c.numero) === numeroCompleto);

    if (!jaExiste) {
      elListaContatos.append(
        criarItemContato({
          nome: `Conversar com ${formatarNumero(digitosBusca)}`,
          detalhe: "Número não salvo",
          novoNumero: numeroCompleto,
        })
      );
    }
  }

  encontrados.forEach((c) => {
    elListaContatos.append(criarItemContato({ id: c.id, nome: c.nome, detalhe: c.numero }));
  });

  if (elListaContatos.children.length === 0) {
    elListaContatos.append(
      criarElemento(
        "li",
        "lista-vazia",
        "Nenhum contato encontrado. Digite o número com DDD para iniciar uma conversa."
      )
    );
  }
}

/* Já existe conversa com esse contato? Abre ela.
   Não existe? Cria uma vazia e abre. Sem perguntas. */
function iniciarConversaComContato(contatoId) {
  let conversa = estado.conversas.find(
    (c) => c.tipo === "contato" && c.contatoId === contatoId
  );

  if (!conversa) {
    conversa = {
      id: `c${Date.now()}`, // id único simples: o horário em milissegundos
      tipo: "contato",
      contatoId,
      atendenteId: estado.atendenteLogadoId, // quem iniciou fica responsável
      marcadaNaoLida: false,
      arquivada: false,
      fixadaEm: null,
      mensagens: [],
    };
    estado.conversas.push(conversa);
  }

  // Procurou o contato de propósito? Traz a conversa de volta das arquivadas
  if (conversa.arquivada) {
    conversa.arquivada = false;
    estado.vendoArquivadas = false;
  }

  fecharPainelContatos();
  abrirConversa(conversa.id);
  elCampoMensagem.focus(); // cursor pronto para escrever
}

// Número que não está nos contatos: cria um contato "não salvo" e abre a conversa
function iniciarConversaComNumero(digitos) {
  const contato = {
    id: `ct${Date.now()}`,
    nome: formatarNumero(digitos), // sem nome, mostramos o número (como no WhatsApp)
    numero: formatarNumero(digitos),
    email: null,
    empresa: null,
    observacao: null,
    salvo: false, // não aparece na aba de contatos até alguém salvar
  };
  estado.contatos.push(contato);
  iniciarConversaComContato(contato.id);
}

function abrirItemContato(item) {
  if (item.dataset.novoNumero) {
    iniciarConversaComNumero(item.dataset.novoNumero);
  } else {
    iniciarConversaComContato(item.dataset.contatoId);
  }
}

/* ---------- Eventos da aba de contatos ---------- */
elBotaoAbrirContatos.addEventListener("click", abrirPainelContatos);
elBotaoFecharContatos.addEventListener("click", fecharPainelContatos);

elCampoBuscaContatos.addEventListener("input", () => {
  estado.buscaContatos = elCampoBuscaContatos.value;
  renderizarContatos();
});

elCampoBuscaContatos.addEventListener("keydown", (evento) => {
  // Enter abre o primeiro resultado: digitar o número + Enter já inicia a conversa
  if (evento.key === "Enter") {
    const primeiro = elListaContatos.querySelector(".contato");
    if (primeiro) abrirItemContato(primeiro);
  }
  if (evento.key === "Escape") fecharPainelContatos();
});

elListaContatos.addEventListener("click", (evento) => {
  const item = evento.target.closest(".contato");
  if (item) abrirItemContato(item);
});

elListaContatos.addEventListener("keydown", (evento) => {
  if (evento.key !== "Enter" && evento.key !== " ") return;
  const item = evento.target.closest(".contato");
  if (!item) return;
  evento.preventDefault();
  abrirItemContato(item);
});

/* =========================================================
   PARTE 5 — ENVIAR MENSAGENS
   ========================================================= */

/* ---------- 🎤 ou Enviar ----------
   Campo vazio: microfone. Com texto: botão Enviar */
function atualizarBotaoEnvio() {
  const temTexto = elCampoMensagem.value.trim() !== "";
  elBotaoAudio.hidden = temTexto;
  elBotaoEnviar.hidden = !temTexto;
}

/* ---------- Regras que valem para QUALQUER envio ao cliente ----------
   (texto agora, áudio na parte 9). Ficam num lugar só para não duplicar */
function aplicarRegrasDeEnvio(conversa) {
  // Respondeu o cliente numa conversa da fila? Ela passa a ser sua
  if (!conversa.atendenteId) {
    conversa.atendenteId = estado.atendenteLogadoId;
    registrarEvento(conversa, `${nomeLogado()} assumiu a conversa`);
  }
  // Escreveu de novo numa conversa resolvida? Ela reabre
  if (estaResolvida(conversa)) {
    conversa.status = "aberta";
    registrarEvento(conversa, `${nomeLogado()} reabriu a conversa`);
  }
}

/* ---------- Enviar ---------- */
function enviarMensagem(texto) {
  const conversa = conversaAberta();
  if (!conversa) return;

  const ehNota = estado.modoNota;

  // Nota interna não conta como atender: escrever uma nota não assume nem reabre
  if (!ehNota) aplicarRegrasDeEnvio(conversa);

  const mensagem = ehNota
    ? {
        id: `m${Date.now()}`,
        tipo: "nota",
        texto,
        horario: new Date().toISOString(),
        direcao: "interna", // nunca é enviada ao cliente
        lida: true,
        autor: estado.atendenteLogadoId,
      }
    : {
        id: `m${Date.now()}`,
        tipo: "texto",
        texto,
        horario: new Date().toISOString(),
        direcao: "enviada",
        lida: false, // ✓✓ cinza: o cliente ainda não leu
        autor: estado.atendenteLogadoId,
        respostaA: estado.respondendoA, // null se não estiver citando nada
      };

  conversa.mensagens.push(mensagem);
  delete estado.rascunhos[conversa.id]; // enviou: não há mais rascunho

  elCampoMensagem.value = "";
  cancelarCitacao();
  atualizarBotaoEnvio();

  renderizarChat(conversa);
  atualizarTela(); // a conversa sobe para o topo da lista com a prévia nova

  if (!ehNota) simularLeituraDoCliente(conversa, mensagem);
}

/* ⚠️ SIMULAÇÃO: enquanto não há WhatsApp de verdade, finge que o cliente
   leu a mensagem 3 segundos depois, para você ver o ✓✓ ficar azul.
   Quando o backend existir, quem avisa que a mensagem foi lida é ele. */
function simularLeituraDoCliente(conversa, mensagem) {
  setTimeout(() => {
    mensagem.lida = true;
    if (conversa.id === estado.conversaAbertaId) renderizarChat(conversa);
  }, 3000);
}

/* =========================================================
   RESPONDER CITANDO
   ========================================================= */

// Quem escreveu a mensagem, do ponto de vista de quem está logado
function nomeDoAutor(msg, conversa) {
  if (msg.direcao === "enviada") {
    if (msg.autor === estado.atendenteLogadoId) return "Você";
    return buscarAtendente(msg.autor)?.nome || "Equipe";
  }
  if (conversa.tipo === "grupo" && msg.autor) return msg.autor;
  return nomeDaConversa(conversa);
}

function resumoDaMensagem(msg) {
  if (msg.apagada) return "🚫 Mensagem apagada";
  return msg.tipo === "audio" ? `🎤 Áudio (${formatarDuracao(msg.duracao)})` : msg.texto;
}

// O quadrinho com borda verde que mostra a mensagem citada
function criarCitacao(original, conversa) {
  const citacao = criarElemento("div", "citacao");
  citacao.dataset.irPara = original.id; // clicar leva até a mensagem original
  citacao.append(
    criarElemento("div", "citacao__autor", nomeDoAutor(original, conversa)),
    criarElemento("div", "citacao__texto", resumoDaMensagem(original))
  );
  return citacao;
}

function iniciarCitacao(idMensagem) {
  const conversa = conversaAberta();
  const msg = conversa?.mensagens.find((m) => m.id === idMensagem);
  if (!msg || msg.apagada) return;

  cancelarEdicaoMensagem(); // responder e editar ao mesmo tempo não faz sentido
  estado.respondendoA = msg.id;
  elCitacaoEnvioAutor.textContent = nomeDoAutor(msg, conversa);
  elCitacaoEnvioTexto.textContent = resumoDaMensagem(msg);
  elCitacaoEnvio.hidden = false;
  elCampoMensagem.focus();
}

function cancelarCitacao() {
  estado.respondendoA = null;
  elCitacaoEnvio.hidden = true;
}

// Rola até a mensagem original e faz ela piscar
function irParaMensagem(id) {
  const alvo = elChatMensagens.querySelector(`.mensagem[data-id="${id}"]`);
  if (!alvo) return;
  alvo.scrollIntoView({ behavior: "smooth", block: "center" });
  alvo.classList.remove("mensagem--destaque");
  void alvo.offsetWidth; // truque: força o navegador a "reiniciar" a animação
  alvo.classList.add("mensagem--destaque");
}

/* =========================================================
   RESPOSTAS RÁPIDAS ("/atalho")
   ========================================================= */

/* Troca as "lacunas" do modelo pelos dados reais:
   {nome} -> primeiro nome do cliente | {atendente} -> quem está logado */
function preencherModelo(texto, conversa) {
  const primeiroNome =
    conversa.tipo === "grupo" ? "pessoal" : nomeDaConversa(conversa).split(" ")[0];
  const atendente = buscarAtendente(estado.atendenteLogadoId)?.nome || "";
  return texto.replaceAll("{nome}", primeiroNome).replaceAll("{atendente}", atendente);
}

function atualizarSugestoes() {
  const valor = elCampoMensagem.value;

  // Só funciona quando o campo COMEÇA com "/" e ainda não tem espaço
  if (!valor.startsWith("/") || valor.includes(" ")) {
    fecharSugestoes();
    return;
  }

  const termo = normalizar(valor.slice(1)); // tira a "/"
  estado.sugestoesVisiveis = estado.respostasRapidas.filter(
    (r) => normalizar(r.atalho).includes(termo) || normalizar(r.texto).includes(termo)
  );
  estado.sugestaoAtiva = 0;
  renderizarSugestoes();
}

function renderizarSugestoes() {
  elSugestoes.innerHTML = "";
  const conversa = conversaAberta();

  if (estado.sugestoesVisiveis.length === 0) {
    elSugestoes.append(criarElemento("li", "lista-vazia", "Nenhuma resposta rápida com esse atalho"));
  }

  estado.sugestoesVisiveis.forEach((resposta, indice) => {
    const li = criarElemento("li", "sugestao");
    li.dataset.indice = indice;
    li.setAttribute("role", "option");
    li.setAttribute("aria-selected", indice === estado.sugestaoAtiva);
    if (indice === estado.sugestaoAtiva) li.classList.add("sugestao--ativa");

    li.append(
      criarElemento("span", "sugestao__atalho", `/${resposta.atalho}`),
      criarElemento("span", "sugestao__texto", preencherModelo(resposta.texto, conversa))
    );
    elSugestoes.append(li);
  });

  elSugestoes.hidden = false;
  elSugestoes.querySelector(".sugestao--ativa")?.scrollIntoView({ block: "nearest" });
}

function fecharSugestoes() {
  elSugestoes.hidden = true;
  estado.sugestoesVisiveis = [];
}

// Escolheu uma sugestão: o texto vai para o campo (você ainda pode editar antes de enviar)
function escolherSugestao(indice) {
  const resposta = estado.sugestoesVisiveis[indice];
  if (!resposta) return;

  elCampoMensagem.value = preencherModelo(resposta.texto, conversaAberta());
  fecharSugestoes();
  atualizarBotaoEnvio();
  elCampoMensagem.focus();
}

/* ---------- Eventos ---------- */
elCampoMensagem.addEventListener("input", () => {
  atualizarBotaoEnvio();
  atualizarSugestoes();
});

// Teclado nas sugestões: ↑ ↓ navegam, Enter/Tab escolhem, Esc fecha
elCampoMensagem.addEventListener("keydown", (evento) => {
  if (elSugestoes.hidden) {
    if (evento.key !== "Escape") return;

    // stopPropagation: o Esc foi "usado" aqui e não sobe até o document
    // (senão cancelaria a edição E fecharia a conversa ao mesmo tempo)
    if (estado.editandoMensagemId) {
      evento.stopPropagation();
      cancelarEdicaoMensagem();
    } else if (estado.respondendoA) {
      evento.stopPropagation();
      cancelarCitacao();
    }
    // Sem nada para cancelar, o Esc sobe e fecha a conversa (o rascunho fica salvo)
    return;
  }

  const total = estado.sugestoesVisiveis.length;

  if (evento.key === "ArrowDown" && total) {
    evento.preventDefault();
    estado.sugestaoAtiva = (estado.sugestaoAtiva + 1) % total; // depois da última, volta à primeira
    renderizarSugestoes();
  } else if (evento.key === "ArrowUp" && total) {
    evento.preventDefault();
    estado.sugestaoAtiva = (estado.sugestaoAtiva - 1 + total) % total;
    renderizarSugestoes();
  } else if ((evento.key === "Enter" || evento.key === "Tab") && total) {
    evento.preventDefault(); // Enter escolhe a sugestão em vez de enviar
    escolherSugestao(estado.sugestaoAtiva);
  } else if (evento.key === "Escape") {
    evento.stopPropagation();
    fecharSugestoes();
  }
});

elSugestoes.addEventListener("click", (evento) => {
  const item = evento.target.closest(".sugestao");
  if (item) escolherSugestao(Number(item.dataset.indice));
});

// Enviar: o form cuida do Enter e do botão Enviar
elFormEnvio.addEventListener("submit", (evento) => {
  evento.preventDefault(); // sem isso a página recarregaria
  const texto = elCampoMensagem.value.trim();
  if (!texto) return;

  // O mesmo campo e o mesmo Enter servem para enviar OU salvar uma edição
  if (estado.editandoMensagemId) salvarEdicaoMensagem(texto);
  else enviarMensagem(texto);
});

// 🎤: começa a gravar (parte 9)
elBotaoAudio.addEventListener("click", iniciarGravacao);

// Cliques dentro das mensagens: botão ↩, citação ou áudio (delegação de novo)
elChatMensagens.addEventListener("click", (evento) => {
  // Áudio: ▶/⏸ ou clique na barra para avançar
  const idDoBalao = evento.target.closest(".mensagem")?.dataset.id;
  if (evento.target.closest(".audio__play")) {
    tocarOuPausar(buscarMensagem(idDoBalao));
    return;
  }
  const barraAudio = evento.target.closest(".audio__barra");
  if (barraAudio) {
    const caixa = barraAudio.getBoundingClientRect();
    const fracao = (evento.clientX - caixa.left) / caixa.width; // 0 = início, 1 = fim
    avancarAudio(buscarMensagem(idDoBalao), fracao);
    return;
  }

  const botaoResponder = evento.target.closest("[data-responder]");
  if (botaoResponder) {
    iniciarCitacao(botaoResponder.dataset.responder);
    return;
  }
  const citacao = evento.target.closest("[data-ir-para]");
  if (citacao) irParaMensagem(citacao.dataset.irPara);
});

elBotaoCancelarCitacao.addEventListener("click", () => {
  cancelarCitacao();
  elCampoMensagem.focus();
});

/* =========================================================
   PARTE 6 — EQUIPE: ASSUMIR, TRANSFERIR, NOTAS, SIMULAR LOGIN
   ========================================================= */

function nomeLogado() {
  return buscarAtendente(estado.atendenteLogadoId)?.nome || "Atendente";
}

/* Eventos ficam registrados na própria conversa, como um histórico:
   todo mundo da equipe vê quem assumiu e quem transferiu, e quando */
function registrarEvento(conversa, texto) {
  conversa.mensagens.push({
    id: `e${Date.now()}`, // "e" de evento: não colide com o id de uma mensagem criada no mesmo instante
    tipo: "sistema",
    texto,
    horario: new Date().toISOString(),
    direcao: "interna",
    lida: true,
    autor: null,
  });
}

// Redesenha o chat aberto (se houver) e a lista: usado depois de cada ação de equipe
function redesenharTudo() {
  const conversa = conversaAberta();
  if (conversa) renderizarChat(conversa);
  atualizarTela();
}

/* ---------- Assumir ---------- */
function assumirConversa(conversa) {
  if (conversa.atendenteId === estado.atendenteLogadoId) return;
  conversa.atendenteId = estado.atendenteLogadoId;
  registrarEvento(conversa, `${nomeLogado()} assumiu a conversa`);
  mostrarAviso("Agora esta conversa é sua");
  redesenharTudo();
}

/* ---------- Transferir ----------
   destinoId = id do atendente, ou null para devolver à fila */
function transferirConversa(conversa, destinoId) {
  if (destinoId === conversa.atendenteId) return;

  conversa.atendenteId = destinoId;
  if (destinoId) {
    const destino = buscarAtendente(destinoId).nome;
    registrarEvento(conversa, `${nomeLogado()} transferiu a conversa para ${destino}`);
    mostrarAviso(`Conversa transferida para ${destino}`);
  } else {
    registrarEvento(conversa, `${nomeLogado()} devolveu a conversa para a fila`);
    mostrarAviso("Conversa devolvida para a fila");
  }
  redesenharTudo();
}

// Monta a janela com um botão por atendente (menos o responsável atual)
function abrirDialogoTransferir() {
  const conversa = conversaAberta();
  if (!conversa) return;

  elListaTransferir.innerHTML = "";

  estado.atendentes
    .filter((a) => a.id !== conversa.atendenteId)
    .forEach((atendente) => {
      const botao = criarElemento("button");
      botao.type = "submit";
      botao.value = atendente.id; // vira o returnValue do dialog
      const avatar = criarElemento("span", "avatar", iniciais(atendente.nome));
      avatar.setAttribute("aria-hidden", "true");
      const rotulo = atendente.id === estado.atendenteLogadoId ? `${atendente.nome} (você)` : atendente.nome;
      botao.append(avatar, criarElemento("span", "", rotulo));
      elListaTransferir.append(botao);
    });

  // Opção de devolver para a fila (só se a conversa tiver alguém)
  if (conversa.atendenteId) {
    const fila = criarElemento("button", "transferir__fila");
    fila.type = "submit";
    fila.value = "fila";
    const avatar = criarElemento("span", "avatar", "⟲");
    avatar.setAttribute("aria-hidden", "true");
    fila.append(avatar, criarElemento("span", "", "Devolver para a fila (sem atendente)"));
    elListaTransferir.append(fila);
  }

  elDialogoTransferir.showModal();
}

elDialogoTransferir.addEventListener("close", () => {
  const escolha = elDialogoTransferir.returnValue;
  elDialogoTransferir.returnValue = "";
  const conversa = conversaAberta();
  if (!conversa || !escolha || escolha === "cancelar") return;

  transferirConversa(conversa, escolha === "fila" ? null : escolha);
});

/* ---------- Faixa acima do campo de mensagem ----------
   Sem atendente: "Ninguém está atendendo" + Assumir
   De outro atendente: "Carla está atendendo" + Assumir
   Sua: a faixa some */
function renderizarFaixa(conversa) {
  const dono = conversa.atendenteId;
  elFaixa.classList.remove("faixa--outro", "faixa--resolvida");

  // 1º caso: conversa resolvida (vale mais que todos os outros)
  if (estaResolvida(conversa)) {
    elFaixa.hidden = false;
    elFaixa.classList.add("faixa--resolvida");
    elFaixaTexto.textContent = "✓ Atendimento resolvido.";
    elBotaoFaixaAssumir.textContent = "Reabrir";
    elBotaoFaixaAssumir.dataset.acao = "reabrir";
    return;
  }

  elBotaoFaixaAssumir.textContent = "Assumir";
  elBotaoFaixaAssumir.dataset.acao = "assumir";

  if (dono === estado.atendenteLogadoId) {
    elFaixa.hidden = true;
    return;
  }

  elFaixa.hidden = false;
  if (!dono) {
    elFaixaTexto.textContent = "Ninguém está atendendo esta conversa.";
  } else {
    elFaixa.classList.add("faixa--outro");
    elFaixaTexto.textContent = `${buscarAtendente(dono)?.nome} está atendendo esta conversa.`;
  }
}

/* ---------- Notas internas ---------- */
function definirModoNota(ligado) {
  estado.modoNota = ligado;
  elFormEnvio.classList.toggle("chat__envio--nota", ligado);
  elBotaoNota.setAttribute("aria-pressed", ligado);
  elCampoMensagem.placeholder = ligado
    ? "Nota interna: só a equipe vê"
    : "Digite uma mensagem ou / para respostas rápidas";
}

/* ---------- Simular login (troca de atendente) ----------
   ⚠️ SIMULAÇÃO: com backend, cada pessoa faz login de verdade
   no próprio computador. Aqui serve para testar a visão de cada um. */
function atualizarTopoAtendente() {
  const nome = nomeLogado();
  elAtendenteNome.textContent = nome;
  elAtendenteAvatar.textContent = iniciais(nome);
}

function abrirMenuAtendente() {
  elMenuAtendente.innerHTML = "";
  elMenuAtendente.append(criarElemento("li", "menu-atendente__titulo", "Simular login como"));

  estado.atendentes.forEach((atendente) => {
    const li = criarElemento("li");
    li.setAttribute("role", "none");
    const atual = atendente.id === estado.atendenteLogadoId;
    const botao = criarElemento("button", "", atual ? `✓ ${atendente.nome}` : atendente.nome);
    botao.type = "button";
    botao.setAttribute("role", "menuitem");
    botao.dataset.atendenteId = atendente.id;
    li.append(botao);
    elMenuAtendente.append(li);
  });

  elMenuAtendente.hidden = false;
  elBotaoAtendente.setAttribute("aria-expanded", "true");
  elMenuAtendente.querySelector("button").focus();
}

function fecharMenuAtendente() {
  elMenuAtendente.hidden = true;
  elBotaoAtendente.setAttribute("aria-expanded", "false");
}

function trocarAtendente(id) {
  if (id === estado.atendenteLogadoId) return;
  estado.atendenteLogadoId = id;
  atualizarTopoAtendente();
  redesenharTudo(); // "Você" muda de pessoa, a faixa e o filtro "Minhas" também
  mostrarAviso(`Agora você está como ${nomeLogado()}`);
}

/* ---------- Eventos ---------- */
elOpcaoAssumir.addEventListener("click", () => {
  fecharMenu();
  assumirConversa(conversaAberta());
});

elOpcaoTransferir.addEventListener("click", () => {
  fecharMenu();
  abrirDialogoTransferir();
});

// O mesmo botão faz duas coisas, conforme o data-acao que a faixa colocou nele
elBotaoFaixaAssumir.addEventListener("click", () => {
  const conversa = conversaAberta();
  if (elBotaoFaixaAssumir.dataset.acao === "reabrir") alternarResolvida(conversa);
  else assumirConversa(conversa);
  elCampoMensagem.focus();
});

elBotaoNota.addEventListener("click", () => {
  // Editando? Não deixa transformar mensagem em nota (nem o contrário)
  if (estado.editandoMensagemId) {
    mostrarAviso("Termine ou cancele a edição primeiro");
    return;
  }
  definirModoNota(!estado.modoNota);
  elCampoMensagem.focus();
});

elBotaoAtendente.addEventListener("click", () => {
  if (elMenuAtendente.hidden) abrirMenuAtendente();
  else fecharMenuAtendente();
});

elMenuAtendente.addEventListener("click", (evento) => {
  const botao = evento.target.closest("[data-atendente-id]");
  if (!botao) return;
  fecharMenuAtendente();
  trocarAtendente(botao.dataset.atendenteId);
});

document.addEventListener("click", (evento) => {
  if (!elMenuAtendente.hidden && !evento.target.closest(".atendente-area")) fecharMenuAtendente();
});

/* =========================================================
   PARTE 7 — STATUS "RESOLVIDA" E ETIQUETAS
   ========================================================= */

function estaResolvida(conversa) {
  return conversa.status === "resolvida";
}

function buscarEtiqueta(id) {
  return estado.etiquetas.find((etiqueta) => etiqueta.id === id);
}

/* A "pílula" colorida. A cor vem dos dados, então vai numa
   variável CSS no próprio elemento: o CSS usa var(--cor-etiqueta) */
function criarChipEtiqueta(etiqueta) {
  const chip = criarElemento("span", "etiqueta", etiqueta.nome);
  chip.style.setProperty("--cor-etiqueta", etiqueta.cor);
  return chip;
}

/* ---------- Resolver / reabrir ---------- */
function alternarResolvida(conversa) {
  if (estaResolvida(conversa)) {
    conversa.status = "aberta";
    registrarEvento(conversa, `${nomeLogado()} reabriu a conversa`);
    mostrarAviso("Conversa reaberta");
  } else {
    conversa.status = "resolvida";
    registrarEvento(conversa, `${nomeLogado()} marcou a conversa como resolvida`);
    mostrarAviso("Atendimento resolvido ✓");
  }
  redesenharTudo();
}

/* ---------- Seletor de etiqueta (filtro) ---------- */
/* Refaz as opções do seletor. Chamada no início e sempre que
   uma etiqueta é renomeada (a primeira opção, "Etiquetas", fica) */
function preencherFiltroEtiquetas() {
  while (elFiltroEtiqueta.options.length > 1) elFiltroEtiqueta.remove(1);

  estado.etiquetas.forEach((etiqueta) => {
    const opcao = criarElemento("option", "", etiqueta.nome);
    opcao.value = etiqueta.id;
    elFiltroEtiqueta.append(opcao);
  });

  elFiltroEtiqueta.value = estado.filtroEtiqueta; // mantém a escolha atual
}

elFiltroEtiqueta.addEventListener("change", () => {
  estado.filtroEtiqueta = elFiltroEtiqueta.value;
  // Com uma etiqueta escolhida, o seletor fica aceso como um filtro ativo
  elFiltroEtiqueta.classList.toggle("ativo", Boolean(estado.filtroEtiqueta));
  renderizarLista();
});

/* ---------- Janela de etiquetas da conversa ----------
   Um checkbox por etiqueta. Cada clique já salva, sem botão "Salvar" */
function abrirDialogoEtiquetas(conversa) {
  estado.etiquetasConversaId = conversa.id;
  estado.editandoEtiquetaId = null;
  elDialogoEtiquetasTexto.textContent = `Conversa com ${nomeDaConversa(conversa)}`;
  esconderErroEtiqueta();
  renderizarListaEtiquetas();
  elDialogoEtiquetas.showModal();
}

// Desenha as linhas da janela (separado para poder redesenhar após renomear)
function renderizarListaEtiquetas() {
  const conversa = buscarConversa(estado.etiquetasConversaId);
  if (!conversa) return;
  elListaEtiquetas.innerHTML = "";

  estado.etiquetas.forEach((etiqueta) => {
    const linha = criarElemento("div", "etiquetas__linha");
    linha.dataset.etiquetaId = etiqueta.id;

    // <label> em volta do checkbox: clicar no texto também marca
    const label = criarElemento("label");
    const caixa = criarElemento("input");
    caixa.type = "checkbox";
    caixa.value = etiqueta.id;
    caixa.checked = (conversa.etiquetas || []).includes(etiqueta.id);
    label.append(caixa, criarChipEtiqueta(etiqueta));
    linha.append(label);

    // Só as personalizáveis ganham o ✏️. Ele fica FORA do <label>,
    // senão clicar no lápis também marcaria/desmarcaria a caixa
    if (etiqueta.editavel) {
      const editar = criarElemento("button", "etiquetas__editar");
      editar.append(icone("lapis"));
      editar.type = "button"; // "button": não envia o form (que fecharia a janela)
      editar.setAttribute("aria-label", `Renomear etiqueta ${etiqueta.nome}`);
      linha.append(editar);
    }

    elListaEtiquetas.append(linha);
  });
}

/* ---------- Renomear etiqueta personalizável ---------- */
function mostrarErroEtiqueta(texto) {
  const elErro = document.getElementById("etiquetas-erro");
  elErro.textContent = texto;
  elErro.hidden = false;
}

function esconderErroEtiqueta() {
  document.getElementById("etiquetas-erro").hidden = true;
}

// Troca a "pílula" por um campo de texto, na mesma linha
function iniciarEdicaoEtiqueta(id) {
  const etiqueta = buscarEtiqueta(id);
  const linha = elListaEtiquetas.querySelector(`[data-etiqueta-id="${id}"]`);
  if (!etiqueta || !linha) return;

  estado.editandoEtiquetaId = id;
  esconderErroEtiqueta();

  const campo = criarElemento("input", "etiquetas__input");
  campo.type = "text";
  campo.value = etiqueta.nome;
  campo.maxLength = 20; // etiqueta é curta por natureza
  campo.style.setProperty("--cor-etiqueta", etiqueta.cor);
  campo.setAttribute("aria-label", "Novo nome da etiqueta");

  linha.querySelector(".etiqueta").replaceWith(campo);
  linha.querySelector(".etiquetas__editar").hidden = true;
  campo.focus();
  campo.select(); // já seleciona o texto: é só digitar por cima

  campo.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
      evento.preventDefault(); // Enter num form enviaria e fecharia a janela
      salvarNomeEtiqueta(id, campo.value);
    } else if (evento.key === "Escape") {
      evento.preventDefault(); // Esc fecharia a janela inteira
      cancelarEdicaoEtiqueta();
    }
  });

  // Clicou fora do campo: salva (igual a renomear arquivo no computador)
  campo.addEventListener("blur", () => salvarNomeEtiqueta(id, campo.value));
}

function cancelarEdicaoEtiqueta() {
  estado.editandoEtiquetaId = null;
  esconderErroEtiqueta();
  renderizarListaEtiquetas();
}

function salvarNomeEtiqueta(id, valor) {
  // Proteção: Enter salva e logo depois o campo some, disparando "blur".
  // Sem isso, salvaria duas vezes
  if (estado.editandoEtiquetaId !== id) return;

  const nome = valor.trim();
  const etiqueta = buscarEtiqueta(id);

  if (!nome) {
    mostrarErroEtiqueta("O nome não pode ficar vazio.");
    return; // continua editando
  }

  // Não pode repetir o nome de outra etiqueta (ignorando acento e maiúscula)
  const repetida = estado.etiquetas.some(
    (outra) => outra.id !== id && normalizar(outra.nome) === normalizar(nome)
  );
  if (repetida) {
    mostrarErroEtiqueta(`Já existe uma etiqueta chamada "${nome}".`);
    return;
  }

  estado.editandoEtiquetaId = null;
  etiqueta.nome = nome;
  esconderErroEtiqueta();

  renderizarListaEtiquetas(); // a janela
  preencherFiltroEtiquetas(); // o seletor do filtro
  redesenharTudo(); // a lista e o topo do chat: todas as conversas com ela mudam juntas
}

// Clique no ✏️ (delegação)
elListaEtiquetas.addEventListener("click", (evento) => {
  const botao = evento.target.closest(".etiquetas__editar");
  if (!botao) return;
  iniciarEdicaoEtiqueta(botao.closest(".etiquetas__linha").dataset.etiquetaId);
});

// Esc com um nome sendo editado: cancela só a edição, sem fechar a janela
elDialogoEtiquetas.addEventListener("cancel", (evento) => {
  if (estado.editandoEtiquetaId) {
    evento.preventDefault();
    cancelarEdicaoEtiqueta();
  }
});

// "change" de qualquer checkbox chega aqui (delegação)
elListaEtiquetas.addEventListener("change", (evento) => {
  const caixa = evento.target;
  if (caixa.type !== "checkbox") return; // o campo de renomear também dispara "change"
  const conversa = buscarConversa(estado.etiquetasConversaId);
  if (!conversa) return;

  conversa.etiquetas = conversa.etiquetas || [];
  if (caixa.checked) {
    conversa.etiquetas.push(caixa.value);
  } else {
    conversa.etiquetas = conversa.etiquetas.filter((id) => id !== caixa.value);
  }
  redesenharTudo(); // a lista e o topo do chat mudam na hora, atrás da janela
});

elDialogoEtiquetas.addEventListener("close", () => {
  estado.etiquetasConversaId = null;
  estado.editandoEtiquetaId = null;
});

/* =========================================================
   RECEBER MENSAGEM (ponto único de entrada)
   Hoje quem chama é o simulador; com o backend, será o WebSocket.
   Por isso todas as regras de "chegou mensagem" ficam AQUI.
   ========================================================= */
function receberMensagem(conversa, dadosMensagem) {
  // Regra: cliente escreveu numa conversa resolvida -> ela reabre sozinha
  if (estaResolvida(conversa)) {
    conversa.status = "aberta";
    registrarEvento(conversa, "Conversa reaberta: o cliente enviou uma nova mensagem");
  }

  // Regra: chegou mensagem numa conversa arquivada -> continua arquivada
  // (igual ao WhatsApp), mas o atalho "Arquivadas" mostra que há não lidas

  const mensagem = {
    id: `m${Date.now()}`,
    tipo: "texto",
    horario: new Date().toISOString(),
    direcao: "recebida",
    // Se você está com a conversa aberta, já está lendo
    lida: conversa.id === estado.conversaAbertaId,
    autor: null,
    ...dadosMensagem, // "espalha" o texto e o autor recebidos por cima dos padrões
  };

  conversa.mensagens.push(mensagem);
  redesenharTudo();

  if (conversa.id !== estado.conversaAbertaId) {
    mostrarAviso(`Nova mensagem de ${nomeDaConversa(conversa)}`);
  }
}

/* ⚠️ SIMULAÇÃO: finge que o cliente escreveu, 3 segundos depois.
   O atraso dá tempo de você fechar a conversa e ver o contador subir. */
const FRASES_DE_TESTE = [
  "Oi, ainda estão aí?",
  "O veículo parou de aparecer no mapa de novo.",
  "Obrigado pelo retorno!",
  "Vocês podem me ligar?",
  "Qual o valor do plano anual?",
];

function simularMensagemCliente(conversa) {
  const texto = FRASES_DE_TESTE[Math.floor(Math.random() * FRASES_DE_TESTE.length)];
  // Em grupo, sorteia um participante para ser o autor
  const autor =
    conversa.tipo === "grupo"
      ? conversa.participantes[Math.floor(Math.random() * conversa.participantes.length)]
      : null;

  mostrarAviso("🧪 O cliente vai responder em 3 segundos…");
  setTimeout(() => receberMensagem(conversa, { texto, autor }), 3000);
}

/* ---------- Eventos ---------- */
elOpcaoResolver.addEventListener("click", () => {
  fecharMenu();
  alternarResolvida(conversaAberta());
});

elOpcaoEtiquetas.addEventListener("click", () => {
  fecharMenu();
  abrirDialogoEtiquetas(conversaAberta());
});

elOpcaoSimular.addEventListener("click", () => {
  fecharMenu();
  simularMensagemCliente(conversaAberta());
});

elCtxResolver.addEventListener("click", aoEscolherNoMenuContexto(alternarResolvida));
elCtxEtiquetas.addEventListener("click", aoEscolherNoMenuContexto(abrirDialogoEtiquetas));

/* =========================================================
   EDITAR E APAGAR MENSAGENS
   ⚠️ Pelo que pesquisamos, a API oficial do WhatsApp não apaga mensagens
   do celular do cliente. Então editar/apagar vale para a EQUIPE, nesta
   ferramenta. O cliente pode continuar com a versão original.
   ========================================================= */

function buscarMensagem(id) {
  return conversaAberta()?.mensagens.find((m) => m.id === id);
}

// Regra: só quem escreveu altera, e só texto ou nota (áudio não se edita)
function podeEditar(msg) {
  return (
    !msg.apagada &&
    msg.autor === estado.atendenteLogadoId &&
    ((msg.direcao === "enviada" && msg.tipo === "texto") || msg.tipo === "nota")
  );
}

function podeApagar(msg) {
  return (
    !msg.apagada &&
    msg.autor === estado.atendenteLogadoId &&
    (msg.direcao === "enviada" || msg.tipo === "nota")
  );
}

// "editada" ao lado da hora; o title mostra o texto original ao passar o mouse
function criarMarcaEditada(msg) {
  const marca = criarElemento("span", "mensagem__editada", "editada");
  const original = msg.versoesAnteriores?.[0];
  if (original) marca.title = `Original: ${original}`;
  return marca;
}

/* ---------- Menu do botão direito na mensagem ---------- */
function abrirMenuMensagem(msg, x, y) {
  estado.menuMensagemId = msg.id;
  fecharMenuContexto();
  fecharMenu();

  const temTexto = (msg.tipo === "texto" || msg.tipo === "nota") && !msg.apagada;
  // Cada opção só aparece quando faz sentido para ESTA mensagem
  elMsgResponder.parentElement.hidden = msg.apagada || msg.tipo === "nota";
  elMsgCopiar.parentElement.hidden = !temTexto;
  elMsgEditar.parentElement.hidden = !podeEditar(msg);
  elMsgApagar.parentElement.hidden = !podeApagar(msg);

  const visiveis = elMenuMensagem.querySelectorAll("li:not([hidden])");
  if (visiveis.length === 0) return; // nada a oferecer (ex.: mensagem apagada de outra pessoa)

  elMenuMensagem.hidden = false;

  // Mesmo cálculo do menu da lista: não deixa o menu sair da tela
  const posX = Math.min(x, window.innerWidth - elMenuMensagem.offsetWidth - 8);
  const posY = Math.min(y, window.innerHeight - elMenuMensagem.offsetHeight - 8);
  elMenuMensagem.style.left = `${posX}px`;
  elMenuMensagem.style.top = `${posY}px`;

  visiveis[0].querySelector("button").focus();
}

function fecharMenuMensagem() {
  elMenuMensagem.hidden = true;
  estado.menuMensagemId = null;
}

/* ---------- Editar ----------
   Igual ao WhatsApp: o texto volta para o campo de envio,
   com a barra "Editando mensagem" em cima */
function iniciarEdicaoMensagem(id) {
  const msg = buscarMensagem(id);
  if (!msg || !podeEditar(msg)) return;

  cancelarCitacao();
  if (!estado.editandoMensagemId) estado.textoAntesDaEdicao = elCampoMensagem.value; // guarda o rascunho
  estado.editandoMensagemId = id;

  definirModoNota(msg.tipo === "nota"); // campo amarelo se for nota
  elEdicaoEnvioTexto.textContent = msg.texto;
  elEdicaoEnvio.hidden = false;

  elCampoMensagem.value = msg.texto;
  atualizarBotaoEnvio();
  elCampoMensagem.focus();
}

function cancelarEdicaoMensagem() {
  if (!estado.editandoMensagemId) return;
  estado.editandoMensagemId = null;
  elEdicaoEnvio.hidden = true;
  definirModoNota(false);
  elCampoMensagem.value = estado.textoAntesDaEdicao; // devolve o que estava sendo escrito
  estado.textoAntesDaEdicao = "";
  atualizarBotaoEnvio();
}

function salvarEdicaoMensagem(novoTexto) {
  const msg = buscarMensagem(estado.editandoMensagemId);
  if (!msg) {
    cancelarEdicaoMensagem();
    return;
  }

  if (novoTexto !== msg.texto) {
    // Guarda o histórico: a versão anterior não se perde
    msg.versoesAnteriores = [...(msg.versoesAnteriores || []), msg.texto];
    msg.texto = novoTexto;
    msg.editadaEm = new Date().toISOString();
  }

  cancelarEdicaoMensagem();
  redesenharTudo(); // o balão e a prévia na lista mudam juntos
  mostrarAviso("Mensagem editada");
}

/* ---------- Apagar ---------- */
function pedirApagarMensagem(id) {
  const msg = buscarMensagem(id);
  if (!msg || !podeApagar(msg)) return;

  estado.apagandoMensagemId = id;
  elDialogoApagarTexto.textContent =
    msg.tipo === "nota"
      ? "A nota será apagada para toda a equipe."
      : "A mensagem será apagada aqui para toda a equipe. O cliente pode já ter visto o conteúdo.";
  elDialogoApagar.showModal();
}

function apagarMensagem(id) {
  const msg = buscarMensagem(id);
  if (!msg) return;

  // Soft delete: marca como apagada em vez de remover do array.
  // Assim citações e o histórico continuam fazendo sentido
  msg.apagada = true;
  msg.apagadaPor = estado.atendenteLogadoId;
  msg.apagadaEm = new Date().toISOString();

  if (estado.editandoMensagemId === id) cancelarEdicaoMensagem();
  if (estado.respondendoA === id) cancelarCitacao();
  if (player.tocandoId === id) pararAudio(); // apagou o áudio que estava tocando

  redesenharTudo();
  mostrarAviso("Mensagem apagada");
}

/* ---------- Copiar ---------- */
function copiarMensagem(id) {
  const msg = buscarMensagem(id);
  if (!msg?.texto) return;
  // A área de transferência só funciona em localhost ou HTTPS (o Live Server serve)
  navigator.clipboard
    ?.writeText(msg.texto)
    .then(() => mostrarAviso("Texto copiado"))
    .catch(() => mostrarAviso("Não foi possível copiar"));
}

/* ---------- Eventos ---------- */
// Botão direito (ou segurar o dedo, no Android) em um balão
elChatMensagens.addEventListener("contextmenu", (evento) => {
  const balao = evento.target.closest(".mensagem");
  if (!balao) return;
  const msg = buscarMensagem(balao.dataset.id);
  if (!msg) return;
  evento.preventDefault();

  let x = evento.clientX;
  let y = evento.clientY;
  if (x === 0 && y === 0) {
    // Aberto pelo teclado: usa a posição do balão
    const caixa = balao.getBoundingClientRect();
    x = caixa.left + 20;
    y = caixa.bottom;
  }
  abrirMenuMensagem(msg, x, y);
});

// Cada opção: pega o id guardado, fecha o menu e executa
function aoEscolherNoMenuMensagem(acao) {
  return () => {
    const id = estado.menuMensagemId;
    fecharMenuMensagem();
    if (id) acao(id);
  };
}

elMsgResponder.addEventListener("click", aoEscolherNoMenuMensagem(iniciarCitacao));
elMsgCopiar.addEventListener("click", aoEscolherNoMenuMensagem(copiarMensagem));
elMsgEditar.addEventListener("click", aoEscolherNoMenuMensagem(iniciarEdicaoMensagem));
elMsgApagar.addEventListener("click", aoEscolherNoMenuMensagem(pedirApagarMensagem));

elBotaoCancelarEdicao.addEventListener("click", () => {
  cancelarEdicaoMensagem();
  elCampoMensagem.focus();
});

elDialogoApagar.addEventListener("close", () => {
  if (elDialogoApagar.returnValue === "apagar" && estado.apagandoMensagemId) {
    apagarMensagem(estado.apagandoMensagemId);
  }
  estado.apagandoMensagemId = null;
  elDialogoApagar.returnValue = "";
});

// Fecha o menu da mensagem ao clicar fora ou rolar o chat
document.addEventListener("click", (evento) => {
  if (!elMenuMensagem.hidden && !evento.target.closest("#menu-mensagem")) fecharMenuMensagem();
});
elChatMensagens.addEventListener("scroll", fecharMenuMensagem);

/* =========================================================
   PARTE 9 — ÁUDIO: TOCAR
   ========================================================= */

/* Um player só para o app inteiro: tocar um áudio pausa o outro,
   igual ao WhatsApp. "new Audio()" cria um <audio> que não aparece na tela */
const player = {
  elemento: new Audio(),
  tocandoId: null, // id da mensagem que está no player
};

/* Porcentagem tocada. Usamos a duração SALVA na mensagem, e não a do arquivo,
   porque áudios gravados pelo Chrome (.webm) costumam informar duração "Infinity" */
function porcentagemTocada(msg) {
  if (!msg?.duracao) return 0;
  return Math.min(100, (player.elemento.currentTime / msg.duracao) * 100);
}

// Os pedaços do balão do áudio que está tocando (buscados na hora, porque o chat é redesenhado)
function elementosDoBalao(id) {
  const balao = elChatMensagens.querySelector(`.mensagem[data-id="${id}"]`);
  if (!balao) return null;
  return {
    play: balao.querySelector(".audio__play"),
    progresso: balao.querySelector(".audio__progresso"),
    duracao: balao.querySelector(".audio__duracao"),
  };
}

function atualizarBalaoTocando() {
  const msg = buscarMensagem(player.tocandoId);
  const partes = elementosDoBalao(player.tocandoId);
  if (!msg || !partes) return;

  const tocando = !player.elemento.paused;
  partes.play.replaceChildren(icone(tocando ? "pausar" : "tocar"));
  partes.play.setAttribute("aria-label", tocando ? "Pausar áudio" : "Reproduzir áudio");
  partes.progresso.style.width = `${porcentagemTocada(msg)}%`;
  partes.duracao.textContent = formatarDuracao(Math.floor(player.elemento.currentTime));
}

function tocarOuPausar(msg) {
  if (!msg) return;

  if (!msg.audioUrl) {
    mostrarAviso("Este é um áudio de exemplo, sem arquivo. Grave um no 🎤 para testar!");
    return;
  }

  // Clicou no áudio que já está no player: alterna tocar/pausar
  if (player.tocandoId === msg.id) {
    if (player.elemento.paused) player.elemento.play();
    else player.elemento.pause();
    return;
  }

  // Outro áudio: para o anterior e começa este do início
  pararAudio();
  player.tocandoId = msg.id;
  player.elemento.src = msg.audioUrl;
  player.elemento.play().catch(() => mostrarAviso("Não foi possível tocar este áudio"));
}

function avancarAudio(msg, fracao) {
  if (!msg || player.tocandoId !== msg.id) return; // só dá para avançar o áudio que está tocando
  player.elemento.currentTime = Math.max(0, Math.min(1, fracao)) * msg.duracao;
  atualizarBalaoTocando();
}

function pararAudio() {
  if (!player.tocandoId) return;
  const id = player.tocandoId;
  player.elemento.pause();
  player.tocandoId = null;

  // Volta o balão ao estado inicial: ▶, barra vazia, duração total
  const msg = buscarMensagem(id);
  const partes = elementosDoBalao(id);
  if (msg && partes) {
    partes.play.replaceChildren(icone("tocar"));
    partes.play.setAttribute("aria-label", "Reproduzir áudio");
    partes.progresso.style.width = "0%";
    partes.duracao.textContent = formatarDuracao(msg.duracao);
  }
}

// O próprio <audio> avisa o que está acontecendo
player.elemento.addEventListener("timeupdate", atualizarBalaoTocando); // ~4x por segundo
player.elemento.addEventListener("play", atualizarBalaoTocando);
player.elemento.addEventListener("pause", atualizarBalaoTocando);
player.elemento.addEventListener("ended", pararAudio);

/* =========================================================
   PARTE 9 — ÁUDIO: GRAVAR
   ⚠️ O navegador só libera o microfone em localhost ou HTTPS.
   O Live Server e o GitHub Pages atendem às duas condições.
   ========================================================= */

const LIMITE_AUDIO_SEGUNDOS = 5 * 60; // 5 minutos: depois disso, envia sozinho

const elGravacao = document.getElementById("gravacao");
const elGravacaoTempo = document.getElementById("gravacao-tempo");
const elBotaoCancelarAudio = document.getElementById("botao-cancelar-audio");
const elBotaoEnviarAudio = document.getElementById("botao-enviar-audio");

const gravacao = {
  recorder: null, // o MediaRecorder em uso
  stream: null, // a "conexão" com o microfone
  pedacos: [], // o áudio chega em pedaços enquanto grava
  inicio: 0, // quando começou (para o cronômetro)
  duracao: 0,
  conversaId: null, // para qual conversa vai o áudio
  enviarAoParar: false, // parou para enviar ou para descartar?
  cronometro: null,
};

function estaGravando() {
  return gravacao.recorder !== null;
}

async function iniciarGravacao() {
  if (estaGravando()) return;

  // O navegador tem as ferramentas necessárias?
  if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
    mostrarAviso("Este navegador não permite gravar áudio aqui (precisa de localhost ou HTTPS)");
    return;
  }
  if (estado.modoNota) {
    mostrarAviso("Notas internas são só de texto");
    return;
  }

  const conversaId = estado.conversaAbertaId;
  cancelarEdicaoMensagem();

  let stream;
  try {
    // Na primeira vez, o navegador pergunta se você permite usar o microfone
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (erro) {
    mostrarAviso(
      erro.name === "NotAllowedError"
        ? "Permissão do microfone negada. Libere no cadeado ao lado do endereço do site."
        : "Não foi possível acessar o microfone"
    );
    return;
  }

  // Enquanto o navegador perguntava, você pode ter trocado de conversa
  if (estado.conversaAbertaId !== conversaId) {
    stream.getTracks().forEach((faixa) => faixa.stop());
    return;
  }

  // Cada navegador grava num formato: Chrome/Firefox em webm, Safari em mp4
  const formato = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].find((f) =>
    MediaRecorder.isTypeSupported(f)
  );

  gravacao.stream = stream;
  gravacao.recorder = new MediaRecorder(stream, formato ? { mimeType: formato } : undefined);
  gravacao.pedacos = [];
  gravacao.conversaId = conversaId;
  gravacao.inicio = Date.now();

  gravacao.recorder.addEventListener("dataavailable", (evento) => {
    if (evento.data.size > 0) gravacao.pedacos.push(evento.data);
  });
  gravacao.recorder.addEventListener("stop", finalizarGravacao);
  gravacao.recorder.start();

  // Troca o campo de mensagem pela barra de gravação
  elFormEnvio.hidden = true;
  elGravacao.hidden = false;
  elGravacaoTempo.textContent = "0:00";
  gravacao.cronometro = setInterval(atualizarCronometro, 250);
  elBotaoEnviarAudio.focus();
}

function atualizarCronometro() {
  const segundos = Math.floor((Date.now() - gravacao.inicio) / 1000);
  elGravacaoTempo.textContent = formatarDuracao(segundos);
  if (segundos >= LIMITE_AUDIO_SEGUNDOS) {
    mostrarAviso("Limite de 5 minutos: o áudio foi enviado");
    pararGravacao(true);
  }
}

/* Parar não é instantâneo: o MediaRecorder ainda entrega o último
   pedaço e só então dispara "stop" (que chama finalizarGravacao) */
function pararGravacao(enviar) {
  if (!estaGravando()) return;
  gravacao.enviarAoParar = enviar;
  gravacao.duracao = Math.round((Date.now() - gravacao.inicio) / 1000);
  clearInterval(gravacao.cronometro);
  gravacao.recorder.stop();
  gravacao.stream.getTracks().forEach((faixa) => faixa.stop()); // apaga a luz do microfone

  elGravacao.hidden = true;
  elFormEnvio.hidden = false;
}

function cancelarGravacao() {
  pararGravacao(false);
}

function finalizarGravacao() {
  const { pedacos, duracao, conversaId, enviarAoParar, recorder } = gravacao;
  const tipo = recorder.mimeType;
  gravacao.recorder = null;
  gravacao.stream = null;

  if (!enviarAoParar) return; // cancelado: descarta tudo

  if (duracao < 1) {
    mostrarAviso("Áudio muito curto");
    return;
  }

  // Junta os pedaços num arquivo e cria um endereço temporário para ele
  const arquivo = new Blob(pedacos, { type: tipo });
  const audioUrl = URL.createObjectURL(arquivo);
  enviarAudio(conversaId, audioUrl, duracao);
}

function enviarAudio(conversaId, audioUrl, duracao) {
  const conversa = buscarConversa(conversaId);
  if (!conversa) return;

  aplicarRegrasDeEnvio(conversa); // as mesmas regras do texto: assume da fila, reabre resolvida

  const mensagem = {
    id: `m${Date.now()}`,
    tipo: "audio",
    audioUrl,
    duracao,
    horario: new Date().toISOString(),
    direcao: "enviada",
    lida: false,
    autor: estado.atendenteLogadoId,
    respostaA: estado.respondendoA, // dá para responder citando com áudio também
  };

  conversa.mensagens.push(mensagem);
  cancelarCitacao();
  redesenharTudo();
  simularLeituraDoCliente(conversa, mensagem);
}

elBotaoCancelarAudio.addEventListener("click", () => {
  cancelarGravacao();
  elCampoMensagem.focus();
});

elBotaoEnviarAudio.addEventListener("click", () => {
  pararGravacao(true);
  elCampoMensagem.focus();
});

/* =========================================================
   CARTÃO DE PRÉVIA (passar o mouse numa conversa da lista)
   Mostra por inteiro o que a lista mostra cortado
   ========================================================= */
const elCartaoPrevia = document.getElementById("cartao-previa");
const ATRASO_CARTAO_MS = 450; // espera um pouco: passar o mouse "de passagem" não abre
// celular não tem "passar o mouse"; o ?. protege ambientes sem matchMedia
const temMouse = window.matchMedia?.("(hover: hover)").matches ?? true;

let temporizadorCartao = null;
let cartaoPendenteId = null; // conversa cujo cartão está esperando para abrir (ou aberto)

function montarCartaoPrevia(conversa) {
  elCartaoPrevia.innerHTML = "";
  const nome = nomeDaConversa(conversa);

  // Topo: avatar + nome completo + número (ou participantes)
  const topo = criarElemento("div", "cartao-previa__topo");
  const avatar = criarElemento("span", "avatar", iniciais(nome));
  if (conversa.tipo === "grupo") avatar.classList.add("avatar--grupo");
  const textos = criarElemento("div", "cartao-previa__textos");
  const detalhe =
    conversa.tipo === "grupo"
      ? conversa.participantes.join(", ")
      : buscarContato(conversa.contatoId)?.numero || "";
  textos.append(
    criarElemento("div", "cartao-previa__nome", nome),
    criarElemento("div", "cartao-previa__detalhe", detalhe)
  );
  topo.append(avatar, textos);
  elCartaoPrevia.append(topo);

  // Selos: status + TODAS as etiquetas (na lista cabem só 2)
  const selos = criarElemento("div", "cartao-previa__selos");
  if (estaResolvida(conversa)) selos.append(criarElemento("span", "selo selo--resolvida", "✓ Resolvida"));
  else if (!conversa.atendenteId) selos.append(criarElemento("span", "selo", "Sem atendente"));
  (conversa.etiquetas || []).forEach((id) => {
    const etiqueta = buscarEtiqueta(id);
    if (etiqueta) selos.append(criarChipEtiqueta(etiqueta));
  });
  if (selos.children.length > 0) elCartaoPrevia.append(selos);

  // A última mensagem INTEIRA
  const msg = ultimaMensagem(conversa);
  const bloco = criarElemento("div", "cartao-previa__mensagem");
  if (msg) {
    const autor =
      msg.tipo === "nota"
        ? `📝 Nota interna · ${buscarAtendente(msg.autor)?.nome || "Equipe"}`
        : nomeDoAutor(msg, conversa);
    bloco.append(
      criarElemento("div", "cartao-previa__autor", autor),
      criarElemento("div", "cartao-previa__texto", resumoDaMensagem(msg)),
      criarElemento(
        "div",
        "cartao-previa__hora",
        `${formatarDia(msg.horario)}, ${formatarHoraMensagem(msg.horario)}`
      )
    );
  } else {
    bloco.append(criarElemento("div", "cartao-previa__texto", "Nenhuma mensagem ainda"));
  }
  elCartaoPrevia.append(bloco);

  // Rodapé: responsável e pendências
  const rodape = criarElemento("div", "cartao-previa__rodape");
  const atendente = buscarAtendente(conversa.atendenteId);
  rodape.append(criarElemento("span", "", atendente ? `Atendente: ${atendente.nome}` : "Na fila"));
  const naoLidas = contarNaoLidas(conversa);
  if (naoLidas > 0) {
    rodape.append(criarElemento("span", "cartao-previa__pendente", `${naoLidas} não ${naoLidas === 1 ? "lida" : "lidas"}`));
  }
  elCartaoPrevia.append(rodape);
}

function mostrarCartaoPrevia(id) {
  // Busca o item na hora: a lista pode ter sido redesenhada durante a espera
  const item = elListaConversas.querySelector(`.conversa[data-id="${id}"]`);
  const conversa = buscarConversa(id);
  if (!item || !conversa) return;

  montarCartaoPrevia(conversa);
  elCartaoPrevia.hidden = false;

  // Ao lado direito da lista, na altura do item, sem sair da tela
  const caixa = item.getBoundingClientRect();
  const topo = Math.min(caixa.top, window.innerHeight - elCartaoPrevia.offsetHeight - 12);
  elCartaoPrevia.style.left = `${caixa.right + 10}px`;
  elCartaoPrevia.style.top = `${Math.max(12, topo)}px`;
}

function esconderCartaoPrevia() {
  clearTimeout(temporizadorCartao);
  cartaoPendenteId = null;
  elCartaoPrevia.hidden = true;
}

/* "mouseover" dispara toda vez que o mouse entra em QUALQUER filho do item
   (nome, avatar, prévia...). O cartaoPendenteId evita reiniciar a contagem */
elListaConversas.addEventListener("mouseover", (evento) => {
  if (!temMouse) return;
  const item = evento.target.closest(".conversa");

  if (!item) {
    esconderCartaoPrevia(); // está sobre a lista, mas fora de uma conversa
    return;
  }
  if (item.dataset.id === cartaoPendenteId) return; // continua na mesma conversa

  esconderCartaoPrevia();
  cartaoPendenteId = item.dataset.id;
  temporizadorCartao = setTimeout(() => mostrarCartaoPrevia(item.dataset.id), ATRASO_CARTAO_MS);
});

// Saiu da lista, rolou, clicou ou abriu o menu: o cartão some
elListaConversas.addEventListener("mouseleave", esconderCartaoPrevia);
elListaConversas.addEventListener("scroll", esconderCartaoPrevia);
elListaConversas.addEventListener("mousedown", esconderCartaoPrevia);
elListaConversas.addEventListener("contextmenu", esconderCartaoPrevia);

/* =========================================================
   TEMA: PRETO (padrão) OU CLARO
   As cores estão no CSS. Aqui só colocamos ou tiramos
   data-tema="claro" do <html>, e o CSS faz o resto
   ========================================================= */
const elBotaoTema = document.getElementById("botao-tema");
const CHAVE_TEMA = "espelho-tema"; // nome da "gaveta" no localStorage

function temaAtual() {
  return document.documentElement.dataset.tema === "claro" ? "claro" : "preto";
}

function aplicarTema(tema) {
  const claro = tema === "claro";
  if (claro) document.documentElement.dataset.tema = "claro";
  else delete document.documentElement.dataset.tema;

  // O botão mostra o tema para onde você VAI: no preto aparece o sol
  const rotulo = claro ? "Ativar tema escuro" : "Ativar tema claro";
  elBotaoTema.replaceChildren(icone(claro ? "lua" : "sol"));
  elBotaoTema.setAttribute("aria-label", rotulo);
  elBotaoTema.title = rotulo;

  // A barra do navegador no celular acompanha a cor do topo
  const corTopo = getComputedStyle(document.documentElement).getPropertyValue("--fundo-topo").trim();
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", corTopo);
}

elBotaoTema.addEventListener("click", () => {
  const novo = temaAtual() === "claro" ? "preto" : "claro";
  aplicarTema(novo);
  // Guarda a escolha. try/catch: em aba anônima o localStorage pode falhar
  try {
    localStorage.setItem(CHAVE_TEMA, novo);
  } catch (erro) {
    // sem problema: o tema só não será lembrado na próxima visita
  }
});

// O script do <head> já aplicou o tema salvo; aqui só acertamos o ícone do botão
aplicarTema(temaAtual());

/* =========================================================
   CARREGAR OS DADOS E INICIAR
   ========================================================= */
async function carregarDados() {
  try {
    const resposta = await fetch("dados.json");
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);

    const dados = await resposta.json();
    estado.atendentes = dados.atendentes;
    estado.contatos = dados.contatos;
    estado.conversas = dados.conversas;
    estado.respostasRapidas = dados.respostasRapidas || [];
    estado.etiquetas = dados.etiquetas || [];

    atualizarTopoAtendente();
    preencherFiltroEtiquetas();

    atualizarTela();
  } catch (erro) {
    console.error("Falha ao carregar dados.json:", erro);
    mostrarAviso("Não foi possível carregar as conversas.");
  }
}

carregarDados();