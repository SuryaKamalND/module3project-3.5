function Register() {
  return (
    <div>
      <h2>Create Your Blogify Account</h2>
      <form>
        <label>Name:</label>
        <input type="text" placeholder="Enter your name" />
        <br />
        <label>Email:</label>
        <input type="email" placeholder="Enter your email" />
        <br />
        <label>Password:</label>
        <input type="password" placeholder="Enter your password" />
        <br />
        <button type="submit">Register</button>
      </form>
      <p>Join our community of creators today.</p>
    </div>
  );
}

export default Register;