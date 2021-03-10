import React, {useState} from "react";
import Base from "../core/Base";
import {Redirect} from "react-router-dom";
import { signin,authenticate,isAuthenticated } from "../auth/helper";

const Signin =() =>{

    const [values,setValues]=useState({
       
        email:"",
        password:"",
        error:"",
        loading:false,
        didRedirect:false
    });

    const {email,password,error,loading,didRedirect}=values;
    //localStorage.getItem("jwt")
    const {user}=isAuthenticated();

    
    const handleChange= name=> event =>{
        setValues({...values, 
            error : false,
            [name]:event.target.value
        })
    };
    const onSubmit= event=>{
        event.preventDefault()
        setValues({...values,error :false,loading:true})
       signin({email,password})
        .then( data=>{
            if(data?.error){
                setValues({...values, error:data?.error, loading:false});

            }else{
                authenticate(data,()=>{
                    setValues({
                        ...values,didRedirect:true
                    })
                })
            }
        }).catch(console.log(" signup failed "));
    }
    
    const performRedirect=() =>{
        if(didRedirect){
            if(user && user.role === 1){
                return <Redirect to="/admin/Dashboard"/>            }
            else{
                return <p>redirect to user dashboard</p>
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />;
        }
    }

    const signinForm=()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left" >
                    <form>   
                       
                        <div className="form-group">
                            <lable className="text-light">Email</lable>
                            <input  className="form-control" onChange={handleChange("email")} value={email} type="Email" />
                        </div>
                        <div className="form-group">
                            <lable className="text-light">Password</lable>
                            <input className="form-control"  onChange={handleChange("password")}  value={password} type="Password" />
                        </div>
                            <button onClick={onSubmit}  className="btn btn-success btn-block">submit</button>
                    </form>
                </div>
            </div>
        )
    }

    const LoadingMessage=()=>{
        return(
           loading && (<div className="alert alert-info">
               <h2>Loading...</h2>
               </div>
            )
        );
    };

    const errorMessage=()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left" >
                    <div className="alert alert-danger"  style={{display: error ? "" : "none" }}>
                        {error}
                    </div>  
                </div>
            </div>
        );
    }
    
    return(
    <Base title="signin page" description="this is signin page please signup here">
        <p className="text-center">Signin form</p>
        {LoadingMessage()}
        {errorMessage()}
        {signinForm()}
        {performRedirect()}
        <p className="text-white text-center">{JSON.stringify(values)}</p>
       
    </Base>
)}
export default Signin;