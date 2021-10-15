import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import Home from "./view/Home";
import AuthContextProvider from "./Context/AuthContext";
import Auth from "./view/Auth";
import ProtectedRoute from "./Routing/ProtectedRoute";
import PostContextProvider from "./Context/PostContext";
import Admin from "./view/Admin";
import ApprovePost from "./view/ApprovePost";

function App() {
    return (
        <CookiesProvider>
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
                                path="/admin"
                                render={(props) => (
                                    <Admin {...props} adminRoute="admin" />
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
                                path="/admin/post"
                                component={ApprovePost}
                            ></ProtectedRoute>

                            <ProtectedRoute
                                exact
                                path="/home"
                                component={Home}
                            ></ProtectedRoute>
                        </Switch>
                    </Router>
                </PostContextProvider>
            </AuthContextProvider>
        </CookiesProvider>
    );
}

export default App;
