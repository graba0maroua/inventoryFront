import { useRef, useState } from "react";
// import { useGeneratePDFLocalitesMutation } from "../../features/infrastructure/infrastructureCentre" //!
import Lottie from "lottie-react";
import Annimation from "./../../assets/annimation.json";
import { Button, Modal } from "react-bootstrap";
import { backend_server, baseUrl } from "../constantes/constantes";
import { useAppDispatch, useAppSelector } from "../hooks";
import { MainUiState, setLoadingState, setShowUrlModal, setUrl } from "../../features/uistate/mainui";
import { FaFilePdf } from "react-icons/fa";

const WelcomeComponent = (param:{page:string,title:string,subItem:string,isDownloadable:boolean,downloadLink:string,
    onClickCustom :  (() => Promise<void>) | null }) => {
    const {title,subItem,isDownloadable,page , onClickCustom} = param
    const url = useAppSelector((state: { mainUiSlice: MainUiState }) => state.mainUiSlice.url);
    const isLoading = useAppSelector((state: { mainUiSlice: MainUiState }) => state.mainUiSlice.isLoading);
    const showUrlModal = useAppSelector((state: { mainUiSlice: MainUiState }) => state.mainUiSlice.showUrlModal);

    const dispatch = useAppDispatch();
 
    // const refLink = useRef<HTMLAnchorElement>(null)
    // const [generateReport] = useGeneratePDFLocalitesMutation(); //!
    return(
      
      <section id="content">
        <Modal show={showUrlModal} onHide={() => dispatch(setShowUrlModal(false))}>
        
        <Modal.Body>
          {isLoading &&  ( <Lottie animationData={Annimation} loop={true} /> )}
          {!isLoading &&  ( 
            <div>
              <a  href={backend_server.substring(0,backend_server.length-1)+url} download={true} 
              // ref={refLink}
              > <FaFilePdf/>Télécharger </a> 
            </div>
           )}

        </Modal.Body>
        
      </Modal>

        <main>
        <div className="head-title">
          <div className="left">
            <h1>{title}</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">{page}</a>
              </li>
              <li><i className='bx bx-chevron-right'></i></li>
              <li>
                <a className="active" href="#">{subItem}</a>
              </li>
            </ul>
          </div>
          
     {
    isDownloadable &&  <button  className="btn btn-download" onClick={(e) => onClickCustom()}>
                  <i className='bx bxs-download' ></i>
                  <span className="text">Download PDF</span>
              </button>
        
     }     
        
        </div>
      </main>
      </section>
    )
}

export default WelcomeComponent