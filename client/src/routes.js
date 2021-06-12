import React from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import Application from "./pages/admin/Application/Application";
import EditorContainer from "./pages/editor/EditorContainer";
import AdminContainer from "./pages/admin/AdminContainer";
import Editor from "./pages/editor/Editor";

export const useRoutes = isAuth => {
    return isAuth ? (
        <Switch>
            {/*<Route exact path='/' render={() => <Editor/>}/>*/}
            <Route path='/editor' render={() => <EditorContainer/>}/>
            <Route exact path='/admin' render={() => <AdminContainer/>}/>
            <Route path='/admin/:id' render={() => <Application/>}/>
        </Switch>
    ) : (
        <Switch>
            <Route>
                <Route exact path='/' render={() => <Application/>}/>
                <Redirect to='/'/>
            </Route>
        </Switch>
    );

}
