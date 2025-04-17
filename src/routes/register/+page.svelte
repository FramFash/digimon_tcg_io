<script lang="ts">
  import { goto } from '$app/navigation'
  
  let name: string = '';
  let email: string = '';
  let password: string = '';
  let phone: string = '';
  let error: string = '';

  async function registerRequest(event: Event) {
    console.log("Requesting Registration")
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
        email: email.trim(),
        password: password,
        phone: phone,
      });

      console.log("Request body", body);
      
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body,
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
        email: email,
        password: password,
        phone: phone
      });
    } 
  }

</script>

<div class="main-container">
  <h1 class="Title">Signin</h1>
  <form class="register-form" on:submit={registerRequest}>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" placeholder="Name" bind:value={name} required>
    <label for="email">Email (optional):</label>
    <input type="text" id="email" name="email" placeholder="******@***.***" bind:value={email}>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" placeholder="********" bind:value={password} required>
    <label for="phone">Phone (optional):</label>
    <input type="text" id="phone" name="phone" bind:value={phone}>
    <input type="submit" value="Submit" class="submit-button">
  </form>
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

  
  .register-form {
    display: flex;
    flex-direction: column;
  }

  .submit-button {
    margin-top: 20px;
  }
</style>
