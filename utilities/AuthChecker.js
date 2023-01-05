// nextjs imports
import { useRouter } from "next/navigation";

// reactjs imports
import { isValidElement, useContext } from "react";

// contexts imports
import { AuthContext } from "../contexts/AuthContext";

// comps imports
import Routing from "../comps/Pages_comps/Routing";

function AuthChecker({ children: Children, childProps }) {
  // checking if given children is valid react component
  if (!isValidElement(<Children />)) return;

  // using auth context
  const authContext = useContext(AuthContext);

  // getting info from authContext
  const loading = authContext === undefined;

  // getting children's name
  const name = Children.name;

  // checking signed state
  const router = useRouter();
  if (authContext === false && name !== `signin`) {
    router.push(`/signin`);
    return;
  } else if (typeof authContext === `object` && name === `signin`) {
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
