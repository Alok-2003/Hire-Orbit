import { fetchProfileAction } from '@/actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Home() {

  const user = await currentUser()
  // if (!user) return <div>Not signed in</div>;
  const profileInfo= await fetchProfileAction(user?.id );
  // console.log(profileInfo)
  if(user && !profileInfo?._id) redirect('/onboard')


  return (
    <section className='text-4xl font-bold mt-16' >
      Main Content,Hellok <br/> {user?.firstName},<br/> {profileInfo?.recrutierInfo?.companyName}
    </section>
  );
}