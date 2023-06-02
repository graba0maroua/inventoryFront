import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { PlanUiState, initialize, setCreated, setError } from '../../../features/PlanInventaire/Plan-ui';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { useStorePlanMutation } from '../../../features/PlanInventaire/Plan';
import { Plan } from "../../../app/models/Plan";
import SuccessMessage from '../../../Messages/SuccessMessage';
import Loader from '../../../Messages/Loader';
import ErrorMessage from '../../../Messages/ErrorMessage';

function AddPlanModal({ refetch }: { refetch: () => void }) {
  const uiState = useAppSelector((state: { planUiSlice: PlanUiState }) => state.planUiSlice);
  const [groupId, setGroupId] = React.useState(5);
  const [locId, setLocId] = React.useState('0900L00000010');
  const [copId, setCopId] = React.useState('0900');

  const [storePlan, { isLoading }] = useStorePlanMutation();

  const dispatch = useAppDispatch();
  function handleClose() {
    dispatch(initialize());
  }

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal
        show={uiState.show}
        onHide={handleClose}
        centered
      >
        <Modal.Header className="bg-secondaire" closeButton>
          <Modal.Title >
            <FontAwesomeIcon icon={faBarcode} className='me-2' /> Add a New Plan
          </Modal.Title>
        </Modal.Header>
        {!uiState.isError ? (
          !isLoading ? (
            !uiState.created ? (
              <div>
                <Modal.Body >
                  <Form >
                    <Form.Group className='w-100'>
                      <Form.Label>ID Equipe</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter group ID"
                        value={groupId}
                        onChange={(e) => {
                          setGroupId(parseInt(e.target.value));
                        }}
                      />
                    </Form.Group>
                    <Form.Group className='w-100'>
                      <Form.Label>ID Localisation</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter location ID"
                        value={locId}
                        onChange={(e) => {
                          setLocId(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group className='w-100'>
                      <Form.Label>ID Centre opérationel COP</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter company ID"
                        value={copId}
                        onChange={(e) => {
                          setCopId(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Annuler
                  </Button>
                  <Button
                    className='bg-secondaire'
                    onClick={async () => {
                      
                      try {
                        const payload = await storePlan({
                          GROUPE_ID:groupId,
                          LOC_ID:locId,
                          COP_ID:copId,
                        }).unwrap();
                        console.log(payload);
                        dispatch(setCreated());
                        refetch();
                      } catch (error) {
                        dispatch(setError());
                      }
                      setTimeout(() => {
                        dispatch(initialize());
                      }, 2000);

                      setGroupId(0);
                      setLocId('');
                      setCopId('');
                    }}
                  >
                    Valider
                  </Button>
                </Modal.Footer>
              </div>
            ) : (
              <SuccessMessage message="Plan created successfully" />
            )
          ) : (
            <Loader />
          )
        ) : (
          <ErrorMessage message="Operation failed" />
        )}
      </Modal>
    </div>
  );
}

export default AddPlanModal;