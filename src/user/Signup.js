import React, {useState} from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";
import { signup } from "../auth/helper";

const Signup =() =>{

    const [values,setValues]=useState({
        name:"",
        lastname:"",
        email:"",
        password:"",
        error:"",
        success:false
    });

    const {name,lastname,email,password,error,success}=values;

    const handleChange= name=> event =>{
        setValues({...values, 
            error : false,[name]:event.target.value})
    };
    
    const onSubmit= event=>{
        event.preventDefault()
        setValues({...values,error :false})
       signup({name,lastname,email,password})
        .then( data=>{
            if(data?.error){
                setValues({...values, error:data?.error, success:false});

            }else{
                setValues({
                    ...values,
                    name:"",
                    lastname:"",
                    email:"",
                    password:"",
                    error:"",
                    success:true
                });
            }
        }).catch(console.log("error in signup"));

    }

    const signupForm=()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left" >
                    <form>   
                        <div className="form-group">
                            <lable className="text-light">First Name</lable>
                            <input className="form-control" onChange={handleChange("name")}  value={name} type="text" />
                        </div>
                        <div className="form-group">
                            <lable className="text-light"> Last Name</lable>
                            <input className="form-control" onChange={handleChange("lastname")}  value={lastname} type="text" />
                        </div>
                        <div className="form-group">
                            <lable className="text-light">Email</lable>
                            <input  className="form-control" onChange={handleChange("email")} value={email} type="email" />
                        </div>
                        <div className="form-group">
                            <lable className="text-light">Password</lable>
                            <input className="form-control" onChange={handleChange("password")}  value={password} type="Password" />
                        </div>
                            <button  onClick={onSubmit} className="btn btn-success btn-block">submit</button>
                    
                    </form>
                </div>
            </div>
        );
    };

    const sucessMessage=()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left" >
                    <div className="alert alert-success" style={{display: success ? "" : "none" }} >new acc. was created sucessfully. pleae login
                        <Link to="/signin">login here</Link>
                    </div>
                </div>
            </div>
              
        );
    }

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
        <Base title="signup page" description="this is sign up page please signup here">
            <p className="text-center">Signup form</p>
            {sucessMessage()}
            {errorMessage()}
            {signupForm()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    );
};
export default Signup;