import { catalogo } from "./utilidades";
import { adicionarAoCarrinho } from "./menuCarrinho";

export function renderizarCatalogo() {
    for (const produtoCatalogo of catalogo){
        const cartaoProduto = `<div class="shadow-2xl shadow-indigo-500/40 rounded-lg w-72 m-3 flex flex-col p-2 justify-between group ${produtoCatalogo.feminino ? "feminino" : "masculino"}" id="card-produto-${produtoCatalogo.id}">
    <img class='mx rounded-lg group-hover:scale-95 duration-300' src="./Assets/img/${produtoCatalogo.imagem}" 
    alt="perfume masculino 1" 
    style="height: 200px;">
    <p class='text-sm'>${produtoCatalogo.marca}</p>
    <p class='text-sm'>${produtoCatalogo.nomeProduto}</p>
    <p class='text-sm'>R$ ${produtoCatalogo.preco},00</p>
    <button id="adicionar-${produtoCatalogo.id}" class='bg-slate-700 text-slate-200 hover:bg-slate-900'>Adicionar ao carrinho <i class="fa-solid fa-cart-plus"></i></button>
    </div>`;
    
    document.getElementById("container-produto").innerHTML += cartaoProduto
    }
    for (const produtoCatalogo of catalogo){
        document.
        getElementById(`adicionar-${produtoCatalogo.id}`).
        addEventListener('click', () => adicionarAoCarrinho(produtoCatalogo.id));
    };
};