import styles from "@/assets/styles/pages/login.module.scss";
import { _classes } from "@/utils/helpers";
import { StandardInput, SubmitInput, FormProvider } from "@/Form";
import { useRouter } from "next/router";
import { useAppState } from "@/providers";

const cl = _classes(styles);

Login.propTypes = {};

Login.defaultProps = {};

export default function Login() {
  const { setUser, setToken, api } = useAppState();
  const router = useRouter();

  function success({ user, token }) {
    setUser(user);
    setToken(token);
    api.setAuthHeader("X-Login-Token", token);
    router.push("/");
  }

  return (
    <div className={cl("_")}>
      <div className={cl(["box", "inner"])}>
        <h1 className={"title is-3"}>Login</h1>
        <FormProvider
          onSubmit={(data) =>
            api.post("/api/login", {
              email: data.email,
              password: data.password,
            })
          }
          onSuccess={success}
        >
          <StandardInput
            name="email"
            label="Email"
            defaultValue={""}
            placeholder="Email"
            rules={{ required: "Email is required" }}
          />

          <StandardInput
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            defaultValue={""}
            rules={{ required: "Password is required" }}
          />
          <SubmitInput />
        </FormProvider>
      </div>
    </div>
  );
}
