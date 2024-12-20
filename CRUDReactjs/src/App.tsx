import { useEffect, useState, useRef, FormEvent } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { api } from "./service/api";

interface UsersProps {
  name: string;
  email: string;
  password: string;
}

export default function App() {

  const [users, setUsers] = useState<UsersProps[]>([]);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!nameRef.current?.value || !emailRef.current?.value || !passwordRef.current?.value) {
      toast.error("Fill in all the fields!");
      return;
    };

    const newUser: UsersProps = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value
    }

    try {
      const response = await api.post("/addUser", newUser);
      console.log("Backend response:", response.data);

      toast.success("Successfully registered!");

      setUsers([...users, response.data]);
    } catch (error) {
      console.error("Error sending data:", error);
    }

    nameRef.current.value = ""
    emailRef.current.value = ""
    passwordRef.current.value = ""
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl tracking-tight text-slate-900">Get started today!</h1>

        <p className="mt-4 text-gray-500 tracking-tight">
          This is a descriptive text indicating that this is a registration screen based on the
          entity created in the backend. Here, you need to provide the name, email, and password.
          The ID is not required as it is automatically generated by the database.
        </p>
      </div>

      <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="sr-only">Name</label>

          <div className="relative">
            <input
              type="name"
              className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter name"
              ref={nameRef}
            />

          </div>
        </div>

        <div>
          <label htmlFor="email" className="sr-only">Email</label>

          <div className="relative">
            <input
              type="email"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter email"
              ref={emailRef}
            />

          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">Password</label>

          <div className="relative">
            <input
              type="password"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter password"
              ref={passwordRef}
            />

          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            No account ?
            <a className="underline" href="#"> Sign up</a>
          </p>

          <button
            type="submit"
            value="Register"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  )
}