import { getAllPosts } from "@/api";


export default function Home(posts) {
  return (
    <main>
      <h2>Inicio</h2>
    </main>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {posts},
  }
}