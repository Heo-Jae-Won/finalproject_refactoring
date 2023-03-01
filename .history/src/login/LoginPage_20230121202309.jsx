import { Route, Routes } from "react-router-dom"
import LoginFindId from "./LoginFindId"
import LoginFindPass from "./LoginFindPass"
import LoginForm from "./LoginForm"
import LoginRegister from "./LoginRegister"
import LoginRestore from "./LoginRestore"

const LoginPage = () => {


  return (
    <div>
      <Routes>
        <Route path="/form" element={<LoginForm/>} />
        <Route path="/register" element={<LoginRegister/>} />
        <Route path="/restore/:uid" element={<LoginRestore/>} />
        <Route path="/findpass" element={<LoginFindPass/>} />
        <Route path="/findid" element={<LoginFindId/>} />
      </Routes>
    </div>
  )
}

export default LoginPage