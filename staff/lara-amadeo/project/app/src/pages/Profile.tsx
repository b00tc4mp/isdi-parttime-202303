import { useContext } from "react";
import Link from "../library/components/Link";
import Context from "../Context";
import logoutUser from "../logic/logoutUser";

export default function Profile(): JSX.Element {
    const { loaderOn, loaderOff, navigate } = useContext(Context)

    const inLoggoutClick = () => {
        loaderOn()
        setTimeout(() => {
            logoutUser()
            loaderOff()
            navigate('/login')
        }, 1000);
    }

    return <>
        <Link label="Log out" state="default" onClick={inLoggoutClick} />
    </>
}