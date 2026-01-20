import React from 'react';

const photos = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaFkYuqkFMiK39Pd7URmAYit1T27qNwPUrp6UdoRCXaYAfO1KbIW2OpThwFMIKgqDuH4NFQGpQV9JcNZDY8uMdC0IR01bBR6lao5nZoCa9IEFa4gV98OXqAevF_t_mVWbau07Rrs7VWZ7twiwKojt--YkoeHCoLK1lVxW19a5BxtDqvlu2aWBRx79pYZ1q131j_O90OFAGVQMbS8DLAS_a599T8-LzKPMtINXTVhcZSanvpVbuTuSwcFPrcVgFN_63yn8yOcxfLA",
    caption: "Coco's First Day",
    rotate: "rotate-2",
    filter: "sepia-[.3]"
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsOWMOtHBXqbh1NYmFbYgu2ZPWz1GLZC7ziMDZPywzEQNGWq2_PBsgSBi0Aig5wou2UnxPS5M3JU9vHtaHRqBHgNQmbvdUMq3W-3NPeA-HYkpaKxyQ17iyRlBHO2_SBHoK_8Qg6cPj7AwJSO5YFlanhTHc0GIWGxGDssdBN6Qzf_nXZ1v6LIMNUFu9z4KNqrYTri-8BWUP-sbIsmGwTQZaaBjAxBTvv1rp4y2L8gBo4RJbDC4Vmrxqr-Kzst2h5XMKo_VcuGrfnQ",
    caption: "Style Icon",
    rotate: "-rotate-1",
    filter: "contrast-125"
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4nfBzIVIEiTRyZxGqAcMYHpe-jis3KMkDGDjqSBLVKSkmSpvqIDifPpHz7FMgHuwmZ67axsj4Ly4XsOBQ20_ikV7kfw3MIHiDHo-8I0CeD2a8MSlUsLSJLcs6iylRjaOqGlIncFZC1ufOKkLdRMTzvqydyK9_JiDhmQWBvFVEFUUGnAg1bC_W-SVz3bD-YhjXVT4qd3xV95PJGv15U5IIg8h8BmgFYt1KYH-a2KirViugPYHv-LaDPc2MEsCea_Q3aZIhDlfjZA",
    caption: "Splish Splash!",
    rotate: "rotate-3",
    filter: "grayscale hover:grayscale-0"
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuArzRenvxuAymd1eVMPUCF033-6SXoaIJBXpchdTp7_u0gDtxQWdExXPUVNtyzlLn0-v93X4mDFmdLmE2GhTKMKEYOa0DctK2DXI1V8sy7KtM_eoTCkgjE7HhGhjKveMaRiJ53aSUjEx2aVPaci6gsP74B2ainee6J-sRMVDsuIQ_pi3AFLSEpg8cjG71EQexrh_AqyALsJfUxZYTlXMM2isgjqLPHBt6DOmxEb4HLMc3BV1cdi32RSGVJ9VrZ6eHirkQZRFQLYYw",
    caption: "Nap time Zzz",
    rotate: "-rotate-2",
    filter: ""
  }
];

const VisualStory: React.FC = () => {
  return (
    <section className="py-12 overflow-hidden bg-[#FBF7F4] dark:bg-white/5 -skew-y-2 my-12">
      <div className="skew-y-2 px-6 md:px-12 mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-black text-[#1a120f] dark:text-white">Visual Story</h2>
        <a className="text-primary font-bold hover:underline flex items-center gap-1" href="#">
          See More <span className="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>

      {/* Scrolling Container */}
      <div className="skew-y-2 flex gap-6 overflow-x-auto pb-8 px-6 md:px-12 snap-x hide-scrollbar">
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className={`snap-center shrink-0 w-[300px] bg-white dark:bg-paper-dark p-3 pb-8 shadow-md ${photo.rotate} transition-transform hover:scale-105 hover:rotate-0`}
          >
            <div className={`w-full aspect-[3/4] bg-gray-200 mb-2 overflow-hidden ${photo.filter} transition-all`}>
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: `url("${photo.src}")` }}
              ></div>
            </div>
            <div className={`font-handwriting text-center text-gray-500 font-bold ${photo.rotate === 'rotate-2' ? 'rotate-1' : '-rotate-1'}`}>
              {photo.caption}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisualStory;