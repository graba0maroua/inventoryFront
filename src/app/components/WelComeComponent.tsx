const WelcomeComponent = (param:{page:string,title:string,subItem:string,isDownloadable:boolean,downloadLink:string}) => {
    const {title,subItem,isDownloadable,page,downloadLink} = param
    return(
      <section id="content">
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
    isDownloadable &&  <a href="#" className="btn-download">
                  <i className='bx bxs-download' ></i>
                  <span className="text">Download PDF</span>
              </a>
        
     }     
        
        </div>
      </main>
      </section>
    )
}

export default WelcomeComponent