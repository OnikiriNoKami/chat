import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { LOGIN_PATH } from "../../utils/consts/routerConsts";
import { nonAuthorizedRoutes } from "../../routes/nonAuhorizedRoutes";
import { authorizedRoutes } from "../../routes/authorizedRoutes";
import { getAuthorized } from "../../store/authorizationStore/authorizationSelectors";

export default function MainRouter() {
    const authorized = useSelector(getAuthorized);
    return (
        <Switch>
            {authorized &&
                authorizedRoutes.map((route) => (
                    <Route
                        exact
                        key={route.path}
                        path={route.path}
                        component={route.component}
                    />
                ))}
            {!authorized &&
                nonAuthorizedRoutes.map((route) => (
                    <Route
                        exact
                        key={route.path}
                        path={route.path}
                        component={route.component}
                    />
                ))}
            <Redirect to={LOGIN_PATH} />
        </Switch>
    );
}
