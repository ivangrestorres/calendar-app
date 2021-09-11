import React from "react";
import { useDispatch } from "react-redux";
import { eventClearActive } from "../../actions/events";
import { uiOpenModal } from "../../actions/ui";

export const AddNewFab = () => {
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(eventClearActive());
        dispatch(uiOpenModal());
    };

    return (
        <button onClick={handleOnClick} className={"btn btn-primary fab"}>
            <i className={"fas fa-plus"}></i>
        </button>
    );
};
