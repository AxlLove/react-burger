import { useAppSelector } from "../../services/hooks/hooks";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {getUserInfo} from "../../services/selectors/userSelector";
import {getUserLoadSelector} from "../../services/selectors/getUserSelector";
import React, {FC} from "react";


const ProtectedRoute: FC<React.HTMLAttributes<HTMLElement> & RouteProps> = ({children, ...rest}) => {
    const user = useAppSelector(getUserInfo)
    const userLoad = useAppSelector(getUserLoadSelector)

    if (userLoad) {
        return null
    }

    return (
        <Route
            {...rest}
            render={({location}) => user ? (
                    children
                ) :
                (<Redirect
                    to={{pathname: '/login', state: {from: location}}}/>)
            }
        />
    );
}

export default ProtectedRoute

