import { useState } from "react"
import { useFetchCentreQuery } from "../../features/centre/centre"
import { Spinner } from "react-bootstrap"
import SideBar from "../components/SideBarComponent"
const CentrePage = ()=>{
    const [keyword,setKeyword] = useState('')
    const {data,isFetching} = useFetchCentreQuery({keyword:keyword})
    return (<div>
        <SideBar active="centre" />
        <input type="text" className="form-control" onChange={(e)=>{
            setKeyword(e.target.value)
        }} />
        <table className="table">
            <thead>
                <tr>
                    <td>

                    Centre id
                    </td>
                    <td>
                        Centre lib 
                    </td>
                    
                </tr>
            </thead>
            <tbody>
                    { !isFetching && (
                        data?.centres.map((centre)=>{
                            return (<tr>
                                <td> {centre.COP_ID}</td>
                                <td> {centre.COP_LIB}</td>

                            </tr>)
                        })
                    
                    )
                    }
            </tbody>
        </table>
        {
            isFetching && (
            <div  className="d-flex flex-row justify-content-center">
           <Spinner variant="secondary p-5" />
            </div>
            )
        }
    </div>)
}

export default CentrePage