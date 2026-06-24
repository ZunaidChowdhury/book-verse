import UserRoleSelect from "@/components/sections/UserRoleSelect";


const SocialLoginPage = async () => {
    const user = await getUser()
    if (user.role) redirect(`/dashboard/${user.role}`)
    return (
        <div>
            <UserRoleSelect />
        </div>
    );
}

export default SocialLoginPage