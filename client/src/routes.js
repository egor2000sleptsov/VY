import React from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import Application from "./pages/Application";
import EditorContainer from "./pages/editor/EditorContainer";
import Admin from "./pages/admin/Admin";

export const useRoutes = isAuth => {
    if (isAuth)
        return (
            <Switch>
                <Route exact path='/' render={() => <Application/>}/>
                <Route path='/editor' render={() => <EditorContainer/>}/>
                <Route path='/admin' render={() => <Admin/>}/>
            </Switch>
        )

    return (
        <Switch>
            <Route>
                <Route exact path='/' render={() => <Application/>}/>
                <Redirect to='/'/>
            </Route>
        </Switch>
    )
}
