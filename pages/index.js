import React from 'react';
import Head from 'next/head'; 
import Link from 'next/link';

function HomePage() {
  const handleMenuToggle = () => {
    const paginasNav = document.getElementById("paginasNav");
    paginasNav.classList.toggle("ativo");
  };

  return (
    <>
      <Head>
        <title>Colheita | Conectando Produtores e Comunidade</title>
      </Head>

      <div id="conteiner">
        <div id="imagemFundo">
          <nav>
            <div id="tituloNav">
              <Link href="/" id="titulo">
                Colheita
              </Link>
            </div>

            <button id="menuToggle" aria-label="Abrir menu" onClick={handleMenuToggle}>
              <i className="fa-solid fa-bars"></i> 
            </button>
            <div id="paginasNav">
              <Link href="/aboutpage">Sobre</Link>
              <Link href="/producer">Produtores</Link>
              <Link href="/product">Produtos</Link>
            </div>
          </nav>

          <main id="paginaPrincipal">
            <h1 id="tituloPaginaInicial">Apoie Produtores Locais</h1>
            <p id="textoPaginaInicial">Compre direto de quem produz e fortaleça sua comunidade.</p>
            <div className="procurar">
              <div className="inputProcurarBox">
                <img className="iconeProcurar" src="/images/batata.png" alt="Icone de Batata" />
                <input type="text" placeholder="O que você procura hoje?" className="inputProcurar" />
                <button className="botaoProcurar">Pesquisar <i className="fa-solid fa-arrow-right"></i></button>
              </div>
            </div>
          </main>
        </div>

        <footer>
          <div id="footerBox">
            <div id="colheitaRedes">
              <h1>COLHEITA</h1>
              <p>Conectando produtores locais e <span>consumidores.</span></p>
              <div className="redesSociasFooter">
                <i className="fa-brands fa-instagram" style={{color: '#ffffff'}}></i> {/* Estilos inline como objetos */}
                <i className="fa-brands fa-youtube" style={{color: '#ffffff'}}></i>
                <i className="fa-brands fa-facebook" style={{color: '#ffffff'}}></i>
              </div>
            </div>
            <div id="mapaDoSite">
              <h2>MAPA DO SITE</h2>
              <ul>
                <li><Link href="/">Início</Link></li>
                <li><Link href="/about">Sobre</Link></li>
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
      {/* Scripts JavaScript que manipulam o DOM diretamente precisam ser adaptados para React */}
      {/* Ou você pode colocá-los em um componente separado e usar useEffect */}
    </>
  );
}

export default HomePage;