import React from 'react';
// import gdgdgd from './modal.module.css'; {gdgdgd.red}

function sayNo(){
    alert('no');
}

function Modal() {
    return (
        <div className="modal-container">
            <div className='modal-header'>
                <p className='modal-p'>Tutorial</p>
            </div>         
            <div className='modal-content'>
                <p className='content-p'>Do you want to assist to the BIMOC tutorial ?</p>
            </div> 
            <div className='modal-footer'>
                <button className="btn">No</button><button className='btn'>yes</button>
            </div>        
        </div>
    );
}

export default Modal;