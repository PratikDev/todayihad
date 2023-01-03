import { useRouter } from "next/navigation";
import { isValidElement, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Routing from "./Pages_comps/Routing";

function AuthChecker({ children: Children, childProps }) {
  // checking if given children is valid react component
  if (!isValidElement(<Children />)) return;

  // using auth context
  const authContext = useContext(AuthContext);

  // getting info from authContext
  const loading = authContext === undefined;

  // getting authContext data type to validate signed-in state
  const signedInState = typeof authContext;

  // getting children's name
  const name = Children.name;

  // checking signed state
  const router = useRouter();
  if (signedInState === `boolean` && name !== `signin`) {
    router.push(`/signin`);
    return;
  } else if (signedInState === `object` && name === `signin`) {
    router.push(`/`);
    return;
  }

  return (
    <>
      <Children loading={loading} {...childProps} />
      <Routing />
    </>
  );
}
export default AuthChecker;
