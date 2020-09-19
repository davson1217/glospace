import React, {useEffect} from 'react';
import Modal from "./Modal/Modal";
import AddService from "./AddService";
import ServicesTab from "./ServicesTab";
import PropTypes from 'prop-types'
import AddSlide from "./AddSlide";
import Slide from "./Reusable/ServiceManagement/Slide";

const SlidesTab = (props) => {
    useEffect(()=>{
        props.fetchSlides()
    },[])

    let slides = (
        <div className="no-service text-center d-flex justify-content-center align-items-center" style={{height:"70vh", width:"100%"}}>
            <h4>No slides added to Global Space</h4>
        </div>
    )
    if (Object.keys(props.slides).length){
        slides = props.slides.map((item,index)=>{
            return <Slide
                bg={item.bg}
                side={item.side_photo}
                buttonText={item.button_text}
                buttonURL={item.button_link}
                headerOne={item.header_one}
                headerTwo={item.header_two}
                closing={item.closing_text}
                intro={item.intro_text}
                deleteSlide={props.deleteSlide}
                slideId={item.id}
                key={index}
            />
        })
    }

    return(
        <div>
            <div className="row">

                <div className="col-sm-12">
                    <button className="btn btn-success" onClick={()=>props.toggleModal()}>Add Slide</button>
                </div>

                <div className="col-sm-12 mt-5">
                    <div className="row">
                        {slides}
                    </div>
                </div>
            </div>
            {props.isShowModal?
                <Modal title={"Add Slide"} closeModal={props.toggleModal}>
                   <AddSlide />
                </Modal>
                :
                null}
        </div>
    )
}

ServicesTab.propTypes ={
    isShowModal: PropTypes.bool,
    toggleModal: PropTypes.func,
    fetchSlides: PropTypes.func,
    slides: PropTypes.array,
    // editService: PropTypes.func,
    deleteSlide: PropTypes.func,
}

export default SlidesTab;
