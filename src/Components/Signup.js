import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/Firebase.init";

const Signup = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleGoogleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState("");
  
  console.log(email);
  console.log(password);
  
  const handelEmail = (e) => {
    const emailInput = e.target.value;
    if (/\S+@\S+\.\S+/.test(emailInput)) {
      setEmail({ value: emailInput, error: "" });
    } else {
      setEmail({ value: "", error: "Please Provide a valid Email" });
    }
  };

  const handelPassword = (e) => {
    const passwordInput = e.target.value;
    if (passwordInput.length < 7) {
      setPassword({ value: "", error: "Password too short" });
    }
  };

  // const handelConPassword = (conpasswordInput) => {
  //   if (conpasswordInput !== password.value) {
  //     setConPassword({ value: conpasswordInput, error: "" });
  //   } else {
  //     setConPassword({ value: "", error: "Password Mismatched" });
  //   }
  // };

  const handleSignupForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    if (email === "") {
      setEmail({ value: "", error: "Email is required" });
    }
    if (password === "") {
      setPassword({ value: "", error: "Password is required" });
    }
    // if (conpassword === "") {
    //   setConPassword({ value: "", error: "Confirm Password is required" });
    // }
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          if(errorMessage.includes('email-already-in-use')){
            toast.error("Email already in use", { id: "error" });
          }else{
            toast.error(errorMessage, { id: "error" });
          }
        });
    }
  };

  return (
    <div className="py-4">
      <h2 className="text-center">Sign Up Form</h2>
      <div className="w-25 mx-auto">
        <Form onSubmit={handleSignupForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onBlur={handelEmail}
            />
            <Form.Text className="text-muted">
              {email?.error && (
                <p className="text-danger py-2">{email.error}</p>
              )}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onBlur={handelPassword}
            />
          </Form.Group>
          {password?.error && (
            <p className="text-danger py-2">{password.error}</p>
          )}

          {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="conpassword"
              type="password"
              onBlur={handelConPassword}
              placeholder="Confirm Password"
            />
          </Form.Group>
          {conPassword?.error && (
            <p className="text-danger py-2">{conPassword.error}</p>
          )} */}
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Signup
          </Button>
        </Form>
        <div className="mt-3 d-flex justify-content-center">
          <Button onClick={handleGoogleAuth}> Continue with Google</Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
