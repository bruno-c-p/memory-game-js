const util = Util

const ID_CONTEUDO = "#conteudo"
const ID_BOTAO_JOGAR = "#jogar"
const ID_MENSAGEM = "#mensagem"
const CLASSE_INVISIVEL = "invisible"
const ID_CARREGANDO = "#carregando"
const ID_CONTADOR = "#contador"
const ID_BOTAO_MOSTRAR_TUDO = "#mostrar-tudo"

const MENSAGENS = {
  sucesso: {
    texto: "Combinação correta!",
    classe: "alert-success",
  },
  erro: {
    texto: "Combinação incorreta!",
    classe: "alert-danger",
  },
}

class Tela {
  static obterCodigoHtml(item) {
    return `
      <div class="col-md-3">
        <div class="card" style="width: 50%; max-width: 200px; margin: 0 auto" onclick="window.verificarSelecao('${item.id}', '${item.nome}')">
          <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="...">
        </div>
        <br/>
      </div>
    `
  }

  static configurarBotaoVerificarSelecao(funcaoOnClick) {
    window.verificarSelecao = funcaoOnClick
  }

  static alterarConteudoHtml(codigoHtml) {
    const conteudo = document.querySelector(ID_CONTEUDO)
    conteudo.innerHTML = codigoHtml
  }

  static gerarStringHtmlPelaImagem(itens) {
    return itens.map(Tela.obterCodigoHtml).join("")
  }

  static atualizarImagens(itens) {
    const codigoHtml = Tela.gerarStringHtmlPelaImagem(itens)
    Tela.alterarConteudoHtml(codigoHtml)
  }

  static configurarBotaoJogar(funcaoOnClick) {
    const botaoJogar = document.querySelector(ID_BOTAO_JOGAR)
    botaoJogar.onclick = funcaoOnClick
  }

  static exibirHerois(nomeHeroi, img) {
    const elementosHtml = document.querySelectorAll(`[name=${nomeHeroi}]`)
    console.log(elementosHtml)
    elementosHtml.forEach((item) => (item.src = img))
  }

  static async exibirMensagem(sucesso = true) {
    const elemento = document.querySelector(ID_MENSAGEM)
    if (sucesso) {
      elemento.classList.remove(MENSAGENS.erro.classe)
      elemento.classList.add(MENSAGENS.sucesso.classe)
      elemento.innerText = MENSAGENS.sucesso.texto
    } else {
      elemento.classList.remove(MENSAGENS.sucesso.classe)
      elemento.classList.add(MENSAGENS.erro.classe)
      elemento.innerText = MENSAGENS.erro.texto
    }

    elemento.classList.remove(CLASSE_INVISIVEL)
    await util.timeout(2000)
    elemento.classList.add(CLASSE_INVISIVEL)
  }

  static async exibirCarregando(mostrar = true) {
    const carregando = document.querySelector(ID_CARREGANDO)

    if (mostrar) {
      carregando.classList.remove(CLASSE_INVISIVEL)
      return
    }
    carregando.classList.add(CLASSE_INVISIVEL)
  }

  static iniciarContador() {
    let contarAte = 3
    const elementoContador = document.querySelector(ID_CONTADOR)
    const identificadorNoTexto = "$$contador"
    const textoPadrao = `Começando em ${identificadorNoTexto} segundos...`
    const atualizarTexto = () =>
      (elementoContador.innerHTML = textoPadrao.replace(
        identificadorNoTexto,
        contarAte--
      ))

    atualizarTexto()

    const idDoIntervalo = setInterval(atualizarTexto, 1000)
    return idDoIntervalo
  }

  static limparContador(idDoIntervalo) {
    clearInterval(idDoIntervalo)
    document.querySelector(ID_CONTADOR).innerHTML = ""
  }

  static configurarBotaoMostrarTudo(funcaoOnClick) {
    const botaoMostrarTudo = document.querySelector(ID_BOTAO_MOSTRAR_TUDO)
    botaoMostrarTudo.onclick = funcaoOnClick
  }
}
