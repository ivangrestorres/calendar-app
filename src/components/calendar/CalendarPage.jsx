import React, { useEffect, useState } from "react";
import moment from "moment";

import { Calendar, momentLocalizer } from "react-big-calendar";
import { Navbar } from "../ui/Navbar";
import { CalendarEvent } from "./CalendarEvent";

import { messages } from "../../helpers/calendar-messages";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import { CalendarModal } from "./CalendarModal";
import { uiOpenModal } from "../../actions/ui";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
    eventClearActive,
    eventSetActive,
    eventStartLoading,
} from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

moment.locale("es");

const localizer = momentLocalizer(moment);

export const CalendarPage = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state) => state.event);
    const { uid } = useSelector((state) => state.auth);

    const [lastView, setLastView] = useState(
        localStorage.getItem("lastView") || "month"
    );

    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch]);

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    };

    const onSelect = (e) => {
        dispatch(eventSetActive(e));
    };

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem("lastView", e);
    };

    const onSelectSlot = () => {
        dispatch(eventClearActive());
    };

    const eventStyleGetter = (event) => {
        const style = {
            backgroundColor: uid === event.user._id ? "#367CF7" : "#465660",
            borderRadius: "0",
            opacity: 0.8,
            display: "block",
            color: "white",
            cursor: uid === event.user._id ? "pointer" : "not-allowed",
        };
        return { style };
    };

    return (
        <div className="calendar-page">
            <Navbar></Navbar>
            <Calendar
                messages={messages}
                localizer={localizer}
                startAccessor={"start"}
                endAccessor={"end"}
                events={events}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onSelectSlot={onSelectSlot}
                selectable={true}
                onView={onViewChange}
                eventPropGetter={eventStyleGetter}
                components={{ event: CalendarEvent }}
                view={lastView}
            />
            <CalendarModal />
            <AddNewFab></AddNewFab>
            {!!activeEvent && <DeleteEventFab></DeleteEventFab>}
        </div>
    );
};
