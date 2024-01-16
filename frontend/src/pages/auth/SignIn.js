import { useState } from "react";

export function SignIn() {
  const [inputs, setInputs] = useState([]);

  function submitSignIn(event) {
    event.preventDefault();

    const user = {
      name: 'ahmed',
      email: inputs['email'],
      password: inputs['password'],
      token: '123',
    };

    localStorage.setItem('user', JSON.stringify(user));

    window.location.href = "/";
  }

  function handleInput(event) {
    inputs[event.target.name] = event.target.value;
  }

  return (
    <div>
      <form>
        <input type="email" name="email" placeholder="Enter your email" onChange={handleInput}/>
        <input type="password" name="password" placeholder="Enter your password" onChange={handleInput}/>
        <button type="submit" onClick={submitSignIn}>Sign In</button>
      </form>
    </div>
  );
}