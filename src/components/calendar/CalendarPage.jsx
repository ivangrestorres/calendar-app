import React, { useState } from "react";
import moment from "moment";

import { Calendar, momentLocalizer } from "react-big-calendar";
import { Navbar } from "../ui/Navbar";
import { CalendarEvent } from "./CalendarEvent";

import { messages } from "../../helpers/calendar-messages";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import { CalendarModal } from "./CalendarModal";

moment.locale("es");

const localizer = momentLocalizer(moment);
const events = [
    {
        title: "Cumpleaños",
        start: moment().toDate(),
        end: moment().add(2, "hours").toDate(),
        user: { _id: "123", name: "Ivan" },
    },
];

export const CalendarPage = () => {
    const [lastView, setLastView] = useState(
        localStorage.getItem("lastView") || "month"
    );

    const onDoubleClick = (e) => {
        console.log(e);
    };

    const onSelect = (e) => {};

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem("lastView", e);
    };

    const eventStyleGetter = (event, start, end, isSelected) => {
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
        </div>
    );
};
