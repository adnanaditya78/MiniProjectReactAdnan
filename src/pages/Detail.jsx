import { useEffect, useState } from "react";
import axios from "axios";
import Container from "../components/Container";
// import { Icon } from "@iconify/react";
import LimitedAccess from "../components/LimitedAccess";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import Button from "../components/Button";

function DetailPage() {
  const { id } = useParams();
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) setIsLogin(false);
  }, []);

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const result = await axios
        .get(`https://reqres.in/api/users/${id}`)
        .then((res) => {
          setLoading(false);
          return res;
        });

      setData(result?.data?.data || []);
    }

    getData();
  }, [id]);

  return (
    <Container>
      {!isLogin ? (
        <LimitedAccess />
      ) : loading ? (
        <Loader />
      ) : (
        <>
          <div className="rounded-md bg-white p-5">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <img
                src={data.avatar}
                alt={`avatar ${data.first_name}`}
                className="rounded-full h-[200px] aspect-square object-cover"
              />
              <div className="w-full lg:w-fit flex flex-col gap-2">
                <div className="flex flex-col lg:flex-row xl:items-center xl:gap-3">
                  <p className="lg:w-[110px] text-xl font-semibold">ID</p>
                  <p className="lg:text-xl">
                    <span className="hidden lg:inline">:&nbsp;</span>
                    {data.id}
                  </p>
                </div>
                <div className="border-b" />
                <div className="flex flex-col lg:flex-row xl:items-center xl:gap-3">
                  <p className="lg:w-[110px] text-xl font-semibold">First Name</p>
                  <p className="lg:text-xl">
                    <span className="hidden lg:inline">:&nbsp;</span>
                    {data.first_name}
                  </p>
                </div>
                <div className="border-b" />
                <div className="flex flex-col lg:flex-row xl:items-center xl:gap-3">
                  <p className="lg:w-[110px] text-xl font-semibold">Last Name</p>
                  <p className="lg:text-xl">
                    <span className="hidden lg:inline">:&nbsp;</span>
                    {data.last_name}
                  </p>
                </div>
                <div className="border-b" />
                <div className="flex flex-col lg:flex-row xl:items-center xl:gap-3">
                  <p className="lg:w-[110px] text-xl font-semibold">Email</p>
                  <p className="lg:text-xl">
                    <span className="hidden lg:inline">:&nbsp;</span>
                    {data.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <Pagination
              disabled={loading}
              page={id}
              onPrev={() =>
                (window.location.href = `/detail/${parseInt(id) - 1}`)
              }
              onNext={() =>
                (window.location.href = `/detail/${parseInt(id) + 1}`)
              }
              onSubmit={(val) => (window.location.href = `/detail/${val}`)}
            />
            <Button variant="secondary" to="/">
              Back
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default DetailPage;
