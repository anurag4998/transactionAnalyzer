import React, { useEffect } from "react";
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { RiCloseCircleFill } from "react-icons/ri";
import { updateTransactionById,updateTransactionByName } from "./redux/transactionSlice";
import categoryCatalog from "./utils/categoryCatalog";

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding : 'none'
        },
        modalContent: {
            position: 'relative',
            padding: '1rem'
            // overflowY: 'scroll', // Add vertical scrolling
          },        
          closeButton: {
            color: 'black',
            padding: '5px',
            fontSize: '26px',            
            cursor: 'pointer',
            border: 'none',
            outline: 'none',
            position : 'absolute',
            right : 0,
            zIndex : 100
          },
      };

const Category = ({toggleModal, isModalOpen, transactionId, recipientName}) => {
    const dispatch = useDispatch();
    function closeModal() {
        toggleModal(false);
    }
    const handleSelection = function(transactionTag) {
        console.log(transactionTag)
        if(transactionId) {
            dispatch(updateTransactionById({transactionId, transactionTag}));
        }
        else if(recipientName) {
            dispatch(updateTransactionByName({recipientName: recipientName, transactionTag}));
        }
        closeModal();
    }
    return (
        <Modal 
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            ariaHideApp={false}
            style={customStyles}
            shouldCloseOnEsc={true}
        >
            <button style={customStyles.closeButton} onClick={closeModal}><RiCloseCircleFill/></button>
            <div style={customStyles.modalContent}>
                {categoryCatalog.map (function(category) {
                    const key = category['name'];
                    return(
                        <div className="category-row mb-4" key = {key}>
                            <div className = "heading-wrapper">
                                <h1 className="heading text-[#818181] text-md" >{key}</h1>
                            </div>
                            <div className="flex flex-row">
                                {category['subcategories'].map(function(subcategory) {
                                    return (
                                        <div onClick={() => handleSelection({'category': key, 'subCategory' :subcategory.displayName})} key = {subcategory.displayName} className="flex flex-col justify-evenly mx-2 items-center shadow-lg h-20 w-20 p-2 cursor-pointer">
                                            <div className="text-xl">{subcategory.component} </div>
                                            <div className="text-xs text-[#818181] ">{subcategory.displayName} </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
            
        </Modal>
    )
}

export default Category