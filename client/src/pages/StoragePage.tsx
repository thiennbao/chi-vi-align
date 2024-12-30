import { useCookies } from "react-cookie";
import Layout from "../layouts/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const StoragePage = () => {
  const [cookies] = useCookies(["storage"]);
  const navigate = useNavigate();

  const storage = cookies.storage || [];
  const [id, setId] = useState("");

  return (
    <Layout>
      <div className="pt-16 min-h-screen lg:h-screen flex justify-center items-center">
        <div className="w-11/12 md:w-2/3 lg:w-1/2">
          <div className="*:mb-4">
            <p className="text-center font-bold">Your history</p>
            <div className="flex gap-2 flex-wrap justify-center">
              {storage.length ? (
                <>
                  {storage.map((item: any) => (
                    <Link
                      key={item.id}
                      to={`/result/${item.id}`}
                      className="px-4 py-2 border border-primary rounded hover:bg-primary transition"
                    >
                      {item.name}
                    </Link>
                  ))}
                </>
              ) : (
                <p className="text-sm">No history found</p>
              )}
            </div>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(`/result/${id}`);
              }}
              placeholder="Or enter an existing ID to view result"
              className="w-full bg-dark-3 px-4 py-2 rounded outline-none"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StoragePage;
