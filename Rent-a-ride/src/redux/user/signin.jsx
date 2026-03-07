// import styles from "../../index";
// import { Link } from "react-router";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useDispatch,useSelector } from "react-redux";


// function SignIn() {

//     const {
//         register,
//         handleSubmit,
//         formData: { errors },
//     } = useForm({ resolver: zodResolver(schema) });
//     const { isLoading, isError } = useSelector((state) => state.user);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const onSubmit = async (formData, e) => {
//       const Base_url = "http://localhost:3000";
//         e.preventDefault();
//         try {
//             dispatch()
//             const res = await fetch(`${Base_url}/api/auth/signin`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formData),
//               });

//               const data = await res.json()
//               console.log(data)
//         } catch(error) {

//         }
//     }

//     return(
//         <>
//           <div className={`max-w-[340px] pb-10 md:max-w-md min-h-[500px] mx-auto mt-[70px] md:mt-[80px] rounded-lg overflow-hidden  shadow-2xl`}>
//                <div
//                 className={` green px-6 py-2   rounded-t-lg flex justify-between items-center`}
//                 >
//                 <h1 className={`${styles.heading2}  text-normal `}>Sign In</h1>
//                     <Link to={"/"} >
//                         <div className=" px-3  font-bold  hover:bg-green-300 rounded-md  shadow-inner">
//                         x
//                         </div>
//                     </Link>
//                 </div>

//                 <form>
//                     <div>
//                         <input 
//                           type="text"
//                           id="email"
//                           className="text-black bg-slate-100 p-3 rounded-md w-full"
//                           placeholder="Email"
                          
//                         />

//                     </div>

//                     <div>
//                         <input
//                             type="text"
//                             id="password"
//                             className="text-black bg-slate-100 p-3 rounded-md w-full"
//                             placeholder="Password"
//                          />

//                     </div>

//                     <button
//                         className={`${styles.button}  disabled:bg-slate-500 text-black disabled:text-white`}
//                         disabled={isLoading}
//                     >
//                     </button>
//                 </form>
//           </div>
//         </>
//     )
// }

// export default SignIn;

import React, { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email required" })
    .refine((value) => /\S+@\S+\.\S+/.test(value), {
      message: "Invalid email address",
    }),
  password: z.string().min(4, { message: "Minimum 4 characters required" }),
});

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const { isLoading, isError } = useSelector((state) => state.user);

  const [Error, setError] = useState(isError);
  const [Loading, setLoading] = useState(isLoading);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (formData, e) => {
    const BASE_URL = "http://localhost:4000"
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      setError(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const fields = [
    { id: "email", label: "Email Address", type: "text", placeholder: "you@example.com" },
    { id: "password", label: "Password", type: "password", placeholder: "••••••••" },
  ];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@200;300;400;500;600;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

    .si-root{font-family:'Outfit',sans-serif;min-height:100vh;background:#080b0e;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;padding:20px;}
    .si-root::before{content:'';position:fixed;top:-20%;right:-10%;width:650px;height:650px;background:radial-gradient(circle,rgba(16,185,129,0.12) 0%,transparent 70%);pointer-events:none;z-index:0;}
    .si-root::after{content:'';position:fixed;bottom:-20%;left:-10%;width:700px;height:700px;background:radial-gradient(circle,rgba(6,182,212,0.08) 0%,transparent 70%);pointer-events:none;z-index:0;}

    .si-noise{position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");pointer-events:none;z-index:1;}

    .si-card{position:relative;z-index:2;width:100%;max-width:960px;min-height:560px;display:flex;border-radius:20px;overflow:hidden;box-shadow:0 0 0 1px rgba(255,255,255,0.07),0 40px 80px rgba(0,0,0,0.65),0 0 100px rgba(16,185,129,0.07);animation:siCardIn 0.65s cubic-bezier(0.22,1,0.36,1) both;}
    @keyframes siCardIn{from{opacity:0;transform:translateY(28px) scale(0.97);}to{opacity:1;transform:translateY(0) scale(1);}}

    /* ── RIGHT image panel (flipped vs signup) ── */
    .si-img-panel{flex:1.05;position:relative;overflow:hidden;order:2;}
    .si-img-bg{position:absolute;inset:0;background:linear-gradient(200deg,rgba(0,0,0,0.08) 0%,rgba(0,0,0,0.75) 100%),url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=85') center/cover no-repeat;transform:scale(1.04);transition:transform 8s ease;}
    .si-card:hover .si-img-bg{transform:scale(1.0);}
    .si-img-panel::before{content:'';position:absolute;top:-10%;left:0;width:1px;height:130%;background:linear-gradient(to bottom,transparent,rgba(16,185,129,0.45),transparent);z-index:2;}

    .si-img-content{position:relative;z-index:3;height:100%;display:flex;flex-direction:column;justify-content:flex-end;padding:40px 36px;}

    .si-brand-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.07);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.1);border-radius:100px;padding:6px 14px 6px 8px;margin-bottom:22px;width:fit-content;}
    .si-brand-dot{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#10b981,#06b6d4);display:flex;align-items:center;justify-content:center;}
    .si-brand-name{font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.85);}

    .si-tagline{font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,4.5vw,56px);line-height:0.95;color:#fff;letter-spacing:1px;margin-bottom:14px;}
    .si-accent{background:linear-gradient(90deg,#10b981,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
    .si-img-desc{font-size:12px;font-weight:300;color:rgba(255,255,255,0.45);line-height:1.7;max-width:270px;}

    /* Trust pills */
    .si-trust-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px;}
    .si-trust-pill{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.07);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.1);border-radius:100px;padding:5px 12px;}
    .si-trust-dot{width:6px;height:6px;border-radius:50%;background:linear-gradient(135deg,#10b981,#06b6d4);flex-shrink:0;}
    .si-trust-text{font-size:10px;font-weight:400;color:rgba(255,255,255,0.6);white-space:nowrap;}

    /* ── LEFT form panel ── */
    .si-form-panel{flex:0.88;background:rgba(8,11,14,0.95);backdrop-filter:blur(24px);border-right:1px solid rgba(255,255,255,0.05);padding:48px 44px 40px;display:flex;flex-direction:column;position:relative;overflow:hidden;order:1;}
    .si-form-panel::before{content:'';position:absolute;top:0;left:44px;right:44px;height:2px;background:linear-gradient(90deg,transparent,#10b981,#06b6d4,transparent);border-radius:0 0 2px 2px;}

    /* Decorative corner glow */
    .si-form-panel::after{content:'';position:absolute;bottom:-60px;right:-60px;width:200px;height:200px;background:radial-gradient(circle,rgba(16,185,129,0.06) 0%,transparent 70%);pointer-events:none;}

    .si-eyebrow{font-size:10px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#10b981;margin-bottom:10px;}
    .si-title{font-family:'Bebas Neue',sans-serif;font-size:46px;letter-spacing:1px;color:#f0f4f3;line-height:1;margin-bottom:6px;}
    .si-subtitle{font-size:12px;font-weight:300;color:rgba(255,255,255,0.32);margin-bottom:32px;line-height:1.6;}

    .si-field{position:relative;margin-bottom:20px;}
    .si-label{display:block;font-size:9px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:7px;transition:color 0.2s;}
    .si-field.focused .si-label{color:#10b981;}
    .si-field.has-error .si-label{color:#f87171;}

    .si-input{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:13px 16px;font-family:'Outfit',sans-serif;font-size:14px;font-weight:400;color:#e8f0ef;outline:none;transition:border-color 0.25s,background 0.25s,box-shadow 0.25s;}
    .si-input::placeholder{color:rgba(255,255,255,0.17);}
    .si-input:focus{border-color:rgba(16,185,129,0.5);background:rgba(16,185,129,0.04);box-shadow:0 0 0 3px rgba(16,185,129,0.08);}
    .si-field.has-error .si-input{border-color:rgba(248,113,113,0.4);background:rgba(248,113,113,0.03);}

    .si-error{font-size:10px;color:#f87171;margin-top:5px;display:flex;align-items:center;gap:4px;}
    .si-error::before{content:'!';display:inline-flex;align-items:center;justify-content:center;width:13px;height:13px;border-radius:50%;background:#f87171;color:#0a0c0d;font-size:8px;font-weight:700;flex-shrink:0;}

    /* Forgot password */
    .si-forgot-row{display:flex;justify-content:flex-end;margin-top:-10px;margin-bottom:6px;}
    .si-forgot{font-size:11px;color:rgba(16,185,129,0.7);text-decoration:none;transition:color 0.2s;}
    .si-forgot:hover{color:#10b981;}

    /* Buttons */
    .si-btn-row{display:flex;gap:10px;margin-top:24px;}
    .si-btn-main{flex:1;position:relative;padding:14px 20px;border:none;border-radius:10px;font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;cursor:pointer;background:linear-gradient(135deg,#10b981 0%,#06b6d4 100%);color:#032e24;transition:filter 0.2s,transform 0.15s;box-shadow:0 4px 24px rgba(16,185,129,0.28);}
    .si-btn-main:hover:not(:disabled){filter:brightness(1.08);}
    .si-btn-main:active:not(:disabled){transform:scale(0.98);}
    .si-btn-main:disabled{opacity:0.42;cursor:not-allowed;}

    .si-btn-oauth{padding:14px 20px;border:1px solid rgba(255,255,255,0.1);border-radius:10px;font-family:'Outfit',sans-serif;font-size:13px;font-weight:500;cursor:pointer;background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.5);transition:background 0.2s,border-color 0.2s,color 0.2s;white-space:nowrap;letter-spacing:0.5px;}
    .si-btn-oauth:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.18);color:rgba(255,255,255,0.8);}

    .si-server-error{margin-top:12px;font-size:11px;color:#f87171;text-align:center;padding:8px 12px;background:rgba(248,113,113,0.08);border:1px solid rgba(248,113,113,0.2);border-radius:8px;}

    /* Divider */
    .si-divider{display:flex;align-items:center;gap:12px;margin:22px 0 0;}
    .si-div-line{flex:1;height:1px;background:rgba(255,255,255,0.06);}
    .si-div-text{font-size:10px;color:rgba(255,255,255,0.22);letter-spacing:1.5px;text-transform:uppercase;white-space:nowrap;}

    /* Tabs */
    .si-tab-row{display:flex;align-items:center;gap:6px;margin-top:16px;}
    .si-tab-inactive-link{font-size:13px;font-weight:400;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.28);text-decoration:none;padding:7px 16px;border-radius:8px;transition:color 0.2s,background 0.2s;}
    .si-tab-inactive-link:hover{color:rgba(255,255,255,0.7);background:rgba(255,255,255,0.05);}
    .si-tab-active-link{font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#10b981;text-decoration:none;padding:7px 16px;border-radius:8px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.22);transition:background 0.2s;}
    .si-tab-active-link:hover{background:rgba(16,185,129,0.16);}
    .si-tab-sep{width:1px;height:16px;background:rgba(255,255,255,0.09);margin:0 4px;}

    @keyframes spin{to{transform:rotate(360deg);}}
    .si-spinner{display:inline-block;width:13px;height:13px;border:2px solid rgba(3,46,36,0.3);border-top-color:#032e24;border-radius:50%;animation:spin 0.7s linear infinite;vertical-align:middle;margin-right:6px;}

    @media(max-width:640px){.si-img-panel{display:none;}.si-form-panel{padding:36px 26px 28px;}.si-title{font-size:36px;}}
  `;

  return (
    <>
      <style>{css}</style>
      <div className="si-root">
        <div className="si-noise" />
        <div className="si-card">

          <div className="si-form-panel">
            <p className="si-eyebrow">Welcome back</p>
            <h1 className="si-title">Sign In</h1>
            <p className="si-subtitle">
              Good to see you again. Jump back into your garage.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {fields.map(({ id, label, type, placeholder }) => (
                <div
                  key={id}
                  className={`si-field${focusedField === id ? " focused" : ""}${errors[id] ? " has-error" : ""}`}
                >
                  <label htmlFor={id} className="si-label">{label}</label>
                  <input
                    id={id}
                    type={type}
                    className="si-input"
                    placeholder={placeholder}
                    onFocus={() => setFocusedField(id)}
                    onBlur={() => setFocusedField(null)}
                    {...register(id)}
                  />
                  {errors[id] && <p className="si-error">{errors[id].message}</p>}
                </div>
              ))}

              <div className="si-forgot-row">
                <Link to="/forgot-password" className="si-forgot">Forgot password?</Link>
              </div>

              {Error && (
                <p className="si-server-error">{Error}</p>
              )}

              <div className="si-btn-row">
                <button type="submit" className="si-btn-main" disabled={Loading}>
                  {Loading ? <><span className="si-spinner" />Signing in...</> : "Sign In"}
                </button>
                <button type="button" className="si-btn-oauth">OAuth</button>
              </div>
            </form>

            <div className="si-divider">
              <span className="si-div-line" />
              <span className="si-div-text">new here?</span>
              <span className="si-div-line" />
            </div>

            <div className="si-tab-row">
              <Link to="/signin" className="si-tab-active-link">Log In</Link>
              <span className="si-tab-sep" />
              <Link to="/signup" className="si-tab-inactive-link">Sign Up</Link>
            </div>
          </div>

          <div className="si-img-panel">
            <div className="si-img-bg" />
            <div className="si-img-content">
              <div className="si-brand-badge">
                <div className="si-brand-dot">
                  <svg width="14" height="10" viewBox="0 0 24 16" fill="none">
                    <path d="M4 10l4-7h8l4 7" stroke="#032e24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="2" y="10" width="20" height="5" rx="2" fill="#032e24"/>
                    <circle cx="7" cy="15" r="2" fill="#032e24"/>
                    <circle cx="17" cy="15" r="2" fill="#032e24"/>
                  </svg>
                </div>
                <span className="si-brand-name">Bilal Garage</span>
              </div>

              <div className="si-tagline">
                Every Drive<br/>
                <span className="si-accent">Tells A</span><br/>
                Story
              </div>
              <p className="si-img-desc">
                Your vehicles, your history, your next move — all in one place.
              </p>

              <div className="si-trust-row">
                <div className="si-trust-pill">
                  <span className="si-trust-dot" />
                  <span className="si-trust-text">SSL Secured</span>
                </div>
                <div className="si-trust-pill">
                  <span className="si-trust-dot" />
                  <span className="si-trust-text">Verified Listings</span>
                </div>
                <div className="si-trust-pill">
                  <span className="si-trust-dot" />
                  <span className="si-trust-text">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default SignIn;