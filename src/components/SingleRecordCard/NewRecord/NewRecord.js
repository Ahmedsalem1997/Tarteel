import SingleRecordCard from "../SingleRecordCard"
import Translate from '../../../helpers/Translate/Translate';
import { useDispatch } from "react-redux";
import { modalsActions } from "../../../store/Modals/Modals";
import { getAuth } from "../../../utils/Auth";
const NewRecord = () => {
    const dispatch = useDispatch();
    const { isAuth } = getAuth();
    const openAddNewRecordModal = () => {
        if (!isAuth) {
            dispatch(modalsActions.openLoginModal());
        } else {
            dispatch(modalsActions.openAddNewRecordModal());
        }
    }
    return (
        <SingleRecordCard>
            <div className="h-100" onClick={openAddNewRecordModal}>
                <div className="single-record-card-bg">
                    <i className="fa-solid fa-microphone fa-5x"></i>
                </div>
                <div className="single-record-card-name">
                    <span><Translate id="button.newRecord" /></span>
                </div>
            </div>
        </SingleRecordCard>
    )
}

export default NewRecord;