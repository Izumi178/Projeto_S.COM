//Importa a função hook useState()
import { useState, useEffect } from "react";
//Importa componentes que compõe a página
import NavBar from "../components/navBar";
import ImageSlider from "../components/slider";
import MyData from "../components/myData";
import Settings from "../components/settings";
import Messages from "../components/message";
import PopUp from "../components/warning";
import { type popUp } from "../components/warning";
import { verifyAdm, verifyAuth } from "../authLogin";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [warning, setPopUp] = useState<popUp>();
  const [email, setEmail] = useState("");
  useEffect(() => {
    const setWarning = () => {
      const war: popUp = {
        title: undefined,
        content: undefined,
        show: false,
        works: undefined,
        set: setPopUp,
      };
      setPopUp(war);
    };
    const getUser = async () => {
      const email = await verifyAuth();
      if (email) {
        if (await verifyAdm) {
          navigate("/admin", { replace: true });
        } else {
          setEmail(email);
        }
      } else {
        navigate("/login", { replace: true });
      }
    };
    setWarning();
    getUser();
  }, []);
  const [activePage, changePage] = useState("Meus Dados");

  return (
    /*Container principal da pagina que contem demais componentes
      - flex: torna o componente um container flexível(organização propria);
      - flex-col: dispõe os componentes em coluna;
      - w-full: largura corresponde a largura da tela;
      - min-h-screen: altura corresponde a altura total da janela de visualizaçao;
      - pb-[100px]: preenchimento entre a borda de baixo do componente e 
      o componente filho de 100 pixels;
      - items-center: centraliza items;
      - bg-white: cor de fundo branca;
      - dark:bg-(--bg-dark): caso o modo escuro esteja ativado, 
      cor de fundo corresponde a outra cor, definida no arquivo.css do projeto ;
    */
    <div
      className="flex flex-col w-full min-h-screen pb-[100px] 
    items-center bg-white dark:bg-(--bg-dark)"
    >
      {/*Container que contem o slider de imagens, aqui existe um exemplo design responsivo. 
      Normalmente, a altura do container e 200 pixels (h-[200px]), 
      porem, quando a largura da tela e maior que 768 pixels, a altura passa a ter outro valor*/}
      <div className="w-full h-[200px] md:h-[400px]">
        {/*Componente do slider importado de outro arquivo*/}
        <ImageSlider />
      </div>
      {/*Container que contém a barra de navegacao*/}
      <div className="w-full flex justify-center mt-[-2rem]">
        {/*a variavel de estado da pagina e a funcao 
        que a controla sao passados como parâmetros da NavBar. O controle */}
        <NavBar changePage={changePage} activePage={activePage} />
      </div>
      <div className="h-[50px]" />
      {/*exemplo de renderizacao condicional, 
      caso o estado da pagina ativa corresponda ao componente, este sera renderizado*/}
      {email && activePage === "Meus Dados" && <MyData email={email}></MyData>}
      {email && activePage === "Configurações" && (
        <Settings set={warning?.set} email={email}></Settings>
      )}
      {email && activePage === "Mensagens" && (
        <Messages email={email}></Messages>
      )}
      {warning?.show && (
        <PopUp
          title={warning?.title}
          content={warning?.content}
          show={warning?.show}
          works={warning?.works}
          set={warning?.set}
        ></PopUp>
      )}
    </div>
  );
}

export default Home;
