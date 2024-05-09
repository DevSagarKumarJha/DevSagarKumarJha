import InfoCard from '@/components/dashboard-components/InfoCard';
import SkillCard from '@/components/dashboard-components/SkillCard';


const Page = () => {

  return (
    <section className='flex flex-col justify-center items-center min-h-screen md:px-12 md:py-10 px-2 space-y-3'>
      <InfoCard/>
      <SkillCard/>
    </section>
  );
}

export default Page;
