import moment from "moment";
import { types } from "../types/types";

const initalState = {
    events: [
        {
            id: new Date().getTime(),
            title: "Cumpleaños",
            start: moment().toDate(),
            end: moment().add(2, "hours").toDate(),
            notes: "",
            user: { _id: "123", name: "Ivan" },
        },
    ],
    activeEvent: null,
};

export const eventReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return { ...state, activeEvent: action.payload };
        case types.eventAddNew:
            return { ...state, events: [...state.events, action.payload] };
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map((e) =>
                    e.id === action.payload.id ? action.payload : e
                ),
            };
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    (e) => e.id !== state.activeEvent.id
                ),
                activeEvent: null,
            };
        case types.eventClearActive:
            return { ...state, activeEvent: null };
        default:
            return state;
    }
};
