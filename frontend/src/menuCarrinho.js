import { catalogo, SalvarLocalStorage, lerLocalStorage} from "./utilidades";
 
const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};

function abrirCarrinho() {
    document.getElementById("carrinho").classList.add('right-[0px]');
    document.getElementById("carrinho").classList.remove('right-[-360px]');
};

function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove('right-[0px]');
    document.getElementById("carrinho").classList.add('right-[-360px]');
};

export function inicializarCarrinho() {
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");

    botaoAbrirCarrinho.addEventListener('click', abrirCarrinho);
    botaoFecharCarrinho.addEventListener('click', fecharCarrinho);
};

function removerDoCarrinho(idProduto) {
    delete idsProdutoCarrinhoComQuantidade[idProduto];
    atualizaPrecoCarrinho();
    renderizarProdutosCarrinho();
    SalvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
}


function incrementarQuantidadeProduto(idProduto){
    idsProdutoCarrinhoComQuantidade[idProduto]++;
    atualizarInformacaoQuantidade(idProduto);
    atualizaPrecoCarrinho();
    SalvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
};

function decrementarQuantidadeProduto(idProduto){
    idsProdutoCarrinhoComQuantidade[idProduto]--;
    atualizarInformacaoQuantidade(idProduto);
    if (idsProdutoCarrinhoComQuantidade[idProduto] === 0){
        removerDoCarrinho(idProduto);
    }
    atualizaPrecoCarrinho();
    SalvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
};

function atualizarInformacaoQuantidade(idProduto){
    document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoComQuantidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto){
    const produto = catalogo.find((p)  => p.id === idProduto);
    const containerProdutosCarrinho = document.getElementById("produtos-carrinho");

    const articleClasses = ["flex", "bg-red-300", "rounded-lg", "text-sm", "p-1"]
    const elementoArticle = document.createElement('article');
    for (const articleClass of articleClasses){
        elementoArticle.classList.add(articleClass);
    }

    const cartaoProdutoCarrinho = `
    <button id='remover-item-${produto.id}' class="px-1 text-slate-600 hover:text-slate-800"><i class="fa-solid fa-circle-xmark"></i></button>
    <img class='h-20 rounded-lg' src="./Assets/img/${produto.imagem}" alt="Imagem do produto ${produto.nomeProduto} no carrinho">
    <div class="p-1 flex flex-col justify-between text-black">
        <p><strong class='text-white'>${produto.nomeProduto}</strong></p>
        <p><strong class='text-white'>${produto.marca}</strong></p>
        <p><strong class='text-white'>Valor: </strong><strong class='text-lime-800'>R$ ${produto.preco}</strong></p>
    </div>
    <div class="flex text-slate-950 items-end text-base justify-end">
        <button id="decrementar-produto-${produto.id}">-</button>
        <p id="quantidade-${produto.id}" class="ml-2">${
            idsProdutoCarrinhoComQuantidade[produto.id]
        }</p>
        <button class="ml-2" id='incrementar-produto-${produto.id}'>+</button>
    </div>
  `;
  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);

  document.getElementById(`decrementar-produto-${produto.id}`).addEventListener('click', () => decrementarQuantidadeProduto(produto.id));
  document.getElementById(`incrementar-produto-${produto.id}`).addEventListener('click', () => incrementarQuantidadeProduto(produto.id));
  document.getElementById(`remover-item-${produto.id}`).addEventListener('click', () => removerDoCarrinho(produto.id));
}

function renderizarProdutosCarrinho(idProduto) {
    const containerProdutosCarrinho = document.getElementById("produtos-carrinho");
    containerProdutosCarrinho.innerHTML = "";
    for (const idProduto in idsProdutoCarrinhoComQuantidade){
        desenharProdutoNoCarrinho(idProduto);
    }
}

export function adicionarAoCarrinho(idProduto) {
    if (idProduto in idsProdutoCarrinhoComQuantidade){
        incrementarQuantidadeProduto(idProduto);
        return;
    };
    idsProdutoCarrinhoComQuantidade[idProduto] = 1;
    SalvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
    desenharProdutoNoCarrinho(idProduto);   
    atualizaPrecoCarrinho();
};


function atualizaPrecoCarrinho(){
    const precoCarrinho = document.getElementById("preco-total");
    let precoTotalCarrinho = 0;
    for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade) {
        precoTotalCarrinho += catalogo.find((p) => p.id === idProdutoNoCarrinho).preco * (idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho]);
    }
    precoCarrinho.innerText = `Total: $${precoTotalCarrinho}`;
};