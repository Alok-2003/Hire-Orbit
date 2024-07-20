import { fetchProfileAction } from '@/actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Home() {

  const user = await currentUser()
  // if (!user) return <div>Not signed in</div>;
  const profileInfo= await fetchProfileAction(user?.id );
  if(user && !profileInfo?._id) redirect('/onboard')


  return (
    <section>
      Main Content,Hello {user?.firstName}
    </section>
  );
}