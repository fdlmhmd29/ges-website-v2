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

<h2>Konsultan lingkungan profesional.</h2>
<div class="carousel">{display}</div>
<style>
.carousel { font-weight: bold; margin: 20px 0; }
</style>
