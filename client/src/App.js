import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./view/Home";
import AuthContextProvider from "./Context/AuthContext";
import Auth from "./view/Auth";
import ProtectedRoute from "./Routing/ProtectedRoute";
import PostContextProvider from "./Context/PostContext";

function App() {
    return (
        <AuthContextProvider>
            <PostContextProvider>
                <Router>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={(props) => (
                                <Auth {...props} authRoute="login" />
                            )}
                        />
                        <Route
                            exact
                            path="/login"
                            render={(props) => (
                                <Auth {...props} authRoute="login" />
                            )}
                        />
                        <Route
                            exact
                            path="/register"
                            render={(props) => (
                                <Auth {...props} authRoute="register" />
                            )}
                        />
                        <ProtectedRoute
                            exact
                            path="/home"
                            component={Home}
                        ></ProtectedRoute>
                    </Switch>
                </Router>
            </PostContextProvider>
        </AuthContextProvider>
    );
}

export default App;
