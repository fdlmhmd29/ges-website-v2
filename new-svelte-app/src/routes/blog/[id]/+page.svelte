<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import type { Post } from '$lib/types';
  let post: Post | null = null;
  onMount(async () => {
    const id = $page.params.id;
    const res = await fetch('/api/posts');
    const posts: Post[] = await res.json();
    post = posts.find(p => p.id == Number(id)) || null;
  });
</script>

{#if post}
  <h1>{post.title}</h1>
  <em>{post.category}</em>
  <p>{post.content}</p>
{:else}
  <p>Post not found</p>
{/if}
