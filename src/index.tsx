import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "./pages/_routes";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<RouterProvider router={routes} />);

// <Auth0Provider
//     domain="dev-5p-an07k.us.auth0.com"
//     clientId="fSMneHc4uoLgAmfFZA9WUyHWULdXku4O"
//     redirectUri="http://localhost:3000/dashboard"
//     audience="https://server-authorization/">
//     <AxiosTokenInitializer />

//     <BrowserRouter>
//         <Routes>
//             <Route element={<AuthPlayer />}>
//                 <Route element={<PlayerLayout />}>
//                     {/* Sidebar routes */}
//                     <Route path="/dashboard" element={<Dashboard />} />
//                     <Route path="/messages" element={<Messages />} />
//                     <Route path="teams" element={<TeamLayout />}>
//                         <Route path=":teamId" element={<OneTeam />} />
//                         {/* <Route path=":teamId" element={<TestOneTeam store={team} />} /> */}
//                         <Route path="new" element={<NewTeam />} />
//                     </Route>
//                     <Route path="/network/:compId" element={<Term />} />
//                     <Route path="/help" element={<Help />} />
//                     <Route path="/profile" element={<ProfileSettings />} />
//                     <Route path="/players/:userId" element={<OnePlayer />} />
//                 </Route>
//                 <Route path="/finish-profile" element={<FinishProfile />} />
//             </Route>
//             <Route element={<AuthAdmin />}>
//                 <Route path="/admin/portal" element={<Portal />} />
//             </Route>
//             <Route element={<LandingLayout />}>
//                 <Route path="/" element={<Home />} />
//             </Route>

//             {/* <Route path="/landing/test.html" /> */}
//             {/* <Route path="/test" element={<Navigate to={"/landing/test.html"} /> */}
//         </Routes>
//     </BrowserRouter>
// </Auth0Provider>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
