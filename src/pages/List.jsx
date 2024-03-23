import { useEffect, useState } from "react";
import axios from "axios";
import Container from "../components/Container";
import { Icon } from "@iconify/react";
import LimitedAccess from "../components/LimitedAccess";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

function ListPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) setIsLogin(false);
  }, []);

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const result = await axios
        .get(`https://reqres.in/api/users?page=${page}`)
        .then((res) => {
          setLoading(false);
          return res;
        });

      setList(result?.data?.data || []);
    }

    getData();
  }, [page]);

  return (
    <Container>
      {!isLogin ? (
        <LimitedAccess />
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : list.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {list.map((item, index) => (
                <Link
                  key={`card-${index}`}
                  className="rounded-md bg-white px-4 py-8 flex flex-col items-center gap-3"
                  to={`/detail/${item.id}`}
                >
                  <img
                    src={item.avatar}
                    alt={`image ${item.first_name}`}
                    className="aspect-square w-[100px] rounded-full object-cover"
                  />
                  <div className="flex flex-col items-center">
                    <p className="text-lg">
                      <span className="font-semibold">{item.first_name}</span>{" "}
                      {item.last_name}
                    </p>
                    <div className="flex items-center gap-1">
                      <Icon icon="mi:email" height={15} />
                      <p>{item.email}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="h-[500px] flex justify-center items-center flex-col">
              <Icon
                icon="lucide:user-x"
                height={80}
                className="mb-5 text-gray-600"
              />
              <p className="text-2xl font-semibold text-gray-500 mb-2">
                Data not found
              </p>
              <p className="text-xl text-gray-400 font-light">
                Please change to another page
              </p>
            </div>
          )}
          <div className="flex justify-center mt-8">
            <Pagination
              disabled={loading}
              page={page}
              onPrev={() => setPage((count) => count - 1)}
              onNext={() => setPage((count) => count + 1)}
              onSubmit={(val) => setPage(val)}
            />
          </div>
        </>
      )}
    </Container>
  );
}

export default ListPage;
