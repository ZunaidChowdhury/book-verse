



import { getUserById } from "@/lib/api/user";
import UserProfileCard from "./UserProfileCard";

const UserProfilePage = async ({ params }) => {

    const { id } = await params;
    const data = await getUserById(id)

    return <UserProfileCard user={data} />;
}

export default UserProfilePage