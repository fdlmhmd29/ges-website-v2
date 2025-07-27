<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
import { page } from "$app/stores";
  import type { Post } from '$lib/types';

  let posts: Post[] = [];
  let title = '';
  let content = '';
  let category = '';

  async function load() {
    const res = await fetch('/api/posts');
    posts = await res.json();
  }

  onMount(load);

  async function add() {
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, category })
    });
    title = content = category = '';
    load();
  }

  async function del(id: number) {
    await fetch(`/api/posts?id=${id}`, { method: 'DELETE' });
    load();
  }
</script>

{#if $page.data.user}
<h1>Manage Posts</h1>
<div>
  <input bind:value={title} placeholder="Title" />
  <input bind:value={category} placeholder="Category" />
  <textarea bind:value={content} placeholder="Content"></textarea>
  <button on:click={add}>Add Post</button>
</div>
<ul>
  {#each posts as post}
    <li>
      <strong>{post.title}</strong> ({post.category})
      <button on:click={() => del(post.id)}>Delete</button>
    </li>
  {/each}
</ul>
{:else}
<p>You are not logged in. <a href="/admin">Login</a></p>
{/if}
