import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { PlanUiState, initialize, setCreated, setError } from '../../../features/PlanInventaire/Plan-ui';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useStorePlanMutation } from '../../../features/PlanInventaire/Plan';
import { Plan } from "../../../app/models/Plan";
import SuccessMessage from '../../../Messages/SuccessMessage';
import Loader from '../../../Messages/Loader';
import ErrorMessage from '../../../Messages/ErrorMessage';

function AddPlanModal({ refetch }: { refetch: () => void }) {
  const uiState = useAppSelector((state: { planUiSlice: PlanUiState }) => state.planUiSlice);
  const [groupId, setGroupId] = React.useState(0);
  const [locId, setLocId] = React.useState('');
  const [copId, setCopId] = React.useState('');

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
        size="lg"
        centered
      >
        <Modal.Header className="bg-secondaire" closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faCalendar} /> Add a New Plan
          </Modal.Title>
        </Modal.Header>
        {!uiState.isError ? (
          !isLoading ? (
            !uiState.created ? (
              <div>
                <Modal.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label>Group ID</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter group ID"
                        value={groupId}
                        onChange={(e) => {
                          setGroupId(parseInt(e.target.value));
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Location ID</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter location ID"
                        value={locId}
                        onChange={(e) => {
                          setLocId(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>COP ID</Form.Label>
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
                    variant="primary"
                    onClick={async () => {
                      const plan = new Plan(groupId, locId, copId);
                      try {
                        const payload = await storePlan(plan);
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
                    Add
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