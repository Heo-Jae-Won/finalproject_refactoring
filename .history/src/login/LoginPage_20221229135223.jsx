import { Route, Routes } from "react-router-dom"
import LoginFindId from "./LoginFindId"
import LoginFindPass from "./LoginFindPass"
import LoginForm from "./LoginForm"
import LoginRegister from "./LoginRegister"
import LoginRestore from "./LoginRestore"
import LoginUpdatePass from "../my/MyUpdatePass"

const LoginPage = () => {


  return (
    <div>
      <Routes>
        <Route path="/login/form" element={<LoginForm/>} />
        <Route path="/login/register" element={<LoginRegister/>} />
        <Route path="/login/restore/:uid" element={<LoginRestore/>} />
        <Route path="/login/findpass" element={<LoginFindPass/>} />
        <Route path="/login/findid" element={<LoginFindId/>} />
      </Routes>
    </div>
  )
}

export default LoginPage