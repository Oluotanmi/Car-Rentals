// import React from "react";
// import styles from "../..";
// import { useState } from "react";
// import { Link } from "react-router";
// import { useNavigate } from "react-router";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";


// //zod validation schema
// const schema = z.object({
//     username: z.string().min(3, { message: "minimum 3 characters required" }),
//     email: z
//       .string()
//       .min(1, { message: "email required" })
//       .refine((value) => /\S+@\S+\.\S+/.test(value), {
//         message: "Invalid email address",
//       }),
//     password: z.string().min(4, { message: "minimum 4 characters required" }),
//   });

// function SignUp(){
//     const {
//         register,
//         handleSubmit,
//         formState: {errors},
//     } = useForm({ resolver: zodResolver(schema) });

//   const onSubmit = async (formData, e) => {
//     e.preventDefault();
//     setLoading(true);
//     console.log(formData)
//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       setLoading(false);
//       if(data.succes === false ){
//         setError(true);
//         return;
//       }
//       setError(false);
//     //   navigate("/signin")
//   } catch(error) {
//     setLoading(false);
//     setError(true);
//   }
// }

//   const [isError, setError] = useState(false);
//   const [isLoading, setLoading] = useState(false);
//   const navigate = useNavigate();

//     return(
//         <>
//             <div
//                 className={` w-full mx-auto mt-16  rounded-lg overflow-hidden  shadow-2xl`}
//             >
//                 <div
//                     className={` green px-6 py-2 rounded-t-lg flex justify-between items-center`}
//                 >
//                     <h1 className={`${styles.heading2} text-[28px]`}>Sign Up</h1>
//                     <Link to={"/"}>
//                         <div className=" px-3  font-bold  hover:bg-green-300 rounded-md  shadow-inner">
//                         x
//                         </div>
//                     </Link>

//                     <form
//                       onSubmit={handleSubmit(onSubmit)}
//                       className="flex flex-col gap-5 pt-10 px-5"
//                     >
//                         <div>
//                             <input
//                                 type="text"
//                                 id="username"
//                                 className="text-black bg-slate-100 p-3 rounded-md w-full"
//                                 placeholder="Username"
//                                 {...register("username")}
//                                 />
//                                 {errors.username && (
//                                 <p className="text-red-500 text-[8px] pt-1">
//                                     {" "}
//                                     {errors.username.message}
//                                 </p>
//                             )}
//                         </div>

//                         <div>
//                             <input
//                                 type="text"
//                                 id="email"
//                                 className="text-black bg-slate-100 p-3 rounded-md w-full"
//                                 placeholder="Email"
//                                 {...register("email")}
//                                 />

//                                 {errors.email && (
//                                 <p className="text-red-500 text-[8px] pt-1">
//                                     {errors.email.message}
//                                 </p>
//                               )}
//                         </div>

//                         <div>
//                             <input
//                                 type="text"
//                                 id="password"
//                                 className="text-black bg-slate-100 p-3 rounded-md w-full"
//                                 placeholder="Password"
//                                 {...register("password", { required: true, minLength: 6 })}
//                                 />
//                                 {errors.password && (
//                                 <p className="text-red-500 text-[8px] pt-1">
//                                     {errors.password.message}
//                                 </p>
//                                 )}
//                         </div>

//                         <button
//                             className={`${styles.button}  disabled:bg-slate-500 text-black disabled:text-white`}
//                             disabled={isLoading}
//                         >
//                             {isLoading ? "Loading ..." : "Register"}
//                         </button>

//                         <div className="flex justify-between">
//                            <p className="text-[10px]">
//                                 Have a account?{" "}
//                                 <span className="text-blue-600">
//                                     {" "}
//                                     <Link to={`/signin`}>Sign in</Link>
//                                 </span>
//                             </p>
//                             <p className="text-[10px] text-red-600">
//                                  {isError && "something went wrong"}
//                             </p>
//                         </div>

//                         </form>
//                         <div>
//                         <h3 className="text-center text-slate-700 pt-3 pb-3 text-[10px]">
//                                 OR
//                         </h3>
//                         <div className="flex justify-center items-center gap-3 pb-6">
//                             <span className="bg-green-300 w-20 h-[.1px]"></span>
//                                 <span className="text-[10px] sm:text-[12px] text-slate-500">
//                                    Continue with social login
//                                 </span>
//                             <span className="bg-green-300 w-20 h-[.1px]"> </span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// };

// export default SignUp;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z.string().min(3, { message: "Minimum 3 characters required" }),
  email: z.string().min(1, { message: "Email required" }).refine(
    (value) => /\S+@\S+\.\S+/.test(value),
    { message: "Invalid email address" }
  ),
  password: z.string().min(4, { message: "Minimum 4 characters required" }),
});

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [isError, setError] = useState(false);
  const [Error, setAxiosError] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (formData, e) => {
    // e.preventDefault();
    setLoading(true);
    // const { password, ...submitData } = formData;
    console.log()
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data)
      setAxiosError(data.message)
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
    { id: "username", label: "Full Name", type: "text", placeholder: "John Doe" },
    { id: "email", label: "Email Address", type: "text", placeholder: "you@example.com" },
    { id: "password", label: "Password", type: "password", placeholder: "••••••••" },
  ];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@200;300;400;500;600;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    .bg-root{font-family:'Outfit',sans-serif;min-height:100vh;background:#080b0e;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;padding:20px;}
    .bg-root::before{content:'';position:fixed;top:-20%;left:-10%;width:600px;height:600px;background:radial-gradient(circle,rgba(16,185,129,0.13) 0%,transparent 70%);pointer-events:none;z-index:0;}
    .bg-root::after{content:'';position:fixed;bottom:-20%;right:-10%;width:700px;height:700px;background:radial-gradient(circle,rgba(6,182,212,0.09) 0%,transparent 70%);pointer-events:none;z-index:0;}
    .noise{position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");pointer-events:none;z-index:1;}
    .card-wrap{position:relative;z-index:2;width:100%;max-width:960px;min-height:580px;display:flex;border-radius:20px;overflow:hidden;box-shadow:0 0 0 1px rgba(255,255,255,0.07),0 40px 80px rgba(0,0,0,0.65),0 0 100px rgba(16,185,129,0.07);animation:cardIn 0.65s cubic-bezier(0.22,1,0.36,1) both;}
    @keyframes cardIn{from{opacity:0;transform:translateY(28px) scale(0.97);}to{opacity:1;transform:translateY(0) scale(1);}}
    .left-panel{flex:1.05;position:relative;overflow:hidden;}
    .left-bg{position:absolute;inset:0;background:linear-gradient(165deg,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.72) 100%),url('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=85') center/cover no-repeat;transform:scale(1.04);transition:transform 8s ease;}
    .card-wrap:hover .left-bg{transform:scale(1.0);}
    .left-panel::after{content:'';position:absolute;top:-10%;right:0;width:1px;height:130%;background:linear-gradient(to bottom,transparent,rgba(16,185,129,0.45),transparent);}
    .left-content{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:flex-end;padding:40px 36px;}
    .brand-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.07);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.1);border-radius:100px;padding:6px 14px 6px 8px;margin-bottom:22px;width:fit-content;}
    .brand-dot{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#10b981,#06b6d4);display:flex;align-items:center;justify-content:center;}
    .brand-name{font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.85);}
    .left-tagline{font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,4.5vw,56px);line-height:0.95;color:#fff;letter-spacing:1px;margin-bottom:14px;}
    .accent-text{background:linear-gradient(90deg,#10b981,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
    .left-desc{font-size:12px;font-weight:300;color:rgba(255,255,255,0.45);line-height:1.7;max-width:270px;}
    .stat-row{display:flex;gap:28px;margin-top:28px;}
    .stat-num{font-family:'Bebas Neue',sans-serif;font-size:28px;line-height:1;}
    .stat-label{font-size:9px;font-weight:400;color:rgba(255,255,255,0.3);letter-spacing:1.5px;text-transform:uppercase;margin-top:2px;}
    .right-panel{flex:0.88;background:rgba(8,11,14,0.95);backdrop-filter:blur(24px);border-left:1px solid rgba(255,255,255,0.05);padding:44px 42px 36px;display:flex;flex-direction:column;position:relative;overflow:hidden;}
    .right-panel::before{content:'';position:absolute;top:0;left:42px;right:42px;height:2px;background:linear-gradient(90deg,transparent,#10b981,#06b6d4,transparent);border-radius:0 0 2px 2px;}
    .form-eyebrow{font-size:10px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#10b981;margin-bottom:10px;}
    .form-title{font-family:'Bebas Neue',sans-serif;font-size:42px;letter-spacing:1px;color:#f0f4f3;line-height:1;margin-bottom:6px;}
    .form-subtitle{font-size:12px;font-weight:300;color:rgba(255,255,255,0.32);margin-bottom:26px;line-height:1.6;}
    .field-group{position:relative;margin-bottom:18px;}
    .field-label{display:block;font-size:9px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:7px;transition:color 0.2s;}
    .focused .field-label{color:#10b981;}
    .has-error .field-label{color:#f87171;}
    .field-input{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px 16px;font-family:'Outfit',sans-serif;font-size:14px;font-weight:400;color:#e8f0ef;outline:none;transition:border-color 0.25s,background 0.25s,box-shadow 0.25s;}
    .field-input::placeholder{color:rgba(255,255,255,0.17);}
    .field-input:focus{border-color:rgba(16,185,129,0.5);background:rgba(16,185,129,0.04);box-shadow:0 0 0 3px rgba(16,185,129,0.08);}
    .has-error .field-input{border-color:rgba(248,113,113,0.4);background:rgba(248,113,113,0.03);}
    .field-error{font-size:10px;color:#f87171;margin-top:5px;display:flex;align-items:center;gap:4px;}
    .field-error::before{content:'!';display:inline-flex;align-items:center;justify-content:center;width:13px;height:13px;border-radius:50%;background:#f87171;color:#0a0c0d;font-size:8px;font-weight:700;flex-shrink:0;}
    .btn-row{display:flex;gap:10px;margin-top:22px;}
    .btn-submit{flex:1;position:relative;padding:13px 20px;border:none;border-radius:10px;font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;cursor:pointer;overflow:hidden;background:linear-gradient(135deg,#10b981 0%,#06b6d4 100%);color:#032e24;transition:opacity 0.2s,transform 0.15s;box-shadow:0 4px 24px rgba(16,185,129,0.28);}
    .btn-submit:hover:not(:disabled){filter:brightness(1.08);}
    .btn-submit:active:not(:disabled){transform:scale(0.98);}
    .btn-submit:disabled{opacity:0.42;cursor:not-allowed;}
    .btn-other{padding:13px 20px;border:1px solid rgba(255,255,255,0.1);border-radius:10px;font-family:'Outfit',sans-serif;font-size:13px;font-weight:500;cursor:pointer;background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.5);transition:background 0.2s,border-color 0.2s,color 0.2s;white-space:nowrap;letter-spacing:0.5px;}
    .btn-other:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.18);color:rgba(255,255,255,0.8);}
    .divider{display:flex;align-items:center;gap:12px;margin:20px 0 0;}
    .divider-line{flex:1;height:1px;background:rgba(255,255,255,0.06);}
    .divider-text{font-size:10px;color:rgba(255,255,255,0.22);letter-spacing:1.5px;text-transform:uppercase;white-space:nowrap;}
    .tab-row{display:flex;align-items:center;gap:6px;margin-top:16px;}
    .tab-active{font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#10b981;text-decoration:none;padding:7px 16px;border-radius:8px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.22);transition:background 0.2s;}
    .tab-active:hover{background:rgba(16,185,129,0.16);}
    .tab-sep{width:1px;height:16px;background:rgba(255,255,255,0.09);margin:0 4px;}
    .tab-inactive{font-size:13px;font-weight:400;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.28);text-decoration:none;padding:7px 16px;border-radius:8px;transition:color 0.2s,background 0.2s;}
    .tab-inactive:hover{color:rgba(255,255,255,0.7);background:rgba(255,255,255,0.05);}
    .server-error{margin-top:10px;font-size:11px;color:#f87171;text-align:center;padding:8px 12px;background:rgba(248,113,113,0.08);border:1px solid rgba(248,113,113,0.2);border-radius:8px;}
    @keyframes spin{to{transform:rotate(360deg);}}
    .spinner{display:inline-block;width:13px;height:13px;border:2px solid rgba(3,46,36,0.3);border-top-color:#032e24;border-radius:50%;animation:spin 0.7s linear infinite;vertical-align:middle;margin-right:6px;}
    @media(max-width:640px){.left-panel{display:none;}.right-panel{padding:36px 26px 28px;}.form-title{font-size:34px;}}
  `;

  return (
    <>
      <style>{css}</style>
      <div className="bg-root">
        <div className="noise" />
        <div className="card-wrap">

          {/* ─── LEFT PANEL ─── */}
          <div className="left-panel">
            <div className="left-bg" />
            <div className="left-content">
              <div className="brand-badge">
                <div className="brand-dot">
                  <svg width="14" height="10" viewBox="0 0 24 16" fill="none">
                    <path d="M4 10l4-7h8l4 7" stroke="#032e24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="2" y="10" width="20" height="5" rx="2" fill="#032e24"/>
                    <circle cx="7" cy="15" r="2" fill="#032e24"/>
                    <circle cx="17" cy="15" r="2" fill="#032e24"/>
                  </svg>
                </div>
                <span className="brand-name"> Garage</span>
              </div>

              <div className="left-tagline">
                Your Next<br/>
                <span className=" text-green-600">Dream Car</span><br/>
                Starts Here
              </div>
              <p className="left-desc">
                Buy, sell, and explore thousands of verified vehicles with complete confidence. Built for enthusiasts.
              </p>

              <div className="stat-row">
                <div>
                  <div className="stat-num accent-text">12K+</div>
                  <div className="stat-label">Cars Listed</div>
                </div>
                <div>
                  <div className="stat-num accent-text">98%</div>
                  <div className="stat-label">Satisfaction</div>
                </div>
                <div>
                  <div className="stat-num accent-text">4.9★</div>
                  <div className="stat-label">Rated App</div>
                </div>
              </div>
            </div>
          </div>

      
          <div className="right-panel">
            <p className="form-eyebrow">Welcome aboard</p>
            <h1 className="form-title">Create Account</h1>
            <p className="form-subtitle">Join thousands of car lovers. It only takes 30 seconds.</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {fields.map(({ id, label, type, placeholder }) => (
                <div
                  key={id}
                  className={`field-group${focusedField === id ? " focused" : ""}${errors[id] ? " has-error" : ""}`}
                >
                  <label htmlFor={id} className="field-label">{label}</label>
                  <input
                    id={id}
                    type={type}
                    className="field-input"
                    placeholder={placeholder}
                    onFocus={() => setFocusedField(id)}
                    onBlur={() => setFocusedField(null)}
                    {...register(id)}
                  />
                  {errors[id] && <p className="field-error">{errors[id].message}</p>}
                </div>
              ))}

              {isError && <p className="server-error">{Error}</p>}

              <div className="btn-row">
                <button type="submit" className="btn-submit" disabled={isLoading}>
                  {isLoading ? <><span className="spinner" />Processing...</> : "Create Account"}
                </button>

              </div>
            </form>

            <div className="divider">
              <span className="divider-line" />
              <span className="divider-text">already a member?</span>
              <span className="divider-line" />
            </div>

            <div className="tab-row">
              <Link to="/signup" className="tab-active">Sign Up</Link>
              <span className="tab-sep" />
              <Link to="/signin" className="tab-inactive">Log In</Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default SignUp;