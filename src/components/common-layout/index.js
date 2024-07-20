import { currentUser } from "@clerk/nextjs/server";
import Header from "../header";
import { fetchProfileAction } from "@/actions";

export default async function CommonLayout({ children }) {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  // console.log(user)
  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
      {/* Header Component */}
      <Header profileInfo={profileInfo} user={JSON.parse(JSON.stringify(user))} />
      {/* Main Component */}
      <main>{children}</main>
    </div>
  );
}
