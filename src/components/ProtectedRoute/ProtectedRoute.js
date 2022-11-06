import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getUserInfo, getUserLoadSelector } from "../../services/selectors/userSelector";

const ProtetedRoute = ({children, ...rest}) => {
    const user = useSelector(getUserInfo)
    const userLoad = useSelector(getUserLoadSelector)

if(userLoad) {
    return null
}

    return (
        <Route
          {...rest}
          render={({location}) => user? (
              children
            ) :
            (<Redirect
                to={{pathname: '/login', state: {from: location}}}/>)
          }
        />
      );
    } 

    export default ProtetedRoute