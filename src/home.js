import { Category } from "./categories";
import { Post } from "./post";
import { useState } from "react";
export function Home() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <img
        className="homepic"
        src="https://media.istockphoto.com/photos/neon-blog-sign-picture-id1270290167?b=1&k=20&m=1270290167&s=170667a&w=0&h=_5S-hkfJtimFnhM_9XOwu9HpVB2ya8vykNHi5e9BJeg="
        alt=""
      />
      <div className="homepage">
        <div>
          <Category setSearch={setSearch} />
        </div>
        <div>
          <Post search={search} setSearch={setSearch} />
        </div>
      </div>
    </div>
  );
}
