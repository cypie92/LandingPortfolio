import React from 'react';
import { motion } from 'framer-motion';

const Team: React.FC = () => {
  const members = [
    {
      name: "Sarah",
      role: "Head Stylist",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCt4A9P_xSmuX-Yld7jhLwv31tQzCnqf2GeJ_20eS2d23yzRxSjt6b3nEge8Jtpe_SWmXNuj4VrvxGn5YYLdOQHBFFDI9sIvk5q6Be0BhvrRC2AXRa_xMT2QN13UiZ06RTHD7Mc6QQyMaVG3n76HPhrSbY_h7ybLsxjf67KK7eiQ9GRDjB1-QmtSo3aXadEM-gIIjPLA13ZixchIX1pnk4N3AIaOg2CUouGwkBx0Lyy6E5sAUATI3tAjJudz-qg8fr55LSNIwhSHA"
    },
    {
      name: "Mike",
      role: "Dog Whisperer",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAY0RaK_kpZ9mpLXTVNFKw-dkO2j8ezldWI_HtRyDqKJUtuxnBScoxg7U1hXwNAS0hb8Gewp1rZI743cPkkTEPWjRJ3SaIeN6lJkFOwJw-YUWMYlgRd5To7gZ-PuY18mVbdkFYTPwl6Ki5g78V9t2b3tti9L_U66D3bXx-ieJlJcrVDvmBhk_M1Oa6MZwdTNyRazTkraP2NSpLVYgpCHG7tti6HLTHfC7YLxj-X8xd05WZRx-CNkiqasQpQKcTQejmWxXY8lnv0vw"
    },
    {
      name: "Jessica",
      role: "Feline Expert",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkKiUJQbe9swRhz2s9mEk6uLIrvSSyvKMqlnyi7toIbJ2ANZCnMyMCfLoNJB992N09k68vZ5ch3vSQEABEbFX-fpS3eqQmY2w_YMjpftUldNRAOYZM1auHU4TFOwgkcCCAqNkRONJtz4QvQl7llKHIndfDR_ievZjaYyu9a7NxToxBlbVWoB05LUds7lb5D_53KHL1oy6et6bw-visQ8SCIAOnZiQrUmg_GAZTCttas517eb74zxLwJmcbc2lR6kZlAKmVFA3eMg"
    }
  ];

  return (
    <section className="px-6 md:px-12">
      <div className="bg-lavender/10 rounded-3xl p-8 md:p-16 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute -top-20 -left-20 size-60 bg-lavender rounded-full mix-blend-multiply opacity-20"></div>
        <div className="absolute -bottom-20 -right-20 size-80 bg-primary rounded-full mix-blend-multiply opacity-10"></div>
        
        <div className="text-center mb-12 relative z-10">
          <h2 className="text-4xl font-black mb-4">Meet the <span className="text-primary">Groom Squad</span></h2>
          <p className="text-lg max-w-2xl mx-auto">Our certified stylists are animal lovers first, artists second.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-10 relative z-10">
          {members.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center gap-4 group cursor-pointer"
            >
              <div className="size-32 md:size-40 rounded-full border-4 border-white dark:border-paper-dark shadow-lg overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all z-10"></div>
                <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url("${member.img}")` }}></div>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-xl">{member.name}</h4>
                <p className="text-sm text-primary font-medium">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;