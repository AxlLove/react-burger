import {useSelector} from "react-redux";
import {Route, Redirect, useHistory, RouteProps} from "react-router-dom";
import {getUserInfo} from "../../services/selectors/userSelector";
import {getUserLoadSelector} from "../../services/selectors/getUserSelector";
import React, {FC} from "react";
import {Location} from "history";

interface ILocationState {
    from?: Location;
}
const OnlyUnAuthRoute: FC <React.HTMLAttributes<HTMLElement> & RouteProps> = ({children, ...rest}) => {
    const user = useSelector(getUserInfo)
    const userLoad = useSelector(getUserLoadSelector)
    const history = useHistory<ILocationState>()
    if (userLoad) {
        return null
    }

    return (
        <Route
            {...rest}
            render={() => !user ? (
                    children
                ) :
                (<Redirect
                    to={history.location.state?.from || '/'}/>)
            }
        />
    );
}


export default OnlyUnAuthRoute