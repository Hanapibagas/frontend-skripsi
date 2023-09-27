import { useRouter } from "next/router";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

type AuthForm = {
  email: string;
  password: string;
};

const Auth = () => {
  const router = useRouter()
  const { control, handleSubmit } = useForm<AuthForm>();

  const onSubmit = handleSubmit(async (data: AuthForm) => {
    try {
      const rr = await axios.post(
        "/api/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      router.replace("/")
    } catch (error) {
      alert("Something went wrong");
    }
  });

  return (
    <div className="w-full h-screen bg-white flex justify-center items-center">
      <form className="w-2/4" onSubmit={onSubmit}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <div className="grid grid-rows-2 w-full items-center">
              <label className="text-xs font-semibold text-gray-600 p-1">
                Email
              </label>
              <input
                placeholder="useremail"
                type="username"
                className="w-full disabled:bg-gray-100 text-black duration-500 rounded-md outline-teal-500 border-gray-200 shadow-sm sm:text-sm p-2 border"
                {...field}
              />
            </div>
          )}
          defaultValue=""
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <div className="grid grid-rows-2 w-full items-center">
              <label className="text-xs font-semibold text-gray-600 p-1">
                PASSWORD
              </label>
              <input
                placeholder="password"
                type="password"
                className="w-full disabled:bg-gray-100 text-black duration-500 rounded-md outline-teal-500 border-gray-200 shadow-sm sm:text-sm p-2 border"
                {...field}
              />
            </div>
          )}
          defaultValue=""
        />
        <button className="text-black" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Auth;
