import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button, Form, Modal } from 'react-bootstrap';
import { PlanUiState, initialize, setCopId, setCreated, setError, setGroupId, setLocId } from '../../../features/PlanInventaire/Plan-ui';
import { useUpdatePlanMutation,useFetchPlansQuery } from '../../../features/PlanInventaire/Plan';
import { Plan } from "../../../app/models/Plan";
import SuccessMessage from '../../../Messages/SuccessMessage';
import Loader from '../../../Messages/Loader';
import ErrorMessage from '../../../Messages/ErrorMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer } from '@fortawesome/free-solid-svg-icons';


function EditPlanModal({refetch}:{refetch:()=>void}) {
    const uiState = useAppSelector((state: { planUiSlice: PlanUiState }) => state.planUiSlice);
    const dispatch = useAppDispatch();

    const [updateServer,{isLoading}] = useUpdatePlanMutation();
    
   
    
    function handleClose(){
        dispatch(initialize());
    }
 
   

  return (
    <Modal show={uiState.showEdit} onHide={handleClose}   size="lg" centered>
    <Modal.Header className='bg-secondaire' closeButton>
      <Modal.Title ><FontAwesomeIcon icon={faServer} /> Modifier Plan de scan  : {uiState.plan.GROUPE_ID}</Modal.Title>
    </Modal.Header>
    {
    !isLoading?     
    !uiState.created?     
    !uiState.isError?
   ( 
    <div>
   <Modal.Body>
        
        <Form>
            <Form.Group>
                <Form.Label>ID Equipe</Form.Label>
                <Form.Control
                    type="number"
                    placeholder='example.naftal.local'          
                    value={uiState.plan.GROUPE_ID}
                    onChange={(e)=>{
                       dispatch(setGroupId(e.target.value)) ;
                    }}
                    />
             </Form.Group>   
             <Form.Group>
                <Form.Label>ID Localisation</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='10.96.X.X'
                    value={uiState.plan.LOC_ID}
                    onChange={(e)=>{
                       dispatch(setLocId(e.target.value));
                    }}
                    />
             </Form.Group> 
             <Form.Group>
                <Form.Label>ID Centre opérationel ID</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Windows plan 2019"
                    value={uiState.plan.COP_ID}
                    
                    onChange={(e)=>{
                       dispatch(setCopId(e.target.value));
                    }}
                    />
             </Form.Group>  
        </Form>

      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Annuler
      </Button>
      <button className="btn bg-primaire" onClick={async () => {
          try {
            const payload = await updateServer({
              GROUPE_ID:uiState.plan.GROUPE_ID,
              COP_ID:uiState.plan.LOC_ID,
              LOC_ID:uiState.plan.COP_ID
            }).unwrap();
            dispatch(setCreated());
            refetch();
          } catch (error) {
            dispatch(setError()) ;
            
          }
          setTimeout(() => {
            dispatch(initialize());
            
          }, 2000);
          
      }}>
        Valider
      </button>
    </Modal.Footer>
    </div>
    )
     : (<ErrorMessage message="Opération échoué" />) :
     (<SuccessMessage message='Modifié avec succès' />) :
     (<Loader />)
     }
      
  </Modal>

  )
}

export default EditPlanModal;
