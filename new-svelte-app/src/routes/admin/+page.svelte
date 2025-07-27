<script lang="ts">
  import { goto } from '$app/navigation';
  let password = '';
  const login = async () => {
    if (password === 'admin') {
      document.cookie = 'session=admin; Path=/';
      goto('/admin/posts');
    } else {
      alert('Invalid password');
    }
  };
</script>

<h1>Admin Login</h1>
<input type="password" bind:value={password} placeholder="Password" />
<button on:click={login}>Login</button>
