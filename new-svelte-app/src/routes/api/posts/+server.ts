import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import fs from 'fs';

const postsFile = './src/posts.json';

function readPosts() {
  if (!fs.existsSync(postsFile)) {
    fs.writeFileSync(postsFile, '[]', 'utf-8');
  }
  const data = fs.readFileSync(postsFile, 'utf-8');
  return JSON.parse(data);
}

function writePosts(posts: any) {
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
}

export const GET: RequestHandler = () => {
  const posts = readPosts();
  return json(posts);
};

export const POST: RequestHandler = async ({ request }) => {
  const posts = readPosts();
  const body = await request.json();
  const newPost = { id: Date.now(), ...body };
  posts.push(newPost);
  writePosts(posts);
  return json(newPost, { status: 201 });
};

export const DELETE: RequestHandler = async ({ url }) => {
  const id = Number(url.searchParams.get('id'));
  let posts = readPosts();
  posts = posts.filter((p: any) => p.id !== id);
  writePosts(posts);
  return json({ success: true });
};
