import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepare-events";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {
        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken("events", event, "POST");
            const { ok, evento: newEvent, msg } = await resp.json();

            if (ok) {
                event.id = newEvent.id;
                event.user = {
                    _id: uid,
                    name,
                };

                dispatch(eventAddNew(event));
            } else {
                Swal.fire("Error", msg);
            }
        } catch (error) {
            Swal.fire("Error", "Hable con el administrador");
        }
    };
};

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event,
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event,
});

export const eventClearActive = () => ({
    type: types.eventClearActive,
});

export const eventStartUpdate = (event) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(
                `events/${event.id}`,
                event,
                "PUT"
            );
            const { ok, msg } = await resp.json();

            if (ok) {
                dispatch(eventUpdated(event));
            } else {
                Swal.fire("Error", msg);
            }
        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Hable con el administrador");
        }
    };
};

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event,
});

export const eventStartDelete = (event) => {
    return async (dispatch, getState) => {
        const { activeEvent } = getState().event;

        try {
            const resp = await fetchConToken(
                `events/${activeEvent.id}`,
                {},
                "DELETE"
            );
            const { ok, msg } = await resp.json();

            if (ok) {
                dispatch(eventDeleted());
            } else {
                Swal.fire("Error", msg);
            }
        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Hable con el administrador");
        }
    };
};

const eventDeleted = () => ({
    type: types.eventDeleted,
});

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken("events");
            const { ok, events, msg } = await resp.json();

            if (ok) {
                dispatch(eventLoaded(prepareEvents(events)));
            } else {
                Swal.fire("Error", msg);
            }
        } catch (error) {
            console.log(error);
            Swal.fire("Error", "Hable con el administrador");
        }
    };
};

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events,
});

export const eventClean = () => ({
    type: types.eventClean,
});
