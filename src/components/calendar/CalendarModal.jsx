import moment from "moment";
import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import Modal from "react-modal";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import {
    eventClearActive,
    eventStartAddNew,
    eventStartUpdate,
} from "../../actions/events";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement("#root");

const nowMoment = moment().minutes(0).seconds(0).add(1, "hours");
const endMoment = nowMoment.clone().add(1, "hours");

export const CalendarModal = () => {
    const dispatch = useDispatch();
    const { modalOpen } = useSelector((state) => state.ui);
    const { activeEvent } = useSelector((state) => state.event);

    const [startDate, setStartDate] = useState(nowMoment.toDate());
    const [endDate, setEndDate] = useState(endMoment.toDate());
    const [formSubmited, setFormSubmited] = useState(false);

    const [formValues, handleOnChange, setFormValues, reset] = useForm({
        title: "",
        notes: "",
        start: nowMoment.toDate(),
        end: endMoment.toDate(),
    });

    const { notes, title, start, end } = formValues;
    useEffect(() => {
        if (activeEvent) {
            setFormValues({ ...activeEvent });
            setStartDate(activeEvent.start);
            setEndDate(activeEvent.end);
        } else {
            reset();
            setStartDate(nowMoment.toDate());
            setEndDate(endMoment.toDate());
        }
    }, [activeEvent, setFormValues]);

    const closeModal = () => {
        reset();
        setFormSubmited(false);
        dispatch(uiCloseModal());
        dispatch(eventClearActive());
    };

    const handleStartDateChange = (e) => {
        setStartDate(e);
        setFormValues({ ...formValues, start: e });
    };

    const handleEndDateChange = (e) => {
        setEndDate(e);
        setFormValues({ ...formValues, end: e });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setFormSubmited(true);

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire(
                "Error",
                "Fecha fin debe ser mayor que fecha inicio",
                "error"
            );
        }
        if (title.trim().length < 3) {
            return Swal.fire("Error", "El titulo es demasiado corto", "error");
        }

        if (activeEvent) {
            dispatch(eventStartUpdate(formValues));
        } else {
            dispatch(eventStartAddNew(formValues));
        }
        closeModal();
    };

    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            className={"modal"}
            closeTimeoutMS={200}
            overlayClassName={"modal-fondo"}
        >
            <h1> {activeEvent ? "Editar evento" : "Nuevo evento"} </h1>
            <hr />
            <form className="container" onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        name={"startDate"}
                        value={startDate}
                        className={"form-control"}
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        name={"endDate"}
                        value={endDate}
                        minDate={startDate}
                        className={"form-control"}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${
                            title.trim().length < 3 &&
                            formSubmited &&
                            "is-invalid"
                        } ${title.trim().length >= 3 && "is-valid"}`}
                        placeholder="Título del evento"
                        name="title"
                        value={title}
                        onChange={handleOnChange}
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        Una descripción corta
                    </small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleOnChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">
                        Información adicional
                    </small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    );
};
