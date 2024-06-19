import BlogItem from "./BlogItem";

export default function BlogList({ publications }) {
  let posts = publications?.data?.user?.publication?.posts || [];

  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
      {posts.map((post, index) => {
        return (
          <div key={index} className="flex">
            <BlogItem post={post} />
          </div>
        );
      })}
    </div>
  );
}
