import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Home() {

  const user = await currentUser()
  console.log(user,'currentuser')
    
  if (!user) return <div>Not signed in</div>;

  const profileInfo= null;
  if(user && !profileInfo?._id) redirect('/onboard')


  return (
    <section>
      Main Content,Hello {user?.firstName}
    </section>
  );
}