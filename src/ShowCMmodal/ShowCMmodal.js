import {useEffect, useContext } from 'react';
import { ThemeContext  } from '../Context/ThemeContext';

import './ShowCMmodal.css'

function ShowCMmodal({onHide,commentModal,submitAction}) {
  const { theme } = useContext(ThemeContext);

  useEffect(()=>{
    const checkKey = e =>{
      if(e.keyCode === 27){
        onHide()
      }
    }
    window.addEventListener('keydown',checkKey)
    return () => window.removeEventListener('keydown', checkKey);
  }, [onHide]);

  return (
    <div onHide={onHide} onClick={submitAction} className={`CMmodal__container ${theme}`}>
      {commentModal}
    </div>
  
  );
}

export default ShowCMmodal;

