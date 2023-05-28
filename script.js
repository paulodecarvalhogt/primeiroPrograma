function editarItemTabela(indiceMaterial) {
  const nomeItem = document.getElementById("name-input");
  const precoItem = document.getElementById("price-input");
  const qtdItem = document.getElementById("quantity-input");
  const idInput = document.getElementById("id-input");

  const dados = JSON.parse(localStorage.getItem(indiceMaterial));

  nomeItem.value = dados.nome;
  precoItem.value = dados.preco;
  qtdItem.value = dados.quantidade;
  idInput.value = Number(indiceMaterial);
}

function removerItemTabela(chave) {
  localStorage.removeItem(chave);
  recarregarPagina();
}

function criarBotao(texto, onClick) {
  const botao = document.createElement("button");
  botao.textContent = texto;
  botao.addEventListener("click", onClick);
  return botao;
}

function criarColuna(texto) {
  const coluna = document.createElement("td");
  coluna.textContent = texto;
  return coluna;
}

function adicionarLinhaTabela(produto, chave) {
  const tabelaItem = document.getElementById("table-input");
  const linhaTabela = document.createElement("tr");

  const celulaNome = criarColuna(produto.nome);
  const celulaPreco = criarColuna(produto.preco);
  const celulaQuantidade = criarColuna(produto.quantidade);
  const botaoEditarItem = criarColuna();
  const botaoApagarItem = criarColuna();

  const botaoEditar = criarBotao("Editar", function () {
    editarItemTabela(chave);
  });
  const botaoRemover = criarBotao("Apagar", function () {
    removerItemTabela(chave);
  });

  botaoEditarItem.appendChild(botaoEditar);
  botaoApagarItem.appendChild(botaoRemover);

  linhaTabela.appendChild(celulaNome);
  linhaTabela.appendChild(celulaPreco);
  linhaTabela.appendChild(celulaQuantidade);
  linhaTabela.appendChild(botaoEditarItem);
  linhaTabela.appendChild(botaoApagarItem);
  tabelaItem.appendChild(linhaTabela);
}

function salvarItem() {
  const idInput = document.getElementById("id-input");
  const nomeItem = document.getElementById("name-input").value;
  const precoItem = document.getElementById("price-input").value;
  const qtdItem = document.getElementById("quantity-input").value;
  const tabelaItem = document.getElementById("table-input");

  const material = {
    nome: nomeItem,
    preco: precoItem,
    quantidade: qtdItem,
  };

  if (idInput.value && idInput.value > -1) {
    localStorage.setItem(idInput.value, JSON.stringify(material));
    const rows = tabelaItem.rows[idInput.value];
    rows.cells[0].textContent = material.nome;
    rows.cells[1].textContent = material.preco;
    rows.cells[2].textContent = material.quantidade;
    idInput.value = -1;
  } else {
    const chave = tabelaItem.rows.length;
    localStorage.setItem(chave, JSON.stringify(material));
    adicionarLinhaTabela(material, chave);
  }
}

function limparTabela() {
  const tabelaItem = document.getElementById("table-input");
  tabelaItem.innerHTML = "";
}

function recarregarPagina() {
  limparTabela();

  for (let i = 0; i < localStorage.length; i++) {
    const produto = JSON.parse(localStorage.getItem(i));
    adicionarLinhaTabela(produto, i);
  }
}
