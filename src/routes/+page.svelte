<script lang="ts">
  import { goto } from '$app/navigation'
  
  let name: string = '';
  let password: string = '';
  let error: string = '';

  async function loginRequest(event: Event) {
    console.log("Requesting authorization")
    event.preventDefault();

    if (!name || !password) {
      error = "Please fill in all fields";
      return;
    }

    try {
      console.log("Attempting to stringify:", {
        name: name,
        password: password
      });

      const body = JSON.stringify({
        name: name.trim(),
        password: password
      });

      console.log("Request body", body);
      
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', 
        body: body,
        mode: 'cors'
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Login failed');
      }

      goto('/sets');
    } catch (err) {
      error = err instanceof Error? err.message : "Login failed";
      console.error('Login error:', {
        error: err,
        name: name,
        password: password
      });
    } 
  }

</script>

<div class="main-container">
  <h1 class="Title">Login</h1>
  <form class="login-form" on:submit={loginRequest}>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" placeholder="Name" bind:value={name} required>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" bind:value={password} required>
    <input type="submit" value="Submit" class="submit-button">
  </form>
  <a href="/register">Signin</a>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-repeat: repeat;
    background-attachment: fixed;
    background-color: #eeeeee;
    background-image: radial-gradient(#f74545 2px, #eeeeee 2px);
    background-size: 44px 44px;
  }

  .main-container {
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  
  .login-form {
    display: flex;
    flex-direction: column;
  }

  .submit-button {
    margin-top: 20px;
  }

  a {
    margin-top: 20px;
    font-size: 0.8rem;
  }
</style>
