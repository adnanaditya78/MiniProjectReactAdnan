/* eslint-disable react/no-unescaped-entities */
// import { useEffect, useState } from "react";
// import { redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import axios from "axios";
import { Link } from "react-router-dom";
import AlertBar from "../components/AlertBar";
// import axios from "axios";

function LoginPage() {
  const [fail, setFail] = useState("");
  const [submit, setSubmit] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) window.location.href = "/";
  }, []);

  useEffect(() => {
    async function login() {
      setFail("");

      const result = await axios
        .post("https://reqres.in/api/login", {
          ...form,
        })
        .then((res) => {
          localStorage.setItem("token", res.data?.token || "");
          window.location.href = "/";
        })
        .catch((err) => {
          setSubmit(false);
          setFail(err?.response?.data?.error || "Please call Admin.");
        });

      return result;
    }

    if (submit) login();
  }, [form, submit]);

  return (
    <Container>
      <div className="flex items-center min-h-[600px] mx-auto">
        <div className="border rounded-md w-full flex flex-col md:flex-row min-h-[550px] bg-white overflow-hidden">
          <div className="flex-1 min-h-[100px] bg-[url('/bg-form.jpg')] bg-cover bg-no-repeat" />
          <form
            className="md:max-w-[450px] w-full px-4 py-8 flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
              if (!submit) setSubmit(true);
            }}
          >
            <div className="flex flex-col gap-8 w-full">
              <div>
                <h1 className="text-3xl font-semibold">Welcome Back</h1>
                <h2 className="text-lg text-gray-500">
                  Login first to see full content!
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="block mb-2" htmlFor="password">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    className="w-full"
                    value={form.email}
                    placeholder="Ex: john@example.com"
                    onInput={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2" htmlFor="password">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    className="w-full"
                    placeholder="Password"
                    value={form.password}
                    onInput={(e) =>
                      setForm((prev) => ({ ...prev, password: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div>
                {!!fail && (
                  <AlertBar className="mb-2" open={fail}>
                    Login failed. {fail}
                  </AlertBar>
                )}
                <Button className="w-full" type="submit" loading={submit}>
                  Login
                </Button>
                <p className="text-center text-sm mt-3">
                  don't have account?{" "}
                  <Link className="text-blue-500" to="/register">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default LoginPage;
