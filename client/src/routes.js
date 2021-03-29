import React from "react"
import {Switch, Route,Redirect} from "react-router-dom"
import Application from "./pages/Application";
import DetailPage from "./pages/DetailPage";

export const useRoutes = isAuth => {
    if (isAuth)
        return (
            <Switch>
                <Route exact path='/' render={ () => <Application/>}/>
                <Route path='/detail/:id' render={ () => <DetailPage/>}/>
                <Redirect to='/'/>
            </Switch>
        )

    return (
        <Switch>
            <Route>
                <Route exact path='/' render={ () => <Application/>}/>
                <Redirect to='/'/>
            </Route>
        </Switch>
    )
}