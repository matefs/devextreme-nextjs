import { getServerSession } from "next-auth";
import prismaClient from "@/lib/prisma";

const ProfilePage = async () => {
  const session = await getServerSession();

  if (session) {
    const user = await prismaClient.user.findUnique({
      where: { email: session.user.email },
    });

    if (user) {
      return (
        <div>
          <h1>Profile Page</h1>
          <p>Hello {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Account created at: {user.createdAt.toString()}</p>
        </div>
      );
    }
  }
};

export default ProfilePage;
