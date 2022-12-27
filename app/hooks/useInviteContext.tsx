import { InviteCtx } from "../contexts/inviteContext";
import { useContext } from "react";

export const useInviteContext = () => {
    const context = useContext(InviteCtx)

    if (!context) {
        throw Error('useInviteContext must be used inside an InviteContextProvider')
    }

    return context
}