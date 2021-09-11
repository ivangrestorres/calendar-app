import React, { useState } from "react";
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
import { eventSetActive } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";

moment.locale("es");

const localizer = momentLocalizer(moment);

export const CalendarPage = () => {
    const dispatch = useDispatch();
    const { events } = useSelector((state) => state.event);

    const [lastView, setLastView] = useState(
        localStorage.getItem("lastView") || "month"
    );

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
        dispatch(eventSetActive(e));
    };

    const onSelect = (e) => {
        // dispatch(eventSetActive(e));
    };

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem("lastView", e);
    };

    const eventStyleGetter = () => {
        const style = {
            backgroundColor: "#367CF7",
            borderRadius: "0",
            opacity: 0.8,
            display: "block",
            color: "white",
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
                onView={onViewChange}
                eventPropGetter={eventStyleGetter}
                components={{ event: CalendarEvent }}
                view={lastView}
            />
            <CalendarModal />
            <AddNewFab></AddNewFab>
        </div>
    );
};
