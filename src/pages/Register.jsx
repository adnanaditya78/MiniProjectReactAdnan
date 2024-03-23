// import { useEffect, useState } from "react";
// import { redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import AlertBar from "../components/AlertBar";

function RegisterPage() {
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
      setFail(false);

      const result = await axios
        .post("https://reqres.in/api/register", {
          ...form,
        })
        .then((res) => {
          localStorage.setItem("token", res.data?.token || "");
          window.location.href = "/";
        })
        .catch((err) => {
          setSubmit(false);
          setFail(err?.response?.data?.error || "please call Admin");
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
                <h1 className="text-3xl font-semibold">Register</h1>
                <h2 className="text-lg text-gray-500">
                  Join us now, enjoy forever!
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
                    placeholder="Ex: john@example.com"
                    value={form.email}
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
                    Register failed. {fail}
                  </AlertBar>
                )}
                <Button className="w-full" type="submit" loading={submit}>
                  Sign Up
                </Button>
                <p className="text-center text-sm mt-3">
                  have account?{" "}
                  <Link className="text-blue-500" to="/login">
                    Login
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

export default RegisterPage;
