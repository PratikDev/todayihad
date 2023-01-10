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

  // checking sigend in
  const signedIn = typeof authContext === `object`;

  // checking signed state
  const router = useRouter();
  if (authContext === false && name !== `signin`) {
    router.push(`/signin`);
    return;
  } else if (signedIn && name === `signin`) {
    router.push(`/`);
    return;
  }

  const { uid } = authContext || {};

  return (
    <>
      <Children loading={loading} autherID={uid} {...childProps} />
      {signedIn && <Routing />}
    </>
  );
}
export default AuthChecker;
