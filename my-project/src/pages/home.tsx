//Importa a função hook useState()
import { useState, useEffect } from "react";
//Importa componentes que compõe a página
import NavBar from "../components/home/navBar";
import ImageSlider from "../components/home/slider";
import MyData from "../components/home/myData";
import Settings from "../components/home/settings";
import PopUp from "../components/warning";
import { type popUp } from "../components/warning";
import { verifyAdm, verifyAuth } from "../../server/authLogin";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  // popUp
  const [warning, setPopUp] = useState<popUp>();
  const [id, setId] = useState("");
  useEffect(() => {
    // Configura o PopUP
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
    // Verifica se o usuário está autenticado
    const getUser = async () => {
      const id = await verifyAuth();
      if (id) {
        //verifica se é administrador
        const admin = await verifyAdm();
        //se for, redireciona para a página de administrador
        if (admin != null && admin === true) {
          navigate("/admin", { replace: true });
          //senão, atribui o id do usuário à variável de controle
        } else {
          setId(id);
        }
        // se não estiver autenticado, volta ao login
      } else {
        navigate("/login", { replace: true });
      }
    };
    setWarning();
    getUser();
  }, []);
  // variavel de controle de pagina
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
      {id && activePage === "Meus Dados" && <MyData id={id}></MyData>}
      {id && activePage === "Configurações" && (
        <Settings set={warning?.set} id={id}></Settings>
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
