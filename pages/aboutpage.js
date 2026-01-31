import React, { useState, useEffect } from 'react'; 
import Head from 'next/head';
import Link from 'next/link';

function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  return (
    <>
      <Head>
        <title>Colheita | Sobre</title>
    
      </Head>

      <div id="conteiner">
        <nav id="sobreNav">
          <div id="tituloNav">
            <Link href="/" id="titulo">
              Colheita
            </Link>
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

        <main id="paginaSobre">
          <div id="sobreBox">
            <h1 id="tituloSobre">Sobre</h1>
            <p id="textoSobre">O Colheita nasceu com o próposito de aproximar produtores locais e consumidores, fortalecendo
              a economia regional e valorizando o trabalho de quem vive da terra. Acreditamos que cada produto cultivado carrega esforço,
              história e dedicação, e que todos merecem ser reconhecidos por isso. Nossa plataforma conecta produtores, seus produtos e a
              comunidade, tornando mais fácil encontrar e apoiar quem faz parte da agricultura local. Assim como uma boa
              colheita é fruto do cuidado e cooperação, nosso projeto busca semear oportunidades e colher desenvolvimento
              sustentável para todos.</p>
          </div>
          <div id="equipeBox">
            <h1 id="equipeTitulo">Nossa Equipe</h1>
            <div id="devCards">
              <div className="card">
                <img src="/images/anaCatarina.jpeg" alt="Desenvolvedora Ana Catarina" />
                <h1>Ana Catarina</h1>
                <p>Análise de Sistemas</p>
                <div className="equipeRedesSociais">
                  <a href=""><i className="fa-brands fa-github" style={{ color: '#000000' }}></i></a>
                  <a href=""><i className="fa-brands fa-linkedin" style={{ color: '#002d7a' }}></i></a>
                </div>
              </div>
              <div className="card">
                <img src="/images/bianca.jpeg" alt="Desenvolvedora Bianca" />
                <h1>Bianca</h1>
                <p>Engenharia da Computação</p>
                <div className="equipeRedesSociais">
                  <a href=""><i className="fa-brands fa-github" style={{ color: '#000000' }}></i></a>
                  <a href=""><i className="fa-brands fa-linkedin" style={{ color: '#002d7a' }}></i></a>
                </div>
              </div>
              <div className="card">
                <img src="/images/isabella.jpeg" alt="Desenvolvedora Isabella" />
                <h1>Isabella</h1>
                <p>Análise de Sistemas</p>
                <div className="equipeRedesSociais">
                  <a href=""><i className="fa-brands fa-github" style={{ color: '#000000' }}></i></a>
                  <a href=""><i className="fa-brands fa-linkedin" style={{ color: '#002d7a' }}></i></a>
                </div>
              </div>
            </div>
          </div>
          <div id="comoFuncionaBox">
            <h1 id="comoFuncionaTitulo">Como Funciona?</h1>
            <div id="comoFuncionaCards">
              <div className="produtoresProdutosBox">
                <h3>Produtores</h3>
                <p>Os produtores locais podem se cadastrar na Colheita e divulgar seus produtos de forma simples e gratuita.
                  <br />
                  A plataforma permite criar um perfil com informações sobre a fazenda, os tipos de produtos disponíveis e o
                  período da colheita.
                </p>
                <h4>Passo-a-passo</h4>
                <ul>
                  <li>1. Cadastre-se como produtor.</li>
                  <li>2. Adicione seus produtos, com descrição e disponibilidade.</li>
                  <li>3. Aguarde que consumidores interessados entrem em contato.</li>
                  <li>4. Colha os frutos de uma venda direta, sem intermediários! 🍎 </li>
                </ul>
                <button className="comoFuncionaBotao">
                  <Link href="/product" className="btn">
                    Quero cadastrar um produtor
                  </Link>
                </button>
              </div>
              <div className="produtoresProdutosBox">
                <h3>Produtos</h3>
                <p>
                  Os produtores locais podem cadastrar seus produtos na Colheita. A plataforma permite adicionar produtos com
                  informações sobre o tipo do produto, preço, quantidade disponível. Assim, consumidores da região podem
                  encontrar facilmente o que você, produtor, oferece.
                </p>
                <h4>Passo-a-passo</h4>
                <ul>
                  <li>1. Cadastre o seu produto. </li>
                  <li>2. Atualize os dados quando precisar.</li>
                  <li>3. Pode deletar os seus produtos no momento que quiser.</li>
                  <li>4. Receba alimentos frescos e cultivados com carinho! 🍎</li>
                </ul>
                <div>
                  <button className="comoFuncionaBotao">
                    <Link href="/producer" className="btn">
                    Quero cadastrar um produto
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div id="FAQBox">
            <h1 id="FAQTitulo">Dúvidas Frequentes</h1>
            <h2>1. O que é a Colheita?</h2>
            <p>A Colheita é uma plataforma que conecta produtores locais e consumidores da região. Nosso objetivo é fortalecer a
              economia local, facilitar o acesso a produtos frescos e valorizar o trabalho dos pequenos produtores.</p>
            <br />
            <h2>2. Como a Colheita funciona?</h2>
            <p>A Colheita utiliza uma API que permite cadastrar produtores e consumidores, exibindo os produtos disponíveis de
              forma simples e transparente. Assim, quem produz pode divulgar sua colheita e quem consome pode encontrar produtos
              próximos de casa.</p>
            <br />
            <h2>3. Quem pode usar a plataforma?</h2>
            <p>Qualquer pessoa interessada em comprar ou vender produtos locais pode participar — produtores rurais, feirantes,
              pequenos agricultores e consumidores que valorizam alimentos frescos e sustentáveis.</p>
            <br />
            <h2>4. O que é uma API e qual o papel dela na Colheita?</h2>
            <p>API (Interface de Programação de Aplicações) é o que permite que diferentes sistemas se comuniquem. No caso da
              Colheita, a API é o “coração” do projeto — ela gerencia informações sobre produtores e produtos,
              permitindo que o site exiba tudo de forma dinâmica.</p>
            <br />
            <h2>5. Quais são os benefícios de comprar de produtores locais?</h2>
            <p>Comprar de produtores locais ajuda a movimentar a economia da comunidade, reduz o desperdício, valoriza o trabalho rural e oferece produtos mais frescos e de qualidade.</p>
          </div>
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

export default AboutPage;