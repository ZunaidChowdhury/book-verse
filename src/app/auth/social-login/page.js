import UserRoleSelect from "@/components/sections/UserRoleSelect";
import { getUser } from "@/lib/core/session";
import { redirect } from "next/navigation";


const SocialLoginPage = async () => {
    const user = await getUser()
    // redirect user with role to dashboard after social sign in
    if(user && user.role){
        redirect(`/dashboard/${user.role}`)
        return null;
    }
    return (
        <div>
            <UserRoleSelect />
        </div>
    );
}

export default SocialLoginPage