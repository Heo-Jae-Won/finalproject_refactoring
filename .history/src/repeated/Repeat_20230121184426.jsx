import { useState } from "react";

const [form,setForm]=useState({
    
})
const onChangeForm = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

export default onChangeForm;