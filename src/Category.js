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
          padding : 'none',
          minWidth: '20%',
          maxWidth: '50vW',
          maxHeight : '90vH',
          borderRadius : '15px',
          border : '1px solid #313131'
        },
        modalContent: {
            position: 'relative',
            padding: '1rem',
            overflowY: 'scroll',
            backgroundColor : 'rgb(248 250 252)',
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

const Category = ({toggleModal, isModalOpen, transactionId, recipientName, setTransactionTag, transactionTag}) => {
    console.log(transactionTag)
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
            if(setTransactionTag) {
                setTransactionTag(transactionTag);
            }
        }
        closeModal();
    }
    const onCardClick = function onCardClick(categoryName, subcategory) {
        //setTransactionTag({'category': categoryName, 'subCategory' :subcategory.displayName}) 
        handleSelection({'category': categoryName, 'subCategory' :subcategory.displayName})
    }
    return (
        <div>
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
                        const categoryName = category['name'];
                        return(
                            <div className="category-row mb-2 mt-2 shadow-md p-4 rounded-lg bg-white" key = {categoryName}>
                                <div className = "heading-wrapper mb-3">
                                    <h1 className="heading text-[#333] text-md font-semibold" >{categoryName}</h1>
                                </div>

                                <div className="flex flex-row flex-nowrap pr-2 overflow-x-scroll p-2">
                                    {category['subcategories'].map(function(subCategory) {
                                        return (
                                        
                                        transactionTag && transactionTag.subCategory === subCategory.displayName ? 
                                            <div onClick={() => onCardClick(categoryName, subCategory)} key = {subCategory.displayName} className="flex flex-col justify-evenly mr-4 items-center shadow-sm min-h-20 min-w-20 p-2 cursor-pointer rounded-md border-2 border-[#666]">
                                                <div className="text-xl">{subCategory.iconComponent} </div>
                                                <div className="text-xs text-[#818181] ">{subCategory.displayName} </div>
                                            </div>
                                            :
                                            <div onClick={() => onCardClick(categoryName, subCategory)} key = {subCategory.displayName} className="flex flex-col justify-evenly mr-4 items-center shadow-sm min-h-20 min-w-20 p-2 cursor-pointer rounded-md border-2 border-[#f1f1f1]">
                                                <div className="text-xl">{subCategory.iconComponent} </div>
                                                <div className="text-xs text-[#818181] ">{subCategory.displayName} </div>
                                            </div> 
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                
            </Modal>
        </div>
    )
}

export default Category