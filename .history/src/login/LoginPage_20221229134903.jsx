import { Route,Routes } from "react-router-dom"
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
      <Route path="/login/form" component={LoginForm} />
      <Route path="/login/register" component={LoginRegister} />
      <Route path="/login/restore/:uid" component={LoginRestore}/>
      <Route path="/login/findpass" component={LoginFindPass}/>
      <Route path="/login/findid" component={LoginFindId}/>
      </Routes>
    </div>
  )
}

export default LoginPage