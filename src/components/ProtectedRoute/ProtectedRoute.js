import {useSelector} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import {getUserInfo} from "../../services/selectors/userSelector";
import {getUserLoadSelector} from "../../services/selectors/getUserSelector";


const ProtectedRoute = ({children, ...rest}) => {
    const user = useSelector(getUserInfo)
    const userLoad = useSelector(getUserLoadSelector)

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
