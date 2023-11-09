import React from "react";
import DownloadTicket from "../downloadTicket";
import { useRouter } from 'next/router'

const TicketId = () => {
    const router = useRouter()
    return (
        <>
        <DownloadTicket id={router.query.id} />
        </>
    );
};

export default TicketId;
