const catalagoProdutos = document.getElementById("container-produto");

function exibirTodos() {
    const produtosEscondidos = Array.from(catalagoProdutos.getElementsByClassName('hidden'));

    for (const produto of produtosEscondidos){
        produto.classList.remove('hidden');
    }

}


function esconderMasculino() {
    exibirTodos()
    const produtosMasculinos = Array.from(catalagoProdutos.getElementsByClassName(`masculino`));
    for (const produto of produtosMasculinos) {
        produto.classList.add('hidden');
    }
};

function esconderFeminino() {
    exibirTodos()
    const produtosFemininos = Array.from(catalagoProdutos.getElementsByClassName(`feminino`));
    for (const produto of produtosFemininos) {
        produto.classList.add('hidden');
    }
};

export function inicializarFiltros(){
    document.getElementById(`exibir-femininos`).addEventListener('click', esconderMasculino);
    document.getElementById('exibir-masculinos').addEventListener('click', esconderFeminino);
    document.getElementById('exibir-todos').addEventListener('click', exibirTodos);
};

