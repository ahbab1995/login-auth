import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/Firebase.init";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  

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

  const handleLoginForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === "") {
      setEmail({ value: "", error: "Email is required" });
    }
    if (password === "") {
      setPassword({ value: "", error: "Password is required" });
    }

    if(email && password){
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage.includes("wrong-password")) {
          toast.error("Wrong Password", { id: "error" });
        } else {
          toast.error(errorMessage, { id: "error" });
        }
      });
    }
  };

  return (
    <div className="w-25 mx-auto">
      <Form onSubmit={handleLoginForm}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" onBlur={handelEmail} placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        {email?.error && (
                <p className="text-danger py-2">{email.error}</p>
              )}

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

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <Link to="/signup">Create New Account</Link>
      <Button onClick={handleGoogleAuth} className="mt-3 d-flex ">
        {" "}
        Continue with Google
      </Button>
    </div>
  );
};

export default Login;
