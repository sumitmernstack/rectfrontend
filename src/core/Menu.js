import React, {Fragment} from 'react'
import {Link,withRouter} from "react-router-dom";
import { signout ,isAuthenticated} from '../auth/helper';

const currentTab=(history, path)=>{
    if(history.location.pathname === path){
        return {color:"#f6e58d"}
    }
    else{
        return {color: "#FFFFFF"}        
    }
}

const Menu=({history})=> {
    return (
        <div>
           <ul className="nav nav-tabs bg-dark">
               <li className="nav-item">
                   <Link style={currentTab(history, "/")} className="nav-link" to="/">
                       Home
                   </Link>
               </li>
               <li className="nav-item">
                   <Link style={currentTab(history, "/cart")} className="nav-link" to="/">
                       Cart
                   </Link>
               </li>
               {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                    <Link style={currentTab(history, "/user/Dashboard")} className="nav-link" to="/user/Dashboard">
                       User Dashboard
                    </Link>
                </li>
               )}

              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                  <li className="nav-item">
                  <Link style={currentTab(history, "/admin/Dashboard")} className="nav-link" to="/admin/Dashboard">
                       Admin Dashboard
                  </Link>
              </li>
              )}
               
               {!isAuthenticated() && (
                    <Fragment>
                    <li className="nav-item">
                        <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup">
                            SignUp
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link style={currentTab(history, "/signin")}  className="nav-link" to="/signin">
                            SignIn
                        </Link>
                    </li>
                    </Fragment>
               )}


                {isAuthenticated() && (
                     <li className="nav-item">
                    <span
                     className="nav-link text-warning"
                    onClick={()=>{
                        signout(()=>{
                            history.push("/");
                        })
                    }}
                    >signOut
                    </span>
                 </li>
                )}
            </ul> 
        </div>
    )
}

export default withRouter(Menu);