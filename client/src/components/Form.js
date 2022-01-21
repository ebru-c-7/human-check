import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const FormComponent = (props) => {
  const [verification, setVerification] = useState({
    isVerified: false,
    shouldVerify: false,
    value: null,
  });

  const [state, setState] = useState({
    isLoading: false,
    error: null,
    message: null,
  });

  const recaptchaRef = useRef();

  const verifyCaptchaHandler = (code) => {
    setVerification({
      isVerified: !!code,
      shouldVerify: true,
      value: code,
    });
  };

  const checkUser = (e) => {
    e.preventDefault();
    const email = e.target.formEmail.value;
    const password = e.target.formPassword.value;

    sendHttpRequest({ email, password, verification });
  };

  const sendHttpRequest = async (data) => {
    if (data.verification.shouldVerify && !data.verification.isVerified) {
      return setState({
        isLoading: false,
        error: "Please verify that you are not a robot.",
        message: null,
      });
    }

    setState({ isLoading: true, error: null, message: null });

    const url = `/api/check-user`;

    try {
      const response = await axios.post(url, data);

      const { error, message } = response.data;

      setState({ isLoading: false, error, message });

      if (error) {
        if (verification.isVerified) recaptchaRef.current.reset();

        return setVerification({
          shouldVerify: true,
          isVerified: false,
          value: null,
        });
      }
    } catch (err) {
      setState({
        isLoading: false,
        error: "Something went wrong!",
        message: null,
      });
      setVerification({
        shouldVerify: true,
        isVerified: false,
        value: null,
      });

      if (verification.isVerified) recaptchaRef.current.reset();
    }
  };

  const captchaItem =
    verification.shouldVerify || verification.isVerified ? (
      <div className="recaptcha mb-3">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LfpFiEeAAAAAIEPi3w3cUWHtjJAC4ACGElpryzh"
          onChange={verifyCaptchaHandler}
          hl="en"
        />
      </div>
    ) : null;

  return (
    <Form onSubmit={checkUser}>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      {captchaItem}

      <Button
        variant="outline-secondary"
        type="submit"
        style={{ width: "100%" }}
        className="mb-3"
        disabled={state.isLoading}
      >
        Submit
      </Button>
      <Form.Text style={{ color: "green" }}>{state.message}</Form.Text>
      <Form.Text style={{ color: "red" }}>{state.error}</Form.Text>
    </Form>
  );
};

export default FormComponent;
