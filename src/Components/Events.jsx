import React from "react";
import { useCalculator } from "../Context/CalculatorContextApi";
import Buttons from './Buttons';

function Events() {
    const { eventsUsage, handleEventsUsageChange, emissionTotals } = useCalculator()
    return (
        <div>
            <h1 className="text-3xl my-4"> Events</h1>
            <div className="flex flex-col gap-4 text-xl">
                <p>
                    Any business event – meeting, conference, workshop, expo – produces carbon dioxide emissions associated with attendee travel, hotel stays, and venue energy usage.
                </p>

                <p>
                    Please
                    <b> Contact Us </b>
                    to learn more about our
                    <b> EcoCommitted Partner Program </b>
                    for offsetting business events.
                </p>

                <p>
                    For smaller events of 1-2 days and up to 250, or up to 500 attendees, you may also select one of our
                    <b> preset event emissions offset options </b>
                    for small events.
                </p>
            </div>

            <Buttons />

        </div>
    );
}

export default Events;
