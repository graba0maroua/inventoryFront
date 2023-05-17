import { useState } from "react"
import { useFetchCentreQuery } from "../../features/centre/centre"
import { Spinner } from "react-bootstrap"
import  Home  from '../views/Home'
const CentrePage = ()=>{
    const [keyword,setKeyword] = useState('')
    const {data,isFetching} = useFetchCentreQuery({keyword:keyword})
    return (<div>
         <Home/>
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

                <Spinner variant="secondary" />
            </div>
            )
        }
    </div>)
}

export default CentrePage