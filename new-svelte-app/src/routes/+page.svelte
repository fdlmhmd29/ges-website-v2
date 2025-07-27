<script>
  import { onMount } from 'svelte';
  let clients = ['Client A', 'Client B', 'Client C'];
  let current = 0;
  let display = clients[0];
  onMount(() => {
    const interval = setInterval(() => {
      current = (current + 1) % clients.length;
      display = clients[current];
    }, 2000);
    return () => clearInterval(interval);
  });
</script>

<h1>Green Environment Services</h1>
<p>Konsultan lingkungan profesional.</p>
<div class="carousel">{display}</div>
<p><a href="/blog">Read our blog</a> | <a href="/admin">Admin</a></p>
<style>
.carousel { font-weight: bold; margin: 20px 0; }
</style>
