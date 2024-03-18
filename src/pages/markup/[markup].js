import React from "react";
import AddMarkup from "../addmarkup";
import { useRouter } from 'next/router'

const TicketId = () => {
    const router = useRouter()
    // console.log(router.query.markup)
    return (
        <>
        <AddMarkup id={router.query.markup} />
        </>
    );
};

export default TicketId;
