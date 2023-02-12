import SingleRecordCard from "../SingleRecordCard"
import Translate from '../../../helpers/Translate/Translate';
import AddNewRecord from "../../AddNewRecord/AddNewRecord";
import Modal from "../../Modal/Modal";
import { useState } from "react";
const NewRecord = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <SingleRecordCard>
            <div className="h-100" onClick={() => setIsOpen(true) }>
                <div className="single-record-card-img"></div>
                <div className="single-record-card-name">
                    <span><Translate id="button.register" /></span>
                </div>
            </div>
            {isOpen && <Modal><AddNewRecord setIsOpen={setIsOpen} /></Modal>}
        </SingleRecordCard>
    )
}

export default NewRecord;