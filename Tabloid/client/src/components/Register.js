import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Register() {
  const history = useHistory();
  const { register } = useContext(UserProfileContext);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [imageLocation, setImageLocation] = useState(" ");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [imageName, setImageName] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { firstName, lastName, displayName, imageLocation, email };
      register(userProfile, password)
        .then(() => history.push("/"));
    }
  };
  const checkUploadResult = (resultEvent) => {
    if (resultEvent.event === 'success') {

      setImageLocation(resultEvent.info.secure_url)
      setImageName(resultEvent.info.original_filename + `.${resultEvent.info.original_extension}`)

    }
  }



  const showWidget = (event) => {
    let widget = window.cloudinary.createUploadWidget({
      cloudName: "dgllrw1m3",
      uploadPreset: "kxr8ogeo"
    },
      (error, result) => { checkUploadResult(result) })

    widget.open()
  }

  return (
    <Col sm="12" md={{ size: 6, offset: 3 }}>

      <Form onSubmit={registerClick}>
        <fieldset>
          <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="displayName">Display Name</Label>
            <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <div>
              <Button onClick={showWidget}>Upload Photo</Button> <p>{imageName}</p>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Button>Register</Button>
          </FormGroup>
        </fieldset>
      </Form>
    </Col>
  );
}
