<script lang="ts">
  import { onMount } from 'svelte';
  import type { Post } from '$lib/types';
  let posts: Post[] = [];
  onMount(async () => {
    const res = await fetch('/api/posts');
    posts = await res.json();
  });
</script>

<h1>Blog</h1>
<ul>
  {#each posts as post}
    <li><a href={`/blog/${post.id}`}>{post.title}</a> ({post.category})</li>
  {/each}
</ul>
