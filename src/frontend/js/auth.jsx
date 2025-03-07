import React, { useState } from 'react';
import "../css/auth.css";
import authPhoto from "../../media/auth-photo.png";
import user from "../../media/user.png";
import { Fieldset } from "@chakra-ui/react";
import { Field } from "@/components/ui/field"; 
import { Button, Input, RadioGroup, Radio } from '@chakra-ui/react';

function Login() {
  const [isInvalid, setIsInvalid] = useState(false); // State to track validity

  const handleLogin = () => {
    // Example login validation logic
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;  // Fixed query selector

    if (username !== "correctUsername" || password !== "correctPassword") {
      setIsInvalid(true); // Set invalid state if credentials are wrong
    } else {
      setIsInvalid(false); // Reset invalid state if credentials are correct
      // Proceed with successful login logic
    }
  };

  const handleKeyPress = (e) => {
    // If Enter key is pressed, trigger login
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="inside-container">
        <img src={authPhoto} style={{ width: '100%', height: '100%', borderRadius: '10px 0px 0px 10px' }} />
        <div className="login-form">
            <img src={user} style={{ width: '20%', height: '100%' }} />
            <h1>LOGIN</h1>
            <Fieldset.Root size="lg" invalid={isInvalid} className="input-form">
                <Fieldset.Content>
                <Field label="Username or Email">
                    <Input name="username" className="input"/>
                </Field>
                <Field label="Password">
                    <Input name="password" type="password" className="input" 
                    //   onKeyPress={handleKeyPress} // Add onKeyPress for Enter key
                    />
                </Field>
                <Button asChild className="button" onClick={handleLogin}><a href="#">Login</a></Button>
            </Fieldset.Content>
            {isInvalid && (
              <Fieldset.ErrorText>
                Some fields are invalid. Please check them.
              </Fieldset.ErrorText>
            )}
          </Fieldset.Root>
        </div>
      </div>
    </div>
  );
}

function SignUp() {
  return (
    <div className="signup-container">
      <div className="inside-container">
        <img src={authPhoto} alt="Authentication" />
        <div className="signup-form">
            <div className="top">
                <img src={user} />
                <h2>KNY MONCADA</h2>
                <h3>Become a Member</h3>
            </div>
            <div className="bottom">
                <h1>Informed Consent</h1>
                <p>I hereby authorize Kaya Natin! Youth- Moncada to collect and process all the data indicated. I understand that all my personal information is protected by RA 10173, Data Privacy Act of 2012, to provide truthful information.</p>
                <RadioGroup defaultValue="1">
                    <HStack gap="6">
                        <Radio value="Yes">Yes</Radio>
                        <Radio value="No">No</Radio>
                    </HStack>
                </RadioGroup>
                <Field label="Email">
                    <Input name="email" className="input"/>
                </Field>
            </div>
            <Button>Next</Button>
        </div>
      </div>
    </div>
  );
}

function Auth() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and SignUp

  return (
    <div>
      {isLogin ? <Login /> : <SignUp />}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Go to Sign Up' : 'Go to Login'}
      </button>
    </div>
  );
}

export default Auth;
