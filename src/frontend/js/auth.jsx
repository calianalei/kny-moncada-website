import React, { useState } from 'react';
import "../css/auth.css";
import authPhoto from "../../media/auth-photo.png";
import * as Chakra from "@chakra-ui/react";
import user from "../../media/user.png";
import { Fieldset } from "@chakra-ui/react";
import { Field } from "@/components/ui/field"; 
import { Button, Input } from '@chakra-ui/react';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { Select } from "@chakra-ui/select"


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
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);  // Track current step
  const [isMoncadaResident, setIsMoncadaResident] = useState(''); // For Step 2: Resident Radio Group
  const [valueStep1, setValueStep1] = useState(''); // For Step 1: Radio Group
  const [selectedCommittee, setSelectedCommittee] = useState(''); // For Step 4: Committee
  const [organizationName, setOrganizationName] = useState('');
  const [partOfOtherOrg, setPartOfOtherOrg] = useState(""); // Organization membership (yes/no)
  const [isUniversityWide, setIsUniversityWide] = useState("");
  const [skMembership, setSkMembership] = useState("");



  const municipalities = [
    "Anao", "Bamban", "Camiling", "Capas", "Concepcion", "Gerona", 
    "La Paz", "Mayantoc", "Paniqui", "Pura", "Ramos", "San Clemente", 
    "San Jose", "San Manuel", "Santa Ignacia", "Victoria", "Other"
  ];

  // Handle Step 1 Radio Group (Informed Consent)
  const handleStep1RadioChange = (e) => {
    setValueStep1(e.target.value);
  };

  const handleStep2RadioChange = (e) => {
    setIsMoncadaResident(e.target.value);
  };

  // Handle Step 4 Radio Group (Committee)
  const handleCommitteeRadioChange = (e) => {
    setSelectedCommittee(e.target.value);
  };

  const handlePartOfOtherOrgChange = (value) => {
    setPartOfOtherOrg(value);
    if (value === "no") {
      setOrganizationName(""); // Clear organization name if "No" is selected
      setIsUniversityWide(""); // Clear university-wide selection if "No" is selected
    }
  };

  const handleMunicipalityChange = (e) => {
    // Handle municipality selection
    console.log("Selected Municipality: ", e.target.value);
  };

  const handleNext = (e) => {
    e.preventDefault();
    // Move to next step
    if (step === 1 && valueStep1 === "agree") {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      alert("Sign Up Completed!");
    } else {
      alert("Please agree to the consent to proceed.");
    }
  };

  return (
    <div className="signup-container">
      <div className="inside-container">
        <img src={authPhoto} alt="Authentication" />
        <div className="signup-form">
          <div className="top">
            <img src={user} alt="User" style={{ width: '15%', height: '75%' }} />
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'start' }}>
              <h2>KNY MONCADA</h2>
              <h3>Become a Member</h3>
            </div>
          </div>

          {/* Step 1: Informed Consent and Email */}
          {step === 1 && (
            <div className="bottom">
              <h1>Informed Consent</h1>
              <p>
                I hereby authorize Kaya Natin! Youth- Moncada to collect and process all the data indicated.
                I understand that all my personal information is protected by RA 10173, Data Privacy Act of 2012,
                to provide truthful information.
              </p>
              <div className="radio-group">
                <label>
                  <input 
                    type="radio" 
                    name="consent" 
                    value="agree" 
                    checked={valueStep1 === "agree"} 
                    onChange={handleStep1RadioChange} 
                  />
                  Agree
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="consent" 
                    value="disagree" 
                    checked={valueStep1 === "disagree"} 
                    onChange={handleStep1RadioChange} 
                  />
                  Disagree
                </label>
              </div>
              <Input name="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
            </div>
          )}

          {/* Step 2: Personal Details */}
          {step === 2 && (
            <div className="bottom">
              <Field label="Name">
                <Input name="first-name" className="input" placeholder="First Name" />
                <Input name="middle-name" className="input" placeholder="Middle Name" />
                <Input name="last-name" className="input" placeholder="Last Name" />
              </Field>

              <Field label="Age">
                <Input name="age" className="input" placeholder="Age" type="number" />
              </Field>

              <Field label="Birthday">
                <Input name="birthday" className="input" placeholder="DD/MM/YYYY" type="date" />
              </Field>

              <Field label="Phone Number">
                <Input name="phone-number" className="input" placeholder="Phone Number" />
              </Field>

              <Field label="School/University">
                <Input name="school" className="input" placeholder="School or University" />
              </Field>

              <Field label="Home Address">
                <Input name="address" className="input" placeholder="Home Address" />
              </Field>

              {/* Are you a resident of Moncada? Question */}
              <Field label="Are you a resident of Moncada?">
                <div className="radio-group">
                  <label>
                    <input 
                      type="radio" 
                      name="resident" 
                      value="yes" 
                      checked={isMoncadaResident === "yes"} 
                      onChange={handleStep2RadioChange} 
                    />
                    Yes
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="resident" 
                      value="no" 
                      checked={isMoncadaResident === "no"} 
                      onChange={handleStep2RadioChange} 
                    />
                    No
                  </label>
                </div>
              </Field>

              {/* Show municipality dropdown only if "No" is selected for residency */}
              {isMoncadaResident === "no" && (
                <Field label="If not, kindly indicate which municipality you are from.">
                  <select 
                    name="municipality" 
                    className="input" 
                    onChange={handleMunicipalityChange}
                  >
                    <option value="">Select a municipality</option>
                    {municipalities.map((municipality) => (
                      <option key={municipality} value={municipality}>
                        {municipality}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              <Field label="Facebook Account Link">
                <Input name="facebook" className="input" placeholder="Facebook Account Link" />
              </Field>
            </div>
          )}

          {/* Step 3: Organization Membership and SK Membership */}
          {step === 3 && (
            <div className="bottom">
              {/* Organization Membership Question */}
              <Field label="Are you currently a member of any other organizations?">
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="partOfOtherOrg"
                      value="yes"
                      checked={partOfOtherOrg === "yes"}
                      onChange={() => handlePartOfOtherOrgChange("yes")}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="partOfOtherOrg"
                      value="no"
                      checked={partOfOtherOrg === "no"}
                      onChange={() => handlePartOfOtherOrgChange("no")}
                    />
                    No
                  </label>
                </div>
              </Field>
        
              {/* Show organization name input if "Yes" is selected */}
              {partOfOtherOrg === "yes" && (
                <>
                  <Field label="If yes, kindly indicate the name of your organization">
                    <Input
                      name="organization-name"
                      className="input"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      placeholder="Organization Name"
                    />
                  </Field>
        
                  <Field label="Is it university-wide?">
                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          name="isUniversityWide"
                          value="yes"
                          checked={isUniversityWide === "yes"}
                          onChange={() => setIsUniversityWide("yes")}
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="isUniversityWide"
                          value="no"
                          checked={isUniversityWide === "no"}
                          onChange={() => setIsUniversityWide("no")}
                        />
                        No
                      </label>
                    </div>
                  </Field>
                </>
              )}
        
              {/* Sangguniang Kabataan Membership */}
              <Field label="Are you currently a Sangguniang Kabataan Member?">
                <Select value={skMembership} onChange={(e) => setSkMembership(e.target.value)} className="select">
                  <option value="no">No</option>
                  <option value="sk-chairperson">SK Chairperson</option>
                  <option value="sk-councilor">SK Councilor</option>
                </Select>
              </Field>
            </div>
          )}



          {/* Step 4: Committee Selection */}
          {step === 4 && (
            <div className="bottom">
              <label>Which committee do you think you can contribute the most?</label>
              <div className="radio-group-committee">
                <div
                  className={`radio-button ${selectedCommittee === "Campaign and Advocacy" ? "selected" : ""}`}
                  onClick={() => handleCommitteeRadioChange("Campaign and Advocacy")}
                >
                  <h4>Campaign and Advocacy</h4>
                  <p>Spearhead the development and implementation of community-based projects and socio-political campaigns.</p>
                </div>

                <div
                  className={`radio-button ${selectedCommittee === "Programs and Events" ? "selected" : ""}`}
                  onClick={() => handleCommitteeRadioChange("Programs and Events")}
                >
                  <h4>Programs and Events</h4>
                  <p>Shall propose relevant programs and events that contribute to the goals of KN Youth.</p>
                </div>

                <div
                  className={`radio-button ${selectedCommittee === "Partnerships and Network Building" ? "selected" : ""}`}
                  onClick={() => handleCommitteeRadioChange("Partnerships and Network Building")}
                >
                  <h4>Partnerships and Network Building</h4>
                  <p>Establish and maintain strategic partnerships with organizations.</p>
                </div>

                <div
                  className={`radio-button ${selectedCommittee === "Social Media and Communications" ? "selected" : ""}`}
                  onClick={() => handleCommitteeRadioChange("Social Media and Communications")}
                >
                  <h4>Social Media and Communications</h4>
                  <p>Lead creative execution of relevant information on activities.</p>
                </div>
                <div
                  className={`radio-button ${selectedCommittee === "Finance" ? "selected" : ""}`}
                  onClick={() => handleCommitteeRadioChange("Finance")}
                >
                  <h4>Finance</h4>
                  <p>Responsible for fundraising and resource oversight.</p>
                </div>
                <div
                  className={`radio-button ${selectedCommittee === "Membership" ? "selected" : ""}`}
                  onClick={() => handleCommitteeRadioChange("Membership")}
                >
                  <h4>Membership</h4>
                  <p>In charge of recruitment, onboarding, and member care.</p>
                </div>
              </div>
            </div>
          )}


          {/* Next/Submit Button */}
          <Button onClick={handleNext} style={{ margin: '10px', width: '70%' }} className="button">
            {step === 4 ? "Submit" : "Next"}
          </Button>
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
      {/* <SignUp /> */}
    </div>
  );
}

export default Auth;
