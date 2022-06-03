import { useAuth0 } from "@auth0/auth0-react";

export default function Test() {
    const { user, isAuthenticated, getIdTokenClaims } = useAuth0();

    const test = async () => {
        console.log(await getIdTokenClaims());
    };
    test();

    console.log(user);

    if (!isAuthenticated) {
        return <div>Duh you cant access it</div>;
    }
    return (
        <div>
            <p>{"Email :" + user.email}</p>
        </div>
    );
}
