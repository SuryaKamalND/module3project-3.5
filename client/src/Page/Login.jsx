function Login() {
  return (
    <div>
      <h2>Login to Blogify</h2>
      <form>
        <label>Email:</label>
        <input type="email" placeholder="Enter your email" />
        <br />
        <label>Password:</label>
        <input type="password" placeholder="Enter your password" />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>Access your dashboard and start creating.</p>
    </div>
  );
}

export default Login;