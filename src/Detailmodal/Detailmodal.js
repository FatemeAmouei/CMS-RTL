import Modal from 'react-bootstrap/Modal';
import './Detailmodal.css'
import { useEffect, useContext } from 'react';
import { ThemeContext  } from '../Context/ThemeContext';

function Detailmodal({onHide, columns, body}) {
  const { theme } = useContext(ThemeContext);

  useEffect(()=>{
    const chekKey = e =>{
      if(e.keyCode === 27){
        onHide()
      }
    }
    window.addEventListener('keydown',chekKey)
    return () => window.removeEventListener('keydown', chekKey);
  }, [onHide]);

  return (
    <Modal show={true} onHide={onHide} centered className='detail-container'>
        <Modal.Body className={`detail-modal__body ${theme}`}>
          <table className={`table ${theme}`}>
            <thead>
              <tr>
                {columns.map((column,index) =>
                  <th key={index}>{column}</th>
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                {body.map((item,index) =>
                  <td key={index}>{item}</td>
                )}
              </tr>
            </tbody>
          </table>
        </Modal.Body>
    </Modal>
  );
}

export default Detailmodal;

