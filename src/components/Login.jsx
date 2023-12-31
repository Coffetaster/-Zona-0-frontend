"use client"

import style from "../../public/assets/styles/Login.module.css"
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
import Link from "next/link"
import {useState, useEffect} from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'
import{ useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import BeatLoader from "react-spinners/BeatLoader"

export default function Login(){
    const router = useRouter()
    const { signIn } = useContext(AuthContext);

    const [formValue,setFormValue]=useState({
        username:'',
        password:'',
        email: ''
      });

    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")

    const handleChange= (event) => {
      setFormValue({
        ...formValue,
        [event.target.name]:event.target.value
      })
    }
    const handleSubmit = async (e) => {
      setLoading(true)
      e.preventDefault();
      try{
        const res = await signIn(formValue);
        setError('');
        console.log(res)
        setLoading(false)
      }catch(error){
        setError('Unable to log in with provided credentials.')
        console.log(error)
        setLoading(false)
      }
     }
    
    //Para poner visible/invisible la contrasena
    const [pass,setPass] = useState('password')

    const viewPass = () => {
      if (pass === 'password'){
        setPass('text')
      }
      else setPass('password')
    }
    
    return (
        <div className={style.bx}>
            <div className={style.formBx}>
                
                <form className={style.form}>
                <div className={style.logo}>
                    <img src="/assets/images/[removal.ai]_597ed435-d169-410c-962e-7dbf022aae9f-photo1702144866.png" alt="" />
                    <span>rca Store</span>
                </div>
                    {error === '' ? "" : <div className={style.error}>{error}</div>}
                    
                    <div className={style.label}>Email</div>
                    <div className={style.input}>
                        <input 
                        type="email" 
                        placeholder="Email"
                        name = "email"
                        value={formValue.email}
                        onChange={handleChange} />
                        <span><MdOutlineMail/></span>
                      </div>

                    <div className={style.label}>Contrasena</div>

                    <div className={style.input}>
                      <input
                          id="password-register"
                          type={pass}
                          name="password"
                          className="form-control"
                          required
                          placeholder="Contrasena"
                          value={formValue.password}
                          onChange={handleChange}
                        />
                          <span onClick={viewPass}>
                          {pass === 'password' ? <IoEyeOutline/>:<IoEyeOffOutline/>}
                          </span>
                    </div>
                      
                    {loading ? 
                    <div className="sweet-loading">
                      <BeatLoader
                        color="rgba(255, 68, 0,1)"
                        cssOverride={{}}
                        margin={10}
                        size={10}
                        speedMultiplier={1}
                      />
                    </div>:<input
                    type="submit" 
                    value="Autenticar" 
                    onClick={(e) => handleSubmit(e)}
                    className={style.submit} /> }
                    <div className={style.resend}>
                        <Link href="/accounts/password-reset">Has olvidado tu contrasena?</Link>
                    </div>
                    <div className={style.redirect}>
                        No tienes cuenta? 
                        <span><Link href = "/accounts/registro">Registrarse</Link></span>
                    </div>
                </form>
                 
            </div>
            
        </div>
    )
  }