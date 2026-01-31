import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';


function ProductsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState([]); 
  const [formData, setFormData] = useState({ 
    id: '',
    name: '',
    category: '',
    price: '',
    description: '',
    quantity: '',
    producer_id: '',
  });
  const [alertMessage, setAlertMessage] = useState('');

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products'); 
      if (!response.ok) {
        throw new Error(`Erro ao buscar produtos: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      setAlertMessage(`Erro ao carregar produtos: ${error.message}`);
    }
  };

  
  useEffect(() => {
    fetchProducts();
  }, []); 

  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handler para Salvar (POST)
  const handleSave = async () => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao salvar produto: ${response.status} - ${errorData.message || response.statusText}`);
      }
      setAlertMessage('Produto salvo com sucesso!');
      setFormData({ id: '', name: '', category: '', price: '', description: '', quantity: '', producer_id: '' }); // Limpa o formulário
      fetchProducts(); // Recarrega a lista de produtos
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      setAlertMessage(`Erro: ${error.message}`);
    }
  };

  // Handler para Alterar (PUT/PATCH)
  const handleAlter = async () => {
    if (!formData.id) {
      setAlertMessage('Selecione um produto para alterar (preencha o Código).');
      return;
    }
    try {
      const response = await fetch(`/api/products/${formData.id}`, { // Assumindo rota /api/products/:id para PUT
        method: 'PATCH', // Ou PATCH, dependendo da sua API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao alterar produto: ${response.status} - ${errorData.message || response.statusText}`);
      }
      setAlertMessage('Produto alterado com sucesso!');
      setFormData({ id: '', name: '', category: '', price: '', description: '', quantity: '', producer_id: '' });
      fetchProducts();
    } catch (error) {
      console.error("Erro ao alterar produto:", error);
      setAlertMessage(`Erro: ${error.message}`);
    }
  };

  // Handler para Excluir (DELETE)
  const handleDelete = async () => {
    if (!formData.id) {
      setAlertMessage('Selecione um produto para excluir (preencha o Código).');
      return;
    }
    try {
      const response = await fetch(`/api/products/${formData.id}`, { // Assumindo rota /api/products/:id para DELETE
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao excluir produto: ${response.status} - ${errorData.message || response.statusText}`);
      }
      setAlertMessage('Produto excluído com sucesso!');
      setFormData({ id: '', name: '', category: '', price: '', description: '', quantity: '', producer_id: '' });
      fetchProducts();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      setAlertMessage(`Erro: ${error.message}`);
    }
  };

  // Handler para clicar em um card de produto e preencher o formulário
  const handleProductClick = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      quantity: product.quantity,
      producer_id: product.producer_id,
    });
    setAlertMessage(''); // Limpa a mensagem de alerta ao selecionar um produto
  };


  return (
    <>
      <Head>
        <title>Colheita | Produtos </title>

        
      </Head>

      <div id="conteiner">
        <nav id="sobreNav"> {/* O ID 'sobreNav' pode ser genérico ou mudar para 'mainNav' */}
          <div id="tituloNav">
            <Link href="/" id="titulo">Colheita</Link>
          </div>
          <button id="menuToggle" aria-label="Abrir menu" onClick={handleMenuToggle}>
            <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
          <div id="paginasNav" className={isMenuOpen ? 'ativo' : ''}>
            <Link href="/aboutpage">Sobre</Link>
            <Link href="/producer">Produtores</Link>
            <Link href="/product">Produtos</Link>
          </div>
        </nav>

        <main id="mainProdutos">
          <h1 className="tituloCards">Encontre Produtos</h1>
          <form id="formCadastroProdutos">
            <label htmlFor="id">Código</label>
            <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} readOnly />
            <br />
            <label htmlFor="nome">Nome</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            <br />
            <label htmlFor="categoria">Categoria</label>
            <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
            <br />
            <label htmlFor="preco">Preço</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
            <br />
            <label htmlFor="descricao">Descrição</label>
            <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
            <br />
            <label htmlFor="quant_disponivel">Quantidade Disponível</label>
            <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
            <br />
            <label htmlFor="produtor_id">Código do Produtor</label>
            <input type="number" id="producer_id" name="producer_id" value={formData.producer_id} onChange={handleChange} />
            <br />
            <div id="alerta">{alertMessage && <p>{alertMessage}</p>}</div>
            <div className="botoesForm">
              <button type="button" id="btSalvar" onClick={handleSave}>Salvar</button>
              <button type="button" id="btAlterar" onClick={handleAlter}>Alterar</button>
              <button type="button" id="btExcluir" onClick={handleDelete}>Excluir</button>
            </div>
          </form>
          <br />
          <hr className="separador" />
          <br />
          <div>
            <h2 className="subtitulo">Resultados Encontrados</h2>
            <div className="cardsProdutos" id="cardDados">
              {products.length === 0 ? (
                <p>Nenhum produto encontrado.</p>
              ) : (
                products.map(product => (
                  <div className="cardProduto" key={product.id} onClick={() => handleProductClick(product)}>
                    <div className="gridCardProduto">
                      <div className="produtoIdImagem">
                        <span className="produtoId">{product.id}</span>
                        <img src="/images/produto.png" alt="Emojis de Fruta" /> {/* Verifique o caminho da imagem */}
                      </div>
                      <div className="produtoInformacoes">
                        <h3 className="produtoNome">{product.name}</h3>
                        <span className="produtoCategoria">{product.category}</span>
                        <p className="produtoIdProdutor">Produtor {product.producer_id}</p>
                        <p className="produtoQuant">Quantidade disponível: {product.quantity}</p>
                        <h4 className="produtoPreco">R$ {product.price}</h4>
                      </div>
                    </div>
                    <p className="produtoDescricao">{product.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          <br />
        </main>

        <footer>
          <div id="footerBox">
            <div id="colheitaRedes">
              <h1>COLHEITA</h1>
              <p>Conectando produtores locais e <span>consumidores.</span></p>
              <div className="redesSociasFooter">
                <i className="fa-brands fa-instagram" style={{ color: '#ffffff' }}></i>
                <i className="fa-brands fa-youtube" style={{ color: '#ffffff' }}></i>
                <i className="fa-brands fa-facebook" style={{ color: '#ffffff' }}></i>
              </div>
            </div>
            <div id="mapaDoSite">
              <h2>MAPA DO SITE</h2>
              <ul>
                <li><Link href="/">Início</Link></li>
                <li><Link href="/aboutpage">Sobre</Link></li>
                <li><Link href="/producer">Produtores</Link></li>
                <li><Link href="/product">Produtos</Link></li>
              </ul>
            </div>
            <div id="termosECondicoes">
              <h2>TERMOS E CONDIÇÕES</h2>
              <ul>
                <li>Politícas de Privacidade</li>
                <li>Termos e condições de Uso</li>
                <li>Política de Cookies</li>
              </ul>
            </div>
            <div id="imagemProdutora">
              <img src="/images/footer.png" alt="Imagem do Rodapé da Página" />
            </div>
          </div>
          <hr />
          <p>© 2025 Colheita. Todos os direitos reservados.</p>
        </footer>
      </div>
      {/* O script-produto.js e o script do menu toggle foram refatorados para React */}
    </>
  );
}

export default ProductsPage;