import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Este componente representará um único card de produtor
function ProducerCard({ producer, onSelect }) {
  return (
    <div className="cardProdutor" onClick={() => onSelect(producer)}>
      <span className="produtorId">{producer.id}</span>
      {/* Assumindo que você tem uma imagem padrão para produtores */}
      <img src="/images/produtor.png" alt="Emoji de Fazendeiro" />
      <h3 className="produtorNome">{producer.name}</h3>
      <p className="produtorLocalTel">
        <span className="produtorLocal">{producer.location}</span> | <span className="produtorTel">{producer.phone}</span>
      </p>
    </div>
  );
}

function ProducerPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    location: '',
    phone: ''
  });
  const [alerta, setAlerta] = useState('');

  // Função para carregar os produtores da API
  const fetchProducers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/producers'); 
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      const data = await response.json();
      setProducers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducers(); // Carrega os produtores ao montar o componente
  }, []);

  // Lógica para o menu toggle
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Lógica para mudança nos inputs do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Lógica para selecionar um produtor no card e preencher o formulário
  const handleSelectProducer = (producer) => {
    setFormData({
      id: producer.id,
      name: producer.name,
      location: producer.location,
      phone: producer.phone
    });
    setAlerta(''); // Limpa alertas anteriores
  };

  // Lógica para Salvar (POST)
  const handleSalvar = async () => {
    setAlerta('');
    try {
      const response = await fetch('/api/producers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, location: formData.location, phone: formData.phone })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }
      setAlerta('Produtor salvo com sucesso!');
      setFormData({ id: '', name: '', location: '', phone: '' }); // Limpa o formulário
      fetchProducers(); // Atualiza a lista
    } catch (err) {
      setAlerta(`Erro ao salvar: ${err.message}`);
    }
  };

  // Lógica para Alterar (PATCH/PUT)
  const handleAlterar = async () => {
    setAlerta('');
    if (!formData.id) {
      setAlerta('Selecione um produtor para alterar.');
      return;
    }
    try {
      const response = await fetch(`/api/producers/${formData.id}`, {
        method: 'PATCH', // Ou 'PUT', dependendo de como sua API foi implementada
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, location: formData.location, phone: formData.phone })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }
      setAlerta('Produtor alterado com sucesso!');
      setFormData({ id: '', name: '', location: '', phone: '' });
      fetchProducers();
    } catch (err) {
      setAlerta(`Erro ao alterar: ${err.message}`);
    }
  };

  // Lógica para Excluir (DELETE)
  const handleExcluir = async () => {
    setAlerta('');
    if (!formData.id) {
      setAlerta('Selecione um produtor para excluir.');
      return;
    }
    if (!window.confirm(`Tem certeza que deseja excluir o produtor ${formData.name}?`)) {
      return;
    }
    try {
      const response = await fetch(`/api/producers/${formData.id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }
      setAlerta('Produtor excluído com sucesso!');
      setFormData({ id: '', name: '', location: '', phone: '' });
      fetchProducers();
    } catch (err) {
      setAlerta(`Erro ao excluir: ${err.message}`);
    }
  };


  return (
    <>
      <Head>
        <title>Colheita | Produtores </title>
      </Head>

      <div id="conteiner">
        <nav id="sobreNav"> {/* Reutilizando o ID da nav, talvez seja melhor ter um componente Nav */}
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

        <main id="mainProdutores">
          <h1 className="tituloCards">Encontre Produtores</h1>
          <form id="formCadastroProdutores">
            <label htmlFor="codigo">Código</label>
            <input type="text" id="codigo" name="id" value={formData.id} readOnly /> {/* 'codigo' para 'id' */}
            <br />
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" name="name" value={formData.name} onChange={handleChange} />
            <br />
            <label htmlFor="localizacao">Localização</label>
            <input type="text" id="localizacao" name="location" value={formData.location} onChange={handleChange} />
            <br />
            <label htmlFor="telefone">Telefone</label>
            <input type="text" id="telefone" name="phone" value={formData.phone} onChange={handleChange} />
            <br />
            <div id="alerta">{alerta}</div> {/* Exibe alertas aqui */}
            <div className="botoesForm">
              <button type="button" id="btSalvar" onClick={handleSalvar}>Salvar</button>
              <button type="button" id="btAlterar" onClick={handleAlterar}>Alterar</button>
              <button type="button" id="btExcluir" onClick={handleExcluir}>Excluir</button>
            </div>
          </form>

          <br />
          <hr className="separador" />
          <br />
          <div>
            <h2 className="subtitulo">Resultados Encontrados</h2>
            <div className="cardsProdutores" id="cardDados">
              {loading && <p>Carregando produtores...</p>}
              {error && <p style={{ color: 'red' }}>Erro ao carregar produtores: {error}</p>}
              {!loading && !error && producers.length === 0 && <p>Nenhum produtor encontrado.</p>}
              {!loading && !error && producers.map(producer => (
                <ProducerCard key={producer.id} producer={producer} onSelect={handleSelectProducer} />
              ))}
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
    </>
  );
}

export default ProducerPage;