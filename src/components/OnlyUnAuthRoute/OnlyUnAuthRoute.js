import {useSelector} from "react-redux";
import {Route, Redirect, useHistory} from "react-router-dom";
import {getUserInfo} from "../../services/selectors/userSelector";
import {getUserLoadSelector} from "../../services/selectors/getUserSelector";
import PropTypes from "prop-types";

const OnlyUnAuthRoute = ({children, ...rest}) => {
    const user = useSelector(getUserInfo)
    const userLoad = useSelector(getUserLoadSelector)
    const history = useHistory()
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

OnlyUnAuthRoute.propTypes = {
    children: PropTypes.element,
};

export default OnlyUnAuthRoute